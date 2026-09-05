"""
Generates data/alerts.json - a synthetic, deterministic stream of network alerts.
Run once: python gen_alerts.py  (output is committed, no need to re-run at judge time)
"""
import json
from datetime import datetime, timedelta

BASE = datetime(2026, 9, 5, 9, 55, 0)
alerts = []
_id = 1


def add(minutes, seconds, device, atype, severity, message, source_ip=None):
    global _id
    ts = BASE + timedelta(minutes=minutes, seconds=seconds)
    alerts.append({
        "id": f"a{_id:03d}",
        "timestamp": ts.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "device": device,
        "type": atype,
        "severity": severity,
        "message": message,
        "source_ip": source_ip
    })
    _id += 1


# ---------------------------------------------------------------
# INCIDENT 1: core-router-1 fails -> cascading unreachable/latency
# across everything downstream of it. ~9 alerts, one root cause.
# ---------------------------------------------------------------
add(0, 0, "core-router-1", "link_down", "critical",
    "Interface Gi0/0/0 on core-router-1 changed state to DOWN")
add(0, 8, "dist-switch-1", "device_unreachable", "critical",
    "dist-switch-1 stopped responding to SNMP polling")
add(0, 11, "dist-switch-2", "device_unreachable", "critical",
    "dist-switch-2 stopped responding to SNMP polling")
add(0, 20, "access-switch-1", "device_unreachable", "warning",
    "access-switch-1 unreachable from monitoring host")
add(0, 24, "access-switch-2", "device_unreachable", "warning",
    "access-switch-2 unreachable from monitoring host")
add(0, 33, "access-switch-3", "high_latency", "warning",
    "access-switch-3 round-trip time 1800ms, threshold 200ms")
add(0, 40, "access-switch-1", "high_latency", "warning",
    "access-switch-1 round-trip time 2200ms, threshold 200ms")
add(1, 5, "core-router-1", "interface_flapping", "critical",
    "Interface Gi0/0/0 on core-router-1 flapped 4 times in 60s")
add(1, 30, "dist-switch-1", "high_latency", "warning",
    "dist-switch-1 round-trip time 1500ms, threshold 200ms")

# ---------------------------------------------------------------
# INCIDENT 2: brute-force style repeated auth failures against
# auth-server-1 from a single source IP. ~6 alerts.
# ---------------------------------------------------------------
add(10, 0, "auth-server-1", "auth_failure", "warning",
    "Failed login for user 'admin' from 198.51.100.9", source_ip="198.51.100.9")
add(10, 12, "auth-server-1", "auth_failure", "warning",
    "Failed login for user 'admin' from 198.51.100.9", source_ip="198.51.100.9")
add(10, 24, "auth-server-1", "auth_failure", "warning",
    "Failed login for user 'root' from 198.51.100.9", source_ip="198.51.100.9")
add(10, 36, "auth-server-1", "auth_failure", "critical",
    "Failed login for user 'svc-backup' from 198.51.100.9", source_ip="198.51.100.9")
add(10, 48, "auth-server-1", "auth_failure", "critical",
    "Failed login for user 'admin' from 198.51.100.9", source_ip="198.51.100.9")
add(11, 0, "auth-server-1", "auth_failure", "critical",
    "Account lockout threshold approaching for 'admin', source 198.51.100.9", source_ip="198.51.100.9")

# ---------------------------------------------------------------
# INCIDENT 3: interface flapping on core-router-2 / wan-link-2.
# Deliberately NOT covered by any runbook in the library, to
# demonstrate the escalation path. ~4 alerts.
# ---------------------------------------------------------------
add(20, 0, "core-router-2", "interface_flapping", "warning",
    "Interface Te0/1/0 on core-router-2 flapped 3 times in 90s")
add(20, 40, "wan-link-2", "interface_flapping", "warning",
    "wan-link-2 carrier signal flapped 2 times in 90s")
add(21, 15, "core-router-2", "interface_flapping", "critical",
    "Interface Te0/1/0 on core-router-2 flapped 9 times in 90s")
add(21, 50, "wan-link-2", "high_latency", "warning",
    "wan-link-2 round-trip time 640ms, threshold 200ms")

# ---------------------------------------------------------------
# INCIDENT 4: edge-firewall-1 saturation -> vpn-gateway-1 impact.
# ~3 alerts, topologically related (vpn-gateway-1 upstream = edge-firewall-1)
# ---------------------------------------------------------------
add(30, 0, "edge-firewall-1", "high_latency", "critical",
    "edge-firewall-1 CPU 98%, packet processing delayed 900ms")
add(30, 25, "vpn-gateway-1", "device_unreachable", "critical",
    "vpn-gateway-1 unreachable from monitoring host")
add(30, 50, "vpn-gateway-1", "high_latency", "warning",
    "vpn-gateway-1 round-trip time 1100ms, threshold 200ms")

# ---------------------------------------------------------------
# NOISE: isolated, low-criticality, one-off alerts with no
# correlating device or time-window partner. Left ungrouped.
# ---------------------------------------------------------------
add(5, 0, "printer-42", "device_unreachable", "info",
    "printer-42 did not respond to a single ping sweep")
add(45, 0, "iot-sensor-7", "high_latency", "info",
    "iot-sensor-7 round-trip time 250ms, threshold 200ms")
add(60, 0, "iot-sensor-12", "device_unreachable", "info",
    "iot-sensor-12 missed one scheduled check-in")
add(75, 0, "printer-42", "high_latency", "info",
    "printer-42 round-trip time 300ms, threshold 200ms")

with open("alerts.json", "w") as f:
    json.dump(alerts, f, indent=2)

print(f"wrote {len(alerts)} alerts")
