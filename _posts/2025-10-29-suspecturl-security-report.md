---
title: "Suspecturl Review: Security/Privacy Report"
date: 2025-10-29
author: lrjsec
categories: [Security Assessment]
tags: [webrtc, privacy, security-assessment, ip-exposure, cors, penetration-testing]
---

> *Note: This assessment was conducted on suspecturl.com. The platform has since rebranded to [ghostline.digital](https://ghostline.digital). Some screenshots reflect the original domain.*

**Tester:** Luis Rojas Ortiz  
**Scope:** Non invasive application/security testing focused on anonymity guarantees (media + metadata).  
**Browsers/Devices:** Chrome/Brave, Firefox, mobile device (cellular + Wi-Fi).  
**Status:** Final items partially blocked by CORS error.

---

## Executive Summary

The platform's media layer anonymity (pixelated video + voice masking) appears to behave as advertised during normal usage. However, the platform's network layer anonymity is not preserved as the WebRTC connection setup exposes peer network identifiers, including public IP addresses and IPv6 addresses under common conditions.

Additionally, after a recent domain change over from .com to .digital, room creation/join is currently blocked due to socket.io CORS failures ("missing Access-Control-Allow-Origin"), which prevents completion of a couple remaining checks.

---

## Key Findings

### 1) Public IP Exposure via WebRTC (Peer Metadata Leak)

**What I observed**

- On the same LAN, WebRTC selected direct host candidates (private IPs), confirming direct P2P connectivity.
- Across networks (desktop public IP ↔ phone on cellular), WebRTC selected a public IPv4 candidate pair, confirming that peers can learn each other's public IP addresses.
- ICE messaging also revealed IPv6 candidates, increasing correlation risk in some environments.

**Evidence**

- iceServers includes third party STUN + third party TURN.
- Observed direct candidate pairs:
  - LAN: 192.168.1.10 ↔ 192.168.1.20
  - Cross-network: 203.0.113.10 ↔ 198.51.100.20 (public IPs)
- ICE signaling payload shows srflx/host candidates and IPv6 candidates.

![Figure 1:](/assets/img/ice-candidates.png)
![Figure 1:](/assets/img/leak.png)

**Impact**

- Public IP exposure enables coarse geolocation, ISP/ASN attribution, and potential session correlation.
- This contradicts a "strong anonymity" interpretation unless explicitly disclosed or mitigated.

**Result**

- **No warning about IP exposure**
- Users are effectively left unaware of network metadata exposure.

**Mitigation Options**

To better align anonymity guarantees with high risk threat models, consider one of the following approaches:

**Option A: High-Anonymity Mode (Relay Only)**

Provide an explicit "High Anonymity" mode that forces TURN relay usage (iceTransportPolicy: "relay"). This allows users with stronger privacy requirements to prevent peer IP exposure while preserving lower latency direct connections for general use cases.

**Option B: Relay Only by Default**

If the platform's core promise is strong anonymity for all users, enforce TURN relay only connectivity by default. This ensures peer IP addresses are never disclosed, at the cost of increased latency, and operational bandwidth requirements.

**Additional Consideration**

When relay only connectivity is enabled (whether by default or via user selection), ensure signaling does not expose server reflexive candidates unnecessarily, so that metadata protection is consistent with the selected anonymity posture.

---

### 2) Third Party Infrastructure Dependencies

**What I observed**

- STUN: stun.l.google.com:19302 (and variants), plus other public STUN services.
- TURN: a.relay.metered.ca on multiple ports/transports.

**Impact**

- Even if media stays P2P, NAT traversal relies on third party services unless replaced.

---

## Design Robustness Observations

### 3) Room Creation & Identifier Enforcement: PASS (with caveats)

**What I observed**

- When creating rooms via the UI, the application auto generates an 8 character alphanumeric room ID.
- The backend also accepts arbitrary identifiers supplied directly via the URL path, without enforcing server side constraints on length or character set.

**Evidence**

- UI generated IDs consistently follow an 8 character format.
- Direct navigation to `/host/<arbitrary-string>` or `/guest/<arbitrary-string>` creates a room regardless of identifier structure.

![Figure 1:](/assets/img/webrtcerror.png)

**Impact**

- No unauthorized access to existing rooms, room enumeration, or user correlation was observed.
- No direct identity exposure resulted from this behavior.
- However, the lack of server side enforcement introduces a mismatch between client assumptions and backend behavior.
- In privacy sensitive systems, relying solely on client side generation can introduce future risk if identifiers are later treated as security boundaries or logged inconsistently.

**Optional recommendation**

- Enforce identifier format/length server side to align with UI assumptions and reduce future security debt.

---

## Functional / Reliability / Stability Observations

### 3) ICE Candidate Add Errors on Rejoin / Refresh: Observed, nonfatal

**Error**

- `[WebRTC] Error adding ICE candidate: InvalidStateError ... signaling State is 'closed'`

**Behavior**

- Triggered when refreshing the guest flow and rejoining (lobby → join).
- Media did not drop despite the errors.

**Likely interpretation**

- Candidate messages arriving after peer connection tear down. app not guarding addIceCandidate against closed state.
- Not necessarily security impacting, but worth fixing for stability and noise reduction in logs.

---

### 4) Domain Cutover Regression: socket.io CORS Blocker: BLOCKED / Critical Regression

**What changed**

- Top-level domain moved from .com to .digital.

**Observed**

- Room creation/join blocked by socket.io CORS errors.
- Browser reports missing Access-Control-Allow-Origin header for the new origin.

**Impact**

- Signaling cannot establish → WebRTC negotiation blocked → further testing blocked.
- Remaining checks marked blocked until fixed.

---

## Product/UX Security Adjacent Notes (User Safety)

### 5) Client Controls Reduce Accidental "Unmask": PASS

- After anonymity settings are selected in the lobby, toggles (unmute/unmask) are grayed out.
- Permission prompts did not appear to mislead users into exposing identity.

### 6) Multi Device Join Behavior: PASS (No unintended third party access)

- Attempting to join the same room URL from multiple devices did not allow a second guest.
- No evidence that unexpected third parties can connect.

---

## Browser Compatibility Notes

- Firefox guest ↔ Chrome host: behaves the same (no silent degradation observed): **PASS**
- Unsupported browser anonymization degradation: not observed: **PASS**

---

## Recording File Metadata

**Inspect results**

- Muxing/Writing app: Chrome
- Timestamps present (file system metadata)
- Codecs: Opus audio / VP9 video
- No user agent strings found in the file metadata examined

**Interpretation**

- Recording contains normal technical metadata (browser/tool chain + timestamps).
- If threat model is "high risk anonymity," consider whether any metadata should be minimized or disclosed.

---

## Blocked Items (Due to Current CORS / Signaling Failure)

- Confirm no analytics scripts observing session data: **BLOCKED**
- Confirm no client side logging of room IDs: **BLOCKED**
- Confirm no crash reporting capturing sensitive metadata: **BLOCKED**

---

## Overall Assessment

- Media anonymity (pixelation + voice masking): appears consistent during normal use.
- Network anonymity (IP / metadata): not preserved by default, and not clearly disclosed.
- Current build stability: impacted by a domain cutover regression (CORS).
