---
layout: page
title: About
lede: Luis Rojas. Working toward OT security engineering in San Francisco.
order: 4
---

<div class="about">
<div class="prose" markdown="1">

## What I'm working toward

OT security engineering: protecting the industrial systems that run water, power, and manufacturing. I bring an attacker's mindset, which I built through the offensive write-ups on this site, but the goal is defensive engineering. Start from the worst physical outcome, ask whether an attacker could cause it, then design it out, including with controls that aren't digital at all.

## How I'm getting there

Through infrastructure first. Segmentation is where OT defense lives, so I'm building Linux and networking depth (RHCSA, then CCNA) and looking for an infrastructure or network role to put it to work. In parallel I'm learning the physical side: PLC basics with OpenPLC, how control loops behave and fail, and a testbench I can actually break.

I hold Security+ and eJPT. During the day I intern on a security team, where I'm building a guard server that sits between an AI agent and a GRC platform. It enforces read-only tools, requires human approval for deletes, and keeps a tamper-evident audit log.

**Open to:** junior infrastructure, network, or sysadmin roles in the Bay Area or remote.

## The testbench

An ESP32 acts as the PLC. It speaks Modbus TCP and drives a pump and level sensor on a small water tank, with a web HMI on top. Next comes a safety interlock. Then I attack it on the bench, engineer the attack out, and write up both halves.

## How I write things up

One rule: nothing new until the last thing is published. Each write-up records the whole chain, including the dead ends, the reasoning behind each pivot, and the exact commands, so someone can reproduce it.

All testing here happens on authorized platforms (Hack The Box, TryHackMe), in my own lab, or with written permission from the owner. The lab is a VLAN-segmented Proxmox cluster running Active Directory and offensive labs.

</div>

<aside aria-label="Details">
<section class="faceplate" aria-labelledby="road-title">
<h2 id="road-title">Roadmap</h2>
<div class="faceplate-body">
<ol class="roadmap">
  <li data-state="done"><div><strong>eJPT + Security+</strong><span>Foundations. <em>Done</em></span></div></li>
  <li data-state="active"><div><strong>RHCSA</strong><span>Exam target Dec 2026 – Jan 2027. <em>In progress</em></span></div></li>
  <li><div><strong>CCNA</strong><span>2027. Networking and segmentation.</span></div></li>
  <li><div><strong>IEC 62443 and CCE</strong><span>2028. Industrial security standards and consequence-driven engineering.</span></div></li>
  <li><div><strong>GICSP</strong><span>ICS security engineering.</span></div></li>
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
  <li>Linux (Fedora, RHEL)</li><li>Proxmox</li><li>VLAN segmentation</li><li>Modbus TCP</li><li>ESP32</li><li>Wireshark</li><li>Nmap</li><li>Python</li><li>Bash</li><li>Active Directory</li><li>Burp Suite</li><li>Impacket</li>
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
