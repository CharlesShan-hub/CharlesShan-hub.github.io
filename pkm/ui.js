/* pkmizer ui.js - 主题切换 / 文件树 / 目录 / 图片放大 */
(function () {
  "use strict";
  var C = window.PKM || {};
  var THEMES = C.themes || [];
  var THEMES_BASE = C.themesBase || "themes/";
  var DEFAULT_THEME = C.defaultTheme || (THEMES[0] || "");
  var SITE_TREE = C.siteTree || "site-tree.json";

  // 「当前页的站点相对 rel」：线上/仓库根部署时 pathname 带站点前缀（如 /pkm/），
  // 而站点树里的 rel 相对 pkm 站点根；用 SITE_TREE 反解出根目录把前缀剥掉，
  // 文件树高亮 / 书页翻页条 / md 下载三处共用
  var SITE_ROOT = "";
  try { SITE_ROOT = decodeURIComponent(new URL(SITE_TREE, location.href).pathname.replace(/[^/]*$/, "")); } catch (e) {}
  var curSiteRel = function () {
    var p = decodeURIComponent(location.pathname);
    if (SITE_ROOT && SITE_ROOT !== "/" && p.indexOf(SITE_ROOT) === 0) p = p.slice(SITE_ROOT.length);
    return p.replace(/^\//, "");
  };

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
    panel.innerHTML = '<div class="nav-head">&nbsp;<span class="nav-filters"></span></div>' +
      '<ul class="nav-tree"><li class="nav-empty">加载中...</li></ul>';
    addSideBtn(btn);
    document.body.appendChild(panel);

    refreshPanelTheme();
    window.addEventListener("pkm-theme-applied", refreshPanelTheme);

    /* 桌面/平板（>900px）停靠模式：面板占真实布局空间（body 左留白让位），
       像编辑器左侧文件区，点正文不收起；手机端维持滑出弹层。开合与宽度都记忆。 */
    var isDesktop = function () {
      return !window.matchMedia || !window.matchMedia("(max-width: 900px)").matches;
    };
    var DOCK_KEY = "pkm-nav-open", W_KEY = "pkm-nav-width";
    var setDock = function (on) {
      document.body.classList.toggle("nav-dock-open", on);
    };
    var toggle = function () {
      panel.classList.toggle("open");
      var open = panel.classList.contains("open");
      btn.classList.toggle("open", open);
      if (isDesktop()) {
        setDock(open);
        try { localStorage.setItem(DOCK_KEY, open ? "1" : "0"); } catch (e) {}
      }
    };
    btn.addEventListener("click", function (e) { e.stopPropagation(); toggle(); });
    document.addEventListener("click", function (e) {
      if (panel.classList.contains("open") && !isDesktop() &&
          !panel.contains(e.target) && e.target !== btn) toggle();
    });

    // 右缘分割线拖拽调宽（180~520px），宽度记忆在 localStorage
    var resizer = document.createElement("div");
    resizer.className = "nav-resizer";
    panel.appendChild(resizer);
    var navW = 260;
    try {
      var savedW = parseInt(localStorage.getItem(W_KEY), 10);
      if (!isNaN(savedW) && savedW >= 180 && savedW <= 520) navW = savedW;
    } catch (e) {}
    document.documentElement.style.setProperty("--pkm-nav-dock-w", navW + "px");
    resizer.addEventListener("pointerdown", function (e) {
      if (!isDesktop()) return;
      e.preventDefault();
      resizer.setPointerCapture(e.pointerId);
      var startX = e.clientX, startW = navW;
      document.body.classList.add("nav-resizing");
      var move = function (ev) {
        navW = Math.min(520, Math.max(180, startW + ev.clientX - startX));
        document.documentElement.style.setProperty("--pkm-nav-dock-w", navW + "px");
      };
      var up = function () {
        resizer.removeEventListener("pointermove", move);
        resizer.removeEventListener("pointerup", up);
        resizer.removeEventListener("pointercancel", up);
        document.body.classList.remove("nav-resizing");
        try { localStorage.setItem(W_KEY, String(navW)); } catch (e2) {}
      };
      resizer.addEventListener("pointermove", move);
      resizer.addEventListener("pointerup", up);
      resizer.addEventListener("pointercancel", up);
    });

    // 上次停靠开着：本页（桌面端）免动画直接恢复，避免每次翻页都闪一下滑入
    try {
      if (isDesktop() && localStorage.getItem(DOCK_KEY) === "1") {
        panel.style.transition = "none";
        document.body.style.transition = "none";
        panel.classList.add("open");
        btn.classList.add("open");
        setDock(true);
        requestAnimationFrame(function () {
          panel.style.transition = "";
          document.body.style.transition = "";
        });
      }
    } catch (e) {}

    var base = SITE_TREE.replace(/site-tree\.json$/, "");
    var curRel = curSiteRel();
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

    /* ===== 类型标签筛选：头部四个彩色圆点（配色与正文标签胶囊同一哈希色板），
       点按熄灭/点亮对应类型（note/catalog/book/attachment），状态记忆；
       过滤后整树重建，折叠状态与当前页高亮随 buildNode 自动恢复 ===== */
    var TYPE_TAGS = ["note", "catalog", "book", "attachment"];
    var FILTER_KEY = "pkm-nav-tagfilter";
    var tagsOff = {};
    try { tagsOff = JSON.parse(localStorage.getItem(FILTER_KEY)) || {}; } catch (e) { tagsOff = {}; }
    var tagColor = function (t) {
      var h = 0;
      for (var i = 0; i < t.length; i++) h += t.charCodeAt(i);
      // 与 python 端 decorate_body 的标签配色同一哈希（ord 求和 % 6）
      return ["#007ec6", "#97ca00", "#dfb317", "#8a2be2", "#e05d44", "#fe7d37"][h % 6];
    };
    var fileVisible = function (node) {
      var tags = node.tags || [];
      for (var i = 0; i < tags.length; i++) {
        if (TYPE_TAGS.indexOf(tags[i]) > -1) return !tagsOff[tags[i]];
      }
      return true; // 无类型标签的文件不参与筛选，始终显示
    };
    var fbox = panel.querySelector(".nav-filters");
    TYPE_TAGS.forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "nav-filter" + (tagsOff[t] ? " off" : "");
      b.style.setProperty("--badge-color", tagColor(t));
      b.title = t;
      b.setAttribute("aria-label", "筛选 " + t);
      b.addEventListener("click", function () {
        tagsOff[t] = !tagsOff[t];
        b.classList.toggle("off", tagsOff[t]);
        try { localStorage.setItem(FILTER_KEY, JSON.stringify(tagsOff)); } catch (e) {}
        if (treeCache) renderTree(treeCache);
      });
      fbox.appendChild(b);
    });

    /* ===== 聚焦模式：右键/长按文件夹「只展示本文件夹」，头部徽章一键恢复 ===== */
    var FOCUS_KEY = "pkm-nav-focus";
    var focusRel = "";
    try { focusRel = localStorage.getItem(FOCUS_KEY) || ""; } catch (e) { focusRel = ""; }
    var findDir = function (node, rel) {
      if (node.type !== "dir") return null;
      if (node.rel === rel) return node;
      var kids = node.children || [];
      for (var i = 0; i < kids.length; i++) {
        var f = findDir(kids[i], rel);
        if (f) return f;
      }
      return null;
    };
    var headEl = panel.querySelector(".nav-head");
    var renderFocusBadge = function () {
      var old = headEl.querySelector(".nav-focus");
      if (old) old.remove();
      if (!focusRel) return;
      var b = document.createElement("span");
      b.className = "nav-focus";
      b.title = focusRel;
      var name = document.createElement("span");
      name.className = "nav-focus-name";
      name.textContent = focusRel.replace(/\/$/, "").split("/").pop();
      var x = document.createElement("button");
      x.type = "button"; x.className = "nav-focus-x"; x.title = "展示全部文件";
      x.textContent = "×";
      x.addEventListener("click", function () { setFocus(""); });
      b.appendChild(name); b.appendChild(x);
      headEl.insertBefore(b, fbox);
    };
    var setFocus = function (rel) {
      focusRel = rel || "";
      try {
        if (focusRel) localStorage.setItem(FOCUS_KEY, focusRel);
        else localStorage.removeItem(FOCUS_KEY);
      } catch (e) {}
      renderFocusBadge();
      if (treeCache) renderTree(treeCache);
    };
    renderFocusBadge(); // 启动时按 localStorage 恢复聚焦徽章

    /* 右键/长按文件夹弹出聚焦菜单（fixed 挂 body，避开面板 transform 对定位的干扰） */
    var menu = document.createElement("div");
    menu.className = "nav-menu";
    menu.style.display = "none";
    document.body.appendChild(menu);
    var closeNavMenu = function () { menu.style.display = "none"; };
    var openNavMenu = function (x, y, rel) {
      menu.innerHTML = "";
      var mk = function (text, fn) {
        var it = document.createElement("button");
        it.type = "button"; it.className = "nav-menu-item"; it.textContent = text;
        it.addEventListener("click", function () { closeNavMenu(); fn(); });
        menu.appendChild(it);
      };
      mk("只展示本文件夹", function () { setFocus(rel); });
      if (focusRel) mk("展示全部文件", function () { setFocus(""); });
      menu.style.display = "block";
      var mw = menu.offsetWidth, mh = menu.offsetHeight;
      var left = x, top = y;
      if (left + mw > window.innerWidth - 8) left = window.innerWidth - mw - 8;
      if (top + mh > window.innerHeight - 8) top = window.innerHeight - mh - 8;
      menu.style.left = Math.max(8, left) + "px";
      menu.style.top = Math.max(8, top) + "px";
    };
    document.addEventListener("click", closeNavMenu);
    document.addEventListener("contextmenu", function (e) {
      if (!menu.contains(e.target)) closeNavMenu();
    });
    box.addEventListener("contextmenu", function (e) {
      var li = e.target.closest("li.nav-dir");
      if (!li || !li.dataset.rel) return;
      e.preventDefault();
      e.stopPropagation(); // 阻止冒泡到 document 的关闭监听，否则菜单刚开就被关掉
      openNavMenu(e.clientX, e.clientY, li.dataset.rel);
    });
    // 长按（触屏）500ms 触发同一菜单；移动超 10px 或抬起视为取消
    var lpTimer = null, lpXY = null;
    var lpCancel = function () { if (lpTimer) { clearTimeout(lpTimer); lpTimer = null; } };
    box.addEventListener("touchstart", function (e) {
      var li = e.target.closest("li.nav-dir");
      if (!li || !li.dataset.rel) return;
      var t = e.touches[0];
      lpXY = { x: t.clientX, y: t.clientY };
      lpTimer = setTimeout(function () {
        lpTimer = null;
        openNavMenu(lpXY.x, lpXY.y, li.dataset.rel);
      }, 500);
    }, { passive: true });
    box.addEventListener("touchmove", function (e) {
      if (!lpTimer || !lpXY) return;
      var t = e.touches[0];
      if (Math.abs(t.clientX - lpXY.x) > 10 || Math.abs(t.clientY - lpXY.y) > 10) lpCancel();
    }, { passive: true });
    box.addEventListener("touchend", lpCancel);
    box.addEventListener("touchcancel", lpCancel);

    var treeCache = null;
    var renderTree = function (root) {
      box.innerHTML = "";
      var shown = root;
      if (focusRel) {
        shown = findDir(root, focusRel);
        if (!shown) { setFocus(""); shown = root; } // 聚焦目录已不存在，退回全部
      }
      var kids = focusRel ? [shown] : (shown.children || []);
      if (!kids.length) {
        box.innerHTML = '<li class="nav-empty">暂无文件</li>';
        return;
      }
      kids.forEach(function (c) {
        var n = buildNode(c, 0);
        if (n) box.appendChild(n);
      });
      // 首次使用（无折叠记录）时展开当前文件所在路径，之后尊重用户折叠状态
      if (navFirst) expandActive(box);
    };
    fetch(SITE_TREE)
      .then(function (r) { return r.json(); })
      .then(function (root) {
        treeCache = root;
        renderTree(root);
      })
      .catch(function () {
        box.innerHTML = '<li class="nav-empty">文件树加载失败</li>';
      });
    function buildNode(node, depth) {
      if (node.type !== "dir" && !fileVisible(node)) return null;
      var li = document.createElement("li");
      if (node.type === "dir") {
        // 折叠状态：用户记录优先，无记录时非顶层目录默认折叠
        var collapsed = (node.rel in userCollapsed) ? userCollapsed[node.rel] : depth > 0;
        li.className = "nav-dir" + (collapsed ? " collapsed" : "");
        li.dataset.rel = node.rel; // 右键/长按菜单定位文件夹用
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
        var kids = [];
        (node.children || []).forEach(function (c) {
          var n = buildNode(c, depth + 1);
          if (n) kids.push(n);
        });
        if (!kids.length) return null; // 子树全被筛掉，目录一并隐藏
        kids.forEach(function (n) { ul.appendChild(n); });
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

  /* ===== 书页翻页条（GitBook 式）：book+catalog 目录页定义的阅读链 =====
     站点树里当前页挂有 prev/next（导出端 _attach_pager_chain 生成）时，
     正文底部渲染 上一篇/下一篇；普通笔记页/首页无链信息不渲染。 */
  (function () {
    var curRel = curSiteRel();
    var content = document.getElementById("pkm-content");
    if (!content) return;
    var base = SITE_TREE.replace(/site-tree\.json$/, "");
    fetch(SITE_TREE)
      .then(function (r) { return r.json(); })
      .then(function (root) {
        var node = null;
        (function find(n) {
          if (n.type === "dir") { (n.children || []).forEach(find); return; }
          if (n.rel === curRel) node = n;
        })(root);
        if (!node || (!node.next && !node.prev)) return;
        var nav = document.createElement("nav");
        nav.className = "pkm-pager";
        if (node.prev) {
          var pa = document.createElement("a");
          pa.className = "pager-prev"; pa.href = base + node.prev;
          var pArrow = document.createElement("span"); pArrow.className = "pager-arrow"; pArrow.textContent = "←";
          var pWrap = document.createElement("span"); pWrap.className = "pager-wrap";
          var pLabel = document.createElement("span"); pLabel.className = "pager-label"; pLabel.textContent = "上一篇";
          var pTitle = document.createElement("span"); pTitle.className = "pager-title"; pTitle.textContent = node.prevTitle || "";
          pWrap.appendChild(pLabel); pWrap.appendChild(pTitle);
          pa.appendChild(pArrow); pa.appendChild(pWrap);
          nav.appendChild(pa);
        }
        if (node.next) {
          var na = document.createElement("a");
          na.className = "pager-next"; na.href = base + node.next;
          var nWrap = document.createElement("span"); nWrap.className = "pager-wrap";
          var nLabel = document.createElement("span"); nLabel.className = "pager-label"; nLabel.textContent = "下一篇";
          var nTitle = document.createElement("span"); nTitle.className = "pager-title"; nTitle.textContent = node.nextTitle || "";
          nWrap.appendChild(nLabel); nWrap.appendChild(nTitle);
          var nArrow = document.createElement("span"); nArrow.className = "pager-arrow"; nArrow.textContent = "→";
          na.appendChild(nWrap); na.appendChild(nArrow);
          nav.appendChild(na);
        }
        content.parentNode.insertBefore(nav, content.nextSibling);
      })
      .catch(function () {});
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
      { v: "1", label: "1 行" },
      { v: "2", label: "2 行" },
      { v: "3", label: "3 行" },
      { v: "4", label: "4 行" }
    ];
    var GAP_KEY = "pkm-para-gap-";
    var gapStored = function () {
      var v = null;
      try { v = localStorage.getItem(GAP_KEY + themeName()); } catch (e) {}
      return v;
    };
    // 实时应用：注入/移除 <style> 覆盖规则（0.5 行为默认观感，default 还原主题自带间距）
    var gapApply = function (v) {
      var em = v === "default" ? null : v === "0" ? "0" : v + "em";
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
    // 应用选择：标题逐个内联覆盖，代码走 CSS 变量；正文注入 <style> 规则——
    // 主题常把正文字体显式声明在 #pkm-content/#write/p 等深层，改 body 的继承传不到
    // （表现为"设了正文只有标题变"），故用 :not 链直接命中正文文本元素，
    // 排除标题与 pre/code 等宽区域、UI 按钮、字体浮层自身；宿主：公开页 #pkm-content、私密页 body.done
    var BODY_NOT = ":not(h1):not(h2):not(h3):not(h4):not(h5):not(h6)" +
      ":not(pre):not(code):not(kbd):not(samp):not(button):not(svg)" +
      ":not(#font-pop):not(#font-pop *)";
    var applyCat = function (cat, font) {
      var quoted = font && /[\s"'(),/]/.test(font) ? '"' + font + '"' : font;
      if (cat === CATS.body) {
        var styleEl = document.getElementById("pkm-font-body");
        if (!font) {
          if (styleEl) styleEl.remove();
        } else {
          var host = document.getElementById("pkm-content") ? "#pkm-content" : "body.done";
          if (!styleEl) {
            styleEl = document.createElement("style");
            styleEl.id = "pkm-font-body";
            document.head.appendChild(styleEl);
          }
          styleEl.textContent = host + ", " + host + " *" + BODY_NOT +
            " { font-family: " + quoted + " !important; }";
        }
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

    var open = function () {
      panel.classList.add("open");
      btn.classList.add("open");
      // 打开时把列表滚到当前阅读位置：目录长了当前项可能在可视区外，
      // 虽有 .active 高亮但看不到，表现为"没找到本页位置"
      if (cur) {
        panel.scrollTop = Math.max(0, cur.offsetTop - panel.clientHeight / 2 + cur.offsetHeight / 2);
      }
    };
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

  /* ===== comment 备注气泡配色：取引用框（blockquote）的背景/文字色 =====
     气泡原用标题文字色当背景、页面背景色当文字，部分主题下对比失效看不见。
     各主题引用框样式来源不一（CSS 变量/硬编码/仅左边框），静态 CSS 无法引用，
     运行时测实际渲染出的引用框 computed style 写成变量，供 .pkm-info-pop 使用；
     页面没有引用框时临时插探针测量后移除，主题切换时重测。 */
  (function () {
    var applyPopColors = function () {
      var host = document.getElementById("pkm-content") ||
        (document.body.classList.contains("done") ? document.body : null);
      if (!host) return;
      var probe = null;
      var bq = host.querySelector("blockquote");
      if (!bq) {
        probe = document.createElement("blockquote");
        probe.innerHTML = "<p>x</p>";
        host.appendChild(probe);
        bq = probe;
      }
      var cs = getComputedStyle(bq);
      var fg = cs.color;
      var bg = cs.backgroundColor;
      // 无背景的引用框（仅左边框风格）：用其文字色淡淡混入页面背景，兜出气泡底色
      if (bg === "transparent" || /rgba\([^)]+,\s*0\)$/.test(bg)) {
        var pageBg = getComputedStyle(document.body).getPropertyValue("--bg-color").trim() || "#fff";
        bg = "color-mix(in srgb, " + fg + " 9%, " + pageBg + ")";
      }
      var st = document.documentElement.style;
      st.setProperty("--pkm-info-pop-bg", bg);
      st.setProperty("--pkm-info-pop-fg", fg);
      if (probe) probe.remove();
    };
    applyPopColors();
    window.addEventListener("pkm-theme-applied", applyPopColors);
  })();
};

  window.__pkmInitWidgets();

  /* ===== 下载 Markdown（右上按钮组）===== */
  (function () {
    var curRel = curSiteRel();
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

  /* ===== 复制短链（右上按钮组，下载按钮旁）=====
     页面 config 带 short 码（导出端按路径哈希生成）时显示；点击复制 /s?short= 短链 */
  (function () {
    var C = window.PKM || {};
    if (!C.short) return;
    var btn = document.createElement("button");
    btn.id = "share-btn"; btn.type = "button";
    btn.setAttribute("aria-label", "复制短链"); btn.setAttribute("title", "复制短链");
    btn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>';
    var fallback = function (text) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
    };
    btn.addEventListener("click", function () {
      var url = location.origin + SITE_ROOT + "s?short=" + C.short;
      var done = function () {
        btn.setAttribute("title", "已复制");
        setTimeout(function () { btn.setAttribute("title", "复制短链"); }, 1200);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, function () { fallback(url); done(); });
      } else { fallback(url); done(); }
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
          var tags = node.tags || [];
          var hitTags = tags.filter(function (t) {
            return t.toLowerCase().indexOf(q) > -1;
          });
          if (node.name.toLowerCase().indexOf(q) > -1 || hitTags.length) {
            hits.push({ rel: node.rel, name: node.name, path: path, hitTags: hitTags });
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
        row.appendChild(name);
        // 标签命中时在标题行展示命中标签，说明为什么搜到
        (h.hitTags || []).forEach(function (t) {
          var tag = document.createElement("span");
          tag.className = "search-tag";
          tag.textContent = t;
          name.appendChild(tag);
        });
        var path = document.createElement("div");
        path.className = "search-path";
        path.textContent = h.path;
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
