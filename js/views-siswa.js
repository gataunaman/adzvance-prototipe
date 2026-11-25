/* ADZVANCE prototype: student screens. Each view returns the inner HTML of its <section>. */
(function () {
  var A = window.A, V = A.V, esc = A.esc, ic = A.ic;

  /* page header: the title and at most one action, no explainer line */
  function band(tone, icon, title, sub, action) {
    return '<header class="phead"><h1>' + title + '</h1>' + (action ? '<div class="phead__actions">' + action + '</div>' : '') + '</header>';
  }
  function saved(id) { var b = A.S.bookmarks[A.S.me] || []; return b.indexOf(id) !== -1; }
  function saveBtn(l, extra) { var on = saved(l.id); return '<button class="save' + (extra ? ' ' + extra : '') + '" aria-pressed="' + on + '" aria-label="' + (on ? 'Hapus dari simpanan' : 'Simpan lomba') + '" type="button" data-act="save" data-id="' + l.id + '">' + ic('bookmark') + '</button>'; }
  function lombaLink(l, text) { return '<a href="#lomba-detail" data-act="view-lomba" data-id="' + l.id + '">' + esc(text || l.title) + '</a>'; }
  function published() { return A.S.lomba.filter(function (l) { return l.status === 'published'; }).sort(function (a, b) { return a.dl - b.dl; }); }
  function myTeams() { return A.S.teams.filter(function (t) { return t.members.indexOf(A.S.me) !== -1; }); }
  function teammates(a, b) { return A.S.teams.some(function (t) { return t.members.indexOf(a) !== -1 && t.members.indexOf(b) !== -1; }); }
  A.published = published; A.saved = saved;
  /* one competition as a hairline row: days left, title, category/form/date, save */
  function lrow(l) {
    return '<div class="row"><div class="row__days"><span class="figure">' + l.dl + '</span><span class="label">hari lagi</span></div><div><div class="row__title">' + lombaLink(l) + '</div><div class="row__sub">' + A.cat(l.cat).name + ' · ' + l.form + ' · tutup ' + A.dateAt(l.dl, false) + '</div></div><div class="row__actions">' + saveBtn(l) + '</div></div>';
  }
  /* an organisation role as plain text, e.g. "Sekretaris OSIS" */
  /* partner filters are selects; the shared change dispatcher calls these and rerenders */
  A.ACT['skill-sel'] = function (el) { A.ui.skill = el.value || null; };
  A.ACT['kelas-sel'] = function (el) { A.ui.kelas = el.value || null; };
  function roleText(s) { var o = s.orgs && s.orgs[0]; return o ? esc(o[1] + ' ' + (A.S.orgs[o[0]] || { name: o[0] }).name) : ''; }

  /* ---------- one competition entry: joined → result → OSIS → Wall ---------- */
  var STATUS = {
    joined: ['circle-check', 'Kamu ikut lomba ini', ''], pending: ['clock', 'Menunggu verifikasi OSIS', 'warn'],
    info: ['message-circle-warning', 'OSIS butuh bukti tambahan', 'warn'], verified: ['badge-check', 'Terverifikasi OSIS', 'ok'], rejected: ['circle-x', 'Ditolak OSIS', 'bad']
  };
  A.STATUS = STATUS;
  function resultOptions(e) {
    var wins = Object.keys(A.RESULTS).filter(function (r) { var i = A.RESULTS[r]; return i.wall && (!i.ladder || e.ladder); });
    return [['Terdaftar', 'Belum ada hasil']].concat(wins.map(function (r) { return [r, r]; }), [['Tidak lolos', 'Tidak lolos'], ['Mundur', 'Mundur']]);
  }
  A.resultOptions = resultOptions;
  function entryBox(e) {
    var st = STATUS[e.status], open = e.status === 'joined' || e.status === 'rejected';
    var team = e.who.length > 1 || e.ext ? '<p class="small muted">' + ic('users') + ' ' + e.who.map(function (id) { return id === A.S.me ? 'Kamu' : esc(A.stu(id).name.split(' ')[0]); }).concat(e.ext ? [esc(e.ext)] : []).join(', ') + '</p>' : '';
    var priv = !A.resInfo(e.result).wall && e.result !== 'Terdaftar';
    var h = '<div class="joinbox joinbox--' + e.status + '"><div class="joinbox__head">' + ic(st[0]) + '<strong>' + st[1] + '</strong></div>' + team;
    if (open) {
      h += '<label class="label" for="hasil">Hasil akhir</label><select class="input" id="hasil" data-act="result" data-id="' + e.id + '">' + resultOptions(e).map(function (o) { return '<option value="' + esc(o[0]) + '"' + (o[0] === e.result ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select>';
      if (priv) h += '<p class="small muted">' + ic('lock') + ' Privat</p>';
    } else h += '<span class="fres fres--' + (A.resInfo(e.result).cls || 'soft') + '">' + esc(A.resLabel(e)) + ' · ' + esc(e.level) + '</span>';
    if (e.note && (e.status === 'info' || e.status === 'rejected')) h += '<p class="joinbox__note">' + esc(e.note) + '</p>';
    if (e.status === 'info' || (e.status === 'rejected' && A.isWin(e))) h += '<button class="btn btn--primary btn--block" type="button" data-act="entry-open" data-id="' + e.id + '">' + ic('upload') + (e.status === 'info' ? 'Lengkapi bukti' : 'Kirim ulang') + '</button>';
    if (e.status === 'verified') {
      if (A.eligible(e)) h += '<a class="btn btn--secondary btn--block" href="#prestasi" data-act="view-entry" data-id="' + e.id + '">' + ic('star') + 'Lihat di Wall of Fame</a>';
      if (!e.cert) h += '<button class="btn btn--quiet btn--block" type="button" data-act="entry-cert" data-id="' + e.id + '">' + ic('paperclip') + 'Tambah sertifikat (opsional)</button>';
      if (e.ladder && e.level !== 'Internasional' && !A.S.entries.some(function (x) { return x.prev === e.id; })) h += '<button class="btn btn--quiet btn--block" type="button" data-act="entry-next" data-id="' + e.id + '">' + ic('route') + 'Lanjut ke tingkat berikutnya</button>';
    }
    if (e.status === 'joined' && e.result === 'Terdaftar') h += '<button class="btn btn--quiet btn--block" type="button" data-act="' + (e.who.length > 1 ? 'entry-leave' : 'unjoin') + '" data-id="' + e.id + '">' + (e.who.length > 1 ? 'Bukan timku' : 'Batal ikut') + '</button>';
    return h + '</div>';
  }
  A.entryBox = entryBox;

  /* ---------- avatar menu (shared shell) ---------- */
  V._menu = function () {
    var m = A.me(), h = '';
    if (m) {
      h += '<div class="menu__who">' + A.avatar(m) + '<div><strong>' + esc(m.name) + '</strong><span>' + esc(m.kelas) + '</span></div></div>';
      h += '<a href="#profil">' + ic('user') + 'Profil saya</a>';
      h += '<a class="menu__mobile" href="#wall">' + ic('star') + 'Wall of Fame</a>';
      h += '<a class="menu__mobile" href="#notifikasi">' + ic('bell') + 'Notifikasi</a>';
      h += '<a href="#pengumuman">' + ic('megaphone') + 'Pengumuman</a>';
      if (m.admin) h += '<a class="menu__admin" href="#admin">' + ic('shield-check') + 'Mode admin</a>';
    } else if (A.S.dev) {
      h += '<a href="#dev">' + ic('terminal') + 'Konsol developer</a>';
    }
    h += '<button type="button" data-act="logout">' + ic('log-out') + 'Keluar</button>';
    return h;
  };

  /* ---------- login ---------- */
  V.masuk = function () {
    return '<div class="auth"><div class="auth__main"><form class="auth__form" data-form="login" novalidate>' +
      '<a class="brand brand--pub auth__brand" href="#home"><span class="crest"><img src="img/adzkia-logo.png" alt=""></span>ADZVANCE</a><h1 class="auth__title">Masuk</h1>' +
      '<div class="field"><label for="nisn">NISN</label><div class="otp"><input class="otp__input" id="nisn" name="nisn" inputmode="numeric" autocomplete="username" maxlength="10" aria-describedby="login-status">' +
      '<div class="otp__boxes" aria-hidden="true"><i class="cur"></i>' + new Array(10).join('<i></i>') + '</div></div></div>' +
      '<div class="field"><label for="pass">Kata sandi</label><input class="input" id="pass" name="pass" type="password" inputmode="numeric" maxlength="4" autocomplete="current-password"></div>' +
      '<p class="status" id="login-status" aria-live="polite"></p>' +
      '<button class="btn btn--primary btn--block" type="submit">Masuk</button>' +
      '<details class="demo-accounts"><summary>Akun demo</summary><ul>' +
      A.S.students.slice(0, 4).map(function (s) { return '<li><button type="button" data-act="fill-login" data-id="' + s.id + '">' + esc(s.name) + (s.ketua ? ' (Ketua OSIS)' : '') + '</button></li>'; }).join('') +
      '</ul></details></form></div></div>';
  };

  /* ---------- beranda ---------- */
  function annItem(a) {
    var s = A.stu(a.author);
    return '<article class="ann' + (a.pinned ? ' ann--pinned' : '') + '">' + (a.pinned ? '<span class="ann__pin">' + ic('pin') + 'Disematkan</span>' : '') +
      '<h3>' + esc(a.title) + '</h3><p>' + esc(a.body) + '</p>' +
      '<div class="ann__by">' + A.avatar(s) + '<span>' + A.name(s, true) + '</span>' + A.topOrg(s) + '<span class="muted small">' + A.dateAt(a.d, false) + '</span>' + (a.link ? '<a class="link small" href="' + esc(a.link) + '">Buka</a>' : '') + '</div></article>';
  }
  function annSorted() { return A.S.announcements.slice().sort(function (a, b) { return (b.pinned - a.pinned) || (b.d - a.d); }); }
  A.annItem = annItem;

  V.beranda = function () {
    var m = A.me(), pub = published();
    var interestCats = Object.keys(A.S.cats).filter(function (k) { return m.interests.indexOf(A.S.cats[k].name) !== -1; });
    var bm = A.S.bookmarks[m.id] || [];
    var feat = pub.filter(function (l) { return bm.indexOf(l.id) !== -1; })[0] || pub[0];
    var next = pub.filter(function (l) { return l !== feat; }).slice(0, 3);
    var rec = pub.filter(function (l) { return interestCats.indexOf(l.cat) !== -1 && l !== feat; }).slice(0, 3);
    var joined = A.entriesOf(m.id).length;
    var teams = myTeams();
    var inv = A.S.invites.filter(function (i) { return i.to === m.id && i.status === 'pending'; })[0];
    var anns = annSorted().slice(0, 3);
    var fame = A.S.entries.filter(function (e) { return e.status === 'verified' && A.eligible(e); }).sort(function (a, b) { return b.month.localeCompare(a.month) || b.d - a.d; })[0];
    var mine = A.S.threads.slice(1, 3);

    var h = '<div class="container page home">';
    h += '<div class="home-head"><h1>Halo, ' + esc(m.name.split(' ')[0]) + '</h1></div>';

    if (anns.length) {
      h += '<section class="anns" aria-label="Pengumuman OSIS"><div class="section-title"><h2>Pengumuman OSIS</h2><a class="link small" href="#pengumuman">Lihat semua</a></div><div class="anns__row">' + anns.map(annItem).join('') + '</div></section>';
    }

    h += '<div class="home-top">';
    if (feat) {
      h += '<article class="feature"><div class="feature__days"><span class="figure">' + feat.dl + '</span><span>hari lagi</span></div><div class="feature__body">' +
        '<div class="tags"><span class="tag tag--dark">' + A.cat(feat.cat).name + '</span><span class="tag tag--dark">' + feat.form + '</span><span class="tag tag--dark">' + A.fee(feat.fee) + '</span><span class="tag tag--dark">' + feat.level + '</span></div>' +
        '<h2>' + lombaLink(feat) + '</h2><p>Tutup ' + A.dateAt(feat.dl) + ', 23.59 WIB</p>' +
        '<div class="feature__actions"><a class="btn btn--primary" href="#lomba-detail" data-act="view-lomba" data-id="' + feat.id + '">Lihat detail</a><a class="btn btn--dark" href="#partner">' + ic('users') + 'Cari partner</a></div></div></article>';
    }
    h += '<div class="mystats">' +
      '<a class="mystat tone-esai" href="#lomba" data-act="filter-saved"><span class="mystat__icon">' + ic('bookmark') + '</span><span class="figure figure--s">' + bm.length + '</span><span class="label">Disimpan</span></a>' +
      '<a class="mystat tone-debat" href="#profil"><span class="mystat__icon">' + ic('trophy') + '</span><span class="figure figure--s">' + joined + '</span><span class="label">Lomba diikuti</span></a>' +
      '<a class="mystat tone-sains" href="#tim"><span class="mystat__icon">' + ic('users') + '</span><span class="figure figure--s">' + teams.length + '</span><span class="label">Tim aktif</span></a></div></div>';

    h += '<div class="split"><div class="stack"><div><div class="section-title"><h2>Deadline berikutnya</h2><a class="link small" href="#lomba">Semua lomba</a></div><div class="sheet sheet--compact">' +
      next.map(function (l) {
        return lrow(l);
      }).join('') + '</div></div>';
    h += '<div><div class="section-title"><h2>Cocok dengan minatmu</h2><a class="link small" href="#profil-edit">Atur minat</a></div>' +
      (rec.length ? '<div class="sheet sheet--compact">' + rec.map(lrow).join('') + '</div>' : A.empty('sparkles', 'Belum ada rekomendasi.')) + '</div>';
    if (fame) h += '<div><div class="section-title"><h2>Prestasi terbaru</h2><a class="link small" href="#wall">Wall of Fame</a></div><a class="famerow" href="#prestasi" data-act="view-entry" data-id="' + fame.id + '"><span class="famerow__res">' + esc(A.resLabel(fame)) + '</span><span class="famerow__main"><strong>' + esc(fame.title) + '</strong><span class="small muted">' + fame.who.map(function (id) { return esc(A.stu(id).name); }).join(', ') + '</span></span>' + ic('arrow-up-right') + '</a></div>';
    h += '</div>';

    h += '<aside class="stack">';
    if (inv) {
      var f = A.stu(inv.from), il = A.lomba(inv.lomba);
      h += '<div class="well well--invite"><div class="invite__who">' + A.avatar(f) + '<div><strong>' + A.name(f) + '</strong><div class="small muted">mengajakmu ke tim</div></div></div><p class="invite__comp">' + esc(il.title) + '</p><div class="invite__actions"><button class="btn btn--primary" type="button" data-act="invite-accept" data-id="' + inv.id + '">Terima</button><button class="btn btn--secondary" type="button" data-act="invite-decline" data-id="' + inv.id + '">Tolak</button></div></div>';
    }
    h += '<div><div class="section-title"><h3>Tim kamu</h3></div>' + (teams.length ? teams.map(function (t) {
      return '<a class="teamcard" href="#tim" data-act="view-team" data-id="' + t.id + '"><div class="teamcard__avatars">' + t.members.slice(0, 4).map(function (id) { var s = A.stu(id); return '<span class="avatar av--' + s.av + '">' + s.ini + '</span>'; }).join('') + '</div><div><div class="post__name">' + esc(t.name) + '</div><div class="small muted">' + t.members.length + ' anggota</div></div></a>';
    }).join('') : A.empty('users', 'Belum ada tim.', '<a class="link small" href="#partner">Cari partner</a>')) + '</div>';
    h += '<div><div class="section-title"><h3>Forum terbaru</h3><a class="link small" href="#forum">Semua</a></div><div class="members">' + mine.map(function (t) {
      return '<a class="member" href="#forum-thread" data-act="view-thread" data-id="' + t.id + '"><div><div class="post__name">' + esc(t.title) + '</div><div class="small muted">' + A.S.subjects[t.subj] + ' · ' + t.replies.length + ' balasan</div></div></a>';
    }).join('') + '</div></div>';
    h += '</aside></div></div>';
    return h;
  };

  /* ---------- pengumuman ---------- */
  V.pengumuman = function () {
    var list = annSorted();
    return '<div class="container page">' + band('peach', 'megaphone', 'Pengumuman OSIS', list.length + ' pengumuman') +
      '<div class="ann-list">' + (list.length ? list.map(annItem).join('') : A.empty('megaphone', 'Belum ada pengumuman.')) + '</div></div>';
  };

  /* ---------- info lomba ---------- */
  function chip(group, val, label, extra) {
    var on = A.ui.filters[group] === val;
    return '<button class="chip' + (extra || '') + '" type="button" aria-pressed="' + on + '" data-act="filter" data-group="' + group + '" data-val="' + val + '">' + label + '</button>';
  }
  function matches(l) {
    var f = A.ui.filters, q = (A.ui.q || '').toLowerCase();
    if (f.cat && l.cat !== f.cat) return false;
    if (f.form && l.form !== f.form && !(l.form === 'Hybrid')) return false;
    if (f.fee === 'free' && l.fee) return false;
    if (f.fee === 'paid' && !l.fee) return false;
    if (q && (l.title + ' ' + l.org).toLowerCase().indexOf(q) === -1) return false;
    return true;
  }
  function card(l) {
    return '<article class="card' + (l.dl <= 7 ? ' card--hot' : '') + '"><a class="card__poster poster--' + l.cat + '" href="#lomba-detail" data-act="view-lomba" data-id="' + l.id + '">' + ic(A.cat(l.cat).icon, 'poster__icon') + '<span class="card__days"><span class="figure figure--s">' + l.dl + '</span> hari</span></a>' +
      '<div class="card__body"><h2 class="card__title">' + lombaLink(l) + '</h2><p class="card__org">' + esc(l.org) + '</p><div class="tags"><span class="tag tag--' + l.cat + '">' + A.cat(l.cat).name + '</span><span class="tag">' + l.form + '</span><span class="tag">' + A.fee(l.fee) + '</span></div><p class="card__date">' + ic('calendar') + 'Tutup ' + A.dateAt(l.dl, false) + '</p></div>' + saveBtn(l, 'card__save') + '</article>';
  }
  var SORTS = {
    dl: ['Deadline terdekat', function (a, b) { return a.dl - b.dl; }],
    dlFar: ['Deadline terjauh', function (a, b) { return b.dl - a.dl; }],
    fee: ['Biaya termurah', function (a, b) { return a.fee - b.fee || a.dl - b.dl; }],
    az: ['Nama A–Z', function (a, b) { return a.title.localeCompare(b.title); }]
  };
  V.lomba = function () {
    var all = published(), tab = A.ui.lombaTab === 'saved' ? 'saved' : 'all', sort = SORTS[A.ui.sort] ? A.ui.sort : 'dl';
    var nSaved = all.filter(function (l) { return saved(l.id); }).length;
    var list = all.filter(function (l) { return (tab === 'all' || saved(l.id)) && matches(l); }).sort(SORTS[sort][1]);
    var tabs = '<div class="tabs-bar lomba-tabs">' + [['all', 'Semua lomba', all.length], ['saved', 'Disimpan', nSaved]].map(function (t) { return '<button type="button" class="tab" aria-pressed="' + (tab === t[0]) + '" data-act="lomba-tab" data-val="' + t[0] + '">' + (t[0] === 'saved' ? ic('bookmark') : '') + t[1] + ' <span class="tab__n">' + t[2] + '</span></button>'; }).join('') + '</div>';
    var sortSel = '<label class="sort"><span class="muted small">Urutkan</span><select class="input input--sm" data-act="sort" aria-label="Urutkan lomba">' + Object.keys(SORTS).map(function (k) { return '<option value="' + k + '"' + (k === sort ? ' selected' : '') + '>' + SORTS[k][0] + '</option>'; }).join('') + '</select></label>';
    var emptyMsg = tab === 'saved' && !nSaved ? A.empty('bookmark', 'Belum ada lomba yang disimpan.', '<button class="btn btn--secondary" type="button" data-act="lomba-tab" data-val="all">Lihat semua lomba</button>') : A.empty('search-x', 'Tidak ada lomba yang cocok.', '<button class="btn btn--secondary" type="button" data-act="filters-clear">Hapus saringan</button>');
    var f = A.ui.filters, active = Object.keys(f).filter(function (k) { return f[k]; }).length + (A.ui.q ? 1 : 0);
    var side = '<aside class="browse__side' + (A.ui.filterOpen ? ' is-open' : '') + '" id="filters"><div class="browse__sidehead"><h2>Saring</h2><button class="icon-btn" type="button" data-act="filters-close" aria-label="Tutup">' + ic('x') + '</button></div>' +
      '<form class="search search--side" role="search" data-form="noop"><label class="visually-hidden" for="cari-lomba">Cari lomba</label>' + ic('search') + '<input class="input" id="cari-lomba" type="search" placeholder="Cari lomba" value="' + esc(A.ui.q) + '" data-act="search"></form>' +
      '<div class="filters__group"><span class="label">Kategori</span><div class="chips chips--stack">' + chip('cat', undefined, 'Semua').replace('aria-pressed="false"', 'aria-pressed="' + !f.cat + '"') +
      Object.keys(A.S.cats).map(function (k) { return chip('cat', k, '<span class="dot dot--' + k + '"></span>' + A.S.cats[k].name); }).join('') + '</div></div>' +
      '<div class="filters__group"><span class="label">Bentuk</span><div class="chips">' + chip('form', 'Online', 'Online') + chip('form', 'Offline', 'Offline') + '</div></div>' +
      '<div class="filters__group"><span class="label">Biaya</span><div class="chips">' + chip('fee', 'free', 'Gratis') + chip('fee', 'paid', 'Berbayar') + '</div></div>' +
      (active ? '<button class="btn btn--quiet" type="button" data-act="filters-clear">' + ic('rotate-ccw') + 'Hapus saringan</button>' : '') + '</aside>';
    return '<div class="container page">' + band('peach', 'award', 'Info Lomba', all.length + ' lomba aktif untuk SMA, ' + all.filter(function (l) { return l.dl <= 7; }).length + ' tutup minggu ini', '<button class="btn btn--secondary" type="button" data-act="suggest-lomba">Usulkan lomba</button>') +
      '<div class="browse">' + side + '<div>' + tabs + '<div class="browse__bar"><span><strong>' + list.length + '</strong> lomba</span><button class="btn btn--secondary filter-toggle" type="button" data-act="filters-open">' + ic('sliders-horizontal') + 'Saring' + (active ? ' (' + active + ')' : '') + '</button>' + sortSel + '</div>' +
      (list.length ? '<div class="cards">' + list.map(card).join('') + '</div>' : emptyMsg) + '</div></div></div>';
  };

  /* ---------- detail lomba ---------- */
  V['lomba-detail'] = function () {
    var l = A.lomba(A.ui.viewLomba) || published()[0], c = A.cat(l.cat);
    var e = A.entryFor(l.id);
    var dates = [['Pendaftaran ditutup', l.dl], ['Pelaksanaan', l.ev || l.dl + 10], ['Pengumuman', l.ann || l.dl + 20]];
    var nowIdx = dates.findIndex(function (r) { return r[1] >= 0; });
    var posts = A.S.posts.filter(function (p) { return p.lomba === l.id; });
    var joinBox = e ? entryBox(e) : '<button class="btn btn--secondary btn--block" type="button" data-act="join" data-id="' + l.id + '">' + ic('circle-plus') + 'Saya ikut</button>';
    var on = saved(l.id);
    return '<div class="container page"><p class="crumb"><a class="link small" href="#lomba">' + ic('arrow-left') + 'Kembali ke Info Lomba</a></p><div class="detail">' +
      '<aside class="detail__side">' +
      '<div class="detail-deadline"><span class="label">Pendaftaran ditutup</span><span class="figure">' + l.dl + ' hari</span><span class="mono">' + A.dateAt(l.dl) + ', 23.59 WIB</span></div>' +
      '<button class="btn btn--primary btn--block" type="button" data-act="open-site">' + ic('external-link') + 'Daftar di situs penyelenggara</button>' + joinBox +
      '<div class="rail-row"><button class="btn btn--quiet" type="button" aria-pressed="' + on + '" data-act="save" data-id="' + l.id + '">' + ic('bookmark') + (on ? 'Disimpan' : 'Simpan') + '</button>' +
      '<a class="btn btn--quiet" href="#partner">' + ic('users') + 'Cari partner</a></div></aside>' +
      '<div class="detail__main"><div class="tags" style="margin-bottom: var(--space-sm)"><span class="tag">' + c.name + '</span><span class="tag">' + l.form + '</span><span class="tag">' + esc(l.jenjang || 'SMA, SMK') + '</span></div>' +
      '<h1>' + esc(l.title) + '</h1><p class="muted" style="margin-top: var(--space-xs)">' + esc(l.org) + '</p>' +
      '<nav class="toc" aria-label="Bagian"><a href="#ld-ringkasan">Ringkasan</a><a href="#ld-jadwal">Jadwal</a><a href="#ld-syarat">Syarat</a><a href="#ld-hadiah">Hadiah</a><a href="#ld-kontak">Kontak</a></nav>' +
      '<section class="dsec"><h2 id="ld-ringkasan">Ringkasan</h2><dl class="deflist">' + [['Tema', esc(l.tema || c.name)], ['Jenjang', esc(l.jenjang || 'SMA, SMK, sederajat')], ['Bentuk', l.form], ['Biaya', A.fee(l.fee)], ['Peserta', esc(l.peserta || 'Perorangan atau tim')], ['Tingkat', l.level]].map(function (x) { return '<div><dt>' + x[0] + '</dt><dd>' + x[1] + '</dd></div>'; }).join('') + '</dl></section>' +
      '<section class="dsec"><h2 id="ld-jadwal">Jadwal</h2><ol class="timeline">' + dates.map(function (r, i) { return '<li class="' + (i === nowIdx ? 'is-now' : '') + (r[1] < 0 ? ' is-past' : '') + '"><span class="mono">' + A.dateAt(r[1], false) + '</span><span>' + r[0] + (i === nowIdx ? ' <span class="tag tag--hot">Berikutnya</span>' : '') + '</span></li>'; }).join('') + '</ol>' + (l.ladder ? '<p class="small muted">' + ic('route') + ' Lomba berjenjang</p>' : '') + '</section>' +
      '<section class="dsec"><h2 id="ld-syarat">Syarat</h2><ul class="checks">' + (l.syarat || ['Siswa aktif SMA, SMK, atau sederajat', 'Mengikuti ketentuan penyelenggara']).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></section>' +
      '<section class="dsec"><h2 id="ld-hadiah">Hadiah</h2><div class="prizes">' + (l.hadiah || ['Piala', 'Sertifikat', 'Sertifikat']).map(function (p, i) { return '<div class="prize' + (i === 0 ? ' prize--first' : '') + '"><span class="label">Juara ' + (i + 1) + '</span><span class="figure figure--s">' + esc(p) + '</span></div>'; }).join('') + '</div></section>' +
      '<section class="dsec"><h2 id="ld-kontak">Kontak</h2><dl class="facts"><dt>Narahubung</dt><dd>' + esc(l.kontak || 'Lihat situs penyelenggara') + '</dd><dt>Sumber</dt><dd>' + esc(l.source === 'Google' ? 'Ditemukan lewat pencarian Google' : l.source === 'Admin' ? 'Ditambahkan admin OSIS' : 'Usulan siswa') + '</dd></dl></section>' +
      '<section class="dsec"><div class="dsec__head"><h2>Mencari partner</h2><a class="link small" href="#partner">Semua</a></div>' + (posts.length ? '<div class="pgrid pgrid--one">' + posts.map(pcard).join('') + '</div>' : A.empty('users', 'Belum ada yang mencari partner untuk lomba ini.', '<button class="btn btn--secondary" type="button" data-act="new-post" data-id="' + l.id + '">Buat posting</button>')) + '</section>' +
      '</div></div></div>';
  };

  /* ---------- cari partner ---------- */
  function pcard(p) {
    var s = A.stu(p.author), l = A.lomba(p.lomba), mine = p.author === A.S.me, applied = p.applicants.indexOf(A.S.me) !== -1, full = p.filled >= p.total;
    var dots = ''; for (var i = 0; i < p.total; i++) dots += '<i class="' + (i < p.filled ? 'on' : '') + '"></i>';
    var btn = mine ? '<span class="tag">Postinganmu, ' + p.applicants.length + ' pelamar</span>' : full ? '<span class="tag">Tim penuh</span>' :
      applied ? '<button class="btn btn--secondary" type="button" disabled>' + ic('clock') + 'Menunggu</button>' : '<button class="btn btn--secondary" type="button" data-act="apply" data-id="' + p.id + '">Ajukan diri</button>';
    var role = roleText(s);
    return '<article class="pcard"><div class="pcard__head">' + A.avatar(s) + '<div><div class="post__name">' + A.name(s) + '</div><div class="small muted">' + esc(s.kelas) + (role ? ' · ' + role : '') + '</div></div><span class="tag">' + A.cat(l.cat).name + '</span></div>' +
      '<a class="pcard__comp" href="#lomba-detail" data-act="view-lomba" data-id="' + l.id + '">' + esc(l.title) + '</a><p>' + esc(p.text) + '</p><div class="tags">' + p.skills.map(function (k) { return '<span class="tag">' + esc(k) + '</span>'; }).join('') + '</div>' +
      '<div class="pcard__foot"><span class="slots"><span class="slots__dots">' + dots + '</span><span class="small muted">' + p.filled + ' dari ' + p.total + '</span></span>' + btn + '</div></article>';
  }
  V.partner = function () {
    var posts = A.S.posts.filter(function (p) {
      var s = A.stu(p.author);
      if (A.ui.skill && p.skills.indexOf(A.ui.skill) === -1) return false;
      if (A.ui.kelas && s.kelas.split(' ')[0] !== A.ui.kelas) return false;
      return true;
    });
    var skills = ['Riset', 'Desain UI', 'Pemrograman', 'Public speaking', 'Menulis', 'Matematika', 'Video'];
    return '<div class="container page">' + band('tek', 'users', 'Cari Partner', A.S.posts.length + ' tim sedang mencari anggota', '<button class="btn btn--primary" type="button" data-act="new-post">Buat posting</button>') +
      '<div class="filters-line"><label class="sort"><span class="muted small">Keahlian</span><select class="input input--sm" data-act="skill-sel" aria-label="Keahlian"><option value="">Semua</option>' + skills.map(function (k) { return '<option' + (A.ui.skill === k ? ' selected' : '') + '>' + esc(k) + '</option>'; }).join('') + '</select></label>' +
      '<label class="sort"><span class="muted small">Kelas</span><select class="input input--sm" data-act="kelas-sel" aria-label="Kelas"><option value="">Semua</option>' + ['X', 'XI', 'XII'].map(function (k) { return '<option' + (A.ui.kelas === k ? ' selected' : '') + '>' + k + '</option>'; }).join('') + '</select></label>' +
      '<span class="small muted">' + posts.length + ' posting</span></div>' +
      (posts.length ? '<div class="pgrid">' + posts.map(pcard).join('') + '</div>' : A.empty('users', 'Belum ada posting dengan saringan ini.')) + '</div>';
  };

  /* ---------- tim (chat) ---------- */
  V.tim = function () {
    var teams = myTeams(), t = teams.find(function (x) { return x.id === A.ui.viewTeam; }) || teams[0];
    if (!t) return '<div class="container page">' + band('tek', 'users', 'Tim', '') + A.empty('users', 'Kamu belum punya tim.', '<a class="btn btn--primary" href="#partner">Cari partner</a>') + '</div>';
    var l = A.lomba(t.lomba);
    return '<div class="container page"><div class="page__head"><div><h1>' + esc(t.name) + '</h1><p>' + lombaLink(l) + '</p></div>' + (teams.length > 1 ? '<div class="chips">' + teams.map(function (x) { return '<button class="chip" type="button" aria-pressed="' + (x === t) + '" data-act="view-team" data-id="' + x.id + '">' + esc(x.name) + '</button>'; }).join('') + '</div>' : '') + '</div>' +
      '<div class="chat"><div><p class="chat__notice">' + ic('shield-check') + 'Chat ini dapat ditinjau pengelola platform.</p><div class="chat__log">' +
      t.messages.map(function (msg, i) {
        var s = A.stu(msg.from), me = msg.from === A.S.me;
        return '<div class="msg' + (me ? ' msg--me' : '') + '">' + A.avatar(s) + '<div' + (me ? ' class="msg__bubble"' : '') + '><span class="msg__who">' + (me ? 'Kamu' : A.name(s)) + '</span><span class="msg__time">' + msg.time + '</span><p class="msg__body">' + esc(msg.text) + '</p>' +
          (msg.file ? '<div class="file"><span class="file__ext">DOC</span><span>' + esc(msg.file) + '</span></div>' : '') + (me ? '' : '<button class="msg__report" type="button" data-act="report-msg" data-id="' + t.id + ':' + i + '">Laporkan</button>') + '</div></div>';
      }).join('') + '</div><form class="composer" data-form="chat" data-id="' + t.id + '"><label class="visually-hidden" for="pesan">Tulis pesan</label><button class="btn btn--quiet" type="button" data-act="attach">' + ic('paperclip') + 'Lampirkan</button><input class="input" id="pesan" name="text" placeholder="Tulis pesan" autocomplete="off"><button class="btn btn--primary" type="submit">Kirim</button></form></div>' +
      '<aside><div class="section-title"><h2 style="font-size: var(--text-lg)">Anggota, ' + t.members.length + '</h2></div><div class="members">' +
      t.members.map(function (id) { var s = A.stu(id); return '<div class="member">' + A.avatar(s) + '<div><div class="post__name">' + A.name(s) + '</div><div class="small">' + (id === A.S.me ? '<span class="muted">Kamu</span>' : '<a class="link" href="#tim" data-act="wa" data-id="' + id + '">' + ic('phone') + ' WhatsApp</a>') + '</div></div></div>'; }).join('') + '</div></aside></div></div>';
  };

  /* ---------- forum ---------- */
  function subjTag(k, full) { return '<span class="subj subj--' + k + '">' + (full ? A.S.subjects[k] : A.S.subjects[k].slice(0, 3)) + '</span>'; }
  V.forum = function () {
    var list = A.S.threads.filter(function (t) { return A.ui.subj === 'all' || t.subj === A.ui.subj; }).sort(function (a, b) { return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0); });
    var answered = A.S.threads.filter(function (t) { return t.replies.some(function (r) { return r.best; }); }).length;
    var counts = {}; A.S.threads.forEach(function (t) { t.replies.forEach(function (r) { counts[r.author] = (counts[r.author] || 0) + 1; }); });
    var leaders = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; }).slice(0, 4);
    var mine = A.S.threads.filter(function (t) { return t.author === A.S.me; });
    return '<div class="container page">' + band('esai', 'message-circle', 'Forum Soal', A.S.threads.length + ' pertanyaan, ' + answered + ' sudah terjawab', '<button class="btn btn--primary" type="button" data-act="new-thread">Buat pertanyaan</button>') +
      '<div class="chips" style="margin-bottom: var(--space-md)"><button class="chip" type="button" aria-pressed="' + (A.ui.subj === 'all') + '" data-act="subj" data-val="all">Semua</button>' +
      Object.keys(A.S.subjects).filter(function (k) { return k !== 'osis'; }).map(function (k) { return '<button class="chip" type="button" aria-pressed="' + (A.ui.subj === k) + '" data-act="subj" data-val="' + k + '">' + A.S.subjects[k] + '</button>'; }).join('') + '</div>' +
      '<div class="split"><div class="posts">' + (list.length ? list.map(function (t) {
        var best = t.replies.some(function (r) { return r.best; });
        return '<div class="thread' + (t.pinned ? ' thread--pinned' : '') + '"><div class="thread__count' + (best ? ' thread__count--ok' : '') + '"><span class="figure figure--s">' + t.replies.length + '</span><div class="label">balasan</div></div>' +
          '<div><div class="thread__title"><a href="#forum-thread" data-act="view-thread" data-id="' + t.id + '">' + esc(t.title) + '</a></div><div class="tags">' + subjTag(t.subj, true) + (t.pinned ? '<span class="tag tag--hot">' + ic('pin') + 'Disematkan</span>' : '') + (best ? '<span class="tag tag--ok">Terjawab</span>' : t.replies.length ? '' : '<span class="tag">Belum terjawab</span>') + '</div></div><span class="label">' + A.name(A.stu(t.author), true) + '</span></div>';
      }).join('') : A.empty('message-circle', 'Belum ada pertanyaan di mapel ini.')) + '</div>' +
      '<aside class="stack"><div class="well"><h3>Penjawab teraktif</h3><ol class="leaders">' + leaders.map(function (id, i) { var s = A.stu(id); return '<li><span class="leaders__rank">' + (i + 1) + '</span>' + A.avatar(s) + '<span>' + A.name(s) + '</span><span class="mono small">' + counts[id] + '</span></li>'; }).join('') + '</ol></div>' +
      '<div class="well"><h3>Pertanyaanmu</h3>' + (mine.length ? '<div class="members">' + mine.map(function (t) { return '<a class="member" href="#forum-thread" data-act="view-thread" data-id="' + t.id + '">' + subjTag(t.subj) + '<div><div class="post__name">' + esc(t.title) + '</div><div class="small muted">' + t.replies.length + ' balasan</div></div></a>'; }).join('') + '</div>' : '<p class="small muted" style="margin-top: var(--space-xs)">Belum ada.</p>') + '</div></aside></div></div>';
  };

  V['forum-thread'] = function () {
    var t = A.S.threads.find(function (x) { return x.id === A.ui.viewThread; }) || A.S.threads[1];
    var author = A.stu(t.author), isAuthor = t.author === A.S.me, liked = t.likes.indexOf(A.S.me) !== -1;
    function reply(r) {
      var s = A.stu(r.author), kids = t.replies.filter(function (x) { return x.parent === r.id; }), rl = r.likes.indexOf(A.S.me) !== -1;
      return '<div class="reply' + (r.best ? ' reply--best' : '') + '"><div class="reply__head">' + A.avatar(s) + '<strong>' + A.name(s) + '</strong>' + A.topOrg(s) + (r.best ? '<span class="tag tag--hot">' + ic('circle-check') + 'Jawaban terbaik</span>' : '') + '</div>' +
        '<p class="reply__body">' + esc(r.body) + '</p><div class="reply__actions"><button class="btn btn--quiet" type="button" aria-pressed="' + rl + '" data-act="like-reply" data-id="' + t.id + ':' + r.id + '">' + ic('heart') + r.likes.length + '</button>' +
        '<button class="btn btn--quiet" type="button" data-act="reply-to" data-id="' + t.id + ':' + r.id + '">' + ic('reply') + 'Balas</button>' +
        (isAuthor && !r.best && !r.parent ? '<button class="btn btn--quiet" type="button" data-act="mark-best" data-id="' + t.id + ':' + r.id + '">' + ic('circle-check') + 'Tandai terbaik</button>' : '') +
        (r.author !== A.S.me ? '<button class="btn btn--quiet" type="button" data-act="report-reply" data-id="' + t.id + ':' + r.id + '">' + ic('flag') + 'Laporkan</button>' : '') + '</div>' + kids.map(reply).join('') + '</div>';
    }
    var tops = t.replies.filter(function (r) { return !r.parent; }).sort(function (a, b) { return (b.best ? 1 : 0) - (a.best ? 1 : 0); });
    return '<div class="container page"><p class="crumb"><a class="link small" href="#forum">' + ic('arrow-left') + 'Kembali ke Forum Soal</a></p><div class="thread-page">' +
      '<div class="tags" style="margin-bottom: var(--space-sm)">' + subjTag(t.subj, true) + (t.replies.some(function (r) { return r.best; }) ? '<span class="tag tag--ok">Terjawab</span>' : '') + '</div>' +
      '<h1>' + esc(t.title) + '</h1><p class="thread-by">' + A.avatar(author) + A.name(author) + A.topOrg(author) + '<span class="muted small">' + esc(author.kelas) + ', ' + esc(t.ago || 'baru saja') + '</span></p>' +
      '<p class="thread-body">' + esc(t.body) + '</p><div class="reply__actions"><button class="btn btn--quiet" type="button" aria-pressed="' + liked + '" data-act="like-thread" data-id="' + t.id + '">' + ic('heart') + t.likes.length + '</button></div>' +
      '<h2 class="replies-h">' + t.replies.length + ' balasan</h2>' + (tops.length ? tops.map(reply).join('') : A.empty('message-circle', 'Belum ada balasan.')) +
      '<form class="composer" data-form="reply" data-id="' + t.id + '"><label class="visually-hidden" for="balas">Tulis balasan</label><input class="input" id="balas" name="body" placeholder="Tulis balasan" autocomplete="off"><button class="btn btn--primary" type="submit">Kirim</button></form></div></div>';
  };

  /* wall of fame and result pages live in views-public.js (they are public) */

  /* ---------- notifikasi ---------- */
  V.notifikasi = function () {
    var list = A.S.notifs[A.S.me] || [], unread = list.filter(function (n) { return !n.read; }).length;
    return '<div class="container page">' + band('seni', 'bell', 'Notifikasi' + (unread ? ' <span class="phead__count">' + unread + '</span>' : ''), '', unread ? '<button class="btn btn--secondary" type="button" data-act="read-all">Tandai semua dibaca</button>' : '') +
      '<div class="split"><div class="notes">' + (list.length ? list.map(function (n) {
        return '<div class="note' + (n.read ? '' : ' note--unread') + '"><span class="note__icon tone-' + n.tone + '">' + ic(n.icon) + '</span><a class="note__text link" href="' + n.href + '" data-act="open-note" data-id="' + n.id + '">' + esc(n.text) + '</a><span class="mono small muted">' + esc(n.time) + '</span></div>';
      }).join('') : A.empty('bell', 'Belum ada notifikasi.')) + '</div>' +
      '<aside class="well"><h3>Kirim notifikasi untuk</h3>' + [['Lomba baru sesuai minat', 1], ['Pengingat deadline', 1], ['Ajakan tim', 1], ['Balasan forum', 1], ['Pengumuman OSIS', 1], ['Wall of Fame', 0]].map(function (x) {
        return '<div class="setting"><div><strong>' + x[0] + '</strong></div><label class="switch"><input type="checkbox"' + (x[1] ? ' checked' : '') + ' aria-label="' + x[0] + '" data-act="pref"><span></span></label></div>';
      }).join('') + '</aside></div></div>';
  };

  /* ---------- profiles ---------- */
  var BANNERS = { peach: 'Peach', rose: 'Mawar', violet: 'Ungu', sky: 'Langit', teal: 'Toska', mint: 'Mint' };
  A.BANNERS = BANNERS;
  var SECTIONS = { about: 'Tentang saya', prestasi: 'Prestasi', riwayat: 'Riwayat lomba', karya: 'Karya unggulan', keahlian: 'Keahlian', organisasi: 'Organisasi', tautan: 'Tautan' };
  A.SECTIONS = SECTIONS;

  function profileView(s, mode) {
    var own = mode === 'own', viewer = A.S.me, mate = teammates(viewer, s.id);
    var photo = s.photo ? '<span class="avatar avatar--l avatar--photo" style="background-image:url(' + s.photo + ')"></span>' : '<span class="avatar avatar--l av--' + s.av + '">' + s.ini + '</span>';
    var mine = A.entriesOf(s.id);
    var wins = mine.filter(function (e) { return e.status === 'verified' && A.isWin(e); });
    /* others never see private results (not passed, withdrew) or unverified claims */
    var hist = mine.filter(function (e) { return own || (e.status === 'verified' || ['Tidak lolos', 'Mundur'].indexOf(e.result) === -1); });
    var sec = {
      about: s.bio ? '<p>' + esc(s.bio) + '</p>' : '',
      prestasi: wins.length ? '<div class="achv-list">' + wins.map(function (e) {
        return '<a class="achv" href="#prestasi" data-act="view-entry" data-id="' + e.id + '"><span class="achv__icon">' + ic('medal') + '</span><div><strong>' + esc(A.resLabel(e) + ', ' + e.title) + '</strong><div class="small muted">' + esc(e.level) + ', ' + A.dateAt(e.d) + '</div></div><span class="verified">' + ic('badge-check') + 'Terverifikasi OSIS</span></a>';
      }).join('') + '</div>' : '',
      riwayat: hist.length ? '<div class="history">' + hist.map(function (e) {
        var showRes = own || e.status === 'verified';
        var title = e.lomba ? '<a href="#lomba-detail" data-act="view-lomba" data-id="' + e.lomba + '">' + esc(e.title) + '</a>' : '<span>' + esc(e.title) + ' <span class="muted small">' + esc(e.level) + '</span></span>';
        return '<div class="history__row"><span class="dot dot--' + e.cat + '"></span>' + title + (showRes && e.result !== 'Terdaftar' ? '<span class="tag' + (A.isWin(e) ? ' tag--hot' : '') + '">' + esc(A.resLabel(e)) + '</span>' : '') + '</div>';
      }).join('') + '</div>' : '',
      karya: s.featured.length ? '<div class="karya">' + s.featured.map(function (f) { return '<div class="karya__item"><span class="karya__icon">' + ic(f.icon || 'link') + '</span><div><strong>' + esc(f.title) + '</strong><div class="small muted">' + esc(f.kind) + '</div><span class="link small">' + esc(f.url) + '</span></div></div>'; }).join('') + '</div>' : '',
      keahlian: Object.keys(s.skills).length ? '<div class="skills">' + Object.keys(s.skills).map(function (k) {
        var by = s.skills[k], mine = by.indexOf(viewer) !== -1;
        return '<div class="skill"><span class="skill__name">' + esc(k) + '</span><span class="small muted">' + (by.length ? 'Didukung ' + by.length + ' teman' : 'Belum ada dukungan') + '</span>' + (!own && viewer ? '<button class="btn btn--quiet" type="button" aria-pressed="' + mine + '" data-act="endorse" data-id="' + s.id + '" data-val="' + esc(k) + '">' + ic(mine ? 'thumbs-up' : 'plus') + (mine ? 'Didukung' : 'Dukung') + '</button>' : '') + '</div>';
      }).join('') + '</div>' + (s.interests.length ? '<div class="tags" style="margin-top: var(--space-sm)">' + s.interests.map(function (i) { var k = Object.keys(A.S.cats).find(function (c) { return A.S.cats[c].name === i; }); return '<span class="tag' + (k ? ' tag--' + k : '') + '">' + esc(i) + '</span>'; }).join('') + '</div>' : '') : '',
      organisasi: s.orgs.length ? '<div class="orgs">' + s.orgs.map(function (o) { return A.org(o); }).join('') + '</div>' : '',
      tautan: '<div class="links">' + (s.linkedin && s.showLinkedin ? '<div class="links__row"><span>' + ic('linkedin') + ' LinkedIn</span><span class="link">' + esc(s.linkedin) + '</span></div>' : '') +
        '<div class="links__row"><span>' + ic('phone') + ' WhatsApp</span>' + (own ? '<span class="muted">Hanya anggota tim</span>' : mate ? '<span class="link">' + esc(s.wa) + '</span>' : '<span class="muted">Hanya anggota tim</span>') + '</div></div>'
    };
    var body = s.order.filter(function (k) { return s.hidden.indexOf(k) === -1 && sec[k]; }).map(function (k) { return '<section class="pblock"><h2>' + SECTIONS[k] + '</h2>' + sec[k] + '</section>'; }).join('');
    var banner = s.bannerImg ? ' style="background-image:url(' + s.bannerImg + ')"' : '';
    var actions = own ? '<div class="profile__actions"><a class="btn btn--secondary" href="#orang" data-act="preview-self">' + ic('eye') + 'Lihat sebagai orang lain</a><a class="btn btn--primary" href="#profil-edit">' + ic('pencil') + 'Ubah profil</a></div>'
      : (mate ? '<div class="profile__actions"><span class="tag tag--ok">' + ic('users') + 'Satu tim</span></div>' : '');
    var share = own ? '<div class="share"><div><strong>Bagikan profil</strong>' + (s.publicLink ? '<span class="share__link">' + ic('link') + 'adzvance.com/u/' + s.id + '</span>' : '') + '</div><label class="switch"><input type="checkbox"' + (s.publicLink ? ' checked' : '') + ' data-act="public-link" aria-label="Bagikan profil"><span></span></label></div>' : '';
    /* identity on the left, the student's sections on the right; NISN never shows on a profile */
    return '<div class="profile profile--split"><div class="profile__banner banner--' + (s.banner || 'peach') + '"' + banner + '></div>' +
      '<div class="profile__grid"><aside class="profile__id">' + photo +
      '<h1 class="profile__name">' + esc(s.name) + '</h1>' + (s.headline ? '<p class="profile__headline">' + esc(s.headline) + '</p>' : '') +
      '<p class="profile__meta">' + esc(s.kelas) + ' · SMA Islam Plus Adzkia</p>' + actions + share + '</aside>' +
      '<div class="profile__body">' + body + '</div></div></div>';
  }
  V.profil = function () { return '<div class="container page">' + profileView(A.me(), 'own') + '</div>'; };
  V.orang = function () {
    var s = A.stu(A.ui.viewUser) || A.me(), self = s.id === A.S.me;
    return '<div class="container page">' + (self ? '<div class="preview-note">' + ic('eye') + '<span>Tampilan untuk siswa lain</span><a class="link small" href="#profil">Kembali ke profilku</a></div>' : '<p class="crumb"><a class="link small" href="#" data-act="back">' + ic('arrow-left') + 'Kembali</a></p>') + profileView(s, 'other') + '</div>';
  };

  /* ---------- profile editor ---------- */
  function picker(kind, all, chosen) {
    return '<div class="pblock picker"><div class="pblock__head"><h2>' + (kind === 'interests' ? 'Minat' : 'Keahlian') + '</h2><span class="picker__count">' + chosen.length + '/5</span></div><div class="chips">' +
      all.map(function (k) { var on = chosen.indexOf(k) !== -1; return '<button class="chip" type="button" aria-pressed="' + on + '"' + (!on && chosen.length >= 5 ? ' disabled' : '') + ' data-act="pick" data-group="' + kind + '" data-val="' + esc(k) + '">' + esc(k) + '</button>'; }).join('') + '</div></div>';
  }
  V['profil-edit'] = function () {
    var s = A.me();
    var photo = s.photo ? '<span class="avatar avatar--l avatar--photo" style="background-image:url(' + s.photo + ')"></span>' : '<span class="avatar avatar--l av--' + s.av + '">' + s.ini + '</span>';
    return '<div class="container page"><div class="page__head"><div><h1>Ubah profil</h1></div><div class="head__actions"><a class="btn btn--secondary" href="#orang" data-act="preview-self">' + ic('eye') + 'Pratinjau</a><a class="btn btn--primary" href="#profil" data-act="done-edit">Selesai</a></div></div>' +
      '<div class="split edit"><div>' +
      '<section class="edit-card"><h2>Tampilan</h2><div class="edit-photo">' + photo + '<label class="btn btn--secondary">' + ic('camera') + 'Ganti foto<input type="file" accept="image/png,image/jpeg" data-act="photo" hidden></label>' + (s.photo ? '<button class="btn btn--quiet" type="button" data-act="photo-remove">Hapus</button>' : '') + '</div>' +
      '<span class="label">Banner</span><div class="swatches">' + Object.keys(BANNERS).map(function (k) { return '<button class="swatch banner--' + k + '" type="button" aria-pressed="' + (!s.bannerImg && s.banner === k) + '" aria-label="' + BANNERS[k] + '" data-act="banner" data-val="' + k + '"></button>'; }).join('') +
      '<label class="swatch swatch--upload" aria-label="Unggah gambar banner">' + ic('image-plus') + '<input type="file" accept="image/png,image/jpeg" data-act="banner-img" hidden></label></div></section>' +
      '<section class="edit-card"><h2>Tentang kamu</h2>' +
      '<div class="grid-2"><div class="field"><label for="pe-name">Nama <span class="lock">Dari data sekolah</span></label><input class="input" id="pe-name" value="' + esc(s.name) + '" disabled></div>' +
      '<div class="field"><label for="pe-nisn">NISN <span class="lock">Dari data sekolah</span></label><input class="input mono" id="pe-nisn" value="' + esc(s.nisn) + '" disabled></div></div>' +
      '<div class="field"><label for="pe-head">Headline</label><input class="input" id="pe-head" maxlength="70" value="' + esc(s.headline) + '" placeholder="Contoh: Programmer dan penulis esai" data-bind="headline"></div>' +
      '<div class="field"><label for="pe-class">Kelas</label><input class="input" id="pe-class" value="' + esc(s.kelas) + '" data-bind="kelas"></div>' +
      '<div class="field"><label for="pe-bio">Tentang saya</label><textarea class="input" id="pe-bio" maxlength="200" data-bind="bio">' + esc(s.bio) + '</textarea></div>' +
      '<div class="field"><span class="label">Organisasi <span class="lock">Diatur admin</span></span><div class="orgs">' + (s.orgs.length ? s.orgs.map(function (o) { return A.org(o); }).join('') : '<span class="small muted">Belum ada</span>') + '</div></div></section>' +
      '<section class="edit-card">' + picker('interests', A.S.interests, s.interests) + picker('skills', A.S.skills, Object.keys(s.skills)) + '</section>' +
      '<section class="edit-card"><div class="pblock__head"><h2>Lomba dan prestasi</h2><button class="btn btn--quiet" type="button" data-act="new-fame">' + ic('plus') + 'Tambah prestasi</button></div>' +
      (A.entriesOf(s.id).length ? A.entriesOf(s.id).map(function (e) {
        var st = A.STATUS[e.status], act = e.status === 'joined' || e.status === 'info' || e.status === 'rejected';
        return '<div class="edit-row"><span><strong>' + esc(e.title) + '</strong> <span class="muted small">' + esc(e.level) + (e.result !== 'Terdaftar' ? ', ' + esc(A.resLabel(e)) : '') + '</span><br><span class="status-chip status-chip--' + (st[2] || 'plain') + '">' + ic(st[0]) + st[1] + '</span></span>' +
          (act ? '<button class="btn btn--quiet" type="button" data-act="' + (e.lomba && e.status === 'joined' ? 'view-lomba-go' : 'entry-open') + '" data-id="' + (e.lomba && e.status === 'joined' ? e.lomba : e.id) + '">' + ic('pencil') + 'Perbarui</button>' : '') + '</div>';
      }).join('') : '<p class="small muted">Belum ada.</p>') + '</section>' +
      '<section class="edit-card"><div class="pblock__head"><h2>Karya unggulan</h2><button class="btn btn--quiet" type="button" data-act="add-karya">' + ic('plus') + 'Tambah</button></div>' +
      (s.featured.length ? s.featured.map(function (f) { return '<div class="edit-row"><span>' + ic(f.icon || 'link') + '<strong>' + esc(f.title) + '</strong> <span class="muted small">' + esc(f.kind) + '</span></span><button class="icon-btn" type="button" data-act="del-karya" data-id="' + f.id + '" aria-label="Hapus">' + ic('trash-2') + '</button></div>'; }).join('') : '<p class="small muted">Belum ada.</p>') + '</section></div>' +
      '<div class="stack"><section class="edit-card"><h2>Bagian profil</h2><ol class="order">' +
      s.order.map(function (k, i) { var hid = s.hidden.indexOf(k) !== -1; return '<li class="' + (hid ? 'is-hidden' : '') + '"><span>' + SECTIONS[k] + '</span><span class="order__btns"><button class="icon-btn" type="button" data-act="sec-up" data-val="' + k + '"' + (i === 0 ? ' disabled' : '') + ' aria-label="Naikkan">' + ic('chevron-up') + '</button><button class="icon-btn" type="button" data-act="sec-down" data-val="' + k + '"' + (i === s.order.length - 1 ? ' disabled' : '') + ' aria-label="Turunkan">' + ic('chevron-down') + '</button><label class="switch switch--s"><input type="checkbox"' + (hid ? '' : ' checked') + ' data-act="sec-toggle" data-val="' + k + '" aria-label="Tampilkan ' + SECTIONS[k] + '"><span></span></label></span></li>'; }).join('') + '</ol></section>' +
      '<section class="edit-card"><h2>Tautan</h2><div class="field"><label for="pe-li">LinkedIn</label><input class="input" id="pe-li" value="' + esc(s.linkedin) + '" data-bind="linkedin"></div>' +
      '<div class="setting"><div><strong>Tampilkan LinkedIn</strong></div><label class="switch"><input type="checkbox"' + (s.showLinkedin ? ' checked' : '') + ' data-act="show-li" aria-label="Tampilkan LinkedIn"><span></span></label></div>' +
      '<div class="field"><label for="pe-wa">WhatsApp <span class="lock">Hanya untuk anggota tim</span></label><input class="input" id="pe-wa" inputmode="tel" value="' + esc(s.wa) + '" data-bind="wa"></div></section>' +
      '<section class="edit-card"><h2>Wall of Fame</h2><div class="setting"><div><strong>Tampilkan saya di Wall of Fame publik</strong></div><label class="switch"><input type="checkbox"' + (s.fameHidden ? '' : ' checked') + ' data-act="fame-public" aria-label="Tampilkan saya di Wall of Fame publik"><span></span></label></div></section></div></div></div>';
  };
})();
