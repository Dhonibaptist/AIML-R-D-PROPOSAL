const state = {
  alerts: [],
  incidents: [],
  noise: [],
  runbooks: [],
  analytics: {},
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function fmtTime(ts) {
  return ts.replace('T', ' ').replace('Z', '');
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
}

function updateSplash(percent, logText) {
  const bar = $('#splash-progress-bar');
  const percentText = $('#splash-percent-text');
  const logEl = $('#splash-log-text');
  if (bar) bar.style.width = `${percent}%`;
  if (percentText) percentText.textContent = `${percent}%`;
  if (logEl && logText) logEl.textContent = logText;
}

function finishSplash() {
  updateSplash(100, 'System Operational · Ready');
  const btn = $('#btn-enter-system');
  if (btn) {
    btn.style.display = 'inline-flex';
    btn.addEventListener('click', closeSplash);
  }
  setTimeout(closeSplash, 1200);
}

function closeSplash() {
  const splash = $('#splash-screen');
  if (splash && !splash.classList.contains('is-hidden')) {
    splash.classList.add('is-hidden');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 500);
  }
}

async function loadAll() {
  setStatus('connecting…', 'plain');
  updateSplash(15, 'Establishing Connection with Triage Backend...');
  try {
    updateSplash(35, 'Ingesting Raw Alert Stream & Synthetic Topology...');
    const [alerts, incidents, noise, runbooks, analytics] = await Promise.all([
      fetchJSON('/api/alerts'),
      fetchJSON('/api/incidents'),
      fetchJSON('/api/noise'),
      fetchJSON('/api/runbooks'),
      fetchJSON('/api/analytics'),
    ]);
    updateSplash(65, 'Correlating Incidents & Filtering Noise Alerts...');
    state.alerts = alerts;
    state.incidents = incidents;
    state.noise = noise;
    state.runbooks = runbooks;
    state.analytics = analytics;

    $('#count-feed').textContent = alerts.length;
    $('#count-incidents').textContent = incidents.length;
    $('#count-noise').textContent = noise.length;
    $('#count-runbooks').textContent = runbooks.length;

    updateSplash(88, 'Indexing Runbook Library & Gemini AI Recommendations...');

    renderFeed();
    renderIncidents();
    renderNoise();
    renderRunbooks();
    renderAnalytics();
    setStatus('live', 'ok');

    finishSplash();
  } catch (e) {
    console.error(e);
    updateSplash(40, 'Backend pipeline initializing — retrying in 2.5s...');
    setStatus('pipeline still starting — retrying…', 'err');
    setTimeout(loadAll, 2500);
  }
}

function setStatus(text, kind) {
  $('#status-text').textContent = text;
  const dot = $('#status-dot');
  dot.className = 'pulse-dot' + (kind === 'ok' ? ' ok' : kind === 'err' ? ' err' : '');
}

// ---------------- Alert -> incident lookup ----------------

function incidentForAlert(alertId) {
  return state.incidents.find((inc) => inc.alerts.some((a) => a.id === alertId));
}

// ---------------- Feed view ----------------

let currentFeedFilter = 'all';
let currentIncidentFilter = 'all';
let isAllExpanded = false;

// ---------------- Feed view ----------------

function renderFeed() {
  const q = ($('#feed-search').value || '').toLowerCase();
  const cards = state.alerts
    .filter((a) => {
      const inc = incidentForAlert(a.id);
      if (currentFeedFilter === 'critical' && a.severity.toLowerCase() !== 'critical') return false;
      if (currentFeedFilter === 'warning' && a.severity.toLowerCase() !== 'warning') return false;
      if (currentFeedFilter === 'info' && a.severity.toLowerCase() !== 'info') return false;
      if (currentFeedFilter === 'grouped' && !inc) return false;
      if (currentFeedFilter === 'noise' && inc) return false;

      if (!q) return true;
      return (
        a.id.toLowerCase().includes(q) ||
        a.device.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q) ||
        a.message.toLowerCase().includes(q) ||
        a.severity.toLowerCase().includes(q)
      );
    })
    .map((a) => {
      const inc = incidentForAlert(a.id);
      const tag = inc
        ? `<span class="grouped-tag clickable-inc-tag" data-inc-id="${inc.incident_id}" title="Click to view Incident ${inc.incident_id}">Incident: ${inc.incident_id} ↗</span>`
        : `<span class="noise-reason">noise</span>`;
      const isExpanded = isAllExpanded;
      return `
        <div class="alert-card severity-${a.severity} ${isExpanded ? 'is-expanded' : ''}" data-id="${a.id}">
          <div class="alert-card-header">
            <div class="alert-header-left">
              <span class="alert-icon">⚡</span>
              <span class="alert-title">Alert ${a.id.toUpperCase()}</span>
              <span class="badge ${a.severity} header-badge">${a.severity}</span>
            </div>
            <div class="alert-header-right">
              <span class="alert-expand-label">${isExpanded ? 'Click to collapse' : 'Click to expand'}</span>
              <span class="alert-chevron">▼</span>
            </div>
          </div>
          <div class="alert-card-body">
            <div class="alert-detail-grid">
              <div class="detail-item">
                <span class="detail-label">Time</span>
                <span class="detail-value ts">${fmtTime(a.timestamp)}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Severity</span>
                <span class="detail-value"><span class="badge ${a.severity}">${a.severity}</span></span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Device</span>
                <span class="detail-value device">${a.device}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Type</span>
                <span class="detail-value device">${a.type}</span>
              </div>
            </div>
            <div class="alert-detail-full">
              <span class="detail-label">Message</span>
              <div class="msg">${a.message} &nbsp;${tag}</div>
            </div>
            ${
              a.source_ip
                ? `
            <div class="alert-detail-full" style="margin-top: 10px;">
              <span class="detail-label">Source IP</span>
              <div class="detail-value device">${a.source_ip}</div>
            </div>`
                : ''
            }
            <div class="alert-card-footer">
              <button class="btn-copy-alert" data-id="${a.id}">📋 Copy Details</button>
            </div>
          </div>
        </div>`;
    })
    .join('');

  $('#feed-table').innerHTML =
    cards ||
    '<div class="alert-card-empty"><p style="color:var(--muted); text-align:center; padding: 20px;">No alerts match search criteria.</p></div>';

  $$('#feed-table .alert-card').forEach((card) => {
    card.addEventListener('click', () => {
      const isExp = card.classList.toggle('is-expanded');
      const label = card.querySelector('.alert-expand-label');
      if (label) {
        label.textContent = isExp ? 'Click to collapse' : 'Click to expand';
      }
    });
  });

  // Interactive Incident Tag linking
  $$('#feed-table .clickable-inc-tag').forEach((tagEl) => {
    tagEl.addEventListener('click', (e) => {
      e.stopPropagation();
      const incId = tagEl.dataset.incId;
      if (incId) {
        openIncidentModal(incId);
      }
    });
  });

  // Copy details button handler
  $$('#feed-table .btn-copy-alert').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const alertId = btn.dataset.id;
      const a = state.alerts.find((item) => item.id === alertId);
      if (!a) return;
      const inc = incidentForAlert(a.id);
      const textToCopy = [
        `[ALERT ${a.id.toUpperCase()}]`,
        `Time: ${fmtTime(a.timestamp)}`,
        `Severity: ${a.severity.toUpperCase()}`,
        `Device: ${a.device}`,
        `Type: ${a.type}`,
        `Message: ${a.message}`,
        inc ? `Incident: ${inc.incident_id}` : `Status: Noise`,
        a.source_ip ? `Source IP: ${a.source_ip}` : null,
      ]
        .filter(Boolean)
        .join('\n');

      navigator.clipboard.writeText(textToCopy).then(() => {
        const origText = btn.innerHTML;
        btn.innerHTML = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.classList.remove('copied');
        }, 1800);
      });
    });
  });
}

function toggleExpandAll() {
  isAllExpanded = !isAllExpanded;
  const btn = $('#btn-toggle-expand');
  if (btn) {
    btn.textContent = isAllExpanded ? '⚡ Collapse All' : '⚡ Expand All';
  }
  renderFeed();
}

function exportAlertsCSV() {
  const q = ($('#feed-search').value || '').toLowerCase();
  const filtered = state.alerts.filter((a) => {
    const inc = incidentForAlert(a.id);
    if (currentFeedFilter === 'critical' && a.severity.toLowerCase() !== 'critical') return false;
    if (currentFeedFilter === 'warning' && a.severity.toLowerCase() !== 'warning') return false;
    if (currentFeedFilter === 'info' && a.severity.toLowerCase() !== 'info') return false;
    if (currentFeedFilter === 'grouped' && !inc) return false;
    if (currentFeedFilter === 'noise' && inc) return false;
    if (!q) return true;
    return (
      a.id.toLowerCase().includes(q) ||
      a.device.toLowerCase().includes(q) ||
      a.type.toLowerCase().includes(q) ||
      a.message.toLowerCase().includes(q) ||
      a.severity.toLowerCase().includes(q)
    );
  });

  if (!filtered.length) {
    alert('No alerts to export based on current filters.');
    return;
  }

  const headers = ['ID', 'Timestamp', 'Severity', 'Device', 'Type', 'Message', 'Incident_Or_Noise', 'Source_IP'];
  const csvRows = [headers.join(',')];

  filtered.forEach((a) => {
    const inc = incidentForAlert(a.id);
    const row = [
      `"${a.id}"`,
      `"${fmtTime(a.timestamp)}"`,
      `"${a.severity}"`,
      `"${a.device}"`,
      `"${a.type}"`,
      `"${a.message.replace(/"/g, '""')}"`,
      `"${inc ? inc.incident_id : 'Noise'}"`,
      `"${a.source_ip || ''}"`,
    ];
    csvRows.push(row.join(','));
  });

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `network_alerts_export_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

$('#feed-search').addEventListener('input', renderFeed);

// Feed Chips Listener
$$('#feed-filter-chips .chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    $$('#feed-filter-chips .chip').forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    currentFeedFilter = chip.dataset.filter;
    renderFeed();
  });
});

const btnExpand = $('#btn-toggle-expand');
if (btnExpand) btnExpand.addEventListener('click', toggleExpandAll);

const btnExport = $('#btn-export-csv');
if (btnExport) btnExport.addEventListener('click', exportAlertsCSV);

// ---------------- Incidents view ----------------

function renderIncidents() {
  const q = ($('#incidents-search') ? $('#incidents-search').value || '' : '').toLowerCase();

  const cards = state.incidents
    .filter((inc) => {
      if (currentIncidentFilter === 'high' && inc.priority.level.toLowerCase() !== 'high') return false;
      if (currentIncidentFilter === 'medium' && inc.priority.level.toLowerCase() !== 'medium') return false;
      if (currentIncidentFilter === 'low' && inc.priority.level.toLowerCase() !== 'low') return false;
      if (currentIncidentFilter === 'matched' && inc.status !== 'Runbook Matched') return false;
      if (currentIncidentFilter === 'escalated' && inc.status === 'Runbook Matched') return false;

      if (!q) return true;
      return (
        inc.incident_id.toLowerCase().includes(q) ||
        inc.title.toLowerCase().includes(q) ||
        inc.devices_involved.some((d) => d.toLowerCase().includes(q)) ||
        inc.priority.level.toLowerCase().includes(q)
      );
    })
    .map((inc) => {
      const statusHtml =
        inc.status === 'Runbook Matched'
          ? `Matched to <span class="rb-cite">${inc.runbook_match.title} (${inc.runbook_match.id})</span> — similarity ${inc.runbook_match.similarity}`
          : `<span class="esc-cite">Escalated — no confident runbook match</span>`;

      return `
        <div class="incident-card" data-id="${inc.incident_id}">
          <div class="ic-top">
            <div>
              <div class="ic-id">${inc.incident_id}</div>
              <div class="ic-title">${inc.title}</div>
            </div>
            <div class="ic-badges">
              <span class="badge ${inc.priority.level.toLowerCase()}">${inc.priority.level} priority</span>
              <span class="badge ${inc.max_severity}">${inc.max_severity}</span>
            </div>
          </div>
          <div class="ic-meta">
            <span>${inc.alert_count} alerts grouped</span>
            <span>${inc.devices_involved.length} device(s)</span>
            <span>${fmtTime(inc.first_seen)} → ${fmtTime(inc.last_seen)}</span>
          </div>
          <div class="ic-status">${statusHtml}</div>
        </div>`;
    })
    .join('');

  $('#incidents-list').innerHTML =
    cards || '<p style="color:var(--muted); text-align:center; padding: 20px;">No incidents match filter criteria.</p>';

  $$('.incident-card').forEach((card) => {
    card.addEventListener('click', () => openIncidentModal(card.dataset.id));
  });
}

// Incidents toolbar listeners
const incSearchInput = $('#incidents-search');
if (incSearchInput) incSearchInput.addEventListener('input', renderIncidents);

$$('#incidents-filter-chips .chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    $$('#incidents-filter-chips .chip').forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    currentIncidentFilter = chip.dataset.filter;
    renderIncidents();
  });
});

function openIncidentModal(id) {
  const inc = state.incidents.find((i) => i.incident_id === id);
  if (!inc) return;

  const alertsHtml = inc.alerts
    .map(
      (a) =>
        `<div class="md-alert-row">[${fmtTime(a.timestamp)}] ${a.device} · ${a.type} · ${a.severity} — ${a.message}</div>`
    )
    .join('');

  const reasonsHtml = inc.correlation_reasons.length
    ? `<ul class="md-reasons">${inc.correlation_reasons.map((r) => `<li>${r}</li>`).join('')}</ul>`
    : `<p style="color:var(--muted);font-size:13px">Single critical-severity alert, surfaced on its own.</p>`;

  let responseHtml;
  if (inc.status === 'Runbook Matched') {
    responseHtml = `
      <div class="md-section">
        <h3>Recommended first response</h3>
        <span class="md-cite matched">from ${inc.runbook_match.title} (${inc.runbook_match.id}) · similarity ${inc.runbook_match.similarity}</span>
        <div class="md-recommendation">${inc.recommendation}</div>
      </div>`;
  } else {
    const nearMiss = inc.escalation.near_miss_candidates
      .map((c) => `${c.title} (${c.similarity})`)
      .join(' · ');
    responseHtml = `
      <div class="md-section">
        <h3>Escalation packet</h3>
        <span class="md-cite escalated">no runbook cleared the confidence threshold</span>
        <div class="md-escalation">${inc.escalation.packet}</div>
        <div class="md-nearmiss">nearest candidates considered: ${nearMiss}</div>
      </div>`;
  }

  $('#modal-body').innerHTML = `
    <div class="md-id">${inc.incident_id} · priority ${inc.priority.level} (${inc.priority.score} pts) · ${inc.priority.reasoning}</div>
    <h2 class="md-title">${inc.title}</h2>
    <div class="md-section">
      <h3>Grouped alerts (${inc.alert_count})</h3>
      ${alertsHtml}
    </div>
    <div class="md-section">
      <h3>Why these were grouped together</h3>
      ${reasonsHtml}
    </div>
    ${responseHtml}
  `;
  $('#incident-modal').classList.add('is-open');
}

$('#modal-close').addEventListener('click', () => {
  $('#incident-modal').classList.remove('is-open');
});
$('#incident-modal').addEventListener('click', (e) => {
  if (e.target.id === 'incident-modal') $('#incident-modal').classList.remove('is-open');
});

// ---------------- Noise view ----------------

function renderNoise() {
  const cards = state.noise
    .map(
      (a) => `
      <div class="noise-card severity-${a.severity}">
        <div class="noise-card-top">
          <div class="noise-meta-left">
            <span class="badge ${a.severity}">${a.severity}</span>
            <span class="device-tag">${a.device}</span>
            <span class="type-tag">${a.type}</span>
          </div>
          <div class="noise-time ts">${fmtTime(a.timestamp)}</div>
        </div>
        <div class="noise-msg-block">
          <span class="detail-label">Alert Message</span>
          <div class="msg-text">${a.message}</div>
        </div>
        <div class="noise-reason-box">
          <div class="reason-header">
            <span class="reason-icon">💡</span>
            <span class="reason-title">Noise Rationale</span>
          </div>
          <div class="reason-body">${a.noise_reason}</div>
        </div>
      </div>`
    )
    .join('');

  $('#noise-table').innerHTML =
    cards || '<div class="alert-card-empty"><p style="color:var(--muted); text-align:center; padding: 20px;">No unassigned noise alerts.</p></div>';
}

// ---------------- Runbooks view ----------------

function renderRunbooks() {
  const cards = state.runbooks
    .map(
      (r) => `
      <div class="runbook-card">
        <div class="rb-title">${r.title}</div>
        <div class="rb-id">${r.id} · ${r.file}</div>
        <div class="rb-applies">applies to: ${r.applies_to
          .map((t) => `<span>${t}</span>`)
          .join('')}</div>
      </div>`
    )
    .join('');
  $('#runbooks-list').innerHTML = cards;
}

// ---------------- Analytics view ----------------

function renderAnalytics() {
  const a = state.analytics;
  const cards = [
    ['Total alerts ingested', a.total_alerts],
    ['Incidents produced', a.total_incidents],
    ['Left as noise', a.total_noise],
    ['Compression ratio', a.compression_ratio ? `${a.compression_ratio}:1` : '—'],
    ['Matched to a runbook', a.matched],
    ['Escalated (no match)', a.escalated],
  ]
    .map(
      ([label, value]) => `
      <div class="stat-card">
        <div class="stat-value">${value}</div>
        <div class="stat-label">${label}</div>
      </div>`
    )
    .join('');
  $('#analytics-grid').innerHTML = cards;
}

// ---------------- Nav ----------------

$$('.nav-item').forEach((btn) => {
  btn.addEventListener('click', () => {
    $$('.nav-item').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    $$('.view').forEach((v) => v.classList.remove('is-active'));
    $(`#view-${btn.dataset.view}`).classList.add('is-active');
  });
});

loadAll();
