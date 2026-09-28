/* pkmizer ui.js - 主题切换 / 文件树 / 目录 / 图片放大 */
(function () {
  "use strict";
  var C = window.PKM || {};
  var THEMES = C.themes || [];
  var THEMES_BASE = C.themesBase || "themes/";
  var DEFAULT_THEME = C.defaultTheme || (THEMES[0] || "");
  var SITE_TREE = C.siteTree || "site-tree.json";

  /* ===== 左侧按钮组（文件树 / TOC / 搜索）=====
     桌面端默认收成 “…” 主按钮：鼠标悬浮整组临时展开，点击主按钮固定展开/收起；
     手机端由 CSS 覆盖为常显平铺，主按钮隐藏。 */
  var pkmBtns = null;
  var addSideBtn = function (btn) {
    if (!pkmBtns) {
      pkmBtns = document.createElement("div");
      pkmBtns.id = "pkm-side-btns";
      pkmBtns.className = "collapsed";
      var moreBtn = document.createElement("button");
      moreBtn.id = "more-btn"; moreBtn.type = "button";
      moreBtn.setAttribute("aria-label", "更多工具"); moreBtn.setAttribute("title", "更多工具");
      moreBtn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
        '<circle cx="5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="19" cy="12" r="1.9"/></svg>';
      moreBtn.addEventListener("click", function () {
        var pinned = pkmBtns.classList.toggle("pinned");
        moreBtn.classList.toggle("open", pinned);
      });
      pkmBtns.appendChild(moreBtn);
      document.body.appendChild(pkmBtns);
    }
    pkmBtns.appendChild(btn);
  };

  var hexToRgb = function (hex) {
    var h = String(hex).trim().replace("#", "");
    if (h.length === 3) { h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]; }
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
    var n = parseInt(h, 16);
    return (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255);
  };
  var refreshPanelTheme = function () {
    var cs = getComputedStyle(document.body);
    var bg = cs.getPropertyValue("--bg-color").trim();
    var fg = cs.getPropertyValue("--text-color").trim();
    var rgb = hexToRgb(bg);
    document.documentElement.style.setProperty("--nav-bg", rgb ? "rgba(" + rgb + ",.92)" : "");
    document.documentElement.style.setProperty("--nav-fg", fg || "");
  };

  /* ===== 主题切换 ===== */
  (function () {
    if (!THEMES.length) return;
    var link = document.getElementById("theme-css");
    var btn = document.createElement("button");
    btn.id = "theme-btn"; btn.type = "button";
    btn.setAttribute("aria-label", "切换主题"); btn.setAttribute("title", "切换主题");
    btn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.5-.8 1.5-1.5S13 18 13.5 18H15a3 3 0 0 0 3-3c0-4.5-3.6-12-6-12z"/>' +
      '<circle cx="7.5" cy="10.5" r="1.2"/><circle cx="12" cy="7.5" r="1.2"/><circle cx="16.5" cy="10.5" r="1.2"/></svg>';
    var menu = document.createElement("div");
    menu.id = "theme-menu";
    document.body.appendChild(btn);
    document.body.appendChild(menu);

    var AUTO = "__auto__";
    var saved = null;
    try { saved = localStorage.getItem("pkm-theme"); } catch (e) {}
    if (saved === AUTO) saved = null;
    var current = (saved && THEMES.indexOf(saved) > -1) ? saved : AUTO;
    var KIND = C.themesKind || {};
    var pickAuto = function () {
      var dark = !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
      var kind = dark ? "dark" : "light";
      for (var i = 0; i < THEMES.length; i++) {
        if (KIND[THEMES[i]] === kind) return THEMES[i];
      }
      return DEFAULT_THEME;
    };
    var resolveName = function (name) { return name === AUTO ? pickAuto() : name; };
    var autoItem = document.createElement("div");
    autoItem.className = "theme-item";
    autoItem.textContent = "自动";
    autoItem.addEventListener("click", function () { apply(AUTO); hide(); });
    menu.appendChild(autoItem);
    THEMES.forEach(function (name) {
      var item = document.createElement("div");
      item.className = "theme-item";
      item.textContent = name;
      item.addEventListener("click", function () { apply(name); hide(); });
      menu.appendChild(item);
    });
    var apply = function (name) {
      current = name;
      link.href = THEMES_BASE + resolveName(name) + ".css";
      link.onload = function () {
        try { window.dispatchEvent(new Event("pkm-theme-applied")); } catch (e) {}
      };
      if (name === AUTO) { try { localStorage.removeItem("pkm-theme"); } catch (e) {} }
      else { try { localStorage.setItem("pkm-theme", name); } catch (e) {} }
      refreshActive();
    };
    var refreshActive = function () {
      var items = menu.querySelectorAll(".theme-item");
      for (var i = 0; i < items.length; i++) {
        items[i].classList.toggle("active", items[i].textContent === current);
      }
    };
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      var mqChange = function () {
        if (current !== AUTO) return;
        link.href = THEMES_BASE + pickAuto() + ".css";
        link.onload = function () {
          try { window.dispatchEvent(new Event("pkm-theme-applied")); } catch (e) {}
        };
      };
      if (mq.addEventListener) mq.addEventListener("change", mqChange);
      else if (mq.addListener) mq.addListener(mqChange);
    }
    var show = function () { menu.classList.add("open"); btn.classList.add("open"); };
    var hide = function () { menu.classList.remove("open"); btn.classList.remove("open"); };
    btn.addEventListener("click", function () {
      if (menu.classList.contains("open")) hide(); else show();
    });
    document.addEventListener("click", function (e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) hide();
    });
    apply(current);
  })();

  /* ===== 左侧文件树 ===== */
  (function () {
    var btn = document.createElement("button");
    btn.id = "nav-btn"; btn.type = "button";
    btn.setAttribute("aria-label", "文件树"); btn.setAttribute("title", "文件树");
    btn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M3 6a2 2 0 0 1 2-2h3l2 2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>';
    var panel = document.createElement("div");
    panel.id = "nav-panel";
    panel.innerHTML = '<div class="nav-head">&nbsp;</div>' +
      '<ul class="nav-tree"><li class="nav-empty">加载中...</li></ul>';
    addSideBtn(btn);
    document.body.appendChild(panel);

    refreshPanelTheme();
    window.addEventListener("pkm-theme-applied", refreshPanelTheme);

    var toggle = function () {
      panel.classList.toggle("open");
      btn.classList.toggle("open", panel.classList.contains("open"));
    };
    btn.addEventListener("click", function (e) { e.stopPropagation(); toggle(); });
    document.addEventListener("click", function (e) {
      if (panel.classList.contains("open") &&
          !panel.contains(e.target) && e.target !== btn) toggle();
    });

    var base = SITE_TREE.replace(/site-tree\.json$/, "");
    var curRel = decodeURIComponent(location.pathname).replace(/^\//, "");
    // 首页（站点根 index.html）时链接一律新标签页打开，不打断首页音乐播放
    var isHome = /index\.html$/.test(curRel) || curRel.replace(/\/$/, "").split("/").length === 1;
    var box = panel.querySelector(".nav-tree");

    // 目录折叠状态持久化（localStorage，key 按目录 rel 记录）
    var navKey = "pkm-nav-collapsed";
    var userCollapsed = {};
    var navFirst = true;
    try {
      var navRaw = localStorage.getItem(navKey);
      if (navRaw) { userCollapsed = JSON.parse(navRaw) || {}; }
      navFirst = navRaw === null;
    } catch (e) {}
    fetch(SITE_TREE)
      .then(function (r) { return r.json(); })
      .then(function (root) {
        box.innerHTML = "";
        if (!root.children || !root.children.length) {
          box.innerHTML = '<li class="nav-empty">暂无文件</li>';
          return;
        }
        (root.children || []).forEach(function (c) { box.appendChild(buildNode(c, 0)); });
        // 首次使用（无折叠记录）时展开当前文件所在路径，之后尊重用户折叠状态
        if (navFirst) expandActive(box);
      })
      .catch(function () {
        box.innerHTML = '<li class="nav-empty">文件树加载失败</li>';
      });
    function buildNode(node, depth) {
      var li = document.createElement("li");
      if (node.type === "dir") {
        // 折叠状态：用户记录优先，无记录时非顶层目录默认折叠
        var collapsed = (node.rel in userCollapsed) ? userCollapsed[node.rel] : depth > 0;
        li.className = "nav-dir" + (collapsed ? " collapsed" : "");
        var label = document.createElement("span");
        label.className = "nav-dir-label";
        label.textContent = node.name;
        label.addEventListener("click", function () {
          li.classList.toggle("collapsed");
          userCollapsed[node.rel] = li.classList.contains("collapsed");
          try { localStorage.setItem(navKey, JSON.stringify(userCollapsed)); } catch (e) {}
        });
        li.appendChild(label);
        var ul = document.createElement("ul");
        (node.children || []).forEach(function (c) { ul.appendChild(buildNode(c, depth + 1)); });
        li.appendChild(ul);
      } else {
        var a = document.createElement("a");
        a.className = "nav-file";
        a.href = base + node.rel;
        if (isHome) a.target = "_blank";
        a.textContent = node.name;
        if (node.rel === curRel) a.classList.add("active");
        li.appendChild(a);
      }
      return li;
    }
    function expandActive(box) {
      var a = box.querySelector("a.active");
      if (!a) return;
      var p = a.parentElement;
      while (p && p !== box) {
        if (p.classList && p.classList.contains("nav-dir")) {
          p.classList.remove("collapsed");
        }
        p = p.parentElement;
      }
    }
  })();

  /* ===== 页面目录 TOC ===== */
  (function () {
    var btn = document.createElement("button");
    btn.id = "toc-btn"; btn.type = "button";
    btn.setAttribute("aria-label", "页面目录"); btn.setAttribute("title", "页面目录");
    btn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M3 6h12M3 12h12M3 18h12"/>' +
      '<path d="M17 4l3 3-3 3M17 10l3 3-3 3M17 16l3 3-3 3"/></svg>';
    var panel = document.createElement("div");
    panel.id = "toc-panel";
    addSideBtn(btn);
    document.body.appendChild(panel);

    refreshPanelTheme();
    window.addEventListener("pkm-theme-applied", refreshPanelTheme);

    var headings = Array.prototype.slice.call(
      document.querySelectorAll("h1,h2,h3,h4,h5,h6")
    ).filter(function (el) { return el.id; });
    if (!headings.length) {
      btn.style.display = "none";
      return;
    }

    var open = function () { panel.classList.add("open"); btn.classList.add("open"); };
    var close = function () { panel.classList.remove("open"); btn.classList.remove("open"); };
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (panel.classList.contains("open")) close(); else open();
    });
    document.addEventListener("click", function (e) {
      if (panel.classList.contains("open") &&
          !panel.contains(e.target) && e.target !== btn) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    var root = document.createElement("ul");
    root.className = "toc-list";
    var stack = [{ level: 0, ul: root }];
    headings.forEach(function (h) {
      var level = parseInt(h.tagName.slice(1), 10);
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      while (stack.length && stack[stack.length - 1].level >= level) stack.pop();
      var parent = stack[stack.length - 1] || { ul: root };
      parent.ul.appendChild(li);
      var sub = document.createElement("ul");
      li.appendChild(sub);
      stack.push({ level: level, ul: sub });
    });
    panel.appendChild(root);

    var cur = null;
    var setActive = function (a) {
      if (cur) cur.classList.remove("active");
      cur = a;
      if (cur) cur.classList.add("active");
    };
    panel.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a) return;
      e.preventDefault();
      var el = document.getElementById(decodeURIComponent(a.getAttribute("href").slice(1)));
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(a);
    });
    var updateActive = function () {
      var pos = window.scrollY + 80;
      var idx = -1;
      for (var i = 0; i < headings.length; i++) {
        if (headings[i].offsetTop <= pos) idx = i; else break;
      }
      var target = idx >= 0 ? root.querySelector('a[href="#' + headings[idx].id + '"]') : null;
      if (target && target !== cur) setActive(target);
    };
    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
  })();

  /* ===== 全站搜索 ===== */
  (function () {
    var btn = document.createElement("button");
    btn.id = "search-btn"; btn.type = "button";
    btn.setAttribute("aria-label", "搜索"); btn.setAttribute("title", "搜索");
    btn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.3 5l3.4 3.4-1.4 1.4-3.4-3.4A8 8 0 0 1 2 10z"/></svg>';
    var panel = document.createElement("div");
    panel.id = "search-panel";
    var input = document.createElement("input");
    input.className = "search-input"; input.type = "text";
    input.setAttribute("placeholder", "搜索笔记..."); input.setAttribute("autocomplete", "off");
    var list = document.createElement("div");
    panel.appendChild(input);
    panel.appendChild(list);
    addSideBtn(btn);
    document.body.appendChild(panel);

    refreshPanelTheme();
    window.addEventListener("pkm-theme-applied", refreshPanelTheme);

    var base = SITE_TREE.replace(/site-tree\.json$/, "");
    var root = null;
    var query = "";

    var render = function () {
      var q = query.trim().toLowerCase();
      list.innerHTML = "";
      if (!q || !root) return;
      var hits = [];
      var walk = function (node, path) {
        if (node.type === "file") {
          if (node.name.toLowerCase().indexOf(q) > -1) {
            hits.push({ rel: node.rel, name: node.name, path: path });
          }
        } else {
          var p2 = path ? path + "/" + node.name : node.name;
          (node.children || []).forEach(function (c) { walk(c, p2); });
        }
      };
      (root.children || []).forEach(function (c) { walk(c, ""); });
      if (!hits.length) {
        list.innerHTML = '<div class="search-empty">没有匹配的笔记</div>';
        return;
      }
      hits.slice(0, 30).forEach(function (h) {
        var row = document.createElement("div");
        row.className = "search-result";
        var name = document.createElement("div");
        name.className = "search-name";
        name.textContent = h.name;
        var path = document.createElement("div");
        path.className = "search-path";
        path.textContent = h.path;
        row.appendChild(name);
        row.appendChild(path);
        row.addEventListener("click", function () { window.open(base + h.rel, "_blank"); });
        list.appendChild(row);
      });
    };

    var toggle = function (show) {
      var open = (show !== undefined) ? show : !panel.classList.contains("open");
      panel.classList.toggle("open", open);
      btn.classList.toggle("open", open);
      if (open) { input.focus(); }
    };
    btn.addEventListener("click", function (e) { e.stopPropagation(); toggle(); });
    document.addEventListener("click", function (e) {
      if (panel.classList.contains("open") &&
          !panel.contains(e.target) && e.target !== btn) toggle(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") toggle(false);
    });
    input.addEventListener("input", function () { query = input.value; render(); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var first = list.querySelector(".search-result");
        if (first) first.click();
      }
    });

    fetch(SITE_TREE)
      .then(function (r) { return r.json(); })
      .then(function (t) { root = t; render(); })
      .catch(function () {});
  })();

  /* ===== 图片双击放大 ===== */
  (function () {
    var box = document.createElement("div");
    box.id = "pkm-lightbox";
    var boxImg = document.createElement("img");
    box.appendChild(boxImg);
    document.body.appendChild(box);

    // 判断当前主题是否为深色（按 body 背景色亮度）
    var isDarkTheme = function () {
      var cs = getComputedStyle(document.body);
      var rgb = hexToRgb(cs.getPropertyValue("--bg-color").trim());
      if (!rgb) return false;
      var p = rgb.split(",").map(function (n) { return Number(n); });
      return (0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]) < 128;
    };
    var isSvg = function (src) {
      return /\.svg($|\?)/i.test(src);
    };
    function open(src, alt) {
      boxImg.src = src;
      boxImg.alt = alt || "";
      // 深色主题下 SVG 是透明背景：换深色底避免弹出一大块白底晃眼；
      // 内容本身是彩色（画布避开纯黑白文字），保持原色不做反色
      if (isSvg(src) && isDarkTheme()) {
        boxImg.style.background = "var(--bg-color, #1e1e1e)";
      } else {
        boxImg.style.background = "#fff";
      }
      box.classList.add("open");
    }
    function close() {
      box.classList.remove("open");
    }

    box.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    document.addEventListener("dblclick", function (e) {
      var t = e.target;
      if (t && t.tagName === "IMG" && !t.closest("nav, #nav-btn, #theme-btn, #theme-menu, #pkm-lightbox")) {
        e.preventDefault();
        open(t.currentSrc || t.src, t.alt);
      }
    });
  })();

  /* ===== LaTeX 数学渲染（KaTeX，仅 hasMath 页面按需加载）===== */
  (function () {
    if (!C.hasMath) return;
    var delims = [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false }
    ];
    var render = function () {
      renderMathInElement(document.body, { delimiters: delims, throwOnError: false });
    };
    if (window.renderMathInElement) { render(); return; }
    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css";
    document.head.appendChild(css);
    var js = document.createElement("script");
    js.src = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js";
    js.onload = function () {
      var ar = document.createElement("script");
      ar.src = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js";
      ar.onload = render;
      document.head.appendChild(ar);
    };
    document.head.appendChild(js);
  })();

  /* ===== 代码框操作栏：语言标签点击复制 + 复制 / 自动换行切换（默认水平滚动）===== */
  (function () {
    var flash = function (el, text, ms) {
      var old = el.textContent;
      el.textContent = text;
      setTimeout(function () { el.textContent = old; }, ms || 1200);
    };
    var copyText = function (text, el) {
      var ok = function () { flash(el, "✓ 已复制"); };
      var fail = function () {
        var t = document.createElement("textarea");
        t.value = text; t.style.position = "fixed"; t.style.opacity = "0";
        document.body.appendChild(t); t.select();
        try { document.execCommand("copy"); ok(); } catch (e) {}
        document.body.removeChild(t);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(ok, fail);
      } else { fail(); }
    };
    var init = function () {
      var pres = document.querySelectorAll("#pkm-content pre[lang]");
      for (var i = 0; i < pres.length; i++) {
        var pre = pres[i];
        if (pre.querySelector(".pkm-code-tools")) continue;
        var code = pre.querySelector("code");
        if (!code) continue;
        var tools = document.createElement("div");
        tools.className = "pkm-code-tools";
        var lang = document.createElement("button");
        lang.type = "button"; lang.className = "pkm-code-lang";
        lang.setAttribute("title", "点击复制代码");
        lang.textContent = pre.getAttribute("lang");
        lang.addEventListener("click", function () { copyText(code.textContent, lang); });
        tools.appendChild(lang);
        var copyBtn = document.createElement("button");
        copyBtn.type = "button"; copyBtn.className = "pkm-code-btn";
        copyBtn.setAttribute("title", "复制代码"); copyBtn.setAttribute("aria-label", "复制代码");
        copyBtn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
          '<rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>' +
          '<path d="M5 15V5a2 2 0 0 1 2-2h8" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
        copyBtn.addEventListener("click", function () { copyText(code.textContent, copyBtn); });
        tools.appendChild(copyBtn);
        var wrapBtn = document.createElement("button");
        wrapBtn.type = "button"; wrapBtn.className = "pkm-code-btn";
        wrapBtn.setAttribute("title", "自动换行"); wrapBtn.setAttribute("aria-label", "自动换行");
        wrapBtn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
          '<path d="M17 16l-3 2 3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        wrapBtn.addEventListener("click", function () {
          var on = pre.classList.toggle("pkm-wrap");
          wrapBtn.setAttribute("title", on ? "恢复水平滚动" : "自动换行");
          wrapBtn.setAttribute("aria-label", wrapBtn.getAttribute("title"));
        });
        tools.appendChild(wrapBtn);
        pre.insertBefore(tools, pre.firstChild);
      }
    };
    init();
  })();
})();
