---
id: RB-01
title: Link / Interface Down Troubleshooting
applies_to: [link_down]
---

# Link / Interface Down Troubleshooting

## When to use this runbook
Use this runbook when a monitored interface or physical link reports a DOWN state,
especially on core or distribution routers/switches, and the outage is producing
downstream "device unreachable" or "high latency" alerts on dependent devices.

## Step 1 - Confirm scope
Check whether the DOWN interface is on a core/distribution device. If so, expect
a burst of secondary alerts (unreachable, high latency) on every device downstream
of it within 1-3 minutes. Treat all of these as one incident, not separate problems.

## Step 2 - Check physical layer
Verify SFP/transceiver seating, cable integrity, and port error counters
(CRC errors, input/output drops) on both ends of the link.

## Step 3 - Check for flapping
If the same interface reports repeated up/down transitions within a short window,
this is link flapping, not a clean failure - suspect a marginal physical connection
or a duplex mismatch rather than a hard failure.

## Step 4 - Failover
If a redundant path or HSRP/VRRP peer exists, confirm traffic has failed over.
If not, escalate to a physical dispatch immediately given the blast radius.

## Step 5 - Restore and verify
Once the interface is back up, confirm downstream devices recover automatically
within 2 minutes; if they do not, treat the downstream device as a separate,
still-open incident.
