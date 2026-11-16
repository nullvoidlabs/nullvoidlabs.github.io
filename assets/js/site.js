// NullVoidLabs: progressive enhancements. The site works without this file.
(function () {
  "use strict";
  var doc = document;
  var root = doc.documentElement;

  // ---- Retire the service worker left behind by the old Chirpy theme ----
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (regs) {
      regs.forEach(function (r) { r.unregister(); });
    }).catch(function () {});
    if (window.caches && caches.keys) {
      caches.keys().then(function (keys) { keys.forEach(function (k) { caches.delete(k); }); }).catch(function () {});
    }
  }

  // ---- Theme toggle ----
  var toggle = doc.querySelector(".theme-toggle");
  if (toggle) {
    toggle.hidden = false;
    var current = function () {
      var set = root.getAttribute("data-theme");
      if (set) return set;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };
    var label = function () {
      var next = current() === "dark" ? "light" : "dark";
      toggle.setAttribute("aria-label", "Switch to " + next + " theme");
      toggle.title = "Switch to " + next + " theme";
    };
    label();
    toggle.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("nvl-theme", next); } catch (e) {}
      label();
    });
  }

  // ---- Front page: filter by category ----
  var rows = doc.querySelectorAll(".log-row");

  var chips = doc.querySelectorAll(".chip[data-filter]");
  var empty = doc.querySelector(".log-empty");
  function applyFilter(key) {
    var shown = 0;
    rows.forEach(function (row) {
      var on = key === "all" || row.getAttribute("data-category") === key;
      row.hidden = !on;
      if (on) shown++;
    });
    chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c.getAttribute("data-filter") === key)); });
    if (empty) empty.hidden = shown !== 0;
  }
  chips.forEach(function (chip) {
    chip.setAttribute("role", "button");
    chip.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // let "open in new tab" through
      e.preventDefault();
      var key = chip.getAttribute("data-filter");
      applyFilter(key);
      try { history.replaceState(null, "", key === "all" ? location.pathname : "#" + key); } catch (err) {}
    });
  });
  if (chips.length && location.hash) {
    var wanted = decodeURIComponent(location.hash.slice(1));
    if (doc.querySelector('.chip[data-filter="' + wanted.replace(/"/g, "") + '"]')) applyFilter(wanted);
  }

  var prose = doc.querySelector(".post .prose, .page-body .prose");
  if (!prose) return;

  // ---- Tables scroll sideways instead of breaking the layout ----
  prose.querySelectorAll("table").forEach(function (t) {
    if (t.parentElement.classList.contains("table-wrap")) return;
    var w = doc.createElement("div");
    w.className = "table-wrap";
    t.parentNode.insertBefore(w, t);
    w.appendChild(t);
  });

  // ---- Code blocks: language label + copy button ----
  prose.querySelectorAll("div.highlighter-rouge").forEach(function (block) {
    var pre = block.querySelector("pre");
    if (!pre) return;
    var lang = "";
    block.classList.forEach(function (c) { if (c.indexOf("language-") === 0) lang = c.slice(9); });
    if (lang === "plaintext" || lang === "text") lang = "";
    var shell = doc.createElement("div");
    shell.className = "codeblock";
    var bar = doc.createElement("div");
    bar.className = "codeblock-bar";
    var name = doc.createElement("span");
    name.textContent = lang || "output";
    bar.appendChild(name);
    if (navigator.clipboard) {
      var btn = doc.createElement("button");
      btn.type = "button";
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      btn.addEventListener("click", function () {
        navigator.clipboard.writeText(pre.innerText.replace(/\n$/, "")).then(function () {
          btn.textContent = "Copied";
          btn.setAttribute("data-state", "done");
          setTimeout(function () { btn.textContent = "Copy"; btn.removeAttribute("data-state"); }, 1600);
        }, function () { btn.textContent = "Copy failed"; });
      });
      bar.appendChild(btn);
    }
    block.parentNode.insertBefore(shell, block);
    shell.appendChild(bar);
    shell.appendChild(block);
  });

  // ---- Heading anchors ----
  var heads = prose.querySelectorAll("h2[id], h3[id]");
  heads.forEach(function (h) {
    h.setAttribute("data-label", h.textContent.replace(/:\s*$/, "").trim());
    var a = doc.createElement("a");
    a.className = "anchor";
    a.href = "#" + h.id;
    a.setAttribute("aria-label", "Link to this section");
    a.textContent = "#";
    h.appendChild(a);
  });

  // ---- Table of contents ----
  var toc = doc.querySelector(".toc");
  if (toc && heads.length >= 3) {
    var list = toc.querySelector("ol");
    var links = [];
    heads.forEach(function (h) {
      var li = doc.createElement("li");
      if (h.tagName === "H3") li.className = "sub";
      var a = doc.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.getAttribute("data-label");
      li.appendChild(a);
      list.appendChild(li);
      links.push({ h: h, a: a });
    });
    toc.hidden = false;
    if (window.matchMedia("(max-width: 1099px)").matches) toc.querySelector("details").open = false;

    if ("IntersectionObserver" in window) {
      var active = null;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var hit = links.filter(function (l) { return l.h === e.target; })[0];
          if (!hit) return;
          if (active) active.classList.remove("is-active");
          active = hit.a;
          active.classList.add("is-active");
        });
      }, { rootMargin: "-15% 0px -75% 0px" });
      links.forEach(function (l) { io.observe(l.h); });
    }
  }

  // ---- Copy link ----
  var copyLink = doc.querySelector(".copy-link");
  if (copyLink && navigator.clipboard) {
    copyLink.hidden = false;
    copyLink.addEventListener("click", function () {
      navigator.clipboard.writeText(copyLink.getAttribute("data-url")).then(function () {
        copyLink.textContent = "Link copied";
        setTimeout(function () { copyLink.textContent = "Copy link"; }, 1600);
      });
    });
  }
})();
