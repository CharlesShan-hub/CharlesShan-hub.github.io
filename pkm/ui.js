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
      pkmBtns.className = "pkm-btns collapsed";
      var moreBtn = document.createElement("button");
      moreBtn.id = "more-btn"; moreBtn.type = "button"; moreBtn.className = "pkm-more";
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

  /* ===== 主题切换 + 本页大纲 TOC：共享组件（ui_widgets.js），调用见文件树之后的共享挂载 ===== */

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

  /* ===== 共享组件（主题切换 + 本页大纲 TOC）：ui_widgets.js 单点维护，ui.js 与私密页加密外壳共用 ===== */
  /* pkmizer 共享组件：主题切换 + 本页大纲（TOC）
 * 站点 ui.js 与私密页加密外壳（encrypt.mjs 模板）共用同一份实现，单点维护。
 * 依赖 window.PKM: themes / themesBase / defaultTheme / themesKind。
 * 调用时机：ui.js 页面加载即调用；加密页在解锁成功、正文注入后调用。
 * TOC 按钮挂载：站点页进左侧按钮组（#pkm-side-btns），私密页无按钮组时独立 fixed 左上。
 */
window.__pkmInitWidgets = window.__pkmInitWidgets || function () {
  "use strict";
  var C = window.PKM || {};
  var THEMES = C.themes || [];
  if (!THEMES.length) return;
  var THEMES_BASE = C.themesBase || "themes/";
  var DEFAULT_THEME = C.defaultTheme || (THEMES[0] || "");
  var KIND = C.themesKind || {};

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

  /* ===== 右上按钮组（主题 / 下载等）：与左侧按钮组同款 “…” 折叠 ===== */
  var topGroup = document.getElementById("pkm-top-btns");
  if (!topGroup) {
    topGroup = document.createElement("div");
    topGroup.id = "pkm-top-btns";
    topGroup.className = "pkm-btns collapsed";
    var moreBtn = document.createElement("button");
    moreBtn.type = "button"; moreBtn.className = "pkm-more";
    moreBtn.setAttribute("aria-label", "更多工具"); moreBtn.setAttribute("title", "更多工具");
    moreBtn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="19" cy="12" r="1.9"/></svg>';
    moreBtn.addEventListener("click", function () {
      var pinned = topGroup.classList.toggle("pinned");
      moreBtn.classList.toggle("open", pinned);
    });
    topGroup.appendChild(moreBtn);
    document.body.appendChild(topGroup);
  }
  var addTopBtn = function (btn) { topGroup.appendChild(btn); };

  /* ===== 主题切换 ===== */
  (function () {
    var link = document.getElementById("theme-css");
    var btn = document.createElement("button");
    btn.id = "theme-btn"; btn.type = "button";
    btn.setAttribute("aria-label", "切换主题"); btn.setAttribute("title", "切换主题");
    btn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.5-.8 1.5-1.5S13 18 13.5 18H15a3 3 0 0 0 3-3c0-4.5-3.6-12-6-12z"/>' +
      '<circle cx="7.5" cy="10.5" r="1.2"/><circle cx="12" cy="7.5" r="1.2"/><circle cx="16.5" cy="10.5" r="1.2"/></svg>';
    var menu = document.createElement("div");
    menu.id = "theme-menu";
    addTopBtn(btn);
    document.body.appendChild(menu);

    var AUTO = "__auto__";
    var saved = null;
    try { saved = localStorage.getItem("pkm-theme"); } catch (e) {}
    if (saved === AUTO) saved = null;
    var current = (saved && THEMES.indexOf(saved) > -1) ? saved : AUTO;
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
        refreshPanelTheme();
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
          refreshPanelTheme();
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

  /* ===== 字体选择 ===== */
  (function () {
    var btn = document.createElement("button");
    btn.id = "font-btn"; btn.type = "button";
    btn.setAttribute("aria-label", "选择字体"); btn.setAttribute("title", "选择字体");
    btn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="12" y="16.5" text-anchor="middle" font-size="12" font-family="Georgia,serif" fill="#fff" stroke="none">Aa</text></svg>';
    var pop = document.createElement("div");
    pop.id = "font-pop";
    addTopBtn(btn);
    document.body.appendChild(pop);

    var GENERIC = {
      "serif": 1, "sans-serif": 1, "monospace": 1,
      "cursive": 1, "fantasy": 1, "system-ui": 1, "ui-serif": 1,
      "ui-sans-serif": 1, "ui-monospace": 1, "ui-rounded": 1
    };
    var clean = function (stack) {
      return (stack || "").split(",").map(function (f) {
        return f.replace(/^['"]+|['"]+$/g, "").trim();
      }).filter(Boolean);
    };
    var checkFont = function (font) {
      if (!document.fonts || !document.fonts.check) return null;
      if (GENERIC[font]) return true;
      // 字体名含空格/符号时必须加引号，否则 check 抛语法错误 → 显示"?"；
      // 样例文本只取拉丁字母+数字，避免代码字体没有中文字形导致误判"✗"
      var quoted = /[\s"'(),/]/.test(font) ? '"' + font + '"' : font;
      var specs = ['16px ' + quoted, '16px normal ' + quoted];
      for (var i = 0; i < specs.length; i++) {
        try { return document.fonts.check(specs[i], "ABCabc0123"); }
        catch (e) {}
      }
      return null;
    };

    // 主题名与宽度模块一致（theme-css 文件名），选择结果按主题分别记忆
    var themeName = function () {
      var link = document.getElementById("theme-css");
      var href = link ? (link.getAttribute("href") || "") : "";
      return href.replace(/^.*\//, "").replace(/\.css$/, "");
    };
    var HEAD_SEL = "#pkm-content h1, #pkm-content h2, #pkm-content h3, #pkm-content h4, #pkm-content h5, #pkm-content h6";
    var CATS = {
      body: { label: "正文", key: "pkm-font-body-" },
      code: { label: "代码", key: "pkm-font-code-" },
      head: { label: "标题", key: "pkm-font-head-" }
    };
    // 内置候选字体池：面板在主题字体栈之外补充的常见字体（本机未安装的照常显示红叉并禁用）。
    // 正文/标题共用阅读池（衬线、无衬线、楷体、常见中文黑体宋体）；代码用等宽池
    var READ_POOL = [
      "Georgia", "Palatino", "Times New Roman", "Avenir Next", "Segoe UI", "Verdana",
      "Songti SC", "STSong", "SimSun", "Kaiti SC", "STKaiti", "KaiTi",
      "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
      "Noto Serif CJK SC", "Source Han Serif SC", "LXGW WenKai"
    ];
    var EXTRA_POOL = {
      "正文": READ_POOL,
      "标题": READ_POOL,
      "代码": [
        "JetBrains Mono", "Fira Code", "Cascadia Code", "Source Code Pro", "IBM Plex Mono",
        "SF Mono", "Menlo", "Monaco", "Consolas", "Courier New", "Sarasa Mono SC"
      ]
    };

    /* ===== 段落间距：default（主题自带）/ 0 / 0.5 / 1 行，实时应用 + 按主题记忆 ===== */
    var GAP_OPTS = [
      { v: "default", label: "默认" },
      { v: "0", label: "0 行" },
      { v: "0.5", label: "0.5 行" },
      { v: "1", label: "1 行" }
    ];
    var GAP_KEY = "pkm-para-gap-";
    var gapStored = function () {
      var v = null;
      try { v = localStorage.getItem(GAP_KEY + themeName()); } catch (e) {}
      return v;
    };
    // 实时应用：注入/移除 <style> 覆盖规则（0.5 行为默认观感，default 还原主题自带间距）
    var gapApply = function (v) {
      var em = v === "1" ? "1em" : v === "0.5" ? "0.5em" : v === "0" ? "0" : null;
      var styleEl = document.getElementById("pkm-para-gap");
      if (!em) {
        if (styleEl) styleEl.remove();
      } else {
        if (!styleEl) {
          styleEl = document.createElement("style");
          styleEl.id = "pkm-para-gap";
          document.head.appendChild(styleEl);
        }
        styleEl.textContent = "#pkm-content p, body.done p { margin-top: " + em + "; margin-bottom: " + em + "; }";
      }
      try {
        if (v !== "default") localStorage.setItem(GAP_KEY + themeName(), v);
        else localStorage.removeItem(GAP_KEY + themeName());
      } catch (e) {}
    };
    var gapRow = function () {
      var wrap = document.createElement("div");
      wrap.className = "font-row";
      var head = document.createElement("div");
      head.className = "font-row-head";
      var label = document.createElement("div");
      label.className = "font-row-label";
      label.textContent = "段落间距";
      head.appendChild(label);
      wrap.appendChild(head);
      var chips = document.createElement("div");
      chips.className = "font-row-stack";
      var selected = gapStored();
      GAP_OPTS.forEach(function (o) {
        var isSel = o.v === (selected || "0.5");
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "font-chip" + (isSel ? " sel" : "");
        chip.textContent = o.label + (isSel ? " ✓" : "");
        chip.addEventListener("click", function (e) {
          e.stopPropagation();
          gapApply(o.v);
          render();
        });
        chips.appendChild(chip);
      });
      wrap.appendChild(chips);
      return wrap;
    };
    var stored = function (cat) {
      var v = null;
      try { v = localStorage.getItem(cat.key + themeName()); } catch (e) {}
      return v;
    };
    // 应用选择：正文/标题直接改元素字体（!important 覆盖主题），代码走 CSS 变量
    var applyCat = function (cat, font) {
      var quoted = font && /[\s"'(),/]/.test(font) ? '"' + font + '"' : font;
      if (cat === CATS.body) {
        if (font) document.body.style.setProperty("font-family", quoted, "important");
        else document.body.style.removeProperty("font-family");
      } else if (cat === CATS.head) {
        var heads = document.querySelectorAll(HEAD_SEL);
        for (var i = 0; i < heads.length; i++) {
          if (font) heads[i].style.setProperty("font-family", quoted, "important");
          else heads[i].style.removeProperty("font-family");
        }
      } else {
        if (font) document.documentElement.style.setProperty("--pkm-code-font", quoted);
        else document.documentElement.style.removeProperty("--pkm-code-font");
      }
      try {
        if (font) localStorage.setItem(cat.key + themeName(), font);
        else localStorage.removeItem(cat.key + themeName());
      } catch (e) {}
    };
    var applyAll = function () {
      applyCat(CATS.body, stored(CATS.body));
      applyCat(CATS.code, stored(CATS.code));
      applyCat(CATS.head, stored(CATS.head));
    };
    var elOf = function (cat) {
      if (cat === CATS.body) return document.body;
      if (cat === CATS.code) return document.querySelector("#pkm-content pre code") ||
        document.querySelector("#pkm-content pre");
      return document.querySelector(HEAD_SEL);
    };
    var row = function (cat) {
      var wrap = document.createElement("div");
      wrap.className = "font-row";
      var head = document.createElement("div");
      head.className = "font-row-head";
      var label = document.createElement("div");
      label.className = "font-row-label";
      label.textContent = cat.label;
      head.appendChild(label);
      var reset = document.createElement("button");
      reset.type = "button";
      reset.className = "font-reset";
      reset.textContent = "重置";
      reset.addEventListener("click", function (e) {
        e.stopPropagation();
        applyCat(cat, null);
        render();
      });
      head.appendChild(reset);
      wrap.appendChild(head);
      var el = elOf(cat);
      if (!el) {
        var none = document.createElement("div");
        none.className = "font-row-empty";
        none.textContent = cat === CATS.code ? "本页无代码块" : "本页无标题";
        wrap.appendChild(none);
        return wrap;
      }
      var chips = document.createElement("div");
      chips.className = "font-row-stack";
      var selected = stored(cat);
      // 候选 = 主题字体栈 + 内置补充池，按字体名去重（主题栈在前，保持默认观感优先）
      var seen = {};
      clean(getComputedStyle(el).fontFamily).concat(EXTRA_POOL[cat.label] || []).forEach(function (font) {
        var key = font.toLowerCase();
        if (seen[key]) return;
        seen[key] = 1;
        var ok = checkFont(font);
        var isSel = font === selected;
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "font-chip" + (isSel ? " sel" : "") + (ok === false ? " miss" : "");
        chip.disabled = ok === false;
        chip.textContent = font + (isSel ? " ✓" : ok === false ? " ✗" : "");
        chip.addEventListener("click", function (e) {
          e.stopPropagation();
          applyCat(cat, font);
          render();
        });
        chips.appendChild(chip);
      });
      wrap.appendChild(chips);
      return wrap;
    };
    var render = function () {
      pop.innerHTML = "";
      var title = document.createElement("div");
      title.className = "font-pop-title";
      title.textContent = "选择字体";
      pop.appendChild(title);
      pop.appendChild(gapRow());
      pop.appendChild(row(CATS.body));
      pop.appendChild(row(CATS.code));
      pop.appendChild(row(CATS.head));
    };
    var watchFonts = function () {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(render).catch(function () {});
      }
    };
    applyAll();
    gapApply(gapStored() || "0.5");
    render();
    watchFonts();
    // 主题切换后按新主题记忆的选择重新应用并重刷面板；webfont 加载完再补刷一次
    window.addEventListener("pkm-theme-applied", function () { applyAll(); gapApply(gapStored() || "0.5"); render(); watchFonts(); });

    var open = function () { pop.classList.add("open"); btn.classList.add("open"); };
    var close = function () { pop.classList.remove("open"); btn.classList.remove("open"); };
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (pop.classList.contains("open")) close(); else { render(); open(); }
    });
    document.addEventListener("click", function (e) {
      if (pop.classList.contains("open") && !pop.contains(e.target) && e.target !== btn) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  })();

  /* ===== 正文宽度调节（右上按钮组，公开页与私密页共用）=====
     点击弹出页面居中的滑块浮层，动态改宿主的 max-width 并居中；
     宿主：公开页为 #pkm-content，私密页（解锁后 body.done）为 body 本身。
     宽度按主题分别记忆（localStorage key 带主题名），电脑端默认 70%，
     切换主题后各自生效，不会互相串值。手机端（<=900px）由 CSS 隐藏按钮，
     JS 同时不应用宽度（保持主题默认全宽），避免移动端也被压成 70%。 */
  (function () {
    var host = document.getElementById("pkm-content");
    if (!host && document.body.classList.contains("done")) host = document.body;
    if (!host) return;
    var btn = document.createElement("button");
    btn.id = "pkm-width-btn"; btn.type = "button";
    btn.setAttribute("aria-label", "正文宽度"); btn.setAttribute("title", "正文宽度");
    btn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M3 12h18M8 7l-5 5 5 5M16 7l5 5-5 5"/></svg>';
    var pop = document.createElement("div");
    pop.id = "pkm-width-pop";
    var title = document.createElement("div");
    title.className = "pkm-width-title";
    title.textContent = "正文宽度";
    var range = document.createElement("input");
    range.type = "range"; range.id = "pkm-width-range";
    range.min = "40"; range.max = "100"; range.step = "1";
    var val = document.createElement("div");
    val.className = "pkm-width-value";
    pop.appendChild(title);
    pop.appendChild(range);
    pop.appendChild(val);
    document.body.appendChild(pop);
    addTopBtn(btn);

    // 当前主题名由 theme-css 的 href 文件名得出（如 vlook-joint / phycat-abyss）
    var themeName = function () {
      var link = document.getElementById("theme-css");
      var href = link ? (link.getAttribute("href") || "") : "";
      return href.replace(/^.*\//, "").replace(/\.css$/, "");
    };
    var WIDTH_KEY = function () { return "pkm-content-width-" + themeName(); };
    var defaultPct = 70;
    // 移动端（<=900px）与 CSS 的媒体查询一致：不应用宽度，保持主题默认全宽
    var isMobile = function () {
      return !!window.matchMedia && window.matchMedia("(max-width: 900px)").matches;
    };
    var loadPct = function () {
      var saved = null;
      try { saved = localStorage.getItem(WIDTH_KEY()); } catch (e) {}
      var pct = saved === null ? null : parseInt(saved, 10);
      if (pct !== null && (isNaN(pct) || pct < 40 || pct > 100)) pct = null;
      return pct === null ? defaultPct : pct;
    };
    var apply = function (pct) {
      host.style.maxWidth = pct + "%";
      host.style.margin = "0 auto";
      try { localStorage.setItem(WIDTH_KEY(), String(pct)); } catch (e) {}
    };
    var refresh = function () {
      // 手机/平板不应用宽度，清掉内联样式后保持主题默认
      if (isMobile()) {
        host.style.maxWidth = "";
        host.style.margin = "";
        return;
      }
      var pct = loadPct();
      range.value = String(pct);
      val.textContent = pct + "%";
      apply(pct);
    };
    refresh();
    range.addEventListener("input", function () {
      val.textContent = range.value + "%";
      apply(parseInt(range.value, 10));
    });
    // 窗口在桌面/移动断点间变化时重刷宽度状态
    if (window.matchMedia) window.matchMedia("(max-width: 900px)").addEventListener("change", refresh);
    // 主题切换后按该主题记忆的宽度重新生效
    window.addEventListener("pkm-theme-applied", refresh);
    var open = function () { pop.classList.add("open"); btn.classList.add("open"); };
    var close = function () { pop.classList.remove("open"); btn.classList.remove("open"); };
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (pop.classList.contains("open")) close(); else open();
    });
    document.addEventListener("click", function (e) {
      if (pop.classList.contains("open") && !pop.contains(e.target) && e.target !== btn) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  })();

  /* ===== 调试面板（localStorage 缓存查看 / 增删改） ===== */
  (function () {
    // 仅首页显示：子页面 / 私密页不创建，保持界面干净（与 ui_main.js 的首页判定一致）
    var curRel = decodeURIComponent(location.pathname).replace(/^\//, "");
    if (!(/index\.html$/.test(curRel) || curRel.replace(/\/$/, "").split("/").length === 1)) return;
    var btn = document.createElement("button");
    btn.id = "debug-btn"; btn.type = "button";
    btn.setAttribute("aria-label", "调试缓存"); btn.setAttribute("title", "调试缓存");
    btn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/>' +
      '<path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/>' +
      '<path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/>' +
      '<path d="M12 20v-9"/>' +
      '<path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-3.9"/>' +
      '<path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>';
    var panel = document.createElement("div");
    panel.id = "debug-panel";
    addTopBtn(btn);
    document.body.appendChild(panel);
    var title = document.createElement("div");
    title.className = "debug-title";
    title.textContent = "调试：浏览器缓存";
    var list = document.createElement("div");
    list.className = "debug-list";
    panel.appendChild(title);
    panel.appendChild(list);
    var render = function () {
      list.innerHTML = "";
      var keys = [];
      for (var i = 0; i < localStorage.length; i++) keys.push(localStorage.key(i));
      // 密钥缓存（pkm.key.*）是 base64 乱码且无修改价值，不展示，只看有意义的项
      keys = keys.filter(function (k) { return k.indexOf("pkm.key.") !== 0; }).sort();
      if (!keys.length) {
        var empty = document.createElement("div");
        empty.className = "debug-empty";
        empty.textContent = "暂无缓存";
        list.appendChild(empty);
        return;
      }
      keys.forEach(function (k) { list.appendChild(row(k)); });
    };
    var row = function (k) {
      var r = document.createElement("div");
      r.className = "debug-row";
      var key = document.createElement("div");
      key.className = "debug-key";
      key.textContent = k;
      key.title = k;
      // 记住的密码（pkm.pass.*）存的是 base64 编码，直接看是乱码；
      // 面板里解码成明文显示/编辑，保存时再编码回去，方便修改密码
      var isPass = k.indexOf("pkm.pass.") === 0;
      var raw = localStorage.getItem(k) || "";
      var display = raw;
      if (isPass) {
        try { display = decodeURIComponent(escape(atob(raw))); }
        catch (e) {}
      }
      var val = document.createElement("input");
      val.type = "text"; val.className = "debug-val"; val.spellcheck = false;
      val.value = display;
      val.addEventListener("change", function () {
        localStorage.setItem(k, isPass ? btoa(unescape(encodeURIComponent(val.value))) : val.value);
      });
      var del = document.createElement("button");
      del.type = "button"; del.className = "debug-del"; del.textContent = "删除";
      del.addEventListener("click", function () { localStorage.removeItem(k); render(); });
      r.appendChild(key); r.appendChild(val); r.appendChild(del);
      return r;
    };
    // 新增缓存项：键名 + 值 + 添加
    var addRow = document.createElement("div");
    addRow.className = "debug-add";
    var addKey = document.createElement("input");
    addKey.type = "text"; addKey.className = "debug-new-key"; addKey.placeholder = "新键名";
    var addVal = document.createElement("input");
    addVal.type = "text"; addVal.className = "debug-new-val"; addVal.placeholder = "新值";
    var addBtn = document.createElement("button");
    addBtn.type = "button"; addBtn.className = "debug-add-btn"; addBtn.textContent = "添加";
    addBtn.addEventListener("click", function () {
      var k = addKey.value.trim();
      if (!k) { addKey.focus(); return; }
      localStorage.setItem(k, addVal.value);
      addKey.value = ""; addVal.value = "";
      render();
    });
    addRow.appendChild(addKey);
    addRow.appendChild(addVal);
    addRow.appendChild(addBtn);
    panel.appendChild(addRow);
    var open = function () { render(); panel.classList.add("open"); btn.classList.add("open"); };
    var close = function () { panel.classList.remove("open"); btn.classList.remove("open"); };
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (panel.classList.contains("open")) close(); else open();
    });
    document.addEventListener("click", function (e) {
      if (panel.classList.contains("open") && !panel.contains(e.target) && e.target !== btn) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
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
    var sideGroup = document.getElementById("pkm-side-btns");
    if (sideGroup) { sideGroup.appendChild(btn); } else { document.body.appendChild(btn); }
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
};

  window.__pkmInitWidgets();

  /* ===== 下载 Markdown（右上按钮组）===== */
  (function () {
    var curRel = decodeURIComponent(location.pathname).replace(/^\//, "");
    // 首页（站点根 index.html 等根目录页）没有对应 md 副本，不显示下载
    if (/index\.html$/.test(curRel) || curRel.replace(/\/$/, "").split("/").length === 1) return;
    var btn = document.createElement("button");
    btn.id = "dl-btn"; btn.type = "button";
    btn.setAttribute("aria-label", "下载 Markdown"); btn.setAttribute("title", "下载 Markdown");
    btn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M12 3v10m0 0l-4-4m4 4l4-4"/>' +
      '<path d="M5 19h14"/></svg>';
    var mdUrl = SITE_TREE.replace(/site-tree\.json$/, "") + curRel.replace(/\.html$/, ".md");
    btn.addEventListener("click", function () {
      var a = document.createElement("a");
      a.href = mdUrl; a.download = "";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    });
    var g = document.getElementById("pkm-top-btns");
    if (g) { g.appendChild(btn); } else { document.body.appendChild(btn); }
  })();

  /* ===== 主页面背景明暗切换（仅首页，左按钮组最左边）=====
     按钮由 ui.js 动态创建，暗色状态（body.black / #pkm-bg.black / 图标切换）
     与 localStorage pkm-bg-mode 一起维护；子页面无 #pkm-bg，直接跳过。 */
  (function () {
    var bg = document.getElementById("pkm-bg");
    if (!bg) return;
    var btn = document.createElement("button");
    btn.id = "bg-mode-btn"; btn.type = "button";
    btn.setAttribute("aria-label", "背景明暗"); btn.setAttribute("title", "背景明暗");
    btn.innerHTML = '<svg class="icon-moon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
      '<svg class="icon-sun" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-15v3m0 14v3M2 12h3m14 0h3M4.9 4.9l2.1 2.1m10 10 2.1 2.1M4.9 19.1l2.1-2.1m10-10 2.1-2.1"/></svg>';
    var g = document.getElementById("pkm-side-btns");
    if (g && g.children.length > 1) { g.insertBefore(btn, g.children[1]); }
    else if (g) { g.appendChild(btn); }
    else { document.body.appendChild(btn); }
    var applyMode = function (m) {
      bg.classList.toggle("black", m === "dark");
      document.body.classList.toggle("black", m === "dark");
      btn.classList.toggle("dark", m === "dark");
      try { localStorage.setItem("pkm-bg-mode", m); } catch (e) {}
    };
    btn.addEventListener("click", function () {
      applyMode(document.body.classList.contains("black") ? "light" : "dark");
    });
    var sm = null;
    try { sm = localStorage.getItem("pkm-bg-mode"); } catch (e) {}
    var sysDark = !!(window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
    applyMode(sm === "dark" ? "dark" : (sm === "light" ? "light" : (sysDark ? "dark" : "light")));
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

  /* ===== mermaid 图表渲染（按需加载，见 mdh/mermaid.js）===== */
  
(function () {
  /* mermaid 图表渲染：按需加载（仅页面存在 mermaid 代码块时 import CDN）。
     构建期 mermaid 块输出为 <pre lang="mermaid"><code>…</code></pre>（未渲染），
     这里把源码文本搬进标准容器 div.mermaid，再交给 mermaid.run 渲染成 SVG；
     主题深浅自动匹配当前站点主题（dark/default），图表与页面观感一致。 */
  var host = document.querySelector("#pkm-content") || document.body;
  var pres = host.querySelectorAll('pre[lang="mermaid"]');
  if (!pres.length) return;
  var theme = "default";
  try {
    var link = document.getElementById("theme-css");
    var name = (link && link.getAttribute("href") || "").replace(/^.*\//, "").replace(/\.css$/, "");
    var kinds = (window.PKM && window.PKM.themesKind) || {};
    if (kinds[name] === "dark") theme = "dark";
  } catch (e) {}
  var nodes = [];
  pres.forEach(function (pre) {
    var code = pre.querySelector("code");
    var text = code ? code.textContent : pre.textContent;
    var div = document.createElement("div");
    div.className = "mermaid";
    div.textContent = text;
    pre.replaceWith(div);
    nodes.push(div);
  });
  import("https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs")
    .then(function (mod) {
      var mermaid = mod.default;
      mermaid.initialize({ startOnLoad: false, theme: theme, securityLevel: "strict" });
      mermaid.run({ nodes: nodes });
    })
    .catch(function () {});
})();


  /* ===== 代码框操作栏：语言标签点击复制 + 复制 / 自动换行切换（默认水平滚动）===== */
  (function () {
    var flash = function (el, text, ms) {
      // 原始内容只捕获一次（el.__pkmOldHTML）：连续快速点击时不会把 “✓ 已复制”
      // 当成原内容恢复，图标/文字永远不会被钉死在反馈文案上
      if (el.__pkmOldHTML === undefined) el.__pkmOldHTML = el.innerHTML;
      el.textContent = text;
      setTimeout(function () { el.innerHTML = el.__pkmOldHTML; }, ms || 1200);
    };
    var copyText = function (text, el) {
      var ok = function () { flash(el, "✓ 已复制"); };
      // 兜底：临时 textarea 方案（兼容非安全上下文/剪贴板 API 拒绝的环境）
      var fallback = function () {
        var t = document.createElement("textarea");
        t.value = text;
        t.setAttribute("readonly", "");
        t.style.position = "fixed"; t.style.top = "0"; t.style.left = "0"; t.style.opacity = "0";
        document.body.appendChild(t);
        t.focus(); t.select();
        t.setSelectionRange(0, t.value.length);
        var okFlag = false;
        try { okFlag = document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(t);
        if (okFlag) ok();
      };
      if (window.isSecureContext && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(ok, fallback);
      } else { fallback(); }
    };
    var init = function () {
      var pres = document.querySelectorAll("#pkm-content pre[lang]");
      for (var i = 0; i < pres.length; i++) {
        // 用 let 块级作用域：var 在循环里只有一份，闭包会把所有按钮的 handler
        // 都指向最后一个代码块（复制到错误内容、换行加错块）
        let pre = pres[i];
        if (pre.querySelector(".pkm-code-tools")) continue;
        let code = pre.querySelector("code");
        if (!code) continue;
        let tools = document.createElement("div");
        tools.className = "pkm-code-tools";
        let lang = document.createElement("button");
        lang.type = "button"; lang.className = "pkm-code-lang";
        lang.setAttribute("title", "点击复制代码");
        lang.textContent = pre.getAttribute("lang");
        lang.addEventListener("click", function () { copyText(code.textContent, lang); });
        tools.appendChild(lang);
        let copyBtn = document.createElement("button");
        copyBtn.type = "button"; copyBtn.className = "pkm-code-btn";
        copyBtn.setAttribute("title", "复制代码"); copyBtn.setAttribute("aria-label", "复制代码");
        copyBtn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
          '<rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>' +
          '<path d="M5 15V5a2 2 0 0 1 2-2h8" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
        copyBtn.addEventListener("click", function () { copyText(code.textContent, copyBtn); });
        tools.appendChild(copyBtn);
        let wrapBtn = document.createElement("button");
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
