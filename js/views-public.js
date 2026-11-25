/* ADZVANCE prototype: public pages (no login needed) and the Wall of Fame.
 * The Wall shows one monthly edition at a time: verified results, newest first, never ranked. */
(function () {
  var A = window.A, V = A.V, esc = A.esc, ic = A.ic;
  var IG = 'instagram.com/smaislamplusadzkiamedan';
  var SCHOOL = 'SMA Islam Plus Adzkia Medan';

  /* ---------- data ---------- */
  function visible() {
    return A.S.entries.filter(function (e) { return e.status === 'verified' && A.eligible(e) && A.whoShown(e).shown.length; });
  }
  function editions() {
    var keys = [];
    visible().forEach(function (e) { if (keys.indexOf(e.month) === -1) keys.push(e.month); });
    return keys.sort().reverse();
  }
  function inEdition(k) { return visible().filter(function (e) { return e.month === k; }).sort(function (a, b) { return b.d - a.d; }); }
  function currentEdition(keys) { return keys.indexOf(A.ui.fameMonth) !== -1 ? A.ui.fameMonth : keys.indexOf(A.monthKey(0)) !== -1 ? A.monthKey(0) : keys[0]; }
  A.editions = editions; A.inEdition = inEdition; A.currentEdition = currentEdition;

  /* ---------- pieces ---------- */
  var ART = { gold: 'trophy', silver: 'medal', bronze: 'medal', soft: 'award', special: 'star' };
  function cls(e) { return A.resInfo(e.result).cls || 'soft'; }
  function art(e) { return e.photo ? '<img src="' + e.photo + '" alt="">' : '<span class="fcard__art">' + ic(ART[cls(e)]) + '</span>'; }
  /* a name links to a profile only for logged-in students, or when the student turned on their public link */
  function pname(s) {
    if (A.S.me) return A.name(s);
    return s.publicLink ? '<a class="name-link" href="#" data-act="toast" data-val="Membuka adzvance.com/u/' + esc(s.id) + ' (demo)">' + esc(s.name) + '</a>' : esc(s.name);
  }
  function people(e, withClass) {
    var w = A.whoShown(e), names = w.shown.map(function (s) { return pname(s) + (withClass ? ' <span class="muted">' + esc(s.kelas) + '</span>' : ''); });
    if (w.hidden) names.push(w.hidden + ' siswa lainnya');
    if (e.ext) names.push(esc(e.ext));
    return names.join(withClass ? '<br>' : ', ');
  }
  function path(e) {
    var chain = [e], p = e;
    while (p.prev && (p = A.S.entries.find(function (x) { return x.id === p.prev; }))) chain.unshift(p);
    var n = e; while ((n = A.S.entries.find(function (x) { return x.prev === n.id && x.status === 'verified'; }))) chain.push(n);
    if (chain.length < 2) return '';
    return '<p class="fpath">' + ic('route') + chain.map(function (x) { return '<span' + (x === e ? ' class="is-here"' : '') + '>' + esc(x.level) + ': ' + esc(A.resLabel(x)) + '</span>'; }).join(ic('chevron-right')) + '</p>';
  }
  function open(e, inner, extra) { return '<a class="' + (extra || '') + '" href="#prestasi" data-act="view-entry" data-id="' + e.id + '">' + inner + '</a>'; }
  function card(e) {
    return '<article class="fcard fcard--' + cls(e) + '">' + open(e, art(e) + '<span class="fcard__level">' + esc(e.level) + '</span>', 'fcard__media') +
      '<div class="fcard__body"><span class="fres fres--' + cls(e) + '">' + esc(A.resLabel(e)) + '</span>' +
      '<h3 class="fcard__title">' + open(e, esc(e.title)) + '</h3><p class="fcard__who">' + people(e) + '</p>' + path(e) + '</div></article>';
  }
  function cover(e, label) {
    return '<article class="fcover fcard--' + cls(e) + '">' + open(e, art(e), 'fcover__media') +
      '<div class="fcover__body"><span class="label">' + label + '</span><span class="fres fres--' + cls(e) + '">' + esc(A.resLabel(e)) + '</span>' +
      '<h2>' + open(e, esc(e.title)) + '</h2><p class="fcard__who">' + people(e, true) + '</p><p class="small muted">' + esc(e.level) + ' · ' + esc(e.org) + '</p>' + path(e) + '</div></article>';
  }
  A.fameCard = card;

  /* ---------- wall of fame: monthly edition ---------- */
  V.wall = function () {
    var keys = editions(), k = currentEdition(keys), i = keys.indexOf(k), list = k ? inEdition(k) : [];
    var studs = {}; list.forEach(function (e) { A.whoShown(e).shown.forEach(function (s) { studs[s.id] = 1; }); });
    var nowEmpty = k && k !== A.monthKey(0) && !A.ui.fameMonth;
    var submit = A.S.me ? '<button class="btn btn--primary" type="button" data-act="new-fame">' + ic('plus') + 'Kirim prestasi</button>' : '';
    var head = '<div class="edition__head"><button class="icon-btn edition__arrow" type="button" data-act="fame-month" data-val="' + (keys[i + 1] || '') + '"' + (keys[i + 1] ? '' : ' disabled') + ' aria-label="Edisi sebelumnya">' + ic('chevron-left') + '</button>' +
      '<div class="edition__title"><h1>' + (k ? 'Edisi ' + A.monthLabel(k) : 'Wall of Fame') + '</h1><p>' + list.length + ' prestasi · ' + Object.keys(studs).length + ' siswa</p></div>' +
      '<button class="icon-btn edition__arrow" type="button" data-act="fame-month" data-val="' + (keys[i - 1] || '') + '"' + (i > 0 ? '' : ' disabled') + ' aria-label="Edisi berikutnya">' + ic('chevron-right') + '</button>' + submit + '</div>';
    if (!k) return '<div class="container page">' + head + A.empty('star', 'Prestasi yang sudah diverifikasi OSIS akan tampil di sini.') + '</div>';
    return '<div class="container page edition">' + head +
      (nowEmpty ? '<p class="edition__note">' + ic('info') + 'Belum ada prestasi bulan ini. Ini edisi terakhir.</p>' : '') +
      cover(list[0], 'Sampul edisi') + (list.length > 1 ? '<div class="fgrid">' + list.slice(1).map(card).join('') + '</div>' : '') + '</div>';
  };

  /* ---------- one result ---------- */
  V.prestasi = function () {
    var e = A.S.entries.find(function (x) { return x.id === A.ui.viewEntry; });
    if (!e || e.status !== 'verified' || !A.whoShown(e).shown.length) return '<div class="container page">' + A.empty('star', 'Prestasi ini tidak ditemukan.', '<a class="btn btn--secondary" href="#wall">Ke Wall of Fame</a>') + '</div>';
    var member = A.S.me && e.who.indexOf(A.S.me) !== -1;
    return '<div class="container page"><p class="crumb"><a class="link small" href="#wall" data-act="fame-month" data-val="' + e.month + '">' + ic('arrow-left') + 'Edisi ' + A.monthLabel(e.month) + '</a></p>' +
      '<article class="result fcard--' + cls(e) + '"><div class="result__media">' + art(e) + '</div><div class="result__body">' +
      '<span class="fres fres--' + cls(e) + '">' + esc(A.resLabel(e)) + '</span><h1>' + esc(e.title) + '</h1>' +
      '<dl class="facts"><dt>Tingkat</dt><dd>' + esc(e.level) + '</dd><dt>Penyelenggara</dt><dd>' + esc(e.org) + '</dd><dt>Tanggal</dt><dd>' + A.dateAt(e.d) + '</dd><dt>' + (e.who.length + (e.ext ? 1 : 0) > 1 ? 'Tim' : 'Siswa') + '</dt><dd>' + people(e, true) + '</dd></dl>' + path(e) +
      '<p class="verified">' + ic('badge-check') + 'Diverifikasi OSIS ' + SCHOOL + '</p>' +
      '<div class="head__actions"><button class="btn btn--secondary" type="button" data-act="share-entry" data-id="' + e.id + '">' + ic('share-2') + 'Bagikan</button>' +
      (A.S.me ? '<button class="btn btn--quiet" type="button" data-act="report-entry" data-id="' + e.id + '">' + ic('flag') + (member ? 'Ada yang salah?' : 'Laporkan') + '</button>' : '') + '</div></div></article></div>';
  };

  /* ---------- public home ---------- */
  V.home = function () {
    var keys = editions(), k = keys.indexOf(A.monthKey(0)) !== -1 ? A.monthKey(0) : keys[0], list = k ? inEdition(k) : [];
    var inside = [['award', 'Info Lomba', 'Lomba untuk SMA, diperbarui setiap hari.'], ['users', 'Cari Partner', 'Bentuk tim dengan teman satu sekolah.'], ['message-circle', 'Forum Soal', 'Tanya dan jawab soal latihan.']];
    return '<div class="pub">' +
      '<section class="container pub-hero"><div class="pub-hero__text"><span class="pub-school"><span class="crest"><img src="img/adzkia-logo.png" alt=""></span>' + SCHOOL + '</span>' +
      '<h1>Prestasi siswa Adzkia, bulan demi bulan.</h1><div class="head__actions"><a class="btn btn--primary" href="#wall">' + ic('star') + 'Lihat Wall of Fame</a><a class="btn btn--secondary" href="#masuk">Masuk</a></div></div>' +
      (list.length ? cover(list[0], 'Edisi ' + A.monthLabel(k)) : A.empty('star', 'Edisi pertama segera terbit.')) + '</section>' +
      (list.length > 1 ? '<section class="container pub-sec"><div class="section-title"><h2>Juga di edisi ini</h2><a class="link small" href="#wall">Lihat semua</a></div><div class="fgrid">' + list.slice(1, 4).map(card).join('') + '</div></section>' : '') +
      '<section class="container pub-sec"><div class="section-title"><h2>Di dalam ADZVANCE</h2></div><div class="inside">' + inside.map(function (x) { return '<div class="inside__item"><span class="inside__icon">' + ic(x[0]) + '</span><div><strong>' + x[1] + '</strong><p class="small muted">' + x[2] + '</p></div></div>'; }).join('') + '</div></section></div>';
  };

  /* ---------- tentang kami ---------- */
  V.tentang = function () {
    var steps = [['send', 'Siswa mengirim hasil', 'Dengan tautan pengumuman resmi atau tangkapan layar.'], ['search-check', 'OSIS memeriksa', 'Dicocokkan dengan pengumuman penyelenggara atau unggahan sekolah.'], ['star', 'Terbit di Wall of Fame', 'Masuk edisi bulan itu dan tampil di profil siswa.']];
    return '<div class="container page pub-page"><div class="pub-page__head"><span class="crest crest--l"><img src="img/adzkia-logo.png" alt=""></span><div><h1>Tentang ADZVANCE</h1><p>Platform lomba siswa ' + SCHOOL + ': cari lomba, bentuk tim, dan catat prestasi.</p></div></div>' +
      '<section class="pub-block"><h2>Dikelola OSIS</h2><p>ADZVANCE dikelola OSIS ' + SCHOOL + '. Hanya siswa Adzkia yang bisa masuk, dengan NISN masing-masing.</p></section>' +
      '<section class="pub-block"><h2>Dari lomba ke Wall of Fame</h2><ol class="steps">' + steps.map(function (s, i) { return '<li><span class="steps__icon">' + ic(s[0]) + '</span><span class="steps__n">' + (i + 1) + '</span><strong>' + s[1] + '</strong><p class="small muted">' + s[2] + '</p></li>'; }).join('') + '</ol>' +
      '<p class="small muted">Yang tampil: juara, medali, penghargaan khusus, dan lolos ke tingkat berikutnya untuk lomba berjenjang seperti OSN dan FLS2N. Hanya lomba di luar sekolah.</p></section>' +
      '<section class="pub-block"><h2>Kontak</h2><dl class="facts"><dt>Koreksi atau hapus data</dt><dd>OSIS, lewat Instagram sekolah</dd><dt>Instagram</dt><dd><a class="link" href="https://' + IG + '" target="_blank" rel="noopener">@smaislamplusadzkiamedan</a></dd><dt>Kampus I</dt><dd>Jl. Tuasan No. 4 dan 6, Medan</dd><dt>Kampus II</dt><dd>Jl. Iskandar Muda No. 244, Medan</dd></dl></section></div>';
  };

  /* ---------- kebijakan privasi ---------- */
  V.privasi = function () {
    var blocks = [
      ['eye', 'Yang tampil publik', 'Nama, kelas, foto prestasi (jika ada), nama lomba, tingkat, dan hasil yang sudah diverifikasi OSIS.'],
      ['eye-off', 'Yang tidak pernah tampil', 'NISN, kata sandi, nomor WhatsApp, bukti dan sertifikat, serta hasil "tidak lolos" atau "mundur".'],
      ['user-x', 'Menyembunyikan diri', 'Siswa bisa mematikan "Tampilkan saya di Wall of Fame publik" di Ubah profil. Siswa lain yang sudah masuk tetap bisa melihat.'],
      ['trash-2', 'Permintaan hapus', 'Siswa atau orang tua bisa meminta OSIS menghapus prestasi atau foto. Data dihapus dari situs secepatnya.']
    ];
    return '<div class="container page pub-page"><div class="pub-page__head"><div><h1>Kebijakan privasi</h1><p>Siswa Adzkia masih di bawah umur. Kami hanya menampilkan yang perlu.</p></div></div>' +
      '<div class="privacy">' + blocks.map(function (b) { return '<section class="privacy__item"><span class="inside__icon">' + ic(b[0]) + '</span><div><h2>' + b[1] + '</h2><p>' + b[2] + '</p></div></section>'; }).join('') + '</div></div>';
  };
})();
