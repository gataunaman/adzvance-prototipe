/* ADZVANCE variant 3: Geometri Riang. Demo data copied from prototype/js/data.js (names made up). */
(function () {
  'use strict';

  /* ---------- dates ---------- */
  var TODAY = new Date(); TODAY.setHours(0, 0, 0, 0);
  var BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  var BLN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  var HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  function addDays(n) { var d = new Date(TODAY); d.setDate(d.getDate() + n); return d; }
  function fmt(d) { return d.getDate() + ' ' + BLN[d.getMonth()]; }
  function fmtLong(d) { return HARI[d.getDay()] + ', ' + d.getDate() + ' ' + BULAN[d.getMonth()]; }
  function monthName(off) { var d = new Date(TODAY); d.setDate(1); d.setMonth(d.getMonth() + off); return BULAN[d.getMonth()] + ' ' + d.getFullYear(); }
  function ago(n) { n = Math.abs(n); return n === 0 ? 'Hari ini' : n === 1 ? 'Kemarin' : n + ' hari lalu'; }
  function rupiah(n) { return n ? 'Rp ' + n.toLocaleString('id-ID') : 'Gratis'; }

  /* ---------- data ---------- */
  var CAT = {
    sains: { name: 'Sains', col: 'leaf', shape: 'circle' },
    esai: { name: 'Esai', col: 'sun', shape: 'quarter' },
    debat: { name: 'Debat', col: 'tomato', shape: 'halves' },
    tek: { name: 'Teknologi', col: 'cobalt', shape: 'square' },
    seni: { name: 'Seni', col: 'pink', shape: 'triangle' }
  };
  var INTEREST_CAT = { 'Sains': 'sains', 'Esai': 'esai', 'Debat': 'debat', 'Teknologi': 'tek', 'Seni': 'seni' };
  var ORGS = { osis: ['OSIS', 'shield'], english: ['English Club', 'languages'], robotik: ['Klub Robotik', 'cpu'], kir: ['KIR', 'flask-conical'], pramuka: ['Pramuka', 'tent'], rohis: ['Rohis', 'book-open'] };

  var STUDENTS = {
    rizky: { name: 'Rizky Pratama', ini: 'RP', kelas: 'XI IPA 2', headline: 'Programmer dan penulis esai', bio: 'Suka bikin aplikasi kecil dan nulis esai. Lagi cari tim buat hackathon dan lomba esai energi.', interests: ['Teknologi', 'Esai', 'Sains'], skills: { 'Pemrograman': ['dimas', 'alya'], 'Menulis': ['salsa'], 'Riset': [], 'Desain UI': ['dimas'] }, orgs: [['osis', 'Anggota'], ['robotik', 'Ketua'], ['english', 'Anggota']], featured: [{ title: 'Aplikasi jadwal piket kelas', kind: 'Proyek', url: 'github.com/rizkyp/piket', icon: 'code' }, { title: 'Esai: Desa mandiri energi surya', kind: 'Tulisan', url: 'Esai_energi_desa.pdf', icon: 'file-text' }], linkedin: 'linkedin.com/in/rizkypratama', showLinkedin: true },
    aisyah: { name: 'Aisyah Rahmawati', ini: 'AR', kelas: 'XII IPA 1', headline: 'Ketua OSIS, suka debat dan sains', bio: 'Ketua OSIS 2026. Senang membantu teman-teman ikut lomba.', interests: ['Debat', 'Sains'], skills: { 'Public speaking': ['nadia', 'salsa'], 'Riset': [] }, orgs: [['osis', 'Ketua']], featured: [] },
    salsa: { name: 'Salsabila Putri', ini: 'SP', kelas: 'XI IPS 1', headline: 'Penulis, riset sosial', bio: 'Menulis esai dan cerpen. Sekretaris OSIS.', interests: ['Esai', 'Debat'], skills: { 'Menulis': ['rizky', 'nadia'], 'Riset': ['fajar'] }, orgs: [['osis', 'Sekretaris']], featured: [], linkedin: 'linkedin.com/in/salsabilap', showLinkedin: true },
    dimas: { name: 'Dimas Aryo', ini: 'DA', kelas: 'X 3', headline: 'Backend developer, OSN Fisika', bio: 'Backend dan fisika. Cari desainer untuk hackathon.', interests: ['Teknologi', 'Sains'], skills: { 'Pemrograman': ['rizky'], 'Matematika': [] }, orgs: [['robotik', 'Anggota']], featured: [] },
    nadia: { name: 'Nadia Azzahra', ini: 'NA', kelas: 'XII IPA 1', headline: 'Debater, penjawab teraktif forum', bio: 'Debat bahasa Inggris dan matematika.', interests: ['Debat', 'Bahasa', 'Sains'], skills: { 'Public speaking': ['aisyah'], 'Bahasa Inggris': ['rizky', 'salsa'], 'Matematika': [] }, orgs: [['english', 'Ketua']], featured: [], linkedin: 'linkedin.com/in/nadiaazz', showLinkedin: true },
    fajar: { name: 'Fajar Hidayat', ini: 'FH', kelas: 'XI IPA 3', headline: 'Olimpiade matematika', bio: 'Latihan soal tiap hari.', interests: ['Sains'], skills: { 'Matematika': ['nadia'], 'Riset': [] }, orgs: [['kir', 'Anggota']], featured: [] },
    alya: { name: 'Alya Lestari', ini: 'AL', kelas: 'XI IPA 1', headline: 'Robotik dan elektronika', bio: 'Mekanik tim robotik.', interests: ['Teknologi'], skills: { 'Riset': [], 'Pemrograman': [] }, orgs: [['robotik', 'Wakil']], featured: [] },
    rafi: { name: 'Muhammad Rafi', ini: 'MR', kelas: 'XII IPS 2', headline: 'Film pendek dan fotografi', bio: 'Suka bikin video.', interests: ['Seni'], skills: { 'Video': ['alya'], 'Fotografi': [] }, orgs: [['pramuka', 'Anggota']], featured: [] }
  };
  var ME = 'rizky';

  var LOMBA = [
    { id: 'esai-energi', short: 'Esai Energi', title: 'Lomba Esai Nasional Energi Bersih untuk Desa', org: 'Forum Mahasiswa Energi', cat: 'esai', form: 'Online', level: 'Nasional', fee: 0, dl: 3, ev: 8, ann: 22,
      tema: 'Energi bersih untuk desa', peserta: 'Perorangan atau tim, maks. 3', jenjang: 'SMA, SMK, sederajat',
      syarat: ['Siswa aktif SMA, SMK, atau sederajat', 'Esai 1.500 sampai 2.000 kata', 'Karya asli, belum pernah dilombakan', 'Lampirkan kartu pelajar'],
      hadiah: ['Rp 3 jt', 'Rp 2 jt', 'Rp 1 jt'], kontak: 'Admin lomba, 0812 0000 0000' },
    { id: 'olim-mat', short: 'Olimpiade Matematika', title: 'Olimpiade Matematika Pelajar Sumatera Utara', org: 'Himpunan Mahasiswa Matematika', cat: 'sains', form: 'Offline', level: 'Provinsi', fee: 50000, dl: 6, ev: 12, ann: 30,
      tema: 'Matematika SMA', peserta: 'Perorangan', jenjang: 'SMA, sederajat',
      syarat: ['Siswa aktif SMA atau sederajat di Sumatera Utara', 'Membawa kartu pelajar saat ujian', 'Membayar biaya pendaftaran'], hadiah: ['Rp 2,5 jt', 'Rp 1,5 jt', 'Rp 1 jt'] },
    { id: 'debat-ing', short: 'Debat Inggris', title: 'Debat Bahasa Inggris Antar-SMA', org: 'English Society', cat: 'debat', form: 'Online', level: 'Nasional', fee: 75000, dl: 12, ev: 20, ann: 21,
      tema: 'Pendidikan dan teknologi', peserta: 'Tim 3 orang', jenjang: 'SMA, SMK, sederajat', hadiah: ['Rp 5 jt', 'Rp 3 jt', 'Rp 2 jt'] },
    { id: 'hackathon', short: 'Hackathon', title: 'Hackathon Pelajar Kota Pintar', org: 'Komunitas Developer Muda', cat: 'tek', form: 'Hybrid', level: 'Nasional', fee: 0, dl: 19, ev: 25, ann: 40,
      tema: 'Solusi digital untuk kota', peserta: 'Tim 2 sampai 4 orang', jenjang: 'SMA, SMK, sederajat',
      syarat: ['Siswa aktif SMA, SMK, atau sederajat', 'Satu tim dari satu sekolah', 'Membawa laptop sendiri'], hadiah: ['Rp 10 jt', 'Rp 6 jt', 'Rp 4 jt'] },
    { id: 'foto', short: 'Fotografi', title: 'Lomba Fotografi Budaya Lokal', org: 'Sanggar Foto Nusantara', cat: 'seni', form: 'Online', level: 'Nasional', fee: 25000, dl: 26 },
    { id: 'robotik', short: 'Robotik', title: 'Kompetisi Robotik Pelajar 2026', org: 'Asosiasi Robotika Indonesia', cat: 'tek', form: 'Offline', level: 'Nasional', fee: 150000, dl: 31 },
    { id: 'cerpen', short: 'Cerpen', title: 'Lomba Cerpen Remaja Nusantara', org: 'Balai Bahasa Sumatera Utara', cat: 'esai', form: 'Online', level: 'Provinsi', fee: 0, dl: 38 },
    { id: 'osn', short: 'OSN Kabupaten', title: 'OSN Tingkat Kabupaten/Kota 2027', org: 'Puspresnas', cat: 'sains', form: 'Offline', level: 'Kabupaten', fee: 0, dl: 45 },
    { id: 'film', short: 'Film Pendek', title: 'Festival Film Pendek Remaja', org: 'Komunitas Sinema Pelajar', cat: 'seni', form: 'Online', level: 'Nasional', fee: 0, dl: 52 }
  ];
  function lomba(id) { for (var i = 0; i < LOMBA.length; i++) if (LOMBA[i].id === id) return LOMBA[i]; return null; }

  var POSTS = [
    { id: 'p1', author: 'salsa', lomba: 'esai-energi', text: 'Butuh satu orang yang kuat di data dan riset lapangan.', skills: ['Riset', 'Menulis'], filled: 2, total: 3 },
    { id: 'p2', author: 'dimas', lomba: 'hackathon', text: 'Saya backend. Cari satu desainer UI dan satu yang bisa pitching.', skills: ['Desain UI', 'Public speaking'], filled: 1, total: 3 },
    { id: 'p3', author: 'nadia', lomba: 'debat-ing', text: 'Butuh dua speaker. Latihan Selasa dan Kamis sepulang sekolah.', skills: ['Public speaking', 'Bahasa Inggris'], filled: 1, total: 3 },
    { id: 'p4', author: 'fajar', lomba: 'olim-mat', text: 'Cari teman latihan soal, beregu 2 orang.', skills: ['Matematika'], filled: 1, total: 2 },
    { id: 'p5', author: 'alya', lomba: 'robotik', text: 'Sudah ada mekanik. Butuh programmer Arduino.', skills: ['Pemrograman', 'Riset'], filled: 2, total: 4 },
    { id: 'p6', author: 'rafi', lomba: 'film', text: 'Cari penulis naskah dan editor video.', skills: ['Video', 'Menulis'], filled: 1, total: 3 }
  ];
  var TEAM = { lomba: 'esai-energi', name: 'Tim Esai Energi', members: ['salsa', 'dimas', 'rizky'], last: { from: 'rizky', text: 'Oke, malam ini aku tambahin grafik konsumsi listriknya.', time: '19.21' } };

  var ANN = [
    { title: 'Briefing peserta OSN tingkat kabupaten', body: 'Semua siswa yang mendaftar OSN kumpul di aula, Jumat pukul 13.00. Bawa kartu pelajar.', pinned: true, author: 'aisyah', d: -1 },
    { title: 'Pendaftaran lomba esai energi ditutup minggu ini', body: 'Yang ikut, pastikan berkas sudah diunggah sebelum Rabu.', author: 'aisyah', d: -2 },
    { title: 'Selamat untuk tim KIR!', body: 'Juara 1 Lomba Karya Tulis Ilmiah Remaja tingkat nasional.', link: '#wall', author: 'salsa', d: -5 }
  ];

  var NOTES = {
    '0': 'Terima kasih sudah membawa nama Adzkia sejauh ini. Kami bangga pada kalian.',
    '-1': 'Bulan yang ramai lomba. Selamat untuk semua yang sudah berani tampil.',
    '-2': 'Awal semester yang baik. Semoga jadi pembuka untuk bulan-bulan berikutnya.'
  };
  /* status: verified entries feed the Wall; Terdaftar / Tidak lolos / Mundur are private and never rendered for others. */
  var ENTRIES = [
    { id: 'e1', title: 'Lomba Karya Tulis Ilmiah Remaja', org: 'LIPI Muda', cat: 'sains', level: 'Nasional', who: ['nadia', 'fajar'], result: 'Juara 1', status: 'verified', ed: 0 },
    { id: 'e2', title: 'OSN Fisika', org: 'Puspresnas', cat: 'sains', level: 'Provinsi', who: ['dimas'], result: 'Medali perak', status: 'verified', ed: 0 },
    { id: 'e3', title: 'Debat Bahasa Inggris Antar-SMA', org: 'English Society', cat: 'debat', level: 'Nasional', who: ['nadia'], result: 'Best speaker', status: 'verified', ed: 0 },
    { id: 'e4', title: 'Lomba Esai Kabupaten', org: 'Dinas Pendidikan Deli Serdang', cat: 'esai', level: 'Kabupaten/Kota', who: ['rizky'], result: 'Juara 2', status: 'verified', ed: -1 },
    { id: 'e6', title: 'Debat Bahasa Indonesia', org: 'Balai Bahasa Sumatera Utara', cat: 'debat', level: 'Provinsi', who: ['aisyah', 'salsa'], ext: 'Budi (SMA Negeri 1 Medan)', result: 'Juara 1', status: 'verified', ed: -1 },
    { id: 'e5', title: 'OSN Fisika', org: 'Puspresnas', cat: 'sains', level: 'Kabupaten/Kota', who: ['dimas'], result: 'Juara 1', status: 'verified', ed: -2 },
    { id: 'e7', title: 'Lomba Cerpen Remaja Nusantara', org: 'Balai Bahasa', cat: 'esai', level: 'Provinsi', who: ['salsa'], result: 'Harapan 1', status: 'verified', ed: -2 },
    { id: 'e9', lomba: 'hackathon', title: 'Hackathon Pelajar Kota Pintar', org: 'Komunitas Developer Muda', cat: 'tek', level: 'Nasional', who: ['rizky', 'dimas'], result: 'Juara 2', status: 'info' },
    { id: 'e11', lomba: 'esai-energi', title: 'Lomba Esai Nasional Energi Bersih untuk Desa', org: 'Forum Mahasiswa Energi', cat: 'esai', level: 'Nasional', who: ['rizky', 'salsa', 'dimas'], result: 'Terdaftar', status: 'joined' }
  ];

  var NOTIFS = [
    { icon: 'clock', text: 'Lomba Esai Nasional Energi Bersih untuk Desa tutup 3 hari lagi.', href: '#lomba-detail/esai-energi', time: '08.00', read: false },
    { icon: 'user-plus', text: 'Nadia Azzahra mengajakmu ke tim Debat Bahasa Inggris Antar-SMA.', href: '#beranda', time: 'Kemarin', read: false },
    { icon: 'message-circle', text: 'Salsabila Putri membalas pertanyaanmu.', href: '#beranda', time: 'Kemarin', read: false },
    { icon: 'sparkles', text: 'Hackathon Pelajar Kota Pintar cocok dengan minatmu.', href: '#lomba-detail/hackathon', time: '20 Nov', read: true },
    { icon: 'award', text: 'Prestasimu di Lomba Esai Kabupaten tampil di Wall of Fame.', href: '#wall', time: '15 Nov', read: true }
  ];

  /* ---------- ui state ---------- */
  var S = {
    saved: { 'esai-energi': 1, 'olim-mat': 1, 'debat-ing': 1 },
    joined: { 'esai-energi': 1 },
    asked: {},
    invite: 'pending',
    proofSent: false,
    endorsed: {},
    editing: false,
    f: { q: '', cat: 'all', level: 'all', form: 'all', free: false, mine: false, sort: 'dl' },
    ed: 0
  };

  /* ---------- helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var PATHS = {
    circle: '<circle cx="12" cy="12" r="12"/>',
    quarter: '<path d="M0 24V0a24 24 0 0 1 24 24z"/>',
    halves: '<path d="M11 1a11 11 0 0 0 0 22z"/><path d="M13 1a11 11 0 0 1 0 22z"/>',
    square: '<rect width="24" height="24" rx="1"/>',
    triangle: '<path d="M12 0.5 24 23.5H0z"/>',
    star: '<rect x="4.5" y="4.5" width="15" height="15"/><rect x="4.5" y="4.5" width="15" height="15" transform="rotate(45 12 12)"/>'
  };
  function svg(kind, cls, col) {
    return '<svg class="shp k-' + kind + ' ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true"' + (col ? ' style="color:var(--' + col + ')"' : '') + '>' + PATHS[kind] + '</svg>';
  }
  function shape(cat, cls) { var c = CAT[cat]; return svg(c.shape, cls, c.col); }
  function catVars(cat) { var c = CAT[cat]; return '--c:var(--' + c.col + ');--on:var(--on-' + c.col + ')'; }
  function av(id, cls) { var s = STUDENTS[id]; return '<span class="av ' + (cls || '') + '" aria-hidden="true">' + s.ini + '</span>'; }
  function toast(msg) {
    var t = document.getElementById('toast'); t.textContent = msg; t.classList.add('on');
    clearTimeout(toast.t); toast.t = setTimeout(function () { t.classList.remove('on'); }, 2200);
  }
  function icons() { if (window.lucide) window.lucide.createIcons({ attrs: { 'aria-hidden': 'true' } }); }

  /* ---------- BERANDA ---------- */
  function vBeranda() {
    var me = STUDENTS[ME];
    var inv = '';
    if (S.invite === 'pending') {
      inv = '<div class="invite" id="invite">' + av('nadia', 'av-lg') +
        '<p><b>Nadia Azzahra</b> mengajakmu ke tim <a href="#lomba-detail/debat-ing">Debat Bahasa Inggris Antar-SMA</a></p>' +
        '<div class="invite-act"><button class="btn btn-primary" data-act="invite-yes">Terima</button><button class="btn btn-ghost" data-act="invite-no">Tolak</button></div></div>';
    } else if (S.invite === 'yes') {
      inv = '<div class="invite done">' + shape('debat', 'invite-shape') + '<p>Kamu masuk tim <b>Debat Bahasa Inggris Antar-SMA</b> bersama Nadia.</p></div>';
    }

    var pins = LOMBA.filter(function (l) { return l.dl <= 60; }).sort(function (a, b) { return a.dl - b.dl; }).map(function (l, i) {
      var lane = i % 2 ? 'down' : 'up';
      return '<a class="pin ' + lane + (S.joined[l.id] ? ' is-joined' : '') + '" href="#lomba-detail/' + l.id + '" style="left:' + (l.dl / 60 * 100).toFixed(3) + '%;--i:' + i + '">' +
        '<span class="pin-stem"></span><span class="pin-head">' + shape(l.cat) + '</span>' +
        '<span class="pin-label"><b>' + esc(l.short) + '</b><span>' + l.dl + ' hari, ' + fmt(addDays(l.dl)) + '</span></span></a>';
    }).join('');
    var weeks = '';
    for (var w = 7; w <= 56; w += 7) weeks += '<span class="wk" style="left:' + (w / 60 * 100).toFixed(3) + '%">' + fmt(addDays(w)) + '</span>';

    var mine = ENTRIES.filter(function (e) { return e.who.indexOf(ME) > -1; });
    var order = { joined: 0, info: 1, verified: 2 };
    mine.sort(function (a, b) { return order[a.status] - order[b.status]; });
    var mineHtml = mine.map(function (e) {
      var l = e.lomba && lomba(e.lomba), right = '', status = '';
      if (e.status === 'joined') {
        status = '<span class="tag tag-line">Terdaftar</span><span class="due">Tutup ' + l.dl + ' hari lagi</span>';
        right = '<a class="btn btn-ghost btn-sm" href="#lomba-detail/' + l.id + '">Buka</a>';
      } else if (e.status === 'info') {
        status = '<span class="tag tag-fill" style="' + catVars(e.cat) + '">' + e.result + '</span>' +
          (S.proofSent ? '<span class="due">Dicek OSIS</span>' : '<span class="due warn">Bukti kurang</span>');
        right = S.proofSent ? '' : '<button class="btn btn-primary btn-sm" data-act="proof">Tambah bukti</button>';
      } else {
        status = '<span class="tag tag-fill" style="' + catVars(e.cat) + '">' + e.result + '</span><span class="due">Wall of Fame ' + monthName(e.ed).split(' ')[0] + '</span>';
        right = '<a class="btn btn-ghost btn-sm" href="#wall" data-ed="' + e.ed + '">Lihat</a>';
      }
      return '<li class="mine-row"><span class="mine-shape">' + shape(e.cat) + '</span>' +
        '<div class="mine-main"><b>' + esc(e.title) + '</b><div class="mine-status">' + status + '</div></div>' + right + '</li>';
    }).join('');

    var annHtml = ANN.map(function (a) {
      return '<li class="ann' + (a.pinned ? ' ann-pin' : '') + '">' + (a.pinned ? '<i data-lucide="pin" class="ann-pin-icon"></i>' : '') +
        '<h3>' + esc(a.title) + '</h3><p>' + esc(a.body) + '</p>' +
        '<p class="ann-meta">' + STUDENTS[a.author].name + ', ' + ago(a.d).toLowerCase() + (a.link ? ' <a href="' + a.link + '">Lihat Wall</a>' : '') + '</p></li>';
    }).join('');

    var mySkills = Object.keys(me.skills);
    var posts = POSTS.filter(function (p) { return p.author !== ME && !S.joined[p.lomba] && p.skills.some(function (s) { return mySkills.indexOf(s) > -1; }); }).slice(0, 3);
    if (posts.length < 3) posts = posts.concat(POSTS.filter(function (p) { return posts.indexOf(p) < 0 && p.lomba !== 'esai-energi'; }).slice(0, 3 - posts.length));

    return '' +
      '<section class="wrap hello">' +
        '<div class="hello-text"><h1 class="display d-xl">Halo, Rizky.</h1>' + inv + '</div>' +
        '<figure class="hello-photo"><img src="../../img/school/life-pair.jpg" alt="Dua siswa Adzkia membaca bersama" width="1800" height="900">' +
          svg('quarter', 'deco deco-q', 'sun') + svg('circle', 'deco deco-c', 'cobalt') + '</figure>' +
      '</section>' +
      '<section class="band" aria-labelledby="h-tenggat"><div class="wrap">' +
        '<div class="band-head"><h2 class="display d-md" id="h-tenggat">Tenggat dekat</h2><a class="link-light" href="#lomba">Semua lomba</a></div>' +
        '<div class="ruler-scroll"><div class="ruler">' +
          '<span class="ruler-line"></span><span class="ruler-ticks"></span>' +
          '<span class="today"><span>Hari ini</span></span>' + weeks + pins +
        '</div></div>' +
      '</div></section>' +
      '<section class="wrap home-grid">' +
        '<div><h2 class="display d-sm">Lombaku</h2><ul class="mine">' + mineHtml + '</ul></div>' +
        '<aside><h2 class="display d-sm">Pengumuman</h2><ul class="anns">' + annHtml + '</ul></aside>' +
      '</section>' +
      '<section class="wrap"><h2 class="display d-sm">Cari tim</h2><div class="posts">' + posts.map(postCard).join('') + '</div></section>';
  }

  function postCard(p) {
    var l = lomba(p.lomba), a = STUDENTS[p.author], slots = '';
    for (var i = 0; i < p.total; i++) slots += '<span class="slot' + (i < p.filled ? ' on' : '') + '"></span>';
    var asked = S.asked[p.id];
    return '<article class="post" style="' + catVars(l.cat) + '">' +
      '<a class="post-top" href="#lomba-detail/' + l.id + '">' + shape(l.cat, 'on-c') + '<span>' + esc(l.short) + '</span></a>' +
      '<div class="post-body"><div class="post-who">' + av(p.author) + '<span><b>' + a.name + '</b><small>' + a.kelas + '</small></span></div>' +
      '<p>' + esc(p.text) + '</p>' +
      '<div class="post-skills">' + p.skills.map(function (s) { return '<span class="pill">' + s + '</span>'; }).join('') + '</div>' +
      '<div class="post-foot"><span class="slots" aria-label="' + p.filled + ' dari ' + p.total + ' anggota">' + slots + '</span>' +
      '<button class="btn ' + (asked ? 'btn-ghost' : 'btn-primary') + ' btn-sm" data-act="ask" data-id="' + p.id + '"' + (asked ? ' aria-pressed="true"' : '') + '>' + (asked ? 'Terkirim' : 'Minta gabung') + '</button></div></div></article>';
  }

  /* ---------- LOMBA ---------- */
  function vLomba() {
    var f = S.f;
    var chips = '<button class="chip' + (f.cat === 'all' ? ' on' : '') + '" data-cat="all" aria-pressed="' + (f.cat === 'all') + '">Semua</button>' +
      Object.keys(CAT).map(function (k) {
        return '<button class="chip' + (f.cat === k ? ' on' : '') + '" data-cat="' + k + '" style="' + catVars(k) + '" aria-pressed="' + (f.cat === k) + '">' + shape(k) + CAT[k].name + '</button>';
      }).join('');
    function sel(name, label, opts) {
      return '<label class="sel"><span class="vh">' + label + '</span><select data-f="' + name + '">' +
        opts.map(function (o) { return '<option value="' + o[0] + '"' + (f[name] === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select><i data-lucide="chevron-down"></i></label>';
    }
    return '<section class="wrap list-head">' +
        '<h1 class="display d-lg">Lomba</h1>' +
        '<label class="search"><i data-lucide="search"></i><span class="vh">Cari lomba</span><input type="search" id="q" placeholder="Cari lomba atau penyelenggara" value="' + esc(f.q) + '" autocomplete="off"></label>' +
      '</section>' +
      '<section class="wrap filters" aria-label="Filter">' +
        '<div class="chips" role="group" aria-label="Kategori">' + chips + '</div>' +
        '<div class="filter-row">' +
          sel('level', 'Tingkat', [['all', 'Semua tingkat'], ['Nasional', 'Nasional'], ['Provinsi', 'Provinsi'], ['Kabupaten', 'Kabupaten/Kota']]) +
          sel('form', 'Bentuk', [['all', 'Semua bentuk'], ['Online', 'Online'], ['Offline', 'Offline'], ['Hybrid', 'Hybrid']]) +
          '<button class="toggle' + (f.free ? ' on' : '') + '" data-tog="free" aria-pressed="' + f.free + '">Gratis</button>' +
          '<button class="toggle' + (f.mine ? ' on' : '') + '" data-tog="mine" aria-pressed="' + f.mine + '">Sesuai minatku</button>' +
          '<div class="seg" role="group" aria-label="Urutkan">' +
            [['dl', 'Tenggat'], ['fee', 'Biaya'], ['az', 'Nama']].map(function (o) { return '<button data-sort="' + o[0] + '" aria-pressed="' + (f.sort === o[0]) + '">' + o[1] + '</button>'; }).join('') +
          '</div>' +
        '</div>' +
      '</section>' +
      '<section class="wrap" aria-live="polite"><div id="rows"></div></section>';
  }
  function filtered() {
    var f = S.f, q = f.q.trim().toLowerCase(), myCats = STUDENTS[ME].interests.map(function (i) { return INTEREST_CAT[i]; });
    var list = LOMBA.filter(function (l) {
      if (f.cat !== 'all' && l.cat !== f.cat) return false;
      if (f.level !== 'all' && l.level !== f.level) return false;
      if (f.form !== 'all' && l.form !== f.form) return false;
      if (f.free && l.fee) return false;
      if (f.mine && myCats.indexOf(l.cat) < 0) return false;
      if (q && (l.title + ' ' + l.org).toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
    list.sort(function (a, b) {
      if (f.sort === 'fee') return a.fee - b.fee || a.dl - b.dl;
      if (f.sort === 'az') return a.title.localeCompare(b.title, 'id');
      return a.dl - b.dl;
    });
    return list;
  }
  function group(dl) { return dl <= 7 ? 'Minggu ini' : dl <= 14 ? 'Minggu depan' : dl <= 31 ? 'Bulan ini' : 'Nanti'; }
  function renderRows() {
    var box = document.getElementById('rows'); if (!box) return;
    var list = filtered(), html = '', last = '';
    if (!list.length) {
      box.innerHTML = '<div class="empty">' + svg('halves', 'empty-shape', 'tomato') + '<p>Tidak ada lomba yang cocok.</p><button class="btn btn-primary" data-act="clear">Hapus filter</button></div>';
      return;
    }
    html += '<p class="count">' + list.length + ' lomba</p><div class="rows">';
    list.forEach(function (l) {
      if (S.f.sort === 'dl') { var g = group(l.dl); if (g !== last) { html += '<h2 class="row-group">' + g + '</h2>'; last = g; } }
      html += rowHtml(l);
    });
    box.innerHTML = html + '</div>';
    icons();
  }
  function rowHtml(l) {
    var saved = !!S.saved[l.id];
    return '<div class="row" style="' + catVars(l.cat) + '">' +
      '<span class="row-shape">' + shape(l.cat) + '</span>' +
      '<div class="row-main"><a class="row-link" href="#lomba-detail/' + l.id + '">' + esc(l.title) + '</a><span class="row-org">' + esc(l.org) + (S.joined[l.id] ? '<span class="joined-flag">Kamu ikut</span>' : '') + '</span>' +
        '<span class="row-meta-m"><b class="m-dl' + (l.dl <= 7 ? ' soon' : '') + '">' + l.dl + ' hari lagi</b>' + l.level + ', ' + l.form + ', ' + rupiah(l.fee) + '</span></div>' +
      '<span class="row-cell">' + l.level + '</span><span class="row-cell">' + l.form + '</span><span class="row-cell' + (l.fee ? '' : ' free') + '">' + rupiah(l.fee) + '</span>' +
      '<span class="row-dl' + (l.dl <= 7 ? ' soon' : '') + '"><b>' + l.dl + '</b><span>hari<small>' + fmt(addDays(l.dl)) + '</small></span></span>' +
      '<button class="save" data-act="save" data-id="' + l.id + '" aria-pressed="' + saved + '" aria-label="' + (saved ? 'Hapus dari simpanan' : 'Simpan') + '"><i data-lucide="bookmark"></i></button>' +
    '</div>';
  }

  /* ---------- DETAIL ---------- */
  function vDetail(id) {
    var l = lomba(id) || LOMBA[0], c = CAT[l.cat], joined = !!S.joined[l.id], saved = !!S.saved[l.id];
    var due = addDays(l.dl);
    var facts = [['Kategori', shape(l.cat) + c.name], ['Tingkat', l.level], ['Bentuk', l.form], ['Biaya', rupiah(l.fee)]];
    if (l.peserta) facts.push(['Peserta', l.peserta]);
    if (l.jenjang) facts.push(['Jenjang', l.jenjang]);
    if (l.tema) facts.push(['Tema', l.tema]);

    var dates = [['Pendaftaran tutup', l.dl]];
    if (l.ev) dates.push(['Pelaksanaan', l.ev]);
    if (l.ann) dates.push(['Pengumuman', l.ann]);
    var span = dates[dates.length - 1][1];
    var datesHtml = '<ol class="keydates' + (dates.length === 1 ? ' one' : '') + '">' + dates.map(function (d, i) {
      return '<li style="--x:' + (dates.length === 1 ? 0 : (d[1] - l.dl) / Math.max(1, span - l.dl) * 100).toFixed(2) + '%">' + svg(i === 0 ? c.shape : 'circle', 'kd-mark' + (i === 0 ? '' : ' kd-small'), i === 0 ? c.col : 'ink') +
        '<b>' + fmtLong(addDays(d[1])) + '</b><span>' + d[0] + '</span></li>';
    }).join('') + '</ol>';

    var lower = '';
    if (l.syarat || l.hadiah) {
      lower = '<section class="wrap detail-two">' +
        (l.syarat ? '<div><h2 class="display d-sm">Syarat</h2><ul class="syarat">' + l.syarat.map(function (s) { return '<li>' + svg(c.shape, 'syarat-mark', c.col) + esc(s) + '</li>'; }).join('') + '</ul></div>' : '') +
        (l.hadiah ? '<div><h2 class="display d-sm">Hadiah</h2><ol class="hadiah">' + l.hadiah.map(function (h, i) { return '<li style="' + catVars(l.cat) + '"><span>Juara ' + (i + 1) + '</span><b>' + h + '</b></li>'; }).join('') + '</ol></div>' : '') +
      '</section>';
    }
    if (l.kontak) lower += '<section class="wrap"><p class="kontak"><i data-lucide="phone"></i>' + esc(l.kontak) + '</p></section>';

    var team = '';
    if (joined && TEAM.lomba === l.id) {
      team = '<section class="wrap team" style="' + catVars(l.cat) + '"><h2 class="display d-sm">' + TEAM.name + '</h2>' +
        '<div class="team-box"><ul class="team-members">' + TEAM.members.map(function (m) { return '<li>' + av(m, 'av-lg') + '<b>' + STUDENTS[m].name.split(' ')[0] + (m === ME ? ' (kamu)' : '') + '</b><span>' + STUDENTS[m].kelas + '</span></li>'; }).join('') + '</ul>' +
        '<div class="team-last"><p>' + esc(TEAM.last.text) + '</p><span>' + STUDENTS[TEAM.last.from].name.split(' ')[0] + ', ' + TEAM.last.time + '</span></div></div></section>';
    } else {
      var ps = POSTS.filter(function (p) { return p.lomba === l.id; });
      if (ps.length) team = '<section class="wrap"><h2 class="display d-sm">Cari tim</h2><div class="posts">' + ps.map(postCard).join('') + '</div></section>';
    }

    return '<div class="wrap"><a class="back" href="#lomba"><i data-lucide="arrow-left"></i>Semua lomba</a></div>' +
      '<section class="wrap detail" style="' + catVars(l.cat) + '">' +
        '<div class="poster">' + posterShapes(c) +
          '<div class="countdown"><b>' + l.dl + '</b><span>hari lagi</span></div>' +
          '<p class="poster-date">Tutup ' + fmtLong(due) + '</p>' +
        '</div>' +
        '<div class="detail-main">' +
          '<h1 class="display d-lg2">' + esc(l.title) + '</h1>' +
          '<p class="org">' + esc(l.org) + '</p>' +
          '<dl class="facts">' + facts.map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>'; }).join('') + '</dl>' +
          '<div class="actions">' +
            '<button class="btn btn-big ' + (joined ? 'btn-joined' : 'btn-primary') + '" data-act="join" data-id="' + l.id + '" aria-pressed="' + joined + '">' + (joined ? '<i data-lucide="check"></i>Kamu ikut' : 'Saya ikut') + '</button>' +
            '<button class="btn btn-ghost btn-big" data-act="save" data-id="' + l.id + '" aria-pressed="' + saved + '"><i data-lucide="bookmark"></i>' + (saved ? 'Tersimpan' : 'Simpan') + '</button>' +
            '<button class="icon-btn icon-btn-line" data-act="share" aria-label="Bagikan"><i data-lucide="share-2"></i></button>' +
          '</div>' +
        '</div>' +
      '</section>' +
      '<section class="wrap"><h2 class="display d-sm">Tanggal penting</h2>' + datesHtml + '</section>' +
      lower + team;
  }
  function posterShapes(c) {
    var k = c.shape;
    return '<div class="poster-art" aria-hidden="true">' +
      svg(k, 'pa pa1', 'ink') + svg(k, 'pa pa2', 'paper') + svg(k, 'pa pa3', 'ink') + svg('star', 'pa pa4', 'paper') + '</div>';
  }

  /* ---------- WALL ---------- */
  function vWall() {
    var ed = S.ed, wins = ENTRIES.filter(function (e) { return e.status === 'verified' && e.ed === ed; });
    var tiles = wins.map(function (e) {
      var people = e.who.map(function (w) { var s = STUDENTS[w]; return '<li><a href="#profil/' + w + '">' + av(w) + '<span><b>' + s.name + '</b><small>' + s.kelas + '</small></span></a></li>'; }).join('');
      if (e.ext) people += '<li class="ext"><span class="av av-ext" aria-hidden="true">' + e.ext.charAt(0) + '</span><span><b>' + e.ext.split(' (')[0] + '</b><small>' + e.ext.split('(')[1].replace(')', '') + '</small></span></li>';
      return '<article class="tile" style="' + catVars(e.cat) + '">' + svg('star', 'tile-star') + shape(e.cat, 'tile-cat') +
        '<p class="tile-result">' + e.result + '</p><h2 class="tile-title">' + esc(e.title) + '</h2>' +
        '<p class="tile-org">' + esc(e.org) + ', ' + e.level + '</p><ul class="tile-people">' + people + '</ul></article>';
    }).join('');
    return '<section class="wrap wall-head">' +
        '<div class="wall-text">' +
          '<h1 class="display d-wall">Wall of Fame</h1>' +
          '<div class="ed-switch">' +
            '<button class="icon-btn icon-btn-line" data-act="ed" data-d="-1" aria-label="Edisi sebelumnya"' + (ed <= -2 ? ' disabled' : '') + '><i data-lucide="chevron-left"></i></button>' +
            '<span class="ed-name">' + monthName(ed) + '</span>' +
            '<button class="icon-btn icon-btn-line" data-act="ed" data-d="1" aria-label="Edisi berikutnya"' + (ed >= 0 ? ' disabled' : '') + '><i data-lucide="chevron-right"></i></button>' +
          '</div>' +
          '<blockquote class="note"><p>' + NOTES[String(ed)] + '</p><cite>OSIS SMA Islam Plus Adzkia</cite></blockquote>' +
        '</div>' +
        '<figure class="wall-photo"><img src="../../img/school/life-group.jpg" alt="Siswi Adzkia belajar bersama dalam lingkaran" width="1800" height="900">' + svg('star', 'deco deco-star', 'sun') + svg('triangle', 'deco deco-tri', 'pink') + '</figure>' +
      '</section>' +
      '<section class="wrap"><div class="tiles n' + wins.length + '">' + tiles + '</div></section>';
  }

  /* ---------- PROFIL ---------- */
  function vProfil(id) {
    var sid = STUDENTS[id] ? id : ME, s = STUDENTS[sid], own = sid === ME;
    var cats = s.interests.map(function (i) { return INTEREST_CAT[i]; }).filter(Boolean);
    if (!cats.length) cats = ['esai'];
    var bg = CAT[cats[0]].col;
    var rest = cats.slice(1);
    var bannerShapes = svg(CAT[cats[0]].shape, 'b b1', bg === 'sun' || bg === 'pink' || bg === 'leaf' ? 'ink' : 'paper') +
      (rest[0] ? svg(CAT[rest[0]].shape, 'b b2', CAT[rest[0]].col) : svg('star', 'b b2', 'paper')) +
      (rest[1] ? svg(CAT[rest[1]].shape, 'b b3', CAT[rest[1]].col) : svg(CAT[cats[0]].shape, 'b b3', 'ink'));

    var wins = ENTRIES.filter(function (e) { return e.status === 'verified' && e.who.indexOf(sid) > -1; });
    var winsHtml = wins.length ? '<ul class="wins">' + wins.map(function (e) {
      return '<li style="' + catVars(e.cat) + '">' + svg('star', 'win-star', CAT[e.cat].col) + '<div><b>' + e.result + '</b><span class="win-title">' + esc(e.title) + '</span><span class="win-meta">' + esc(e.org) + ', ' + e.level + ', ' + monthName(e.ed) + '</span></div></li>';
    }).join('') + '</ul>' : '<p class="muted">Belum ada.</p>';

    var karya = s.featured.length ? '<section class="p-sec"><h2 class="display d-sm">Karya</h2><ul class="karya">' + s.featured.map(function (f) {
      return '<li><span class="karya-icon"><i data-lucide="' + f.icon + '"></i></span><div><b>' + esc(f.title) + '</b><span>' + f.kind + ', ' + esc(f.url) + '</span></div></li>';
    }).join('') + '</ul></section>' : '';

    var skills = Object.keys(s.skills).map(function (k) {
      var by = s.skills[k].slice(), key = sid + ':' + k, mine = S.endorsed[key];
      if (mine && by.indexOf(ME) < 0) by.push(ME);
      return '<li><span class="sk-name">' + k + '</span><span class="sk-by">' + by.map(function (b) { return av(b, 'av-xs'); }).join('') + '</span>' +
        (own ? '' : '<button class="btn btn-sm ' + (mine ? 'btn-joined' : 'btn-ghost') + '" data-act="endorse" data-key="' + key + '" aria-pressed="' + !!mine + '">' + (mine ? 'Didukung' : 'Dukung') + '</button>') + '</li>';
    }).join('');

    var head = S.editing && own
      ? '<form class="edit" id="edit-form"><label>Judul<input name="headline" value="' + esc(s.headline) + '" maxlength="80"></label><label>Tentang<textarea name="bio" rows="3" maxlength="300">' + esc(s.bio) + '</textarea></label><div class="edit-act"><button class="btn btn-primary" type="submit">Simpan</button><button class="btn btn-ghost" type="button" data-act="edit-cancel">Batal</button></div></form>'
      : '';

    return '<section class="wrap"><div class="banner" style="--c:var(--' + bg + ')" aria-hidden="true">' + bannerShapes + '</div></section>' +
      '<section class="wrap p-head">' +
        '<span class="av av-xl" aria-hidden="true">' + s.ini + '</span>' +
        '<div class="p-id"><h1 class="display d-lg2">' + s.name + '</h1><p class="p-headline">' + esc(s.headline) + '</p><p class="p-kelas">' + s.kelas + '</p></div>' +
        '<div class="p-act">' + (own
          ? '<button class="btn btn-primary" data-act="edit"' + (S.editing ? ' disabled' : '') + '><i data-lucide="pencil"></i>Edit profil</button>'
          : '<a class="btn btn-ghost" href="#profil"><i data-lucide="user-round"></i>Profilku</a>') +
          '<button class="icon-btn icon-btn-line" data-act="share" aria-label="Bagikan profil"><i data-lucide="share-2"></i></button></div>' +
      '</section>' + (head ? '<section class="wrap">' + head + '</section>' : '') +
      '<section class="wrap p-body">' +
        '<div class="p-main">' +
          '<section class="p-sec"><h2 class="display d-sm">Tentang</h2><p class="bio">' + esc(s.bio) + '</p></section>' +
          '<section class="p-sec"><h2 class="display d-sm">Prestasi</h2>' + winsHtml + '</section>' + karya +
        '</div>' +
        '<aside class="p-side">' +
          '<section class="p-sec"><h2 class="display d-sm">Keahlian</h2><ul class="skills">' + skills + '</ul></section>' +
          '<section class="p-sec"><h2 class="display d-sm">Minat</h2><div class="interests">' + s.interests.map(function (i) { var k = INTEREST_CAT[i]; return '<span class="pill pill-lg">' + (k ? shape(k) : '') + i + '</span>'; }).join('') + '</div></section>' +
          '<section class="p-sec"><h2 class="display d-sm">Organisasi</h2><ul class="orgs">' + s.orgs.map(function (o) { return '<li><i data-lucide="' + ORGS[o[0]][1] + '"></i><b>' + ORGS[o[0]][0] + '</b><span>' + o[1] + '</span></li>'; }).join('') + '</ul></section>' +
          (s.linkedin && s.showLinkedin ? '<section class="p-sec"><h2 class="display d-sm">Tautan</h2><a class="ext-link" href="https://' + s.linkedin + '" rel="noopener" target="_blank"><i data-lucide="linkedin"></i>' + s.linkedin + '</a></section>' : '') +
        '</aside>' +
      '</section>';
  }

  /* ---------- notifications ---------- */
  function renderNotifs() {
    var unread = NOTIFS.filter(function (n) { return !n.read; }).length;
    var c = document.getElementById('bell-count'); c.textContent = unread || ''; c.hidden = !unread;
    document.getElementById('bell').setAttribute('aria-label', 'Notifikasi' + (unread ? ', ' + unread + ' baru' : ''));
    document.getElementById('notif-panel').innerHTML = '<div class="np-head"><b>Notifikasi</b>' + (unread ? '<button class="link-btn" data-act="read-all">Tandai dibaca</button>' : '') + '</div><ul>' +
      NOTIFS.map(function (n) { return '<li class="' + (n.read ? '' : 'unread') + '"><a href="' + n.href + '"><i data-lucide="' + n.icon + '"></i><span>' + esc(n.text) + '<small>' + n.time + '</small></span></a></li>'; }).join('') + '</ul>';
    icons();
  }
  function closePanel() { var p = document.getElementById('notif-panel'); p.hidden = true; document.getElementById('bell').setAttribute('aria-expanded', 'false'); }

  /* ---------- router ---------- */
  var ROUTES = { beranda: vBeranda, lomba: vLomba, 'lomba-detail': vDetail, wall: vWall, profil: vProfil };
  var current = '';
  function route() {
    var h = (location.hash || '#beranda').slice(1).split('/'), name = h[0];
    if (!ROUTES[name]) { if (!current) name = 'beranda'; else return; }
    var view = document.getElementById('view');
    view.innerHTML = ROUTES[name](h[1]);
    view.className = 'v-' + name;
    var navKey = name === 'lomba-detail' ? 'lomba' : name;
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === navKey && !(name === 'profil' && h[1] && h[1] !== ME)) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (name === 'lomba') renderRows();
    icons(); closePanel();
    var changed = current !== location.hash; current = location.hash || '#beranda';
    if (changed) window.scrollTo(0, 0);
    document.title = { beranda: 'Beranda', lomba: 'Lomba', 'lomba-detail': (lomba(h[1]) || LOMBA[0]).short, wall: 'Wall of Fame', profil: (STUDENTS[h[1]] || STUDENTS[ME]).name }[name] + ' | ADZVANCE';
  }
  function rerender() { var y = window.scrollY; current = location.hash || '#beranda'; route(); window.scrollTo(0, y); }

  /* ---------- events ---------- */
  document.addEventListener('click', function (ev) {
    var t = ev.target.closest('[data-act],[data-cat],[data-sort],[data-tog],#bell,[data-ed]');
    if (!t) { if (!ev.target.closest('.notif')) closePanel(); return; }
    if (t.id === 'bell') {
      var p = document.getElementById('notif-panel'), open = p.hidden; p.hidden = !open; t.setAttribute('aria-expanded', String(open)); return;
    }
    if (t.hasAttribute('data-ed') && !t.hasAttribute('data-act')) { S.ed = +t.getAttribute('data-ed'); return; }
    if (t.hasAttribute('data-cat')) { S.f.cat = t.getAttribute('data-cat'); syncFilters(); return; }
    if (t.hasAttribute('data-sort')) { S.f.sort = t.getAttribute('data-sort'); syncFilters(); return; }
    if (t.hasAttribute('data-tog')) { var k = t.getAttribute('data-tog'); S.f[k] = !S.f[k]; syncFilters(); return; }
    var act = t.getAttribute('data-act'), id = t.getAttribute('data-id');
    switch (act) {
      case 'save':
        if (S.saved[id]) delete S.saved[id]; else S.saved[id] = 1;
        toast(S.saved[id] ? 'Disimpan' : 'Dihapus dari simpanan');
        if (document.getElementById('rows')) renderRows(); else rerender();
        break;
      case 'join':
        if (S.joined[id]) delete S.joined[id]; else S.joined[id] = 1;
        toast(S.joined[id] ? 'Kamu ikut lomba ini' : 'Batal ikut'); rerender();
        if (S.joined[id]) { var b = document.querySelector('[data-act="join"]'); if (b) b.classList.add('pop'); }
        break;
      case 'ask': if (!S.asked[id]) { S.asked[id] = 1; toast('Permintaan terkirim'); rerender(); } break;
      case 'invite-yes': S.invite = 'yes'; NOTIFS[1].read = true; renderNotifs(); toast('Kamu masuk tim'); rerender(); break;
      case 'invite-no': S.invite = 'no'; NOTIFS[1].read = true; renderNotifs(); rerender(); break;
      case 'proof': S.proofSent = true; toast('Bukti terkirim'); rerender(); break;
      case 'clear': S.f = { q: '', cat: 'all', level: 'all', form: 'all', free: false, mine: false, sort: S.f.sort }; rerender(); break;
      case 'ed': S.ed = Math.max(-2, Math.min(0, S.ed + +t.getAttribute('data-d'))); rerender(); break;
      case 'share':
        try { navigator.clipboard && navigator.clipboard.writeText(location.href); } catch (e) { /* ignore */ }
        toast('Tautan disalin'); break;
      case 'endorse': var key = t.getAttribute('data-key'); S.endorsed[key] = !S.endorsed[key]; rerender(); break;
      case 'edit': S.editing = true; rerender(); var inp = document.querySelector('#edit-form input'); if (inp) inp.focus(); break;
      case 'edit-cancel': S.editing = false; rerender(); break;
      case 'read-all': NOTIFS.forEach(function (n) { n.read = true; }); renderNotifs(); document.getElementById('notif-panel').hidden = false; break;
    }
  });
  document.addEventListener('submit', function (ev) {
    if (ev.target.id !== 'edit-form') return;
    ev.preventDefault();
    var fd = new FormData(ev.target), me = STUDENTS[ME];
    me.headline = (fd.get('headline') || '').trim() || me.headline;
    me.bio = (fd.get('bio') || '').trim() || me.bio;
    S.editing = false; toast('Profil disimpan'); rerender();
  });
  document.addEventListener('input', function (ev) {
    if (ev.target.id === 'q') { S.f.q = ev.target.value; renderRows(); }
  });
  document.addEventListener('change', function (ev) {
    var k = ev.target.getAttribute && ev.target.getAttribute('data-f');
    if (k) { S.f[k] = ev.target.value; renderRows(); }
  });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') closePanel(); });
  function syncFilters() {
    document.querySelectorAll('[data-cat]').forEach(function (b) { var on = b.getAttribute('data-cat') === S.f.cat; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    document.querySelectorAll('[data-sort]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-sort') === S.f.sort); });
    document.querySelectorAll('[data-tog]').forEach(function (b) { var on = !!S.f[b.getAttribute('data-tog')]; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    renderRows();
  }

  window.addEventListener('hashchange', route);
  renderNotifs();
  route();
})();
