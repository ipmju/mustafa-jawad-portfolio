/* ============================================================================
   APP LOGIC — i18n (EN/AR + RTL), navigation, reveal, contact form.
   Depends on window.SITE from content.js.
   ============================================================================ */
(function () {
  "use strict";
  var S = window.SITE;
  var LS_KEY = "mj-lang";
  var state = { lang: "en" };

  /* ----------------------------------------------------------- helpers -- */
  function t(key) {
    var dict = S.I18N[state.lang] || S.I18N.en;
    return dict[key] != null ? dict[key] : (S.I18N.en[key] || "");
  }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function pickLang() {
    try { var saved = localStorage.getItem(LS_KEY); if (saved) return saved; } catch (e) {}
    var htmlLang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
    if (htmlLang.indexOf("ar") === 0) return "ar";
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("ar") === 0 ? "ar" : "en";
  }

  /* --------------------------------------------------- render dynamic -- */
  function buildNav() {
    var links = document.getElementById("navLinks");
    var mobile = document.getElementById("mobileMenu");
    links.innerHTML = ""; mobile.innerHTML = "";
    S.NAV.forEach(function (item) {
      var a = el("a"); a.href = "#" + item.id; a.dataset.section = item.id;
      links.appendChild(a);
      var m = el("a"); m.href = "#" + item.id; m.dataset.section = item.id;
      m.addEventListener("click", closeMobile);
      mobile.appendChild(m);
    });
  }

  function buildExpertise() {
    var root = document.getElementById("expList");
    root.innerHTML = "";
    S.EXPERTISE.forEach(function (g, i) {
      var row = el("div", "exp-row reveal" + (i % 2 ? " d1" : ""));
      row.dataset.expertise = g.key;
      var chips = g.items.map(function (x) { return '<span class="chip">' + x + "</span>"; }).join("");
      row.innerHTML =
        '<div class="exp-tag" data-field="tag"></div>' +
        '<div class="exp-main"><div class="exp-title" data-field="title"></div>' +
        '<div class="exp-note" data-field="note"></div></div>' +
        '<div class="exp-items">' + chips + "</div>";
      root.appendChild(row);
    });
  }

  function buildProjects() {
    var root = document.getElementById("projectList");
    root.innerHTML = "";
    S.PROJECTS.forEach(function (p) {
      var card = el("article", "project reveal");
      card.dataset.project = p.key;
      var host = p.url ? p.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";
      var media = p.url
        ? '<div class="project-media">' +
            '<div class="project-media-ph" aria-hidden="true">' +
              '<div class="ph-mark">MJ</div>' +
              '<div class="ph-name" data-field="phname"></div>' +
              '<div class="ph-url">' + host + ' ↗</div>' +
            '</div>' +
            '<iframe title="" loading="lazy" src="' + p.url +
            '" referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>' +
            '<a class="frame-guard" href="' + p.url + '" target="_blank" rel="noopener noreferrer" data-field="visitguard"><span></span></a>' +
          '</div>'
        : '<div class="project-media"></div>';
      card.innerHTML =
        '<div class="project-grid">' + media +
        '<div class="project-body">' +
          '<div class="project-kicker"><span class="project-status" data-field="status"></span>' +
            '<span data-field="kicker"></span></div>' +
          '<h3 class="project-name" data-field="name"></h3>' +
          '<p class="project-summary" data-field="summary"></p>' +
          '<div class="project-block"><h4 data-l="proj.problem"></h4><p data-field="problem"></p></div>' +
          '<div class="project-block editable"><h4 data-l="proj.contribution"></h4><p data-field="contribution"></p></div>' +
          '<div class="project-block"><h4 data-l="proj.decisions"></h4><ul class="project-decisions" data-field="decisions"></ul></div>' +
          '<div class="project-block"><h4 data-l="proj.tech"></h4><div class="project-tech" data-field="tech"></div></div>' +
          '<div class="project-actions" data-field="actions"></div>' +
        "</div></div>";
      root.appendChild(card);
    });
  }

  function buildApproach() {
    var root = document.getElementById("apprSteps");
    root.innerHTML = "";
    S.APPROACH.forEach(function (step, i) {
      var row = el("div", "appr-step reveal" + (i % 2 ? " d1" : ""));
      row.dataset.approach = i;
      row.innerHTML = '<div class="appr-n">' + step.n + "</div>" +
        '<div><div class="appr-t" data-field="t"></div><div class="appr-d" data-field="d"></div></div>';
      root.appendChild(row);
    });
  }

  function buildSocial() {
    var row = document.getElementById("socialRow");
    row.innerHTML = "";
    var L = S.LINKS;
    function social(key, label, href) {
      if (href) {
        var a = el("a", "social");
        a.href = href; a.target = "_blank"; a.rel = "noopener noreferrer";
        a.innerHTML = "<span>" + label + "</span>";
        row.appendChild(a);
      } else {
        var s = el("span", "social disabled");
        s.setAttribute("aria-disabled", "true");
        s.innerHTML = "<span>" + label + '</span><span class="soon" data-l="link.soon"></span>';
        row.appendChild(s);
      }
    }
    // Email first if present
    if (L.email) {
      var a = el("a", "social"); a.href = "mailto:" + L.email;
      a.innerHTML = "<span>" + L.email + "</span>"; row.appendChild(a);
    }
    social("github", t("link.github"), L.github);
    social("linkedin", t("link.linkedin"), L.linkedin);
  }

  /* --------------------------------------------------- apply language -- */
  function fieldText(obj, field) {
    // obj is a per-language object e.g. project.en
    return obj && obj[field] != null ? obj[field] : "";
  }

  function applyLang() {
    var lang = state.lang;
    var dir = lang === "ar" ? "rtl" : "ltr";
    var html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", dir);

    // static strings
    document.querySelectorAll("[data-i18n]").forEach(function (n) {
      n.textContent = t(n.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (n) {
      n.setAttribute("aria-label", t(n.getAttribute("data-i18n-aria")));
    });
    document.querySelectorAll("[data-l]").forEach(function (n) {
      n.textContent = t(n.getAttribute("data-l"));
    });

    // navigation labels (desktop + mobile share [data-section])
    document.querySelectorAll("[data-section]").forEach(function (a) {
      var item = S.NAV.filter(function (x) { return x.id === a.dataset.section; })[0];
      if (item) a.textContent = item[lang] || item.en;
    });

    // metadata
    document.title = t("meta.title");
    setMeta("name", "description", t("meta.desc"));
    setMeta("property", "og:title", t("meta.title"));
    setMeta("property", "og:description", t("meta.desc"));

    // expertise
    document.querySelectorAll("[data-expertise]").forEach(function (row) {
      var g = S.EXPERTISE.filter(function (x) { return x.key === row.dataset.expertise; })[0];
      if (!g) return;
      var d = g[lang] || g.en;
      row.querySelector('[data-field="tag"]').textContent = d.tag;
      row.querySelector('[data-field="title"]').textContent = d.title;
      row.querySelector('[data-field="note"]').textContent = d.note;
    });

    // projects
    document.querySelectorAll("[data-project]").forEach(function (card) {
      var p = S.PROJECTS.filter(function (x) { return x.key === card.dataset.project; })[0];
      if (!p) return;
      var d = p[lang] || p.en;
      var q = function (f) { return card.querySelector('[data-field="' + f + '"]'); };
      q("kicker").textContent = d.kicker;
      q("name").textContent = d.name;
      if (q("phname")) q("phname").textContent = d.name;
      q("summary").textContent = d.summary;
      q("problem").textContent = d.problem;
      q("contribution").textContent = d.contribution;
      var status = q("status"); status.textContent = (p.status && p.status[lang]) || "";
      var dec = q("decisions"); dec.innerHTML = "";
      d.decisions.forEach(function (x) { dec.appendChild(el("li", null, x)); });
      var tech = q("tech"); tech.innerHTML = "";
      d.tech.forEach(function (x) { tech.appendChild(el("span", "chip", x)); });
      var vg = card.querySelector('[data-field="visitguard"] span');
      if (vg) vg.textContent = t("proj.visit");
      if (card.querySelector('iframe')) card.querySelector('iframe').title = d.name;
      // actions
      var act = q("actions"); act.innerHTML = "";
      if (p.url) {
        var v = el("a", "btn btn-primary");
        v.href = p.url; v.target = "_blank"; v.rel = "noopener noreferrer";
        v.innerHTML = "<span>" + t("proj.visit") + '</span><span class="arrow">↗</span>';
        act.appendChild(v);
      }
      if (p.repo) {
        var r = el("a", "btn btn-ghost");
        r.href = p.repo; r.target = "_blank"; r.rel = "noopener noreferrer";
        r.textContent = t("proj.repo");
        act.appendChild(r);
      }
    });

    // approach
    document.querySelectorAll("[data-approach]").forEach(function (row) {
      var step = S.APPROACH[+row.dataset.approach];
      var d = step[lang] || step.en;
      row.querySelector('[data-field="t"]').textContent = d.t;
      row.querySelector('[data-field="d"]').textContent = d.d;
    });

    // cloud link
    var cl = document.getElementById("cloudLink");
    cl.href = S.LINKS.org;

    // contact form note visibility (no backend configured)
    buildSocial();

    try { localStorage.setItem(LS_KEY, lang); } catch (e) {}
    // Let the 3D scene re-sync any direction-dependent framing
    window.dispatchEvent(new CustomEvent("mj:lang", { detail: { lang: lang, dir: dir } }));
  }

  function setMeta(attr, key, val) {
    var n = document.querySelector("meta[" + attr + '="' + key + '"]');
    if (!n) { n = document.createElement("meta"); n.setAttribute(attr, key); document.head.appendChild(n); }
    n.setAttribute("content", val);
  }

  /* --------------------------------------------------- interactions -- */
  function initNavScroll() {
    var nav = document.getElementById("nav");
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 24); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initActiveSection() {
    var ids = S.NAV.map(function (n) { return n.id; });
    var links = document.querySelectorAll("[data-section]");
    var setActive = function (id) {
      links.forEach(function (a) { a.classList.toggle("active", a.dataset.section === id); });
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    ids.forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }

  function initReveal() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var items = document.querySelectorAll(".reveal");
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (n) { n.classList.add("in"); }); return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    items.forEach(function (n) { io.observe(n); });
  }

  function closeMobile() {
    var m = document.getElementById("mobileMenu");
    var b = document.getElementById("burger");
    m.classList.remove("open"); b.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  function initBurger() {
    var b = document.getElementById("burger");
    var m = document.getElementById("mobileMenu");
    b.addEventListener("click", function () {
      var open = m.classList.toggle("open");
      b.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMobile();
    });
  }

  function initLang() {
    document.getElementById("langBtn").addEventListener("click", function () {
      state.lang = state.lang === "en" ? "ar" : "en";
      applyLang();
    });
  }

  /* --------------------------------------------------- contact form -- */
  function initForm() {
    var form = document.getElementById("contactForm");
    var note = document.getElementById("formNote");
    var hasBackend = false; // flip to true when a real endpoint is wired
    if (S.LINKS.email && !hasBackend) {
      // keep the honest "use email" note but it's still functional via the link
    }
    var validators = {
      name: function (v) { return v.trim().length >= 2; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      message: function (v) { return v.trim().length >= 4; },
    };
    function validateField(name, value) {
      var field = form.querySelector('[name="' + name + '"]').closest(".field");
      var errEl = field.querySelector(".err");
      var ok = validators[name](value);
      field.classList.toggle("invalid", !ok);
      errEl.textContent = ok ? "" : t("contact.err." + name);
      form.querySelector('[name="' + name + '"]').setAttribute("aria-invalid", String(!ok));
      return ok;
    }
    ["name", "email", "message"].forEach(function (n) {
      var input = form.querySelector('[name="' + n + '"]');
      input.addEventListener("blur", function () {
        if (input.value) validateField(n, input.value);
      });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = {
        name: form.name.value, email: form.email.value, message: form.message.value,
      };
      var ok = ["name", "email", "message"].map(function (n) {
        return validateField(n, data[n]);
      }).every(Boolean);
      if (!ok) {
        form.querySelector(".invalid input, .invalid textarea").focus();
        return;
      }
      // No backend: never show a false success. Hand off to email when available,
      // otherwise tell the user plainly.
      if (S.LINKS.email) {
        var subj = encodeURIComponent("Portfolio enquiry from " + data.name);
        var body = encodeURIComponent(data.message + "\n\n— " + data.name + " (" + data.email + ")");
        window.location.href = "mailto:" + S.LINKS.email + "?subject=" + subj + "&body=" + body;
      } else {
        note.classList.add("flash");
        note.scrollIntoView({ behavior: "smooth", block: "center" });
        note.animate(
          [{ borderColor: "var(--accent)" }, { borderColor: "var(--line-str)" }],
          { duration: 1200, easing: "ease-out" }
        );
      }
    });
  }

  /* --------------------------------------------------- boot -- */
  function boot() {
    state.lang = pickLang();
    document.getElementById("year").textContent = new Date().getFullYear();
    buildNav();
    buildExpertise();
    buildProjects();
    buildApproach();
    applyLang();
    initNavScroll();
    initActiveSection();
    initReveal();
    initBurger();
    initLang();
    initForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else { boot(); }
})();
