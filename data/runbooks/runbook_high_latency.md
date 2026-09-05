---
id: RB-03
title: High Latency Investigation
applies_to: [high_latency]
---

# High Latency Investigation

## When to use this runbook
Use this when round-trip time crosses the alerting threshold on one or more
devices, without an accompanying link_down or device_unreachable alert on the
same device.

## Step 1 - Correlate with upstream capacity
Check CPU and interface utilization on the nearest upstream chokepoint
(firewall, WAN link, core router). Sustained CPU above 90% or interface
utilization above 85% is a common root cause and will typically produce
correlated high_latency alerts on every device behind that chokepoint.

## Step 2 - Rule out a cascading failure
If the high_latency alerts appear alongside device_unreachable alerts on
related devices within the same short window, treat the whole set as one
incident driven by the upstream chokepoint, not independent latency issues.

## Step 3 - Check for asymmetric routing or a saturated link
Confirm whether traffic is being routed over a lower-capacity backup path
(e.g. after a recent failover) - this alone can produce sustained high latency
without any hard failure.

## Step 4 - Mitigate
Apply QoS/traffic shaping if the chokepoint is confirmed saturated, or fail
back to the primary path once it is confirmed healthy.
