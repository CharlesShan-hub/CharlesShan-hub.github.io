(function () {
  /* 锁定卡片配色跟随当前主题：优先读主题自定义变量（phycat 等），缺失时回退取
     body 实际渲染的背景/文字色（vlook 等）；全部写入 --lock-* 变量供上方样式使用 */
  try {
    var rs = getComputedStyle(document.documentElement);
    var themeVars = {};
    ['--bg-color', '--text-color', '--text-color-secondary', '--border-color'].forEach(function (n) {
      var v = rs.getPropertyValue(n).trim();
      if (v) themeVars[n] = v;
    });
    var setLockVar = function (name, val) { if (val) document.documentElement.style.setProperty(name, val); };
    if (themeVars['--bg-color']) setLockVar('--lock-bg', themeVars['--bg-color']);
    if (themeVars['--text-color']) setLockVar('--lock-fg', themeVars['--text-color']);
    if (themeVars['--text-color-secondary']) setLockVar('--lock-mut', themeVars['--text-color-secondary']);
    if (themeVars['--border-color']) setLockVar('--lock-bd', themeVars['--border-color']);
    if (!themeVars['--bg-color'] || !themeVars['--text-color']) {
      var bst = getComputedStyle(document.body);
      var bc = bst.backgroundColor;
      if (!themeVars['--bg-color'] && bc && bc !== 'rgba(0, 0, 0, 0)') setLockVar('--lock-bg', bc);
      if (!themeVars['--text-color'] && bst.color) setLockVar('--lock-fg', bst.color);
    }
  } catch (e) {}
  var data = JSON.parse(document.getElementById('pkm-cipher').textContent);
  var content = document.body;
  var input = document.getElementById('pkm-pass');
  var btn = document.getElementById('pkm-unlock');
  var err = document.getElementById('pkm-err');
  var remember = document.getElementById('pkm-remember');
  var KEY = 'pkm.pass.' + location.pathname;
  function b64u(s) { return Uint8Array.from(atob(s), function (c) { return c.charCodeAt(0); }); }
  function enc(s) { return btoa(unescape(encodeURIComponent(s))); }
  function dec(s) { return decodeURIComponent(escape(atob(s))); }
  /* 解锁后重建主题切换与本页大纲：共享组件（与站点 ui.js 同一份实现，mdh/ui_widgets.js）*/
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
      clean(getComputedStyle(el).fontFamily).forEach(function (font) {
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

  // 原始 .md 加密产物存在时提供「下载 Markdown」（解锁后按需 fetch + 解密，页面加载不加载 .md.enc）
  var HAS_MD = document.body.getAttribute('data-has-md') === '1';
  var lastPass = '';
  function deriveKey(pass, cached) {
    // 命中缓存密钥则直接 importKey、跳过 PBKDF2（手机自动解锁秒进）；否则走密码派生
    return cached
      ? crypto.subtle.importKey('raw', b64u(cached), { name: 'AES-GCM' }, false, ['decrypt'])
      : crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey'])
          .then(function (km) {
            return crypto.subtle.deriveKey(
              { name: 'PBKDF2', salt: b64u(data.salt), iterations: data.iter, hash: 'SHA-256' },
              km, { name: 'AES-GCM', length: 256 }, true, ['decrypt']);
          });
  }
  function downloadMd() {
    if (!HAS_MD) return;
    var ck = 'pkm.key.' + KEY + '.' + data.salt;
    var cached = localStorage.getItem(ck);
    fetch(location.pathname.replace(/\.html$/, '.md.enc'))
      .then(function (r) { return r.json(); })
      .then(function (mdData) {
        return deriveKey(lastPass, cached).then(function (k) {
          return crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64u(mdData.iv) }, k, b64u(mdData.cipher))
            .then(function (plain) {
              var name = location.pathname.split('/').pop().replace(/\.html$/, '.md');
              var url = URL.createObjectURL(new Blob([new TextDecoder().decode(plain)], { type: 'text/markdown' }));
              var a = document.createElement('a');
              a.href = url; a.download = name;
              document.body.appendChild(a); a.click(); document.body.removeChild(a);
              setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
            });
        });
      })
      .catch(function () {});
  }
  function unlock(auto) {
    var pass = input.value;
    lastPass = pass;
    btn.disabled = true;
    err.textContent = '';
    var ck = 'pkm.key.' + KEY + '.' + data.salt;      // 密钥缓存：键名含 salt，重新导出后自动失效
    // 只有自动解锁（记住密码流程）才允许复用缓存密钥；
    // 手动输入密码一律走密码派生，密码错误必须真的报错，不能用缓存密钥绕过校验
    var cached = auto ? localStorage.getItem(ck) : null;
    deriveKey(pass, cached)
      .then(function (key) {
        return crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64u(data.iv) }, key, b64u(data.cipher))
          .then(function (plain) { return { key: key, plain: plain }; });
      })
      .then(function (r) {
        if (remember.checked) {
          localStorage.setItem(KEY, enc(pass));
          if (!cached) {
            crypto.subtle.exportKey('raw', r.key).then(function (raw) {
              localStorage.setItem(ck, btoa(String.fromCharCode.apply(null, new Uint8Array(raw))));
            });
          }
        } else {
          if (KEY in localStorage) { localStorage.removeItem(KEY); }
          if (cached) { localStorage.removeItem(ck); }
        }
        content.innerHTML = new TextDecoder().decode(r.plain);
        content.className = 'done';
        
    if (document.body.getAttribute('data-has-math') === '1') {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css';
      document.head.appendChild(css);
      const js = document.createElement('script');
      js.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js';
      js.onload = () => {
        const ar = document.createElement('script');
        ar.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js';
        ar.onload = () => window.renderMathInElement(content, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false,
        });
        document.body.appendChild(ar);
      };
      document.body.appendChild(js);
    }
        window.__pkmInitWidgets();
        if (HAS_MD) {
          var dlBtn = document.createElement('button');
          dlBtn.id = 'dl-btn'; dlBtn.type = 'button';
          dlBtn.setAttribute('aria-label', '下载 Markdown'); dlBtn.setAttribute('title', '下载 Markdown');
          dlBtn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M12 3v10m0 0l-4-4m4 4l4-4"/>' +
            '<path d="M5 19h14"/></svg>';
          dlBtn.addEventListener('click', downloadMd);
          var tg = document.getElementById('pkm-top-btns');
          if (tg) { tg.appendChild(dlBtn); } else { document.body.appendChild(dlBtn); }
        }
      })
      .catch(function () { document.documentElement.className = ''; err.textContent = '密码错误，请重试'; input.focus(); input.select(); })
      .finally(function () { btn.disabled = false; });
  }
  btn.addEventListener('click', function () { unlock(false); });
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') unlock(false); });
  // 记住的密码：本页优先，其次最近的父目录；自动填入并自动尝试解锁，对了直接进入，错了留在输入框由用户手动修改
  var autoKey = KEY in localStorage ? KEY : (function () {
    var q = location.pathname.split('/');
    for (var i = q.length - 2; i >= 1; i--) {
      var x = 'pkm.pass.' + q.slice(0, i + 1).join('/') + '/README.html';
      if (x in localStorage) return x;
    }
    return null;
  })();
  if (autoKey) {
    input.value = dec(localStorage.getItem(autoKey));
    unlock(true);
  } else {
    input.focus();
  }
})();