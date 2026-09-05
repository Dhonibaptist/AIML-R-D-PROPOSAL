---
id: RB-04
title: Repeated Authentication Failure Response
applies_to: [auth_failure]
---

# Repeated Authentication Failure Response

## When to use this runbook
Use this when the same device or service reports multiple failed login
attempts in a short window, especially when they share a single source IP
or target a small set of privileged accounts (admin, root, service accounts).

## Step 1 - Confirm the pattern
Multiple auth_failure alerts from the same source IP within minutes, against
one or more accounts, should be grouped into a single incident and treated as
a probable brute-force or credential-stuffing attempt - not as separate
unrelated login problems.

## Step 2 - Contain
Temporarily block or rate-limit the source IP at the firewall/edge. If a
privileged or service account is being targeted, pre-emptively verify it has
not already been compromised (check for any successful login from the same
source IP immediately before or after the failures).

## Step 3 - Rotate credentials if needed
If a lockout threshold was reached or a successful login from the same source
is found, force a credential rotation for the targeted account(s).

## Step 4 - Notify security
Escalate to the security team with the source IP, targeted accounts, and
timeline if the pattern continues after containment.
