/* ADZVANCE variant 2: Papan Tulis. Hash routes: #beranda #lomba #lomba-detail[/id] #wall[/month] #profil */
(function () {
  var D = window.D, S = D.students, ME = S[D.me];
  var view = document.getElementById('view');

  /* ---------- state (bookmarks and joins kept per browser) ---------- */
  function load(k, def) { try { var v = localStorage.getItem('adz-v2-' + k); return v ? JSON.parse(v) : def; } catch (e) { return def; } }
  function save(k, v) { try { localStorage.setItem('adz-v2-' + k, JSON.stringify(v)); } catch (e) {} }
  var st = {
    saved: load('saved', D.bookmarks.slice()),
    joined: load('joined', D.joined.slice()),
    invite: load('invite', D.invite.status),
    q: '', cat: 'all', level: 'all', form: 'all', free: false, onlySaved: false, sort: 'dl'
  };

  /* ---------- helpers ---------- */
  var BLN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  var HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  var today = new Date();
  function day(n) { var d = new Date(today); d.setDate(d.getDate() + n); return d; }
  function short(d) { return d.getDate() + ' ' + BLN[d.getMonth()].slice(0, 3); }
  function long(d) { return HARI[d.getDay()] + ', ' + d.getDate() + ' ' + BLN[d.getMonth()]; }
  function month(off) { var d = new Date(today); d.setDate(1); d.setMonth(d.getMonth() + off); return { name: BLN[d.getMonth()], year: d.getFullYear() }; }
  function ago(n) { return n === -1 ? 'Kemarin' : (-n) + ' hari lalu'; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function rp(n) { return n ? 'Rp ' + n.toLocaleString('id-ID') : 'Gratis'; }
  function ic(name) { return '<i data-lucide="' + name + '" aria-hidden="true"></i>'; }
  function L(id) { return D.lomba.filter(function (l) { return l.id === id; })[0]; }
  function has(arr, v) { return arr.indexOf(v) > -1; }
  function av(id, size) { var s = S[id]; return '<span class="av' + (size ? ' av-' + size : '') + '" data-col="' + s.col + '" title="' + esc(s.name) + '">' + s.ini + '</span>'; }
  function first(id) { return S[id].name.split(' ')[0]; }

  /* ---------- pieces ---------- */
  function lcard(l) {
    var saved = has(st.saved, l.id), joined = has(st.joined, l.id);
    return '<article class="card lcard" data-cat="' + l.cat + '">' +
      '<a class="stretch" href="#lomba-detail/' + l.id + '"><span class="sr">' + esc(l.title) + '</span></a>' +
      '<div class="mag mag-days" aria-label="' + l.dl + ' hari lagi"><b>' + l.dl + '</b><span>hari</span></div>' +
      '<button class="save" type="button" data-save="' + l.id + '" aria-pressed="' + saved + '" aria-label="Simpan">' + ic('bookmark') + '</button>' +
      '<p class="lc-cat">' + D.cats[l.cat].name + (joined ? '<span class="ikut">' + ic('check') + 'Ikut</span>' : '') + '</p>' +
      '<h3 class="lc-title">' + esc(l.title) + '</h3>' +
      '<p class="lc-org">' + esc(l.org) + '</p>' +
      '<div class="lc-foot"><span class="pill">' + l.form + '</span><span class="pill">' + l.level + '</span><span class="pill">' + rp(l.fee) + '</span>' +
      '<span class="lc-close">Tutup ' + short(day(l.dl)) + '</span></div>' +
      '</article>';
  }

  /* ---------- Beranda ---------- */
  function beranda() {
    var closing = D.lomba.filter(function (l) { return has(st.saved, l.id) || has(st.joined, l.id); }).sort(function (a, b) { return a.dl - b.dl; }).slice(0, 3);
    var recs = D.lomba.filter(function (l) {
      return !has(st.saved, l.id) && !has(st.joined, l.id) && ME.interests.some(function (i) { return D.interestCat[i] === l.cat; });
    }).slice(0, 3);
    var inv = D.invite, il = L(inv.lomba), team = D.teams[0];

    var invite = st.invite === 'pending'
      ? '<article class="card invite" data-cat="' + il.cat + '">' +
          '<div class="mag mag-sm">' + ic('user-plus') + '</div>' +
          '<div class="inv-who">' + av(inv.from, 'lg') + '<div><p class="inv-line"><b>' + S[inv.from].name + '</b> mengajakmu ke timnya</p>' +
          '<a class="inv-lomba" href="#lomba-detail/' + il.id + '">' + esc(il.title) + '</a></div></div>' +
          '<div class="inv-act"><button class="btn btn-primary" type="button" data-invite="yes">Terima</button><button class="btn btn-line" type="button" data-invite="no">Nanti saja</button></div>' +
        '</article>'
      : st.invite === 'yes'
        ? '<article class="card invite is-done" data-cat="' + il.cat + '"><div class="mag mag-sm">' + ic('check') + '</div><div class="inv-who">' + av(inv.from, 'lg') + '<p class="inv-line">Kamu satu tim dengan <b>' + S[inv.from].name + '</b> di ' + esc(il.title) + '</p></div></article>'
        : '';

    var chat = team.messages.slice(-2).map(function (m) {
      var mine = m.from === D.me;
      return '<li class="msg' + (mine ? ' mine' : '') + '">' + (mine ? '' : av(m.from, 'sm')) + '<p><span class="msg-who">' + (mine ? 'Kamu' : first(m.from)) + ', ' + m.time + '</span>' + esc(m.text) + '</p></li>';
    }).join('');

    var anns = D.announcements.map(function (a) {
      var inner = '<p class="ann-t">' + (a.pinned ? '<span class="pin" aria-label="Disematkan"></span>' : '') + esc(a.title) + '</p><p class="ann-b">' + esc(a.body) + '</p><p class="ann-m">' + first(a.author) + ', ' + ago(a.d).toLowerCase() + '</p>';
      return '<li>' + (a.link ? '<a class="ann-link" href="' + a.link + '">' + inner + '</a>' : inner) + '</li>';
    }).join('');

    var wins = D.entries.filter(function (e) { return e.month === 0; }).length;
    var m0 = month(0);

    return '<div class="page home">' +
      '<div class="home-main">' +
        '<h1 class="display hello">Halo, Rizky</h1>' +
        invite +
        '<section class="sec"><div class="sh"><h2>Hampir tutup</h2><a class="more" href="#lomba">Semua lomba</a></div>' +
          '<div class="grid3">' + closing.map(lcard).join('') + '</div></section>' +
        '<section class="sec duo">' +
          '<article class="card teamcard"><div class="tc-head"><div><h2 class="tc-name">' + team.name + '</h2><a class="tc-lomba" href="#lomba-detail/' + team.lomba + '">' + esc(L(team.lomba).title) + '</a></div>' +
            '<div class="stack">' + team.members.map(function (m) { return av(m); }).join('') + '</div></div>' +
            '<ul class="chat">' + chat + '</ul>' +
            '<a class="btn btn-ink" href="#lomba-detail/' + team.lomba + '">Buka tim</a></article>' +
          '<a class="card wallteaser" href="#wall"><img src="../../img/school/life-group.jpg" alt="Siswi Adzkia belajar bersama di ruang kelas">' +
            '<span class="wt-label"><span class="wt-t">Wall of Fame</span><span class="wt-m">' + m0.name + ', ' + wins + ' prestasi</span></span></a>' +
        '</section>' +
        '<section class="sec"><div class="sh"><h2>Untukmu</h2></div><div class="grid3">' + recs.map(lcard).join('') + '</div></section>' +
      '</div>' +
      '<aside class="corner" aria-label="Hari ini">' +
        '<div class="date"><span class="date-d">' + HARI[today.getDay()] + '</span><span class="date-n">' + today.getDate() + '</span><span class="date-m">' + BLN[today.getMonth()] + ' ' + today.getFullYear() + '</span></div>' +
        '<h2 class="corner-h">Pengumuman</h2><ul class="anns">' + anns + '</ul>' +
      '</aside>' +
    '</div>';
  }

  /* ---------- Lomba list ---------- */
  function filtered() {
    var q = st.q.trim().toLowerCase();
    var out = D.lomba.filter(function (l) {
      if (st.cat !== 'all' && l.cat !== st.cat) return false;
      if (st.level !== 'all' && l.level !== st.level) return false;
      if (st.form !== 'all' && l.form !== st.form) return false;
      if (st.free && l.fee) return false;
      if (st.onlySaved && !has(st.saved, l.id)) return false;
      if (q && (l.title + ' ' + l.org).toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
    out.sort(function (a, b) {
      if (st.sort === 'new') return a.added - b.added;
      if (st.sort === 'az') return a.title.localeCompare(b.title, 'id');
      return a.dl - b.dl;
    });
    return out;
  }
  function results() {
    var list = filtered();
    if (!list.length) return '<div class="empty"><p class="empty-t">Belum ada yang cocok' + (st.q ? ' untuk “' + esc(st.q) + '”' : '') + '</p><button class="btn btn-primary" type="button" data-reset>Hapus filter</button></div>';
    return '<p class="count">' + list.length + ' lomba</p><div class="grid3">' + list.map(lcard).join('') + '</div>';
  }
  function sel(name, label, opts, val) {
    return '<label class="sel"><span class="sr">' + label + '</span><select data-f="' + name + '">' + opts.map(function (o) {
      return '<option value="' + o[0] + '"' + (o[0] === val ? ' selected' : '') + '>' + o[1] + '</option>';
    }).join('') + '</select>' + ic('chevron-down') + '</label>';
  }
  function lomba() {
    var chips = [['all', 'Semua']].concat(Object.keys(D.cats).map(function (k) { return [k, D.cats[k].name]; })).map(function (c) {
      return '<button class="chip" type="button" data-cat="' + c[0] + '" data-chip="' + c[0] + '" aria-pressed="' + (st.cat === c[0]) + '">' + (c[0] === 'all' ? '' : '<span class="dot"></span>') + c[1] + '</button>';
    }).join('');
    return '<div class="page">' +
      '<div class="list-head"><h1 class="display">Lomba</h1>' +
        '<label class="search">' + ic('search') + '<span class="sr">Cari lomba</span><input type="search" data-q placeholder="Cari lomba atau penyelenggara" value="' + esc(st.q) + '"></label></div>' +
      '<div class="chips" role="group" aria-label="Kategori">' + chips + '</div>' +
      '<div class="filters">' +
        sel('level', 'Tingkat', [['all', 'Semua tingkat'], ['Nasional', 'Nasional'], ['Provinsi', 'Provinsi'], ['Kabupaten', 'Kabupaten']], st.level) +
        sel('form', 'Bentuk', [['all', 'Online dan offline'], ['Online', 'Online'], ['Offline', 'Offline'], ['Hybrid', 'Hybrid']], st.form) +
        '<button class="toggle" type="button" data-t="free" aria-pressed="' + st.free + '">' + ic('badge-check') + 'Gratis</button>' +
        '<button class="toggle" type="button" data-t="onlySaved" aria-pressed="' + st.onlySaved + '">' + ic('bookmark') + 'Disimpan</button>' +
        '<span class="grow"></span>' +
        sel('sort', 'Urutkan', [['dl', 'Tutup paling dekat'], ['new', 'Baru ditambahkan'], ['az', 'Judul A sampai Z']], st.sort) +
      '</div>' +
      '<div id="results">' + results() + '</div>' +
    '</div>';
  }

  /* ---------- Lomba detail ---------- */
  function detail(id) {
    var l = L(id) || L('esai-energi'), c = D.cats[l.cat];
    var saved = has(st.saved, l.id), joined = has(st.joined, l.id);
    var team = D.teams.filter(function (t) { return t.lomba === l.id && has(t.members, D.me); })[0];
    var posts = D.posts.filter(function (p) { return p.lomba === l.id; });
    if (l.id === 'debat-ing' && st.invite === 'yes') team = { name: 'Tim ' + first('nadia'), members: ['nadia', 'rizky'] };

    var facts = [['Tema', l.tema], ['Peserta', l.peserta], ['Jenjang', l.jenjang]].filter(function (f) { return f[1]; });
    var body = '';
    if (facts.length) body += '<dl class="dfacts">' + facts.map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + esc(f[1]) + '</dd></div>'; }).join('') + '</dl>';
    if (l.syarat) body += '<section class="dsec"><h2>Syarat</h2><ul class="checks">' + l.syarat.map(function (s) { return '<li>' + ic('check') + esc(s) + '</li>'; }).join('') + '</ul></section>';
    if (l.hadiah) body += '<section class="dsec"><h2>Hadiah</h2><ol class="prizes">' + l.hadiah.map(function (h, i) { return '<li><span>Juara ' + (i + 1) + '</span><b>' + h + '</b></li>'; }).join('') + '</ol></section>';

    var tim;
    if (team) {
      tim = '<div class="myteam"><div class="stack">' + team.members.map(function (m) { return av(m); }).join('') + '</div><div><p class="mt-name">' + team.name + '</p><p class="mt-who">' +
        team.members.map(function (m) { return m === D.me ? 'Kamu' : first(m); }).join(', ') + '</p></div></div>';
    } else if (posts.length) {
      tim = posts.map(function (p) {
        return '<div class="post">' + av(p.author, 'lg') + '<div class="post-b"><p class="post-who"><b>' + S[p.author].name + '</b><span>' + S[p.author].kelas + '</span></p><p class="post-t">' + esc(p.text) + '</p>' +
          '<div class="post-f">' + p.skills.map(function (s) { return '<span class="pill">' + s + '</span>'; }).join('') + '<span class="slots">' + p.filled + ' dari ' + p.total + ' orang</span></div></div>' +
          '<button class="btn btn-line btn-sm" type="button" data-ask="' + p.author + '">Minta gabung</button></div>';
      }).join('');
    } else {
      tim = '<p class="none">Belum ada yang cari tim.</p><button class="btn btn-line" type="button" data-toast="Ajakan dipasang">Cari teman tim</button>';
    }
    body += '<section class="dsec"><h2>Tim</h2>' + tim + '</section>';
    if (l.kontak) body += '<section class="dsec"><h2>Kontak</h2><p class="kontak">' + esc(l.kontak) + '</p></section>';

    var dates = [['Tutup', long(day(l.dl))]];
    if (l.ev) dates.push(['Pelaksanaan', long(day(l.ev))]);
    if (l.ann) dates.push(['Pengumuman', long(day(l.ann))]);

    return '<div class="page">' +
      '<a class="back" href="#lomba">' + ic('arrow-left') + 'Lomba</a>' +
      '<div class="detail" data-cat="' + l.cat + '">' +
        '<article class="card dcard">' +
          '<header class="dhead"><span class="mag mag-pin mag-l" aria-hidden="true"></span><span class="mag mag-pin mag-r" aria-hidden="true"></span>' +
            '<p class="dcat">' + ic(c.icon) + c.name + '</p><h1 class="dtitle">' + esc(l.title) + '</h1><p class="dorg">' + esc(l.org) + '</p></header>' +
          '<div class="dbody">' + body + '</div>' +
        '</article>' +
        '<aside class="dside">' +
          '<div class="mag mag-big"><b>' + l.dl + '</b><span>hari lagi</span></div>' +
          '<dl class="cfacts">' + dates.map(function (d) { return '<div><dt>' + d[0] + '</dt><dd>' + d[1] + '</dd></div>'; }).join('') +
            '<div><dt>Bentuk</dt><dd>' + l.form + '</dd></div><div><dt>Tingkat</dt><dd>' + l.level + '</dd></div><div><dt>Biaya</dt><dd>' + rp(l.fee) + '</dd></div></dl>' +
          '<div class="dact"><button class="btn btn-primary btn-wide" type="button" data-join="' + l.id + '" aria-pressed="' + joined + '">' + (joined ? ic('check') + 'Kamu ikut' : 'Saya ikut') + '</button>' +
          '<button class="btn btn-chalk btn-wide" type="button" data-save="' + l.id + '" aria-pressed="' + saved + '">' + ic('bookmark') + (saved ? 'Disimpan' : 'Simpan') + '</button></div>' +
        '</aside>' +
      '</div></div>';
  }

  /* ---------- Wall of Fame ---------- */
  function wall(off) {
    off = Math.max(-2, Math.min(0, +off || 0));
    var m = month(off);
    var wins = D.entries.filter(function (e) { return e.month === off && e.status === 'verified' && !has(['Tidak lolos', 'Mundur', 'Terdaftar'], e.result); });
    var tabs = [0, -1, -2].map(function (o) {
      var mm = month(o);
      return '<a class="ed" href="#wall/' + o + '"' + (o === off ? ' aria-current="page"' : '') + '>' + mm.name + (o === 0 ? ' ' + mm.year : '') + '</a>';
    }).join('');
    var cards = wins.map(function (e, i) {
      var who = e.who.map(function (w) { return '<li>' + av(w, 'lg') + '<span><b>' + S[w].name + '</b><small>' + S[w].kelas + '</small></span></li>'; }).join('');
      if (e.ext) who += '<li class="ext"><span class="av av-lg av-ext">' + ic('user-round') + '</span><span><b>' + esc(e.ext.split(' (')[0]) + '</b><small>' + esc(e.ext.split(' (')[1].replace(')', '')) + '</small></span></li>';
      return '<article class="card win" data-cat="' + e.cat + '" style="--i:' + i + '">' +
        '<div class="mag mag-win">' + ic(D.cats[e.cat].icon) + '</div>' +
        '<p class="win-res">' + e.result + '</p>' + (e.award ? '<p class="win-award">' + e.award + '</p>' : '') +
        '<h2 class="win-title">' + esc(e.title) + '</h2>' +
        '<p class="win-org">' + esc(e.org) + '<span class="pill">' + e.level + '</span></p>' +
        '<ul class="win-who">' + who + '</ul></article>';
    }).join('');
    return '<div class="page wall">' +
      '<header class="wall-head">' +
        '<div class="wall-words"><h1 class="display wall-title">Wall of Fame</h1>' +
          '<nav class="eds" aria-label="Edisi">' + tabs + '</nav>' +
          '<p class="wall-note">' + D.editionNotes[-off] + '</p></div>' +
        '<figure class="wall-photo"><span class="mag mag-pin" aria-hidden="true"></span><img src="../../img/school/life-pair.jpg" alt="Dua siswa Adzkia membaca di depan perpustakaan"></figure>' +
      '</header>' +
      '<h2 class="sr">Prestasi ' + m.name + ' ' + m.year + '</h2>' +
      '<div class="wins">' + cards + '</div>' +
    '</div>';
  }

  /* ---------- Profil ---------- */
  function profil() {
    var p = ME;
    var mine = D.entries.filter(function (e) { return has(e.who, D.me) && e.status === 'verified' && !has(['Tidak lolos', 'Mundur', 'Terdaftar'], e.result); });
    var pres = mine.map(function (e) {
      var mm = month(e.month);
      return '<li class="pres" data-cat="' + e.cat + '"><span class="mag mag-sm">' + ic('medal') + '</span><div><p class="pres-r">' + e.result + '</p><p class="pres-t">' + esc(e.title) + '</p><p class="pres-m">' + esc(e.org) + ', ' + mm.name + ' ' + mm.year + '</p></div></li>';
    }).join('');
    var karya = p.featured.map(function (f) {
      return '<li><a class="karya" href="#profil" data-toast="Membuka ' + esc(f.url) + '"><span class="k-ic">' + ic(f.icon) + '</span><span><b>' + esc(f.title) + '</b><small>' + f.kind + ', ' + esc(f.url) + '</small></span>' + ic('external-link') + '</a></li>';
    }).join('');
    var skills = Object.keys(p.skills).map(function (k) {
      var by = p.skills[k];
      return '<li><span class="sk-n">' + k + '</span>' + (by.length ? '<span class="stack stack-sm">' + by.map(function (b) { return av(b, 'sm'); }).join('') + '</span><span class="sk-c">' + by.length + '</span>' : '') + '</li>';
    }).join('');
    var minat = p.interests.map(function (i) { return '<span class="tag" data-cat="' + D.interestCat[i] + '"><span class="dot"></span>' + i + '</span>'; }).join('');
    var orgs = p.orgs.map(function (o) { return '<li>' + ic(D.orgs[o[0]].icon) + '<span><b>' + D.orgs[o[0]].name + '</b><small>' + o[1] + '</small></span></li>'; }).join('');

    return '<div class="page profile">' +
      '<article class="card pcard">' +
        '<header class="phead"><div class="minat">' + minat + '</div></header>' +
        '<div class="pid"><span class="mag mag-av" data-col="' + p.col + '">' + p.ini + '</span>' +
          '<div class="pid-t"><h1 class="pname">' + p.name + '</h1><p class="pmeta">' + p.kelas + '</p><p class="phl">' + esc(p.headline) + '</p></div>' +
          '<div class="pact"><button class="btn btn-ink" type="button" data-toast="Mode edit dibuka">' + ic('pencil') + 'Edit profil</button><button class="btn btn-line" type="button" data-toast="Tautan disalin" aria-label="Bagikan profil">' + ic('share-2') + '</button></div></div>' +
        '<section class="psec"><h2>Tentang</h2><p class="bio">' + esc(p.bio) + '</p></section>' +
        '<section class="psec"><h2>Prestasi</h2><ul class="press">' + pres + '</ul></section>' +
        '<section class="psec"><h2>Karya</h2><ul class="karyas">' + karya + '</ul></section>' +
      '</article>' +
      '<aside class="pside">' +
        '<section class="csec"><h2>Keahlian</h2><ul class="skills">' + skills + '</ul></section>' +
        '<section class="csec"><h2>Organisasi</h2><ul class="orgs">' + orgs + '</ul></section>' +
        '<section class="csec"><h2>Tautan</h2><a class="plink" href="#profil" data-toast="Membuka LinkedIn">' + ic('linkedin') + p.linkedin + '</a></section>' +
      '</aside>' +
    '</div>';
  }

  /* ---------- router ---------- */
  var current = '';
  function render() {
    var h = (location.hash || '#beranda').slice(1).split('/'), r = h[0], arg = h[1];
    var routes = { beranda: beranda, lomba: lomba, 'lomba-detail': function () { return detail(arg); }, wall: function () { return wall(arg); }, profil: profil };
    if (!routes[r]) r = 'beranda';
    view.innerHTML = routes[r]();
    var navKey = r === 'lomba-detail' ? 'lomba' : r;
    document.querySelectorAll('[data-nav]').forEach(function (a) { if (a.getAttribute('data-nav') === navKey) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    document.body.setAttribute('data-route', r);
    document.title = { beranda: 'Beranda', lomba: 'Lomba', 'lomba-detail': (L(arg) || L('esai-energi')).title, wall: 'Wall of Fame', profil: ME.name }[r] + ' | ADZVANCE';
    icons();
    if (current && current !== location.hash) { window.scrollTo(0, 0); view.focus({ preventScroll: true }); }
    current = location.hash;
  }
  function icons() { if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 2.2 } }); }
  function refreshResults() { var r = document.getElementById('results'); if (r) { r.innerHTML = results(); icons(); } }

  /* ---------- toast + notifications ---------- */
  var toastEl = document.getElementById('toast'), tt;
  function toast(msg) { toastEl.textContent = msg; toastEl.classList.add('on'); clearTimeout(tt); tt = setTimeout(function () { toastEl.classList.remove('on'); }, 2200); }
  var notifEl = document.getElementById('notif');
  function notifs(open) {
    if (!open) { notifEl.hidden = true; document.querySelectorAll('[data-bell]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); }); return; }
    notifEl.innerHTML = '<h2 class="nh">Notifikasi</h2><ul>' + D.notifs.map(function (n) {
      return '<li><a href="' + n.href + '"' + (n.read ? '' : ' class="unread"') + '><span class="n-ic">' + ic(n.icon) + '</span><span class="n-t">' + esc(n.text) + '<small>' + n.time + '</small></span></a></li>';
    }).join('') + '</ul>';
    notifEl.hidden = false; icons();
    document.querySelectorAll('[data-bell]').forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
  }

  /* ---------- events ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('button, a'); if (!t) { if (!notifEl.hidden && !e.target.closest('#notif')) notifs(false); return; }
    if (t.hasAttribute('data-bell')) { notifs(notifEl.hidden); return; }
    if (!notifEl.hidden && !t.closest('#notif')) notifs(false);
    if (t.closest('#notif')) notifs(false);
    var v;
    if ((v = t.getAttribute('data-save'))) {
      e.preventDefault();
      var on = !has(st.saved, v);
      st.saved = on ? st.saved.concat(v) : st.saved.filter(function (x) { return x !== v; }); save('saved', st.saved);
      document.querySelectorAll('[data-save="' + v + '"]').forEach(function (b) {
        b.setAttribute('aria-pressed', on);
        if (b.classList.contains('btn')) { b.innerHTML = ic('bookmark') + (on ? 'Disimpan' : 'Simpan'); icons(); }
        b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
      });
      toast(on ? 'Disimpan' : 'Batal disimpan');
      if (st.onlySaved) refreshResults();
      return;
    }
    if ((v = t.getAttribute('data-join'))) {
      var j = !has(st.joined, v);
      st.joined = j ? st.joined.concat(v) : st.joined.filter(function (x) { return x !== v; }); save('joined', st.joined);
      t.setAttribute('aria-pressed', j); t.innerHTML = j ? ic('check') + 'Kamu ikut' : 'Saya ikut'; icons();
      t.classList.remove('pop'); void t.offsetWidth; t.classList.add('pop');
      toast(j ? 'Kamu ikut lomba ini' : 'Batal ikut');
      return;
    }
    if ((v = t.getAttribute('data-invite'))) { st.invite = v; save('invite', v); toast(v === 'yes' ? 'Kamu masuk tim ' + first('nadia') : 'Undangan disimpan'); if (v === 'no') st.invite = 'later'; render(); return; }
    if ((v = t.getAttribute('data-chip'))) { st.cat = v; document.querySelectorAll('[data-chip]').forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-chip') === v); }); refreshResults(); return; }
    if ((v = t.getAttribute('data-t'))) { st[v] = !st[v]; t.setAttribute('aria-pressed', st[v]); refreshResults(); return; }
    if (t.hasAttribute('data-reset')) { st.q = ''; st.cat = 'all'; st.level = 'all'; st.form = 'all'; st.free = false; st.onlySaved = false; render(); return; }
    if ((v = t.getAttribute('data-ask'))) { t.disabled = true; t.textContent = 'Terkirim'; toast('Permintaan terkirim ke ' + first(v)); return; }
    if ((v = t.getAttribute('data-toast'))) { e.preventDefault(); toast(v); return; }
  });
  document.addEventListener('input', function (e) { if (e.target.hasAttribute('data-q')) { st.q = e.target.value; refreshResults(); } });
  document.addEventListener('change', function (e) { var f = e.target.getAttribute('data-f'); if (f) { st[f] = e.target.value; refreshResults(); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !notifEl.hidden) notifs(false); });
  window.addEventListener('hashchange', render);
  render();
})();
