
(function () {
  "use strict";
  var PB = {};
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function stars(n) {
    if (n == null || n < 1) return "";
    if (n > 5) n = 5;
    var s = "";
    for (var i = 0; i < n; i++) s += "★";
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
  window.PKMBooks = { esc: esc, stars: stars, sort: sort, bindSort: bindSort, fill: fill };
})();
