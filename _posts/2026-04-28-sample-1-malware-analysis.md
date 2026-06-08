---
title: "Malware Analysis Report: Sample 1 (HTTP-Based Reverse Shell)"
date: 2026-04-28
author: Luis Rojas
categories: [Reports]
tags: [malware-analysis, reverse-engineering, static-analysis, dynamic-analysis, windows, c2, pestudio, fakenet, procmon]
---

# Malware Analysis Report: Sample 1 (HTTP-Based Reverse Shell)

**Cyber Security Incident Response Team:** Luis G. Rojas Ortiz  
**Date:** 4/28/2026

*The following analysis was conducted as part of a structured malware analysis exercise. Sample artifacts were provided as part of a simulated incident response scenario.*

---

## Executive Summary

The executable is a full HTTP client implementation that connects to a C2 server and provides the attacker with an interactive shell on the victim machine. After execution, it collects system information, modifies system files, spawns cmd.exe, and redirects the command shell's input and output through the C2 channel. Both Lab03-01.exe and Sample 1.exe share the same C2 domain `canonicalizer.ucsuri.tcs`, strongly suggesting they belong to the same malware family or campaign infrastructure.

---

## Case Details

| Field | Value |
|:------|:------|
| **Date** | 4/28/2026 |
| **Analyst** | Luis G. Rojas Ortiz |

---

## File Information

| Field | Value |
|:------|:------|
| **File name** | Sample 1.exe |
| **File size** | 8704 bytes |
| **File type** | Application/Executable (.exe) |
| **MD5** | 02658BC9801F98DFDF167ACCF57F6A36 |
| **SHA1** | DD3570F117F2996792E4D3BF20A6A0ABA6409BCC |
| **SHA256** | 8A35842D3F5963F715DEF0BBD0A53D7FFAAE2D2CA79F56A5AC8BEDE64749D279 |
| **Packer / Compiler** | Not Packed / Microsoft Visual C++ v6.0 |
| **Compile time** | Tue Sep 16 10:40:04 2008 |

---

## Case Specific Requirements

Malware analysis was requested following detection of suspicious process behavior on a Windows endpoint during routine monitoring. The sample was recovered from a quarantined endpoint flagged by antivirus. The sample exhibits a full HTTP-based remote access capability including file upload, file download, and remote command execution via cmd.exe. The binary masquerades as a legitimate Windows system process (svchost.exe) and implements HTTP CONNECT tunneling to evade network controls. Notably, it shares C2 infrastructure with a related sample (Lab03-01.exe), suggesting a common threat actor or campaign.

---

## Analysis

The malware provides remote command execution by establishing an HTTP connection to a command-and-control (C2) server, spawning cmd.exe, and relaying shell input and output through the communication channel.

**Associated indicators of compromise (IOCs) include:**

- **Network:** `CONNECT HTTP/1.0`, `69.25.50.10`, `canonicalizer.ucsuri.tcs`
- **Process:** `wuauclt.exe` and a masquerading `svchost.exe`
- **File:** Sample 1.exe
- **Registry:** Modified Internet Settings ZoneMap registry keys

**Persistence:** No persistence mechanisms were identified. Analysis found no evidence of run keys, services, scheduled tasks, or other common persistence techniques, indicating the malware relies on initial execution to operate.

**CVE / Vulnerability:** The sample does not exploit a known software vulnerability or CVE. Execution depends on user initiation rather than vulnerability exploitation, and no security patch is applicable. Detection and prevention depend on the effectiveness of endpoint security controls and behavioral monitoring.

**Static Analysis:** Static analysis via PEStudio and Detect It Easy identified the binary as a 32-bit executable compiled with Microsoft Visual C++ v6.0, with a compile timestamp of September 2008. The binary is not packed and imports 52 symbols across five libraries. Of note, the full `wininet.dll` import chain — `InternetOpenA`, `InternetConnectA`, `HttpOpenRequestA`, `HttpSendRequestA`, `InternetReadFile`, and `InternetWriteFile` — indicates a complete HTTP client implementation rather than simple download capability. Named pipe functions including `CreatePipe`, `PeekNamedPipe`, `ReadFile`, and `WriteFile`, combined with `CreateProcessA`, are consistent with reverse shell inter-process communication. Blacklisted strings included the hardcoded C2 IP `69.25.50.10`, the protocol marker `CONNECT HTTP/1.0`, and process names `cmd /c`, `wuauclt.exe`, and `svchost.exe`. The binary's internal filename was identified as `svchost.exe`, indicating deliberate masquerading as a legitimate Windows process.

---

## Remediation

1. Terminate `Sample 1.exe` and any associated `cmd.exe` child processes immediately.
2. Isolate the affected host and block C2 infrastructure (`69.25.50.10`, `canonicalizer.ucsuri.tcs`) at the perimeter. Note: this domain is shared across multiple related samples — a single block mitigates the broader campaign.
3. Remove the binary from disk and hunt for additional copies using the provided file hashes.
4. Restore modified Internet Settings ZoneMap registry keys to their default values.
5. Review network logs for outbound HTTP CONNECT traffic and non-browser connections to port 443 to identify additional compromised hosts.

---

## Additional Information / Examiner Notes

The binary masquerades as a Microsoft executable with an internal name of `svchost.exe`. It uses dynamic linking and implements HTTP proxy tunneling via the CONNECT method. Registry modifications target Internet Settings ZoneMap keys to bypass security zone enforcement.

### Network Indicators

- `69.25.50.10` (hardcoded C2 IP, port 443)
- `canonicalizer.ucsuri.tcs` (C2 domain)

### File Indicators

| Hash | Value |
|:-----|:------|
| **MD5** | 02658BC9801F98DFDF167ACCF57F6A36 |
| **SHA1** | DD3570F117F2996792E4D3BF20A6A0ABA6409BCC |
| **SHA256** | 8A35842D3F5963F715DEF0BBD0A53D7FFAAE2D2CA79F56A5AC8BEDE64749D279 |

### Process Indicators

- `cmd.exe` spawned by Sample 1.exe (reverse shell)
- `wuauclt.exe` (masquerade)
- `svchost.exe` (masquerade)

### Registry Indicators

- `HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings\ZoneMap\ProxyBypass`
- `HKCU\...\ZoneMap\IntranetName`
- `HKCU\...\ZoneMap\UNCAsIntranet`
- `HKCU\...\ZoneMap\AutoDetect`

### Static Analysis Indicators

- Original filename: `svchost.exe` (disguised)
- No DEP/ASLR — allows shellcode injection and predictable memory layout
- 30 blacklisted strings
- Fake Microsoft executable

---

## Attachments

![Figure 1: FakeNet-NG captured DNS resolution of the C2 domain canonicalizer.ucsuri.tcs and a reverse PTR lookup confirming the hardcoded IP 69.25.50.10.](/assets/img/sample1-fakenet.png)

*Figure 1: FakeNet-NG captured DNS resolution of the C2 domain `canonicalizer.ucsuri.tcs` and a reverse PTR lookup confirming the hardcoded IP `69.25.50.10`.*

![Figure 2: Hex view of Sample 1.exe showing plaintext strings including the hardcoded C2 IP, protocol markers, and process names visible without unpacking.](/assets/img/sample1-hexview.png)

*Figure 2: Hex view of Sample 1.exe showing plaintext strings including the hardcoded C2 IP, protocol markers, and process names visible without unpacking.*

![Figure 3: Procmon captured RegSetValue operations by Sample 1.exe modifying Internet Settings ZoneMap keys to bypass security zone enforcement.](/assets/img/sample1-procmon.png)

*Figure 3: Procmon captured RegSetValue operations by Sample 1.exe modifying Internet Settings ZoneMap keys to bypass security zone enforcement.*
