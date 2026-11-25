/* ADZVANCE prototype: public pages (no login needed) and the Wall of Fame.
 * Editorial direction: one monthly edition, set as an honor roll. Verified results only, newest first, never ranked. */
(function () {
  var A = window.A, V = A.V, esc = A.esc, ic = A.ic;
  var IG = 'https://instagram.com/smaislamplusadzkiamedan';
  var SCHOOL = 'SMA Islam Plus Adzkia Medan';
  var IMG = 'img/school/';

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
  function names(e) {
    var w = A.whoShown(e), n = w.shown.map(function (s) { return esc(s.name); });
    if (w.hidden) n.push(w.hidden + ' siswa lainnya');
    if (e.ext) n.push(esc(e.ext));
    return n.join(', ');
  }
  /* a name links to a profile only for logged-in students, or when the student turned on a public link */
  function pname(s) {
    if (A.S.me) return A.name(s);
    return s.publicLink ? '<a class="name-link" href="#" data-act="toast" data-val="Membuka adzvance.com/u/' + esc(s.id) + ' (demo)">' + esc(s.name) + '</a>' : esc(s.name);
  }
  function team(e) {
    var w = A.whoShown(e);
    return '<ul class="team">' + w.shown.map(function (s) { return '<li><span>' + pname(s) + '</span><span class="team__class">' + esc(s.kelas) + '</span></li>'; }).join('') +
      (w.hidden ? '<li><span>' + w.hidden + ' siswa lainnya</span></li>' : '') + (e.ext ? '<li><span>' + esc(e.ext) + '</span></li>' : '') + '</ul>';
  }
  function path(e) {
    var chain = [e], p = e;
    while (p.prev && (p = A.S.entries.find(function (x) { return x.id === p.prev; }))) chain.unshift(p);
    var n = e; while ((n = A.S.entries.find(function (x) { return x.prev === n.id && x.status === 'verified'; }))) chain.push(n);
    if (chain.length < 2) return '';
    return '<ol class="path">' + chain.map(function (x, i) { return (i ? '<li class="path__arrow" aria-hidden="true">' + ic('arrow-right') + '</li>' : '') + '<li class="path__step' + (x === e ? ' is-here' : '') + '"><span>' + esc(x.level) + '</span>' + esc(A.resLabel(x)) + '</li>'; }).join('') + '</ol>';
  }
  function link(e, inner, cls) { return '<a class="' + cls + '" href="#prestasi" data-act="view-entry" data-id="' + e.id + '">' + inner + '</a>'; }
  /* the honor roll: one row per result */
  function row(e) {
    return link(e, '<span class="roll__res">' + esc(A.resLabel(e)) + '</span>' +
      '<span class="roll__main"><span class="roll__title">' + esc(e.title) + '</span><span class="roll__who">' + names(e) + '</span></span>' +
      '<span class="roll__lvl">' + esc(e.level) + '</span>' + ic('arrow-up-right', 'roll__go'), 'roll__row');
  }
  function roll(list) { return '<div class="roll">' + list.map(row).join('') + '</div>'; }
  /* the lead result of an edition: its photo, or the result itself set large */
  function lead(e) {
    var media = e.photo ? '<img src="' + e.photo + '" alt="">' : '<span class="lead__word">' + esc(A.resLabel(e)) + '</span>';
    return '<article class="lead">' + link(e, media, 'lead__media' + (e.photo ? ' has-photo' : '')) +
      '<div class="lead__body"><p class="lead__meta">' + (e.photo ? esc(A.resLabel(e)) + ' · ' : '') + esc(e.level) + ' · ' + esc(e.org) + '</p>' +
      '<h2 class="lead__title">' + link(e, esc(e.title), 'lead__link') + '</h2>' + team(e) + '</div></article>';
  }
  function arrows(keys, k) {
    var i = keys.indexOf(k);
    return '<button class="masthead__arrow" type="button" data-act="fame-month" data-val="' + (keys[i + 1] || '') + '"' + (keys[i + 1] ? '' : ' disabled') + ' aria-label="Edisi sebelumnya">' + ic('arrow-left') + '</button>' +
      '<button class="masthead__arrow" type="button" data-act="fame-month" data-val="' + (keys[i - 1] || '') + '"' + (i > 0 ? '' : ' disabled') + ' aria-label="Edisi berikutnya">' + ic('arrow-right') + '</button>';
  }

  /* ---------- wall of fame: monthly edition ---------- */
  V.wall = function () {
    var keys = editions(), k = currentEdition(keys), list = k ? inEdition(k) : [];
    if (!k) return '<div class="pub-wrap pub-page">' + A.empty('star', 'Belum ada prestasi.') + '</div>';
    return '<div class="pub-wrap wall-page"><header class="masthead" data-enter><p class="masthead__kicker">Wall of Fame</p>' +
      '<div class="masthead__row"><h1>' + A.monthLabel(k) + '</h1><div class="masthead__nav">' + arrows(keys, k) + '</div></div>' +
      (A.S.me ? '<button class="pub-btn pub-btn--quiet masthead__submit" type="button" data-act="new-fame">' + ic('plus') + 'Kirim prestasi</button>' : '') + '</header>' +
      lead(list[0]) + (list.length > 1 ? roll(list.slice(1)) : '') + '</div>';
  };

  /* ---------- one result ---------- */
  V.prestasi = function () {
    var e = A.S.entries.find(function (x) { return x.id === A.ui.viewEntry; });
    if (!e || e.status !== 'verified' || !A.whoShown(e).shown.length) return '<div class="pub-wrap pub-page">' + A.empty('star', 'Prestasi ini tidak ditemukan.', '<a class="pub-btn" href="#wall">Wall of Fame</a>') + '</div>';
    var member = A.S.me && e.who.indexOf(A.S.me) !== -1;
    return '<article class="pub-wrap result-page" data-enter><a class="backlink" href="#wall" data-act="fame-month" data-val="' + e.month + '">' + ic('arrow-left') + A.monthLabel(e.month) + '</a>' +
      '<div class="result-page__grid"><p class="result-page__res">' + esc(A.resLabel(e)) + '</p><div class="result-page__body"><h1>' + esc(e.title) + '</h1>' +
      '<dl class="result-page__facts"><div><dt>Tingkat</dt><dd>' + esc(e.level) + '</dd></div><div><dt>Penyelenggara</dt><dd>' + esc(e.org) + '</dd></div><div><dt>Tanggal</dt><dd>' + A.dateAt(e.d) + '</dd></div></dl>' +
      (e.photo ? '<figure class="result-page__photo"><img src="' + e.photo + '" alt=""></figure>' : '') +
      team(e) + path(e) +
      '<div class="result-page__foot"><span class="stamp"><span class="crest"><img src="img/adzkia-logo.png" alt=""></span>Diverifikasi OSIS</span>' +
      '<span class="result-page__actions"><button class="pub-btn pub-btn--quiet" type="button" data-act="share-entry" data-id="' + e.id + '">' + ic('share-2') + 'Bagikan</button>' +
      (A.S.me ? '<button class="pub-btn pub-btn--quiet" type="button" data-act="report-entry" data-id="' + e.id + '">' + ic('flag') + (member ? 'Koreksi' : 'Laporkan') + '</button>' : '') + '</span></div></div></div></article>';
  };

  /* ---------- public home ---------- */
  V.home = function () {
    var keys = editions(), k = keys.indexOf(A.monthKey(0)) !== -1 ? A.monthKey(0) : keys[0], list = k ? inEdition(k) : [];
    return '<div class="home">' +
      '<section class="pub-wrap hero" data-enter><div class="hero__text"><p class="hero__kicker">' + SCHOOL + '</p>' +
      '<h1>Prestasi siswa Adzkia, setiap bulan.</h1>' +
      '<div class="hero__actions"><a class="pub-btn" href="#wall">Buka edisi ' + (k ? A.monthLabel(k).split(' ')[0] : 'terbaru') + '</a><a class="pub-btn pub-btn--quiet" href="#masuk">Masuk siswa</a></div></div>' +
      '<figure class="hero__photo"><img src="' + IMG + 'life-4.jpg" alt="Siswi SMA Islam Plus Adzkia Medan belajar bersama"></figure></section>' +
      (list.length ? '<section class="pub-wrap edition"><div class="edition__head"><h2>Edisi ' + A.monthLabel(k) + '</h2><a class="textlink" href="#wall">Semua edisi' + ic('arrow-right') + '</a></div>' + lead(list[0]) + '</section>' : '') +
      '<section class="motto"><img src="' + IMG + 'life-pair.jpg" alt=""><div class="pub-wrap motto__in"><p class="motto__line">Dikelola OSIS ' + SCHOOL + '.</p><a class="textlink textlink--light" href="#tentang">Tentang ADZVANCE' + ic('arrow-right') + '</a></div></section></div>';
  };

  /* ---------- tentang kami ---------- */
  V.tentang = function () {
    return '<div class="about">' +
      '<section class="about__hero"><img src="' + IMG + 'life-group.jpg" alt="Siswa SMA Islam Plus Adzkia Medan belajar bersama"><div class="pub-wrap about__hero-in" data-enter><h1>Tentang kami</h1></div></section>' +
      '<section class="pub-wrap prose-row"><h2>ADZVANCE</h2><div class="prose">' +
      '<p class="prose__lede">Website ini dikelola oleh OSIS SMA Islam Plus Adzkia Medan untuk mendukung siswa yang berani berlomba, apa pun hasilnya.</p>' +
      '<p>ADZVANCE bertujuan menjadi wadah berbagi prestasi siswa Adzkia, agar kerja keras mereka dikenal oleh teman, guru, orang tua, dan masyarakat. Setiap prestasi dihargai sama, tanpa peringkat.</p></div></section>' +
      '<section class="pub-wrap prose-row"><h2>Sekolah</h2><div class="prose">' +
      '<p>SMA Islam Plus Adzkia Medan adalah sekolah menengah atas Islam berakreditasi A di Kota Medan.</p></div></section>' +
      '<section class="pub-wrap about__motto"><blockquote>Membangun pemimpin cerdas dan berakhlak mulia.</blockquote></section>' +
      '<section class="pub-wrap prose-row"><h2>Kontak</h2><div class="prose">' +
      '<p class="prose__contact">OSIS, lewat Instagram sekolah <a class="textlink" href="' + IG + '" target="_blank" rel="noopener">@smaislamplusadzkiamedan</a></p></div></section></div>';
  };

  /* ---------- kebijakan privasi ---------- */
  V.privasi = function () {
    var s = [
      ['Siapa kami', 'ADZVANCE dikelola OSIS SMA Islam Plus Adzkia Medan untuk siswa sekolah ini. Akun dibuat dari daftar NISN sekolah; tidak ada pendaftaran terbuka.'],
      ['Data yang kami simpan', 'Nama, NISN, kelas, dan isi profil yang diisi siswa sendiri: foto, bio, minat, keahlian, dan tautan. Untuk lomba: lomba yang diikuti, hasilnya, serta bukti dan sertifikat yang diunggah untuk verifikasi.'],
      ['Yang tampil untuk publik', 'Hanya prestasi yang sudah diverifikasi OSIS: nama siswa, kelas, nama lomba, tingkat, hasil, dan foto prestasi jika ada. Profil siswa hanya tampil untuk publik jika siswa sendiri menyalakan tautan publiknya.'],
      ['Yang tidak pernah tampil', 'NISN, kata sandi, nomor WhatsApp, bukti dan sertifikat, serta hasil tidak lolos atau mundur. Bukti dan sertifikat hanya dapat dibuka admin OSIS.'],
      ['Menyembunyikan nama', 'Di halaman Ubah profil, siswa dapat mematikan pilihan tampil di Wall of Fame publik. Setelah itu pengunjung luar tidak melihat namanya; siswa Adzkia yang sudah masuk tetap dapat melihatnya.'],
      ['Foto', 'Foto yang diunggah diperkecil dan data lokasinya dihapus sebelum disimpan.'],
      ['Cookie', 'Kami hanya memakai satu cookie untuk menjaga sesi masuk. Tidak ada iklan dan tidak ada pelacak pihak ketiga.'],
      ['Penyimpanan', 'Data disimpan di server sekolah. Prestasi yang sudah terbit tetap ada setelah siswa lulus, kecuali siswa atau orang tua meminta penghapusan.'],
      ['Permintaan hapus', 'Siswa atau orang tua dapat meminta OSIS menghapus prestasi, foto, atau akun lewat Instagram sekolah. Data dihapus dari situs secepatnya.']
    ];
    return '<article class="pub-wrap legal" data-enter><h1>Kebijakan privasi</h1><p class="legal__date">Diperbarui 25 November 2026</p>' +
      s.map(function (x, i) { return '<section><span class="legal__n">' + (i + 1) + '</span><div><h2>' + x[0] + '</h2><p>' + x[1] + '</p></div></section>'; }).join('') + '</article>';
  };
})();
