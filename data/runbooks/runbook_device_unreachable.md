---
id: RB-02
title: Device Unreachable Response
applies_to: [device_unreachable]
---

# Device Unreachable Response

## When to use this runbook
Use this when a device stops responding to monitoring (ping/SNMP) but there is
no directly-reported link_down alert on its own interface. This usually means
the problem is upstream, on the device's power, or on the device itself.

## Step 1 - Check upstream path first
Before touching the unreachable device, check whether its upstream link or
parent device is also alerting. If the parent device reported link_down or is
also unreachable, this is very likely a single upstream failure, not an
independent outage on this device - group it into that incident.

## Step 2 - Check power and management plane
If no upstream issue is found, check power status and out-of-band management
access. A device can be unreachable on the data plane while still powered and
partially alive.

## Step 3 - Attempt remote recovery
Attempt an out-of-band console session or a remote power-cycle via managed PDU
if available.

## Step 4 - Dispatch if unresolved
If remote recovery fails within 10 minutes, dispatch a technician with a
priority based on the device's criticality tier.
