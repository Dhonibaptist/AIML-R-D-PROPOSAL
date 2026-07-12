// IntelliProposal - Application Engine (JavaScript)

// =========================================================================
// R&D PROPOSALS DATABASE (MOCK DATA)
// =========================================================================
let proposals = [
    {
        id: "CMPDI-2026-001",
        title: "Automated Safety Telemetry System for Underground Coal Shafts",
        investigator: "Dr. Amit Verma",
        institution: "IIT Kharagpur",
        department: "safety",
        departmentLabel: "Mine Safety",
        budget: 12500000, // 1.25 Cr
        duration: "24 Months",
        status: "pending",
        aiScore: 88,
        similarity: 12,
        objectives: "To deploy automated sensor grids using laser telemetry inside underground deep mining shafts to predict gas leaks and collapse patterns.",
        methodology: "Installing low-power, intrinsically safe LoRaWAN transceivers across major mine routes, compiling dynamic ventilation charts, and running deep CNN models on central CMPDI edge computers.",
        outcomes: "Zero hazard incident rate, 12% rise in underground extraction output, and open-source models for mine safety audits.",
        financialChecks: [
            { item: "Equipment (LoRa Sensors)", requested: 4500000, limit: 5000000, variance: "-10%", status: "pass", text: "Under maximum allowance." },
            { item: "Manpower (JRF/SRF Research Staff)", requested: 3600000, limit: 3000000, variance: "+20%", status: "warn", text: "Higher than average, but within limits." },
            { item: "Consumables & Telemetry Core", requested: 2400000, limit: 3000000, variance: "-20%", status: "pass", text: "Complies with ceiling guidelines." },
            { item: "Institutional Overhead (IIT-KGP)", requested: 2000000, limit: 1500000, variance: "+33%", status: "fail", text: "Overhead exceeds the maximum limit of 15%." }
        ],
        noveltyMatches: [
            { title: "Underground Sensor Networks in Mining Safety", author: "CSIR-CIMFR Dhanbad (2022)", similarity: "9%", type: "Research Paper" },
            { title: "Gas Detection and Ventilation Control Using Wireless Nodes", author: "Beijing Coal Institute (2024)", similarity: "6%", type: "Patent" }
        ],
        expertReviews: [
            { reviewer: "Prof. S. R. Naidu (ISM Dhanbad)", rating: "Approve", comments: "Very robust plan. The LoRa safety modules have undergone rigorous explosive-environment testing. Support this proposal.", date: "2026-06-12" }
        ],
        xaiInsights: "The AI recommendation engine flags an overall **High Approval (88%)**. The core safety telemetry architecture demonstrates extreme novelty. However, the institutional overhead allocation (IIT-KGP) exceeds standard CMPDI R&D guideline frameworks (currently at 33% variance). Recommend adjusting budget ledger before final approval."
    },
    {
        id: "CMPDI-2026-002",
        title: "Deep Learning for Coal Vein Identification and Automated Drill Alignments",
        investigator: "Dr. Neha Sharma",
        institution: "CMPDI Regional Office II",
        department: "coal",
        departmentLabel: "Coal Gasification",
        budget: 24000000, // 2.4 Cr
        duration: "36 Months",
        status: "approved",
        aiScore: 92,
        similarity: 8,
        objectives: "Utilizing 3D seismic imagery datasets coupled with deep learning convolutional nets to guide autonomous drilling systems directly into rich coal deposits.",
        methodology: "Training deep reinforcement learning agents using history logs of 200 drilling operations, integrating real-time telemetry from drilling machines, and deploying on custom rugged laptops.",
        outcomes: "25% reduction in exploratory drilling cycle time and 95% accuracy in geological vein identification.",
        financialChecks: [
            { item: "Computation Rig (NVIDIA H100)", requested: 8000000, limit: 10000000, variance: "-20%", status: "pass", text: "High performance compute meets guidelines." },
            { item: "Drill Sensor Instrumentation", requested: 9000000, limit: 9000000, variance: "0%", status: "pass", text: "Matches standard pricing templates." },
            { item: "Travel & Core Field Inspections", requested: 4000000, limit: 5000000, variance: "-20%", status: "pass", text: "Field exploration logistics validated." },
            { item: "Administrative Expenses", requested: 3000000, limit: 3000000, variance: "0%", status: "pass", text: "Approved overhead." }
        ],
        noveltyMatches: [
            { title: "AI-Based Structural Geology Analysis", author: "Stanford Geoscience Journal (2023)", similarity: "4%", type: "Research Paper" }
        ],
        expertReviews: [
            { reviewer: "Shri V. K. Jha (Director, CMPDI)", rating: "Approve", comments: "Perfect synergy between ML and drilling operations. Highly innovative for domestic coal exploration.", date: "2026-06-10" },
            { reviewer: "Dr. R. K. Sen (Chairman)", rating: "Approved", comments: "Approved for full funding under CMPDI R&D Program.", date: "2026-06-15" }
        ],
        xaiInsights: "The R&D project demonstrates **Excellent Novelty (92%)** with minimal text alignment with previous publications. Financial breakdowns completely align with CMPDI funding ceilings. Drill efficiency outputs will immediately reduce exploration overheads. Recommended for immediate deployment."
    },
    {
        id: "CMPDI-2026-003",
        title: "Bioreclamation of Coal Mine Overburden Dumps using Native Plant Species",
        investigator: "Dr. Anil Mukherji",
        institution: "BHU Varanasi",
        department: "env",
        departmentLabel: "Environmental / Reclamation",
        budget: 6800000, // 68 Lakhs
        duration: "18 Months",
        status: "revision",
        aiScore: 71,
        similarity: 26,
        objectives: "Implementing biological soil conditioning on slag and overburden mine dumps using nitrogen-fixing shrubs and native grasses to accelerate ecological restoration.",
        methodology: "Testing diverse soil-conditioner ratios on experimental grid zones at CMPDI Open Cast Mines, mapping soil fertility recovery indices quarterly, and running spatial NDVI vegetation mapping.",
        outcomes: "60% improvement in overburden organic content and stabilization of slag dump slide risks.",
        financialChecks: [
            { item: "Seeds, Shrubs & Micro-nutrients", requested: 2500000, limit: 2000000, variance: "+25%", status: "warn", text: "Bulk organic consumables pricing needs justification." },
            { item: "Field Soil Chemistry Testing Kits", requested: 1800000, limit: 2000000, variance: "-10%", status: "pass", text: "Fully within parameters." },
            { item: "Manual Soil Lab Labor Costs", requested: 2000000, limit: 1500000, variance: "+33%", status: "warn", text: "Manual core labor budget slightly inflated." },
            { item: "Project Contingency Funds", requested: 500000, limit: 1000000, variance: "-50%", status: "pass", text: "Complies with administrative margins." }
        ],
        noveltyMatches: [
            { title: "Ecological Restoration of Indian Mine Waste Dumps", author: "CFR-Dehradun (2018)", similarity: "21%", type: "Research Paper" },
            { title: "Revegetation of Open-Cast Coal Waste Land", author: "IIT ISM Dhanbad (2021)", similarity: "18%", type: "Research Paper" }
        ],
        expertReviews: [
            { reviewer: "Dr. G. Prasad (CMPDI Adviser)", rating: "Revision Requested", comments: "The plant species specified are highly identical to the 2021 study by IIT ISM. Clarify how this methodology delivers additional innovation.", date: "2026-06-14" }
        ],
        xaiInsights: "Overall **Moderate Evaluation Score (71%)**. Plagiarism scans indicate notable overlap (26% similarity) with a 2021 study on mine revegetation. Additionally, the soil-cons costs reflect inflation indicators. The committee has requested methodology revision to clarify differences before funding final approval."
    },
    {
        id: "CMPDI-2026-004",
        title: "Satellite Imagery & AI Drone Analysis for Surface Coal Inventory Estimations",
        investigator: "Dr. P. K. Rao",
        institution: "IIT ISM Dhanbad",
        department: "coal",
        departmentLabel: "Coal Gasification",
        budget: 18000000, // 1.8 Cr
        duration: "12 Months",
        status: "rejected",
        aiScore: 48,
        similarity: 62,
        objectives: "Using low-altitude quadcopters equipped with photogrammetry alongside Sentinel satellite bands to calculate coal stockpiles in surface yards.",
        methodology: "Building standard 3D meshes of coal dump heaps, using density estimations, and comparing volume outputs to physical ledger entries.",
        outcomes: "Dynamic stockpile measurements with less than 5% volume margins.",
        financialChecks: [
            { item: "Industrial Drone Equipment", requested: 8000000, limit: 4000000, variance: "+100%", status: "fail", text: "Drone unit cost is double standard pricing catalog." },
            { item: "Drone Pilot Consultancy Fee", requested: 5000000, limit: 2000000, variance: "+150%", status: "fail", text: "Professional mapping rates exceed CMPDI norms." },
            { item: "Software Processing Packages", requested: 3000000, limit: 2000000, variance: "+50%", status: "fail", text: "Excessive cloud compute margins." },
            { item: "Institutional Overhead Fee", requested: 2000000, limit: 1500000, variance: "+33%", status: "fail", text: "Overhead limit exceeded." }
        ],
        noveltyMatches: [
            { title: "Volumetric Stockpile Calculation with Quadcopters", author: "CIL-Coal India (2020)", similarity: "58%", type: "Patent" },
            { title: "Drone Photogrammetry for Coal Yards", author: "CMPDI Technical Bulletin (2023)", similarity: "44%", type: "Research Paper" }
        ],
        expertReviews: [
            { reviewer: "Shri R. N. Pathak (Director)", rating: "Rejected", comments: "This proposal relies entirely on methods already patented by Coal India in 2020. No scientific novelty. Budget is also extremely bloated.", date: "2026-06-11" }
        ],
        xaiInsights: "The proposal has been **Rejected (48% score)**. Semantic checking has detected severe plagiarism (62% similarity) with patents owned directly by Coal India (CIL, 2020) and past CMPDI trials. Additionally, drone logistics and consultancy fees are heavily inflated. Rejecting recommendation."
    }
];

// Active selection
let selectedProposalIndex = 0;

// =========================================================================
// SYSTEM NOTIFICATIONS LOG
// =========================================================================
let systemNotifications = [
    { type: "success", title: "Review Submitted Successfully", desc: "Dr. R. K. Sen approved proposal CMPDI-2026-002 with digital signature.", time: "10 Minutes Ago" },
    { type: "warn", title: "New Document Upload Alert", desc: "Principal Investigator Dr. Amit Verma submitted a revised budget draft.", time: "2 Hours Ago" },
    { type: "danger", title: "Novelty Alarm Triggered", desc: "Proposal ID CMPDI-2026-004 failed the novelty scan check (62% overlap).", time: "1 Day Ago" },
    { type: "info", title: "System Database Sync Completed", desc: "Synced CSIR-CIMFR and Google Patent registries for real-time similarity checks.", time: "2 Days Ago" }
];

// =========================================================================
// GLOBAL VIEW SWITCHER / ROUTING
// =========================================================================
function switchAppTab(tabId) {
    // Hide all tab views
    const pageViews = document.querySelectorAll('.app-page-view');
    pageViews.forEach(view => {
        view.classList.remove('active-page');
    });
    
    // De-activate sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Show selected view
    const selectedView = document.getElementById(tabId);
    if (selectedView) {
        selectedView.classList.add('active-page');
    }

    // Activate corresponding sidebar link
    const targetLink = Array.from(sidebarLinks).find(link => {
        const onclickAttr = link.getAttribute('onclick') || "";
        return onclickAttr.includes(tabId);
    });
    if (targetLink) {
        targetLink.classList.add('active');
    }

    // Update headers
    const titleHeader = document.getElementById('current-tab-title');
    const descHeader = document.getElementById('current-tab-desc');
    
    switch(tabId) {
        case 'dashboard-tab':
            titleHeader.textContent = "Consensus Dashboard";
            descHeader.textContent = "Comprehensive R&D proposal queue overview and key intelligence metrics";
            renderDashboardTable();
            break;
        case 'upload-tab':
            titleHeader.textContent = "Submit Proposal File";
            descHeader.textContent = "Upload research plans for automated OCR parsing and compliance checks";
            break;
        case 'details-tab':
            titleHeader.textContent = "Proposal Deep-Dive";
            descHeader.textContent = "Read the project methodology, objectives, and parsed variables";
            populateDetailsTab();
            break;
        case 'novelty-tab':
            titleHeader.textContent = "Similarity & Plagiarism Check";
            descHeader.textContent = "Inspect overlap graphs, correlating research publications, and patents";
            populateNoveltyTab();
            break;
        case 'financial-tab':
            titleHeader.textContent = "Financial Compliance Audit";
            descHeader.textContent = "Review cost variance parameters, overhead limits, and budgets";
            populateFinancialTab();
            break;
        case 'evaluation-tab':
            titleHeader.textContent = "Explainable AI (XAI) Matrix";
            descHeader.textContent = "Visual representation of AI calculations and decision reasoning models";
            populateAIEvalTab();
            break;
        case 'expert-tab':
            titleHeader.textContent = "Expert Committee Verdicts";
            descHeader.textContent = "Annotate reviews, execute consensus actions, and digitally sign off";
            populateExpertTab();
            break;
        case 'analytics-tab':
            titleHeader.textContent = "Analytics Suite";
            descHeader.textContent = "Interactive overview of departmental efficiency and funding ratios";
            renderAnalyticsCharts();
            break;
        case 'notifications-tab':
            titleHeader.textContent = "Notifications Hub";
            descHeader.textContent = "Timeline of recent audits, system evaluations, and expert logs";
            renderNotifications();
            break;
        case 'settings-tab':
            titleHeader.textContent = "System Configurations";
            descHeader.textContent = "Customize tolerances, security preferences, and language settings";
            break;
    }
}

// Landing Page Section Router
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Active link highlighting
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active-link');
        const onclickAttr = link.getAttribute('onclick') || "";
        if (onclickAttr.includes(sectionId)) {
            link.classList.add('active-link');
        }
    });
}

function switchToApp() {
    document.getElementById('landing-view').style.display = 'none';
    document.getElementById('app-view').style.display = 'block';
    // Switch to Dashboard Tab by default
    switchAppTab('dashboard-tab');
    
    // Render initial charts
    setTimeout(() => {
        initializeDashboardCharts();
    }, 200);
}

function switchToLanding() {
    document.getElementById('app-view').style.display = 'none';
    document.getElementById('landing-view').style.display = 'block';
    scrollToSection('hero');
}

// Login dialog
function showLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
}
function hideLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}
function handleLoginSubmit(event) {
    event.preventDefault();
    hideLoginModal();
    switchToApp();
}

// Sidebar toggle
function toggleSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    sidebar.classList.toggle('collapsed');
}

// Theme switcher
function toggleTheme() {
    document.body.classList.toggle('light-theme');
}

// =========================================================================
// TABLE CONTROLLER (DASHBOARD)
// =========================================================================
function renderDashboardTable() {
    const tbody = document.getElementById('proposals-list-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    proposals.forEach((p, index) => {
        const tr = document.createElement('tr');
        
        let statusBadge = '';
        if (p.status === 'approved') {
            statusBadge = '<span class="status-badge approved"><i class="fa-solid fa-circle-check"></i> Approved</span>';
        } else if (p.status === 'rejected') {
            statusBadge = '<span class="status-badge rejected"><i class="fa-solid fa-circle-xmark"></i> Rejected</span>';
        } else if (p.status === 'revision') {
            statusBadge = '<span class="status-badge revision"><i class="fa-solid fa-arrows-rotate"></i> Revision</span>';
        } else {
            statusBadge = '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
        }
        
        let noveltyBadge = '';
        if (p.similarity > 40) {
            noveltyBadge = `<span class="status-badge rejected" style="font-size:11px;">Conflict (${p.similarity}%)</span>`;
        } else if (p.similarity > 20) {
            noveltyBadge = `<span class="status-badge revision" style="font-size:11px;">Caution (${p.similarity}%)</span>`;
        } else {
            noveltyBadge = `<span class="status-badge approved" style="font-size:11px;">Safe (${p.similarity}%)</span>`;
        }
        
        let formatBudget = `₹${(p.budget / 10000000).toFixed(2)} Cr`;
        if (p.budget < 10000000) {
            formatBudget = `₹${(p.budget / 100000).toFixed(0)} Lakhs`;
        }
        
        tr.innerHTML = `
            <td><strong style="color: var(--accent-cyan); font-family:'Outfit';">${p.id}</strong></td>
            <td><strong>${p.title}</strong><br><span style="font-size:11px; color:var(--text-muted);">${p.investigator}</span></td>
            <td>${p.institution}</td>
            <td>${formatBudget}</td>
            <td><span class="score-badge">${p.aiScore}/100</span></td>
            <td>${noveltyBadge}</td>
            <td>${statusBadge}</td>
            <td>
                <button class="table-btn" onclick="selectProposal(${index})">Audit <i class="fa-solid fa-arrow-right-to-bracket"></i></button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
    
    // Update header widgets
    const pendingCount = proposals.filter(p => p.status === 'pending').length;
    const pendingWidget = document.getElementById('dashboard-pending-count');
    if (pendingWidget) pendingWidget.textContent = pendingCount;
}

function selectProposal(index) {
    selectedProposalIndex = index;
    switchAppTab('details-tab');
}

function filterProposalTable() {
    const searchVal = document.getElementById('proposal-search').value.toLowerCase();
    const tbody = document.getElementById('proposals-list-tbody');
    const rows = tbody.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const textContent = rows[i].textContent.toLowerCase();
        if (textContent.includes(searchVal)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

// =========================================================================
// DETAILS TAB
// =========================================================================
function populateDetailsTab() {
    const p = proposals[selectedProposalIndex];
    if (!p) return;
    
    document.getElementById('detail-title').textContent = p.title;
    document.getElementById('detail-investigator').textContent = `${p.investigator}, ${p.institution}`;
    
    let statusClass = "pending";
    if (p.status === "approved") statusClass = "approved";
    if (p.status === "rejected") statusClass = "rejected";
    if (p.status === "revision") statusClass = "revision";
    
    const statusElement = document.getElementById('detail-status');
    statusElement.className = `status-badge ${statusClass}`;
    statusElement.textContent = p.status.toUpperCase() + " AUDIT";
    
    let formatBudget = `₹${(p.budget / 10000000).toFixed(2)} Cr`;
    if (p.budget < 10000000) {
        formatBudget = `₹${(p.budget / 100000).toFixed(0)} Lakhs`;
    }
    
    document.getElementById('detail-budget').textContent = formatBudget;
    document.getElementById('detail-duration').textContent = p.duration;
    document.getElementById('detail-objectives').textContent = p.objectives;
    document.getElementById('detail-methodology').textContent = p.methodology;
    document.getElementById('detail-outcomes').textContent = p.outcomes;
    
    document.getElementById('detail-department').textContent = p.departmentLabel;
    
    // Update indicator stats
    document.getElementById('detail-similarity-label').textContent = `${p.similarity}%`;
    document.getElementById('detail-similarity-bar').style.width = `${p.similarity}%`;
    
    const failedFinancials = p.financialChecks.filter(f => f.status === 'fail').length;
    const financeLabel = document.getElementById('detail-finance-label');
    const financeBar = document.getElementById('detail-finance-bar');
    if (failedFinancials > 0) {
        financeLabel.textContent = `${failedFinancials} ISSUES`;
        financeLabel.style.color = "var(--accent-red)";
        financeBar.style.width = "40%";
        financeBar.style.backgroundColor = "var(--accent-red)";
    } else {
        financeLabel.textContent = "COMPLIANT";
        financeLabel.style.color = "var(--accent-green)";
        financeBar.style.width = "100%";
        financeBar.style.backgroundColor = "var(--accent-green)";
    }
    
    document.getElementById('detail-score-label').textContent = `${p.aiScore} / 100`;
    document.getElementById('detail-score-bar').style.width = `${p.aiScore}%`;
}

// =========================================================================
// NOVELTY DETECTION TAB
// =========================================================================
function populateNoveltyTab() {
    const p = proposals[selectedProposalIndex];
    if (!p) return;
    
    // Dynamic circular progress fill
    const radialFill = document.getElementById('novelty-radial-fill');
    const textVal = document.getElementById('novelty-percentage-val');
    const statusBadge = document.getElementById('novelty-status-badge');
    
    textVal.textContent = `${p.similarity}%`;
    
    // Dasharray calculations for svg circle (circumference = 2 * PI * 70 = ~439.8)
    const circum = 440;
    const offset = circum - (p.similarity / 100) * circum;
    
    // Trigger progress fill
    radialFill.style.strokeDashoffset = circum; // reset
    setTimeout(() => {
        radialFill.style.strokeDashoffset = offset;
    }, 100);
    
    if (p.similarity > 40) {
        statusBadge.textContent = "SEVERE PLAGIARISM CONFLICT DETECTED";
        statusBadge.className = "status-badge rejected";
    } else if (p.similarity > 20) {
        statusBadge.textContent = "WARNING: REVIEW OUTLINE CAREFULLY";
        statusBadge.className = "status-badge revision";
    } else {
        statusBadge.textContent = "SAFE: SECURE NOVELTY PROFILE";
        statusBadge.className = "status-badge approved";
    }
    
    // Populate matched logs list
    const listContainer = document.getElementById('novelty-matching-list');
    listContainer.innerHTML = '';
    
    if (p.noveltyMatches.length === 0) {
        listContainer.innerHTML = `<p style="color:var(--text-muted); font-style:italic;">No similar archives or patented technologies matched.</p>`;
        return;
    }
    
    p.noveltyMatches.forEach(match => {
        const card = document.createElement('div');
        card.style.background = 'rgba(255, 255, 255, 0.02)';
        card.style.border = '1px solid rgba(255, 255, 255, 0.05)';
        card.style.borderRadius = '10px';
        card.style.padding = '16px';
        card.style.display = 'flex';
        card.style.justifyContent = 'space-between';
        card.style.alignItems = 'center';
        
        card.innerHTML = `
            <div>
                <span style="font-size:10px; font-weight:700; text-transform:uppercase; color: var(--accent-cyan); display:block; margin-bottom:4px;">${match.type}</span>
                <strong style="font-size:14px; color:var(--text-primary);">${match.title}</strong>
                <span style="font-size:12px; color:var(--text-secondary); display:block; margin-top:2px;">Registry: ${match.author}</span>
            </div>
            <div style="text-align:right;">
                <span class="status-badge rejected" style="font-size: 13px; font-weight:700;">${match.similarity} Overlap</span>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

// =========================================================================
// FINANCIAL VALIDATION TAB
// =========================================================================
function populateFinancialTab() {
    const p = proposals[selectedProposalIndex];
    if (!p) return;
    
    const tbody = document.getElementById('financial-budget-tbody');
    tbody.innerHTML = '';
    
    p.financialChecks.forEach(check => {
        const tr = document.createElement('tr');
        
        let valBadge = '';
        if (check.status === 'pass') {
            valBadge = '<span class="status-badge approved"><i class="fa-solid fa-circle-check"></i> Clean Pass</span>';
        } else if (check.status === 'warn') {
            valBadge = '<span class="status-badge pending"><i class="fa-solid fa-triangle-exclamation"></i> Guideline Alert</span>';
        } else {
            valBadge = '<span class="status-badge rejected"><i class="fa-solid fa-ban"></i> Guideline Breach</span>';
        }
        
        tr.innerHTML = `
            <td><strong>${check.item}</strong></td>
            <td>₹${(check.requested / 100000).toFixed(0)} Lakhs</td>
            <td>₹${(check.limit / 100000).toFixed(0)} Lakhs</td>
            <td><strong style="color: ${check.status === 'pass' ? 'var(--accent-green)' : (check.status === 'warn' ? 'var(--accent-yellow)' : 'var(--accent-red)')};">${check.variance}</strong></td>
            <td>${valBadge}</td>
        `;
        tbody.appendChild(tr);
    });
    
    // Guidelines checks checklist rendering
    const checklistContainer = document.getElementById('compliance-checklist-container');
    checklistContainer.innerHTML = '';
    
    p.financialChecks.forEach(check => {
        const item = document.createElement('div');
        item.className = 'compliance-item';
        
        let iconMarkup = '';
        if (check.status === 'pass') {
            iconMarkup = '<i class="fa-solid fa-circle-check compliance-status-icon pass"></i>';
        } else if (check.status === 'warn') {
            iconMarkup = '<i class="fa-solid fa-circle-exclamation compliance-status-icon warn"></i>';
        } else {
            iconMarkup = '<i class="fa-solid fa-circle-xmark compliance-status-icon fail"></i>';
        }
        
        item.innerHTML = `
            ${iconMarkup}
            <div class="compliance-details">
                <h4>${check.item} Standard Audit</h4>
                <p>${check.text}</p>
            </div>
        `;
        checklistContainer.appendChild(item);
    });
}

// =========================================================================
// AI EVALUATION SCORE TAB
// =========================================================================
function populateAIEvalTab() {
    const p = proposals[selectedProposalIndex];
    if (!p) return;
    
    const container = document.getElementById('ai-gauges-container');
    container.innerHTML = '';
    
    // Define 5 metrics: Technical, Innovation, Novelty, Financial Compliance, Societal Impact
    const technical = Math.min(100, Math.max(20, p.aiScore - 3));
    const innovation = Math.min(100, Math.max(20, 100 - p.similarity + 5));
    const novelty = 100 - p.similarity;
    const financial = p.financialChecks.filter(f => f.status === 'fail').length > 0 ? 55 : 95;
    const impact = Math.min(100, Math.max(30, p.aiScore + 4));
    
    const metrics = [
        { name: "Technical Feasibility", val: technical, color: "url(#cyanGrad)" },
        { name: "Innovation Index", val: innovation, color: "url(#blueGrad)" },
        { name: "Novelty Rating", val: novelty, color: "url(#cyanGrad)" },
        { name: "Financial Audit", val: financial, color: financial > 60 ? "url(#cyanGrad)" : "var(--accent-red)" },
        { name: "Social / Mining Impact", val: impact, color: "url(#blueGrad)" }
    ];
    
    metrics.forEach((m, idx) => {
        const card = document.createElement('div');
        card.className = "glass-panel gauge-card";
        
        const strokeColor = m.color.includes('url') ? m.color : m.color;
        const circum = 220;
        const offset = circum - (m.val / 100) * circum;
        
        card.innerHTML = `
            <div class="gauge-label">${m.name}</div>
            <div class="radial-progress-wrap" style="width:100px; height:100px;">
                <svg width="100" height="100" viewBox="0 0 100 100" class="radial-progress-svg">
                    <circle cx="50" cy="50" r="35" stroke="rgba(255,255,255,0.03)" stroke-width="8" fill="none"></circle>
                    <circle cx="50" cy="50" r="35" stroke="${strokeColor}" stroke-width="8" fill="none"
                        stroke-dasharray="${circum}" stroke-dashoffset="${circum}" id="gauge-circle-${idx}"
                        stroke-linecap="round"></circle>
                </svg>
                <div class="radial-text">
                    <div class="radial-val" style="font-size: 20px;">${m.val}%</div>
                </div>
            </div>
        `;
        
        container.appendChild(card);
        
        // Trigger path animations
        setTimeout(() => {
            const circle = document.getElementById(`gauge-circle-${idx}`);
            if (circle) circle.style.strokeDashoffset = offset;
        }, 150 + idx * 50);
    });
    
    // AI text block
    document.getElementById('xai-insights-box').innerHTML = `
        <p style="color:var(--text-secondary); margin-bottom:12px;"><strong>AI Audit Engine Recommendation:</strong></p>
        <p style="color:var(--text-primary); font-size:14px; text-align:justify;">${p.xaiInsights}</p>
    `;
}

// =========================================================================
// EXPERT REVIEW PANEL CONTROLLER
// =========================================================================
function populateExpertTab() {
    const p = proposals[selectedProposalIndex];
    if (!p) return;
    
    const commentsContainer = document.getElementById('expert-consensus-comments');
    commentsContainer.innerHTML = '';
    
    if (p.expertReviews.length === 0) {
        commentsContainer.innerHTML = `<p style="color:var(--text-muted); font-style:italic;">No peer review verdicts filed yet.</p>`;
    } else {
        p.expertReviews.forEach(rev => {
            const block = document.createElement('div');
            block.style.background = 'rgba(255, 255, 255, 0.02)';
            block.style.borderLeft = '4px solid var(--accent-cyan)';
            block.style.borderRadius = '0 8px 8px 0';
            block.style.padding = '16px';
            
            block.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom: 6px; font-size:12px;">
                    <strong>${rev.reviewer}</strong>
                    <span style="color: var(--text-muted);">${rev.date}</span>
                </div>
                <div style="font-size:13px; color:var(--text-secondary); line-height: 1.4; margin-bottom: 8px;">
                    ${rev.comments}
                </div>
                <span class="status-badge ${rev.rating.toLowerCase().includes('approve') ? 'approved' : (rev.rating.toLowerCase().includes('reject') ? 'rejected' : 'revision')}">
                    ${rev.rating}
                </span>
            `;
            commentsContainer.appendChild(block);
        });
    }
    
    // Init drawing canvas for signature
    initSignatureCanvas();
}

let sigCanvas, sigCtx, drawing = false;

function initSignatureCanvas() {
    sigCanvas = document.getElementById('digital-sig-canvas');
    if (!sigCanvas) return;
    sigCtx = sigCanvas.getContext('2d');
    
    // Resize canvas to its element offset bounding dimensions
    const box = sigCanvas.parentElement.getBoundingClientRect();
    sigCanvas.width = box.width;
    sigCanvas.height = 180;
    
    // Style settings for ink
    sigCtx.strokeStyle = '#00f2fe';
    sigCtx.lineWidth = 2.5;
    sigCtx.lineCap = 'round';
    sigCtx.shadowBlur = 4;
    sigCtx.shadowColor = '#00f2fe';
    
    // Drawing handlers
    sigCanvas.addEventListener('mousedown', startDrawing);
    sigCanvas.addEventListener('mousemove', drawLine);
    sigCanvas.addEventListener('mouseup', stopDrawing);
    sigCanvas.addEventListener('mouseout', stopDrawing);
    
    // Touch support
    sigCanvas.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        const r = sigCanvas.getBoundingClientRect();
        startDrawing({ clientX: t.clientX, clientY: t.clientY });
        e.preventDefault();
    });
    sigCanvas.addEventListener('touchmove', (e) => {
        const t = e.touches[0];
        drawLine({ clientX: t.clientX, clientY: t.clientY });
        e.preventDefault();
    });
    sigCanvas.addEventListener('touchend', stopDrawing);
}

function startDrawing(e) {
    drawing = true;
    const r = sigCanvas.getBoundingClientRect();
    sigCtx.beginPath();
    sigCtx.moveTo(e.clientX - r.left, e.clientY - r.top);
}

function drawLine(e) {
    if (!drawing) return;
    const r = sigCanvas.getBoundingClientRect();
    sigCtx.lineTo(e.clientX - r.left, e.clientY - r.top);
    sigCtx.stroke();
}

function stopDrawing() {
    drawing = false;
}

function clearSignatureCanvas() {
    if (sigCtx && sigCanvas) {
        sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
    }
}

function handleReviewSubmit(event) {
    event.preventDefault();
    const verdictSelect = document.getElementById('expert-verdict-select');
    const commentsArea = document.getElementById('expert-comments-textarea');
    const p = proposals[selectedProposalIndex];
    
    if (!verdictSelect || !commentsArea || !p) return;
    
    const selectedVal = verdictSelect.value;
    const commentText = commentsArea.value;
    
    // Push new review to array
    const dateStr = new Date().toISOString().split('T')[0];
    p.expertReviews.push({
        reviewer: "Dr. R. K. Sen (Chairman)",
        rating: selectedVal.toUpperCase(),
        comments: commentText,
        date: dateStr
    });
    
    // Update proposal main status
    p.status = selectedVal;
    
    // Add notification
    systemNotifications.unshift({
        type: selectedVal === 'approved' ? 'success' : (selectedVal === 'rejected' ? 'danger' : 'revision'),
        title: `Proposal Audit Concluded`,
        desc: `Dr. Sen submitted review for ${p.id}. Status changed to ${selectedVal.toUpperCase()}`,
        time: "Just Now"
    });
    
    // Reset inputs
    commentsArea.value = '';
    clearSignatureCanvas();
    
    // Trigger success confetti if approved!
    if (selectedVal === 'approved') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00f2fe', '#4facfe', '#05ffa1']
        });
    }
    
    // Refresh page structures
    populateDetailsTab();
    populateExpertTab();
    
    // Pop confirmation alert
    alert(`Expert consensus submitted successfully. Status updated to ${selectedVal.toUpperCase()}`);
}

// =========================================================================
// UPLOAD SIMULATOR CONTROLLER
// =========================================================================
function triggerFileInput() {
    document.getElementById('proposal-file-input').click();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        simulateUploadFlow(file.name);
    }
}

// Drag & Drop event bindings
const dropZone = document.getElementById('drag-drop-zone');
if (dropZone) {
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) {
            simulateUploadFlow(file.name);
        }
    });
}

function simulateUploadFlow(fileName) {
    const progressContainer = document.getElementById('upload-progress-container');
    const progressBarFill = document.getElementById('upload-progress-fill');
    const statusLabel = document.getElementById('upload-status-label');
    const percentLabel = document.getElementById('upload-percentage');
    const visualizer = document.getElementById('upload-parsing-visualizer');
    const logContainer = document.getElementById('parsing-log-lines');
    const metaContainer = document.getElementById('extracted-meta-content');
    
    progressContainer.style.display = 'block';
    visualizer.style.display = 'grid';
    logContainer.innerHTML = '';
    metaContainer.innerHTML = `<p style="color:var(--text-muted); font-style:italic;">Extracting unstructured contents...</p>`;
    
    let percent = 0;
    
    const logs = [
        { time: 10, text: "Initalizing Secure OCR connection to NaCCER Document Engine...", style: "" },
        { time: 25, text: `Loading R&D Proposal: ${fileName}...`, style: "" },
        { time: 40, text: "Running layout analysis... Text blocks and budget tables identified.", style: "success" },
        { time: 55, text: "Running Named Entity Recognition (NER) models... Extracted Investigator: Dr. Suresh Mehta (IIT Roorkee)", style: "highlight" },
        { time: 70, text: "Validating budgetary variance items against Ministry of Coal guidelines...", style: "" },
        { time: 80, text: "Initiating Plagiarism similarity matrix... Scanning 240,000 national archives...", style: "highlight" },
        { time: 90, text: "Novelty index generated. Financial variance logs parsed. Audit records written.", style: "success" },
        { time: 100, text: "Document audit checks completed. Inserting record into main database.", style: "success" }
    ];
    
    const interval = setInterval(() => {
        percent += 2;
        progressBarFill.style.width = `${percent}%`;
        percentLabel.textContent = `${percent}%`;
        
        // Push log lines when percentage triggers match
        const activeLog = logs.find(l => l.time === percent);
        if (activeLog) {
            const line = document.createElement('div');
            line.className = `parsing-log-line ${activeLog.style}`;
            line.textContent = `[SystemLog] ${activeLog.text}`;
            logContainer.appendChild(line);
            logContainer.scrollTop = logContainer.scrollHeight;
        }
        
        if (percent >= 100) {
            clearInterval(interval);
            statusLabel.textContent = "Upload and audit successful!";
            
            // Generate mock uploaded proposal
            const newId = `CMPDI-2026-00${proposals.length + 1}`;
            const newProposal = {
                id: newId,
                title: "Automated Drone-Based Volumetric Analysis of Open Cast Mines",
                investigator: "Dr. Suresh Mehta",
                institution: "IIT Roorkee",
                department: "coal",
                departmentLabel: "Coal Gasification",
                budget: 8500000, // 85 Lakhs
                duration: "18 Months",
                status: "pending",
                aiScore: 84,
                similarity: 16,
                objectives: "Developing dynamic stereo-photogrammetry analysis algorithms to compute overburden heap volume directly using commercial quadcopters.",
                methodology: "Collecting LiDAR overlays, rendering topological surfaces, and optimizing calculation speed via GPU parallel arrays.",
                outcomes: "Real-time pile audits, zero labor accidents in high steep dumps, and 98% calculation precision.",
                financialChecks: [
                    { item: "Rugged Drones & LiDAR Sensor Package", requested: 3500000, limit: 3000000, variance: "+16%", status: "warn", text: "LiDAR equipment slightly exceeds base parameters." },
                    { item: "GPU Compute Node (2x NVIDIA RTX 4090)", requested: 2000000, limit: 2500000, variance: "-20%", status: "pass", text: "Computational budget within limits." },
                    { item: "Personnel Salary (Research Assistant)", requested: 1500000, limit: 1500000, variance: "0%", status: "pass", text: "Approved standard wages." },
                    { item: "Overhead institutional charges", requested: 1500000, limit: 1000000, variance: "+50%", status: "fail", text: "Overhead limit breached (capped at 10 Lakhs)." }
                ],
                noveltyMatches: [
                    { title: "Topographical Analysis of Surface Stocks", author: "CSIR Dhanbad (2021)", similarity: "12%", type: "Research Paper" }
                ],
                expertReviews: [],
                xaiInsights: "The AI recommendation engine notes a **Strong Novelty profile (84% score)** with clean feasibility. LiDAR equipment reflects slight variance (+16%), and overhead costs exceed limit ceilings. Recommend budget modification prior to expert committee review."
            };
            
            // Add to database
            proposals.push(newProposal);
            selectedProposalIndex = proposals.length - 1;
            
            // System Notification
            systemNotifications.unshift({
                type: "success",
                title: "New R&D Document Parsed",
                desc: `Proposal ${newId} (Dr. Suresh Mehta) successfully processed and checked.`,
                time: "Just Now"
            });
            
            // Success Confetti
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#00f2fe', '#05ffa1', '#ffffff']
            });
            
            // Render parsed meta preview
            metaContainer.innerHTML = `
                <div style="font-size: 13px;">
                    <div style="margin-bottom:8px;"><strong>ID:</strong> <span style="color:var(--accent-cyan); font-weight:700;">${newProposal.id}</span></div>
                    <div style="margin-bottom:8px;"><strong>Title:</strong> ${newProposal.title}</div>
                    <div style="margin-bottom:8px;"><strong>Lead PI:</strong> ${newProposal.investigator} (${newProposal.institution})</div>
                    <div style="margin-bottom:8px;"><strong>Department:</strong> ${newProposal.departmentLabel}</div>
                    <div style="margin-bottom:8px;"><strong>Proposed Budget:</strong> ₹85 Lakhs</div>
                    <div style="margin-top:16px;">
                        <button class="btn-primary" style="padding: 6px 16px; font-size:12px; width:100%;" onclick="switchAppTab('details-tab')">Open Completed Audit Report <i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            `;
            
            // Reset loader container
            setTimeout(() => {
                progressContainer.style.display = 'none';
            }, 3000);
        }
    }, 80);
}

// =========================================================================
// ANALYTICS & DASHBOARD CHART INITIALIZATIONS
// =========================================================================
let barChartInstance, pieChartInstance, lineChartInstance, doughnutChartInstance;

function initializeDashboardCharts() {
    // 1. Departmental Bar Chart
    const barCtx = document.getElementById('dashboard-bar-chart');
    if (barCtx) {
        barChartInstance = new Chart(barCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Coal Gasification', 'Mine Safety', 'Environmental', 'Drone Surveys', 'Deep Exploration'],
                datasets: [
                    {
                        label: 'Approved R&D Proposals',
                        data: [4, 6, 3, 2, 5],
                        backgroundColor: 'rgba(0, 242, 254, 0.65)',
                        borderColor: '#00f2fe',
                        borderWidth: 1,
                        borderRadius: 4
                    },
                    {
                        label: 'Pending Review',
                        data: [2, 3, 4, 1, 2],
                        backgroundColor: 'rgba(79, 172, 254, 0.35)',
                        borderColor: '#4facfe',
                        borderWidth: 1,
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#a0aec0', font: { family: 'Inter', size: 11 } }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#a0aec0', font: { family: 'Inter', size: 10 } }
                    },
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#a0aec0', stepSize: 1, font: { family: 'Inter', size: 10 } }
                    }
                }
            }
        });
    }
    
    // 2. AI Scores Distribution Pie Chart
    const pieCtx = document.getElementById('dashboard-pie-chart');
    if (pieCtx) {
        pieChartInstance = new Chart(pieCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Excellent (>85)', 'Satisfactory (70-85)', 'Weak (<70)'],
                datasets: [{
                    data: [12, 8, 4],
                    backgroundColor: [
                        'rgba(5, 255, 161, 0.7)',
                        'rgba(0, 242, 254, 0.7)',
                        'rgba(255, 74, 107, 0.7)'
                    ],
                    borderColor: 'rgba(8, 27, 51, 0.8)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#a0aec0', font: { family: 'Inter', size: 11 } }
                    }
                }
            }
        });
    }
}

function updateDashboardCharts() {
    const filter = document.getElementById('departmental-chart-filter').value;
    if (!barChartInstance) return;
    
    // Dynamic chart update simulation
    if (filter === 'coal') {
        barChartInstance.data.datasets[0].data = [6, 0, 0, 0, 0];
        barChartInstance.data.datasets[1].data = [3, 0, 0, 0, 0];
    } else if (filter === 'safety') {
        barChartInstance.data.datasets[0].data = [0, 8, 0, 0, 0];
        barChartInstance.data.datasets[1].data = [0, 2, 0, 0, 0];
    } else if (filter === 'env') {
        barChartInstance.data.datasets[0].data = [0, 0, 5, 0, 0];
        barChartInstance.data.datasets[1].data = [0, 0, 4, 0, 0];
    } else {
        barChartInstance.data.datasets[0].data = [4, 6, 3, 2, 5];
        barChartInstance.data.datasets[1].data = [2, 3, 4, 1, 2];
    }
    barChartInstance.update();
}

function renderAnalyticsCharts() {
    // Destroy previous instances to prevent rendering overlay bugs
    if (lineChartInstance) lineChartInstance.destroy();
    if (doughnutChartInstance) doughnutChartInstance.destroy();
    
    // 3. Analytics Submission Timeline (Line Chart)
    const lineCtx = document.getElementById('analytics-line-chart');
    if (lineCtx) {
        lineChartInstance = new Chart(lineCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Submitted Proposals (2025)',
                        data: [25, 32, 45, 30, 20, 55, 60, 48, 52, 65, 70, 85],
                        backgroundColor: 'rgba(79, 172, 254, 0.05)',
                        borderColor: '#4facfe',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Approved Proposals (2025)',
                        data: [8, 12, 18, 10, 6, 22, 24, 15, 18, 20, 28, 30],
                        backgroundColor: 'rgba(5, 255, 161, 0.05)',
                        borderColor: '#05ffa1',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#a0aec0', font: { family: 'Inter', size: 11 } }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#a0aec0', font: { family: 'Inter', size: 10 } }
                    },
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#a0aec0', font: { family: 'Inter', size: 10 } }
                    }
                }
            }
        });
    }
    
    // 4. Analytics Funding Distribution (Doughnut Chart)
    const doughnutCtx = document.getElementById('analytics-doughnut-chart');
    if (doughnutCtx) {
        doughnutChartInstance = new Chart(doughnutCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['IITs / Academics', 'CMPDI In-house R&D', 'Private Energy Consortia', 'Public Sector Undertakings'],
                datasets: [{
                    data: [45, 30, 10, 15],
                    backgroundColor: [
                        '#00f2fe',
                        '#4facfe',
                        'rgba(246, 173, 85, 0.7)',
                        'rgba(5, 255, 161, 0.7)'
                    ],
                    borderColor: 'rgba(8, 27, 51, 0.8)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#a0aec0', font: { family: 'Inter', size: 11 } }
                    }
                }
            }
        });
    }
}

// =========================================================================
// NOTIFICATIONS CONTROLLER
// =========================================================================
function renderNotifications() {
    const container = document.getElementById('notifications-timeline-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (systemNotifications.length === 0) {
        container.innerHTML = `<p style="color:var(--text-muted); font-style:italic;">No notifications recorded.</p>`;
        return;
    }
    
    systemNotifications.forEach(notif => {
        const item = document.createElement('div');
        item.className = `timeline-item ${notif.type}`;
        
        item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="glass-panel timeline-card">
                <div class="timeline-header">
                    <span style="font-weight:700; text-transform:uppercase; color: ${notif.type === 'success' ? 'var(--accent-green)' : (notif.type === 'danger' ? 'var(--accent-red)' : (notif.type === 'warn' ? 'var(--accent-yellow)' : 'var(--accent-cyan)'))};">${notif.type} notification</span>
                    <span>${notif.time}</span>
                </div>
                <h4 class="timeline-title">${notif.title}</h4>
                <p class="timeline-desc">${notif.desc}</p>
            </div>
        `;
        container.appendChild(item);
    });
}

function clearNotifications() {
    systemNotifications = [];
    renderNotifications();
}

// =========================================================================
// SETTINGS
// =========================================================================
function saveSystemSettings() {
    const lang = document.getElementById('setting-language-select').value;
    
    // Simulate multi-language switch
    if (lang === 'hi') {
        document.getElementById('current-tab-title').textContent = "सिस्टम विन्यास (Settings)";
        alert("Portal configurations saved. (Hindi language localized interface simulated).");
    } else {
        document.getElementById('current-tab-title').textContent = "System Configurations";
        alert("System configurations and threshold limits saved successfully.");
    }
}

// =========================================================================
// FLOATING AI CHATBOT SYSTEM
// =========================================================================
function toggleChatbot() {
    const windowEl = document.getElementById('chatbot-window');
    windowEl.classList.toggle('open');
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        submitChatMessage();
    }
}

function submitChatMessage() {
    const field = document.getElementById('chatbot-input-field');
    const msg = field.value.trim();
    if (!msg) return;
    
    // Append user bubble
    appendChatBubble(msg, 'user');
    field.value = '';
    
    // Automated matching response logic
    setTimeout(() => {
        const reply = generateBotReply(msg);
        appendChatBubble(reply, 'bot');
    }, 600);
}

function appendChatBubble(text, sender) {
    const body = document.getElementById('chatbot-body');
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text;
    
    body.appendChild(bubble);
    body.scrollTop = body.scrollHeight;
}

function generateBotReply(input) {
    const query = input.toLowerCase();
    
    if (query.includes('budget') || query.includes('money') || query.includes('funding')) {
        return "Under the **CMPDI R&D Policy**, equipment allocation is capped at **40% of total budget**, and administrative/institution overheads must not exceed **15%**. Variance flags are color-coded in the Financial Validation panel.";
    }
    
    if (query.includes('similarity') || query.includes('plagiarism') || query.includes('novelty')) {
        return "IntelliProposal scans cross-institutional archives, CSIR files, and Google patents. Similarity indexes above **40%** trigger duplicate warnings and require PIs to modify their methodology.";
    }
    
    if (query.includes('approve') || query.includes('sign') || query.includes('decision')) {
        return "To approve a proposal: open the **Expert Review** panel from the sidebar, verify the AI metrics, sign in the cryptographic digital canvas box at the bottom-right, and submit consensus.";
    }
    
    if (query.includes('accuracy') || query.includes('accuracy rate')) {
        return "Our parsing OCR achieves **98.4% character extraction accuracy** on scanning tabular R&D budgets. Let me know if you want to test-upload a mock proposal pdf.";
    }
    
    if (query.includes('status') || query.includes('how many')) {
        const pending = proposals.filter(p => p.status === 'pending').length;
        const approved = proposals.filter(p => p.status === 'approved').length;
        return `There are currently **${pending} pending proposals** awaiting expert committee audit, and **${approved} proposals approved** this cycle.`;
    }
    
    if (query.includes('sih') || query.includes('coal') || query.includes('cmpdi')) {
        return "This platform is custom-engineered for **Smart India Hackathon ID 25180**, resolving MoC and CMPDI NaCCER challenges by accelerating scientific research reviews.";
    }
    
    return "I parsed your query, but could you clarify? You can ask me about **budget thresholds**, **similarity limits**, **how to sign a verdict**, or **current database counts**.";
}

// Ensure first page renders table correctly on initial window loads
window.onload = () => {
    // Initialize icons
    lucide.createIcons();
    
    // Render dashboard table contents
    renderDashboardTable();
};
