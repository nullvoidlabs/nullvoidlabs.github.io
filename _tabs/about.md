---
layout: page
title: About
lede: Luis Rojas. Junior penetration tester in San Francisco, working toward ICS/SCADA red teaming.
order: 4
---

<div class="about">
<div class="prose" markdown="1">

## What I do

I'm a junior penetration tester. That's the role I'm going after right now, and this site is the evidence. During the day I intern on a security team, where I run GRC platform assessments, pentest self-hosted tools, and deploy them on AWS. Everything else happens in labs that I document here.

I hold Security+ and eJPT. Next up is RHCSA, then CCNA and OSCP. Long term I want to red team industrial control systems, and solid fundamentals across Linux, networking, and Active Directory are what make that specialization worth anything.

## How I write things up

One rule: no new box until the last one is published. Each write-up records the whole chain, including the dead ends, the reasoning behind each pivot, and the exact commands. Someone following along should be able to reproduce it, not just see that it was done.

All testing here happens on authorized platforms (Hack The Box, TryHackMe), in my own lab, or with written permission from the owner.

## The lab

A VLAN-segmented Proxmox cluster runs my Active Directory and offensive labs. For the ICS side, I'm building a small Modbus water-tank testbench on ESP32 hardware, so I can practise against real field protocols instead of only reading about them.

</div>

<aside aria-label="Details">
<section class="faceplate" aria-labelledby="road-title">
<h2 id="road-title">Roadmap</h2>
<div class="faceplate-body">
<ol class="roadmap">
  <li data-state="done"><div><strong>eJPT + Security+</strong><span>Foundation certs. <em>Done</em></span></div></li>
  <li data-state="active"><div><strong>RHCSA</strong><span>Exam target Dec 2026 – Jan 2027. <em>In progress</em></span></div></li>
  <li><div><strong>CCNA</strong><span>Networking depth.</span></div></li>
  <li><div><strong>OSCP</strong><span>Active Directory attack chains.</span></div></li>
  <li><div><strong>GICSP</strong><span>ICS/OT specialization on top of red team fundamentals.</span></div></li>
</ol>
</div>
</section>

<section class="faceplate" aria-labelledby="stats-title">
<h2 id="stats-title">Competition</h2>
<dl>
  <div><dt>NCL</dt><dd>137th of 466<small>Spring 2026, individual</small></dd></div>
  <div><dt>OSINT</dt><dd>Perfect score<small>91st percentile, NCL Spring 2026</small></dd></div>
</dl>
</section>

<section class="faceplate" aria-labelledby="kit-title">
<h2 id="kit-title">Toolkit</h2>
<div class="faceplate-body">
<ul class="kit">
  <li>Kali</li><li>Fedora</li><li>Burp Suite</li><li>Caido</li><li>Nmap</li><li>RustScan</li><li>NetExec</li><li>Impacket</li><li>Metasploit</li><li>Hashcat</li><li>Wireshark</li><li>Python</li><li>Bash</li><li>Proxmox</li><li>Active Directory</li>
</ul>
</div>
</section>

<section class="faceplate" aria-labelledby="reach-title">
<h2 id="reach-title">Contact</h2>
<ul class="contact-list">
  <li><a href="mailto:{{ site.contact.email }}"><span>Email</span><span>{{ site.contact.email }}</span></a></li>
  <li><a href="{{ site.contact.linkedin }}" rel="me"><span>LinkedIn</span><span>lrjsec</span></a></li>
  <li><a href="{{ site.contact.github }}" rel="me"><span>GitHub</span><span>nullvoidlabs</span></a></li>
  <li><a href="{{ site.contact.x }}" rel="me"><span>X</span><span>@nullvoidlabs</span></a></li>
</ul>
</section>
</aside>
</div>
