
(function () {
  "use strict";
  var PB = {};
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var R_NAMES = ["新思想", "语言表达", "时代意义", "社会名气", "重读意愿"];
  // 五维评分星：ratings[i] 为 1=亮★ / 0=灭☆ / 空=不可见占位（保持五位置对齐）；
  // hover 提示维度名：是/否
  function stars(ratings) {
    var s = "";
    for (var i = 0; i < 5; i++) {
      var v = ratings ? ratings[i] : null;
      var tip = R_NAMES[i];
      if (v === 1) s += '<span class="bk-s on" data-tip="' + tip + '：是">★</span>';
      else if (v === 0) s += '<span class="bk-s off" data-tip="' + tip + '：否">☆</span>';
      else s += '<span class="bk-s slot">☆</span>';
    }
    return '<span class="bk-stars">' + s + "</span>";
  }
  function compare(a, b, key, asc, get) {
    var va = get ? get(a, key) : a[key];
    var vb = get ? get(b, key) : b[key];
    var na = typeof va === "number", nb = typeof vb === "number";
    var c;
    if (na && nb) c = va - vb;
    else if (na) c = -1;
    else if (nb) c = 1;
    else c = String(va || "").localeCompare(String(vb || ""), "zh");
    return asc ? c : -c;
  }
  // 就地排序；state.key 为空（如总览页初始不排序）则保持原序
  function sort(rows, state, get) {
    if (!state.key) return rows;
    rows.sort(function (a, b) { return compare(a, b, state.key, state.asc, get); });
    return rows;
  }
  function bindSort(ths, state, onSort) {
    ths.forEach(function (th) {
      th.addEventListener("click", function () {
        var k = th.getAttribute("data-k");
        if (state.key === k) state.asc = !state.asc;
        else { state.key = k; state.asc = true; }
        ths.forEach(function (t) {
          t.classList.toggle("sorted", t === th);
          t.querySelector(".bk-sort").textContent = (t === th) ? (state.asc ? "▲" : "▼") : "";
        });
        onSort();
      });
    });
  }
  function fill(tbody, rows, makeRow, emptyHtml) {
    var html = "";
    for (var i = 0; i < rows.length; i++) html += makeRow(rows[i]);
    tbody.innerHTML = html || emptyHtml;
  }
  // 自定义下拉（替代原生 select）：按钮折叠 + 展开列表，点击选项回调 data-v。
  // 点击外部或 Esc 收起；每个实例向 document 注册，互斥展开。
  function dd(root, onPick) {
    var trigger = root.querySelector(".pkm-dd-trigger");
    var list = root.querySelector(".pkm-dd-list");
    var label = root.querySelector(".pkm-dd-label");
    var items = Array.prototype.slice.call(list.querySelectorAll(".pkm-dd-item"));
    var hideTimer = null;
    function open() { clearTimeout(hideTimer); root.classList.add("open"); }
    function close() { root.classList.remove("open"); }
    function scheduleClose() { clearTimeout(hideTimer); hideTimer = setTimeout(close, 150); }
    trigger.addEventListener("click", function () {
      if (root.classList.contains("open")) close();
      else open();
    });
    trigger.addEventListener("mouseenter", open);
    trigger.addEventListener("mouseleave", scheduleClose);
    list.addEventListener("mouseenter", function () { clearTimeout(hideTimer); });
    list.addEventListener("mouseleave", scheduleClose);
    list.addEventListener("click", function (e) {
      var it = e.target.closest(".pkm-dd-item");
      if (!it) return;
      label.textContent = it.textContent;
      items.forEach(function (x) { x.classList.toggle("sel", x === it); });
      close();
      if (onPick) onPick(it.getAttribute("data-v"));
    });
    document.addEventListener("click", function (e) {
      if (!root.contains(e.target)) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    return { close: close };
  }
  // 评分维度多选下拉：复选框点选/清除，不收起；onPick 回调传选中的维度下标数组
  function rateDD(root, onPick) {
    var trigger = root.querySelector(".pkm-dd-trigger");
    var list = root.querySelector(".pkm-dd-list");
    var label = root.querySelector(".pkm-dd-label");
    var boxes = Array.prototype.slice.call(list.querySelectorAll('input[type="checkbox"]'));
    var clear = list.querySelector(".pkm-dd-clear");
    var hideTimer = null;
    function open() { clearTimeout(hideTimer); root.classList.add("open"); }
    function close() { root.classList.remove("open"); }
    function scheduleClose() { clearTimeout(hideTimer); hideTimer = setTimeout(close, 150); }
    function picked() {
      return boxes.filter(function (b) { return b.checked; })
                  .map(function (b) { return b.getAttribute("data-i"); });
    }
    function update() {
      var n = picked().length;
      label.textContent = n ? "评分 " + n + " 项" : "评分全部";
    }
    trigger.addEventListener("click", function () {
      if (root.classList.contains("open")) close(); else open();
    });
    trigger.addEventListener("mouseenter", open);
    trigger.addEventListener("mouseleave", scheduleClose);
    list.addEventListener("mouseenter", function () { clearTimeout(hideTimer); });
    list.addEventListener("mouseleave", scheduleClose);
    list.addEventListener("click", function (e) {
      var box = e.target.closest('input[type="checkbox"]');
      if (box) { box.checked = !box.checked; update(); if (onPick) onPick(picked()); return; }
      if (clear && e.target.closest(".pkm-dd-clear")) {
        boxes.forEach(function (b) { b.checked = false; });
        update();
        if (onPick) onPick([]);
      }
    });
    document.addEventListener("click", function (e) {
      if (!root.contains(e.target)) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    return { close: close };
  }
  window.PKMBooks = { esc: esc, stars: stars, sort: sort, bindSort: bindSort, fill: fill, dd: dd, rateDD: rateDD };
})();
