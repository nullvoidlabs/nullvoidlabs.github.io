---
# the default layout is 'page'
icon: fas fa-info-circle
order: 4
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">

<style>
.nvl-about {
  font-family: 'IBM Plex Sans', sans-serif;
  max-width: 720px;
  padding: 1.5rem 0 2rem;
}

.nvl-prompt-line {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  color: var(--text-muted-color);
  margin-bottom: 0.25rem;
  letter-spacing: 0.02em;
}

.nvl-headline {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 26px;
  font-weight: 500;
  margin: 0 0 0.25rem;
  line-height: 1.3;
}

.nvl-sub {
  font-size: 15px;
  color: var(--text-muted-color);
  margin: 0 0 2rem;
  line-height: 1.6;
}

.nvl-divider {
  border: none;
  border-top: 1px solid var(--border-color);
  margin: 1.5rem 0;
}

.nvl-section-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--text-muted-color);
  text-transform: uppercase;
  margin: 0 0 0.75rem;
}

.nvl-bio {
  font-size: 15px;
  line-height: 1.8;
  margin: 0 0 1rem;
}

.nvl-stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  margin-bottom: 1.5rem;
}

.nvl-stat {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.85rem 1rem;
}

.nvl-stat-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: var(--text-muted-color);
  margin-bottom: 4px;
  letter-spacing: 0.04em;
}

.nvl-stat-val {
  font-size: 14px;
  font-weight: 500;
}

.nvl-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1.5rem;
}

.nvl-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  padding: 4px 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  color: var(--text-muted-color);
}

.nvl-path {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.nvl-path-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 0.65rem 0;
  border-bottom: 1px solid var(--border-color);
}

.nvl-path-item:last-child {
  border-bottom: none;
}

.nvl-path-status {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 3px;
  min-width: 52px;
  text-align: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.status-done  { background: #d1fae5; color: #065f46; }
.status-active { background: #dbeafe; color: #1e40af; }
.status-next  { background: #fef3c7; color: #92400e; }

[data-mode="dark"] .status-done   { background: #064e3b; color: #6ee7b7; }
[data-mode="dark"] .status-active { background: #1e3a5f; color: #93c5fd; }
[data-mode="dark"] .status-next   { background: #451a03; color: #fcd34d; }

.nvl-path-text {
  font-size: 14px;
  line-height: 1.5;
}

.nvl-path-text small {
  display: block;
  font-size: 12px;
  color: var(--text-muted-color);
  margin-top: 2px;
}

.nvl-link-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1.25rem;
}

.nvl-link-btn {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  padding: 6px 14px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-muted-color);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.15s, border-color 0.15s;
}

.nvl-link-btn:hover {
  color: var(--text-color);
  border-color: var(--text-muted-color);
  text-decoration: none;
}
</style>

<div class="nvl-about">

  <p class="nvl-prompt-line">nullvoidlabs.io/about</p>
  <h1 class="nvl-headline">Luis &middot; nullvoid</h1>
  <p class="nvl-sub">Offensive security researcher. Red team practitioner. Hospitality by day, shellcode by night.</p>

  <hr class="nvl-divider">

  <p class="nvl-section-label">// whoami</p>
  <p class="nvl-bio">I'm an aspiring penetration tester building toward ICS/OT red team operations. I came up through two years of self directed study — homelab, CTFs, and real world research, all while working full time in hospitality. I hold the eJPT and Security+, and I'm targeting OSCP in August 2026.</p>
  <p class="nvl-bio">NullVoidLabs is my research identity: where I document malware analyses, publish CTF writeups, and refine the craft of offensive security one box at a time.</p>

  <hr class="nvl-divider">

  <p class="nvl-section-label">// stats</p>
  <div class="nvl-stat-row">
    <div class="nvl-stat">
      <div class="nvl-stat-label">NCL Spring 2026</div>
      <div class="nvl-stat-val">137th / 466</div>
    </div>
    <div class="nvl-stat">
      <div class="nvl-stat-label">OSINT percentile</div>
      <div class="nvl-stat-val">91st &middot; perfect score</div>
    </div>
    <div class="nvl-stat">
      <div class="nvl-stat-label">Focus area</div>
      <div class="nvl-stat-val">ICS/OT red team</div>
    </div>
    <div class="nvl-stat">
      <div class="nvl-stat-label">Base of ops</div>
      <div class="nvl-stat-val">San Francisco, CA</div>
    </div>
  </div>

  <hr class="nvl-divider">

  <p class="nvl-section-label">// toolkit</p>
  <div class="nvl-tags">
    <span class="nvl-tag">Kali / Fedora</span>
    <span class="nvl-tag">Metasploit</span>
    <span class="nvl-tag">Burp Suite</span>
    <span class="nvl-tag">Wireshark</span>
    <span class="nvl-tag">Nmap / Rustscan</span>
    <span class="nvl-tag">Ghidra</span>
    <span class="nvl-tag">Hashcat</span>
    <span class="nvl-tag">Python</span>
    <span class="nvl-tag">Bash</span>
    <span class="nvl-tag">Proxmox / Ludus</span>
    <span class="nvl-tag">Active Directory</span>
  </div>

  <hr class="nvl-divider">

  <p class="nvl-section-label">// roadmap</p>
  <div class="nvl-path">
    <div class="nvl-path-item">
      <span class="nvl-path-status status-done">done</span>
      <div class="nvl-path-text">eJPT + CompTIA Security+
        <small>Foundation certs. Proved the baseline.</small>
      </div>
    </div>
    <div class="nvl-path-item">
      <span class="nvl-path-status status-active">active</span>
      <div class="nvl-path-text">OSCP
        <small>HTB labs, Black Hat Bash/Python, exam target Aug 2026</small>
      </div>
    </div>
    <div class="nvl-path-item">
      <span class="nvl-path-status status-next">next</span>
      <div class="nvl-path-text">CRTP &middot; C2 operations &middot; AD attack chains
        <small>Post-OSCP offensive depth</small>
      </div>
    </div>
    <div class="nvl-path-item">
      <span class="nvl-path-status status-next">long</span>
      <div class="nvl-path-text">GICSP &middot; ICS/OT specialization
        <small>Force multiplier on sharp red team fundamentals</small>
      </div>
    </div>
  </div>

  <hr class="nvl-divider">

  <p class="nvl-section-label">// reach</p>
  <div class="nvl-link-row">
    <a class="nvl-link-btn" href="https://github.com/nullvoidlabs" target="_blank">
      <i class="ti ti-brand-github" aria-hidden="true"></i> github
    </a>
    <a class="nvl-link-btn" href="https://linkedin.com/in/lrjsec" target="_blank">
      <i class="ti ti-brand-linkedin" aria-hidden="true"></i> linkedin
    </a>
    <a class="nvl-link-btn" href="mailto:luisrjs@nullvoidlabs.io">
      <i class="ti ti-mail" aria-hidden="true"></i> email
    </a>
    <a class="nvl-link-btn" href="https://nullvoidlabs.io">
      <i class="ti ti-terminal-2" aria-hidden="true"></i> labs
    </a>
  </div>

</div>
