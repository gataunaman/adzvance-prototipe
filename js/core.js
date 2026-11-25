/* ADZVANCE prototype: state, helpers, routing. Plain script, no build step. */
(function () {
  var KEY = 'adzvance-demo-v5';
  /* preview switch for the colourful app theme: ?theme=colour turns it on (remembered), ?theme=off clears it */
  (function () {
    var q = (location.search.match(/[?&]theme=([a-z]+)/) || [])[1], t;
    try { if (q === 'off') localStorage.removeItem('adz-theme'); else if (q) localStorage.setItem('adz-theme', q); t = localStorage.getItem('adz-theme'); } catch (e) { t = q !== 'off' ? q : null; }
    if (t === 'colour') document.documentElement.dataset.theme = 'colour';
  })();
  var A = window.A ={ V: {}, ACT: {}, FORM: {}, ui: { filters: {}, q: '', subj: 'all', skill: null, kelas: null, viewUser: null, viewLomba: 'esai-energi', viewThread: 'th1', editLomba: null, menu: false } };

  /* ---------- store ---------- */
  function load() {
    try { var raw = localStorage.getItem(KEY); if (raw) { var s = JSON.parse(raw); if (s && s.version === 5) return s; } } catch (e) {}
    return window.SEED();
  }
  A.S = load();
  A.save = function () { try { localStorage.setItem(KEY, JSON.stringify(A.S)); } catch (e) {} };
  A.reset = function () { try { localStorage.removeItem(KEY); } catch (e) {} A.S = window.SEED(); A.ui.filters = {}; A.ui.q = ''; A.toast('Demo dikembalikan ke awal'); A.go('#masuk'); A.render(true); };

  /* ---------- helpers ---------- */
  A.esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  A.ic = function (name, cls) { return '<i data-lucide="' + name + '"' + (cls ? ' class="' + cls + '"' : '') + ' aria-hidden="true"></i>'; };
  A.stu = function (id) { return A.S.students.find(function (s) { return s.id === id; }); };
  A.me = function () { return A.S.me ? A.stu(A.S.me) : null; };
  A.isAdmin = function () { var m = A.me(); return !!(A.S.dev || (m && m.admin)); };
  A.lomba = function (id) { return A.S.lomba.find(function (l) { return l.id === id; }); };
  A.cat = function (k) { return A.S.cats[k] || { name: k, icon: 'award' }; };
  A.uid = function (p) { return (p || 'x') + Date.now().toString(36) + Math.floor(Math.random() * 1e4); };
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  A.dateAt = function (d, withYear) { var t = new Date(); t.setDate(t.getDate() + (d || 0)); return t.getDate() + ' ' + MONTHS[t.getMonth()] + (withYear === false ? '' : ' ' + t.getFullYear()); };
  A.now = function () { var t = new Date(); return ('0' + t.getHours()).slice(-2) + '.' + ('0' + t.getMinutes()).slice(-2); };
  A.fee = function (n) { return n ? 'Rp ' + Number(n).toLocaleString('id-ID') : 'Gratis'; };
  A.short = function (s) { var p = s.name.split(' '); return p[0] + (p[1] ? ' ' + p[1][0] + '.' : ''); };
  A.avatar = function (s, extra) {
    if (!s) return '';
    var own = s.id === A.S.me;
    return '<a class="avatar av--' + (s.av || '') + (extra ? ' ' + extra : '') + '" href="' + (own ? '#profil' : '#orang') + '" data-act="view-user" data-id="' + s.id + '" aria-label="Profil ' + A.esc(s.name) + '">' + s.ini + '</a>';
  };
  A.name = function (s, short) {
    if (!s) return '';
    var own = s.id === A.S.me;
    return '<a class="name-link" href="' + (own ? '#profil' : '#orang') + '" data-act="view-user" data-id="' + s.id + '">' + A.esc(short ? A.short(s) : s.name) + '</a>';
  };
  A.org = function (pair, sm) {
    var o = A.S.orgs[pair[0]] || { name: pair[0], icon: 'users' };
    return '<span class="org' + (pair[0] === 'osis' ? ' org--osis' : '') + (sm ? ' org--sm' : '') + '">' + A.ic(o.icon) + A.esc(pair[1] + ' ' + o.name) + '</span>';
  };
  A.topOrg = function (s) { return s && s.orgs && s.orgs.length ? A.org(s.orgs[0], true) : ''; };
  /* ---------- competition results ---------- */
  // wall: counts for the Wall of Fame; cls: colour; ladder: only on ladder competitions (OSN, FLS2N, O2SN, LKS)
  A.RESULTS = {
    'Terdaftar': {}, 'Tidak lolos': {}, 'Mundur': {},
    'Juara 1': { wall: 1, cls: 'gold' }, 'Juara 2': { wall: 1, cls: 'silver' }, 'Juara 3': { wall: 1, cls: 'bronze' },
    'Harapan 1': { wall: 1, cls: 'soft' }, 'Harapan 2': { wall: 1, cls: 'soft' }, 'Harapan 3': { wall: 1, cls: 'soft' },
    'Medali emas': { wall: 1, cls: 'gold' }, 'Medali perak': { wall: 1, cls: 'silver' }, 'Medali perunggu': { wall: 1, cls: 'bronze' },
    'Penghargaan khusus': { wall: 1, cls: 'special' },
    'Lolos ke tingkat berikutnya': { wall: 1, cls: 'soft', ladder: 1 }
  };
  A.LEVELS = ['Kabupaten/Kota', 'Provinsi', 'Nasional', 'Internasional'];
  A.resInfo = function (r) { return A.RESULTS[r] || {}; };
  A.isWin = function (e) { var r = A.resInfo(e.result); return !!(r.wall && (!r.ladder || e.ladder)); };
  A.eligible = function (e) { return A.isWin(e) && e.level !== 'Sekolah'; };
  A.resLabel = function (e) { return e.result === 'Penghargaan khusus' && e.award ? e.award : e.result === 'Lolos ke tingkat berikutnya' ? 'Lolos ke tingkat berikutnya' : e.result; };
  A.entriesOf = function (id) { return A.S.entries.filter(function (e) { return e.who.indexOf(id) !== -1; }); };
  A.entryFor = function (lombaId, id) { return A.S.entries.find(function (e) { return e.lomba === lombaId && e.who.indexOf(id || A.S.me) !== -1 && !e.next; }); };
  var MONTHS_L = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  A.monthKey = function (off) { var t = new Date(); t.setDate(1); t.setMonth(t.getMonth() + (off || 0)); return t.getFullYear() + '-' + ('0' + (t.getMonth() + 1)).slice(-2); };
  A.monthLabel = function (k) { var p = k.split('-'); return MONTHS_L[+p[1] - 1] + ' ' + p[0]; };
  /* the people on a public card: students who hid themselves are counted, not named, when logged out */
  A.whoShown = function (e) {
    var pub = !A.S.me, list = e.who.map(A.stu).filter(Boolean);
    var shown = pub ? list.filter(function (s) { return !s.fameHidden; }) : list;
    return { shown: shown, hidden: list.length - shown.length };
  };

  A.empty = function (icon, title, action) { return '<div class="empty">' + A.ic(icon) + '<p>' + title + '</p>' + (action || '') + '</div>'; };

  /* ---------- side effects ---------- */
  A.notify = function (who, n) {
    var ids = who === 'all' ? A.S.students.map(function (s) { return s.id; }) : [].concat(who);
    ids.forEach(function (id) { (A.S.notifs[id] = A.S.notifs[id] || []).unshift(Object.assign({ id: A.uid('n'), time: A.now(), read: false }, n)); });
  };
  A.audit = function (act, target) {
    var m = A.me();
    A.S.audit.unshift({ t: A.dateAt(0, false) + ', ' + A.now(), who: m ? A.short(m) + (m.admin ? ' (admin)' : '') : 'Developer', act: act, target: target });
  };

  var toastTimer;
  A.toast = function (msg) {
    var t = document.getElementById('toast');
    t.innerHTML = A.ic('check') + '<span>' + A.esc(msg) + '</span>';
    t.classList.add('is-on');
    if (window.lucide) lucide.createIcons();
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('is-on'); }, 2400);
  };

  /* sheet dialog for short forms */
  A.sheet = function (title, body, formName, submitLabel) {
    var d = document.getElementById('sheet');
    d.innerHTML = '<form method="dialog" class="sheet-form" data-form="' + formName + '">' +
      '<div class="sheet-form__head"><h2>' + A.esc(title) + '</h2><button class="icon-btn" type="button" data-act="close-sheet" aria-label="Tutup">' + A.ic('x') + '</button></div>' +
      '<div class="sheet-form__body">' + body + '</div>' +
      (submitLabel === false ? '' : '<div class="sheet-form__foot"><button class="btn btn--secondary" type="button" data-act="close-sheet">Batal</button><button class="btn btn--primary" type="submit">' + A.esc(submitLabel || 'Simpan') + '</button></div>') +
      '</form>';
    if (window.lucide) lucide.createIcons();
    if (!d.open) d.showModal();
    var first = d.querySelector('input, textarea, select'); if (first) first.focus();
  };
  A.closeSheet = function () { var d = document.getElementById('sheet'); if (d.open) d.close(); };

  /* ---------- routing ---------- */
  A.go = function (hash) { if (location.hash === hash) A.render(); else location.hash = hash; };
  A.screenOf = function () {
    var id = (location.hash || '#masuk').slice(1);
    var el = id && document.getElementById(id);
    if (!el) return { id: 'masuk', el: document.getElementById('masuk'), sub: false };
    var sc = el.classList.contains('screen') ? el : el.closest('.screen');
    return { id: sc ? sc.id : 'masuk', el: sc, sub: sc !== el };
  };

  A.render = function (keepScroll) {
    var s = A.screenOf(), el = s.el;
    var kind = el.classList.contains('screen--siswa') ? 'siswa' : el.classList.contains('screen--admin') ? 'admin' : el.classList.contains('screen--dev') ? 'dev' : el.classList.contains('screen--public') ? 'public' : 'auth';
    if (kind === 'public' && s.id === 'home' && A.S.me) return A.go('#beranda');
    if (kind === 'siswa' && !A.S.me && !(A.S.dev && s.id === 'orang')) {
      if (s.id === 'wall' || s.id === 'prestasi') kind = 'public'; // the Wall of Fame is public
      else return A.go('#masuk');
    }
    if (kind === 'admin' && !A.isAdmin()) return A.go(A.S.me ? '#beranda' : '#masuk');
    if (kind === 'dev' && !A.S.dev) return A.go('#dev-masuk');
    if (kind === 'siswa') A.S.adminMode = false;
    if (kind === 'admin') A.S.adminMode = true;
    var view = A.V[s.id];
    var box = el.querySelector('.view');
    if (view && box) box.innerHTML = view();
    A.renderShells(s.id, kind);
    if (window.lucide) lucide.createIcons();
    if (!keepScroll && !s.sub) window.scrollTo(0, 0);
    A.ui.menu = false;
    document.body.dataset.kind = kind;
    if (!keepScroll) countUp();
    A.save();
  };
  /* colour theme: the days-left figure on the home deadline card counts up once */
  function countUp() {
    if (document.documentElement.dataset.theme !== 'colour' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('.feature .figure').forEach(function (el) {
      var to = parseInt(el.textContent, 10), t0 = performance.now();
      if (!(to > 0)) return;
      (function step(t) { var p = Math.min(1, (t - t0) / 500); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); })(t0);
    });
  }
  A.rerender = function () { var y = window.scrollY; A.render(true); window.scrollTo(0, y); };

  A.renderShells = function (id, kind) {
    document.querySelectorAll('[data-for]').forEach(function (a) {
      var on = a.getAttribute('data-for').split(' ').indexOf(id) !== -1;
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    var m = A.me();
    var unread = m ? (A.S.notifs[m.id] || []).filter(function (n) { return !n.read; }).length : 0;
    document.querySelectorAll('[data-fill="count"]').forEach(function (c) { c.textContent = unread; c.hidden = !unread; });
    document.querySelectorAll('[data-fill="me-avatar"]').forEach(function (a) {
      a.textContent = m ? m.ini : 'DV';
      a.className = 'avatar avatar-btn av--' + (m && m.av || '') + (A.isAdmin() && m ? ' has-shield' : '');
    });
    document.querySelectorAll('[data-fill="me-name"]').forEach(function (a) { a.textContent = m ? m.name : 'Developer'; });
    document.querySelectorAll('[data-fill="me-sub"]').forEach(function (a) { a.textContent = A.S.dev && !(m && m.admin) ? 'Developer' : (m ? m.kelas + (m.ketua ? ', Ketua OSIS' : ', admin') : ''); });
    var menu = document.getElementById('me-menu');
    if (menu) { menu.innerHTML = A.V._menu(); menu.hidden = true; }
    document.querySelectorAll('[data-fill="me-avatar"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    document.querySelectorAll('.side').forEach(function (sd) { sd.classList.remove('is-open'); });
    document.querySelectorAll('[data-fill="to-student"]').forEach(function (a) {
      var devOnly = A.S.dev && !m;
      a.setAttribute('href', devOnly ? '#dev' : '#beranda');
      a.querySelector('span').textContent = devOnly ? 'Konsol developer' : 'Tampilan siswa';
    });
    document.querySelectorAll('[data-fill="pub-cta"]').forEach(function (c) {
      c.innerHTML = m ? '<a class="btn btn--secondary" href="#beranda">' + A.ic('layout-grid') + 'Buka aplikasi</a>' : '<a class="btn btn--primary" href="#masuk">' + A.ic('log-in') + 'Masuk</a>';
    });
    document.querySelectorAll('.demo a[data-demo]').forEach(function (a) {
      var d = a.getAttribute('data-demo');
      var on = (d === 'siswa' && kind === 'siswa') || (d === 'admin' && kind === 'admin') || (d === 'dev' && kind === 'dev') || (d === 'masuk' && kind === 'auth') || (d === 'publik' && kind === 'public');
      a.setAttribute('aria-current', String(on));
    });
  };

  window.addEventListener('hashchange', function () { A.render(); });
  if (!location.hash) history.replaceState(null, '', A.S.me ? '#beranda' : A.S.dev ? '#dev' : '#home');
})();
