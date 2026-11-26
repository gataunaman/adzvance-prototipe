/* ADZVANCE variant 1, Pucuk Rebung. Demo data copied from prototype/js/data.js (names are made up). */
(function () {
  'use strict';

  /* ---------- dates ---------- */
  var TODAY = new Date();
  var BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  var BLN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  function addDays(n) { var d = new Date(TODAY); d.setDate(d.getDate() + n); return d; }
  function tgl(n) { var d = addDays(n); return d.getDate() + ' ' + BLN[d.getMonth()]; }
  function tglPanjang(n) { var d = addDays(n); return d.getDate() + ' ' + BULAN[d.getMonth()] + ' ' + d.getFullYear(); }
  function mk(off) { var t = new Date(TODAY); t.setDate(1); t.setMonth(t.getMonth() + off); return t.getFullYear() + '-' + ('0' + (t.getMonth() + 1)).slice(-2); }
  function monthName(key) { var p = key.split('-'); return BULAN[+p[1] - 1] + ' ' + p[0]; }
  function monthShort(key) { var p = key.split('-'); return BULAN[+p[1] - 1]; }

  /* ---------- data ---------- */
  var CATS = {
    sains: { name: 'Sains', icon: 'flask-conical' },
    esai: { name: 'Esai', icon: 'pen-line' },
    debat: { name: 'Debat', icon: 'mic' },
    tek: { name: 'Teknologi', icon: 'cpu' },
    seni: { name: 'Seni', icon: 'palette' }
  };
  var ORGS = { osis: 'OSIS', english: 'English Club', robotik: 'Klub Robotik', kir: 'KIR', pramuka: 'Pramuka', rohis: 'Rohis' };
  var AVC = { rizky: 'fuchsia', aisyah: 'emerald', salsa: 'indigo', dimas: 'kunyit', nadia: 'laut', fajar: 'emerald', alya: 'indigo', rafi: 'kunyit' };

  var STUDENTS = {
    rizky: { name: 'Rizky Pratama', ini: 'RP', kelas: 'XI IPA 2', headline: 'Programmer dan penulis esai', bio: 'Suka bikin aplikasi kecil dan nulis esai. Lagi cari tim buat hackathon dan lomba esai energi.',
      interests: ['Teknologi', 'Esai', 'Sains'], skills: { 'Pemrograman': ['dimas', 'alya'], 'Menulis': ['salsa'], 'Riset': [], 'Desain UI': ['dimas'] },
      orgs: [['osis', 'Anggota'], ['robotik', 'Ketua'], ['english', 'Anggota']],
      featured: [{ title: 'Aplikasi jadwal piket kelas', kind: 'Proyek', url: 'github.com/rizkyp/piket', icon: 'code' }, { title: 'Esai: Desa mandiri energi surya', kind: 'Tulisan', url: 'Esai_energi_desa.pdf', icon: 'file-text' }],
      linkedin: 'linkedin.com/in/rizkypratama', showLinkedin: true },
    aisyah: { name: 'Aisyah Rahmawati', ini: 'AR', kelas: 'XII IPA 1', headline: 'Ketua OSIS, suka debat dan sains', bio: 'Ketua OSIS 2026. Senang membantu teman-teman ikut lomba.',
      interests: ['Debat', 'Sains'], skills: { 'Public speaking': ['nadia', 'salsa'], 'Riset': [] }, orgs: [['osis', 'Ketua']], featured: [], linkedin: '', showLinkedin: false },
    salsa: { name: 'Salsabila Putri', ini: 'SP', kelas: 'XI IPS 1', headline: 'Penulis, riset sosial', bio: 'Menulis esai dan cerpen. Sekretaris OSIS.',
      interests: ['Esai', 'Debat'], skills: { 'Menulis': ['rizky', 'nadia'], 'Riset': ['fajar'] }, orgs: [['osis', 'Sekretaris']], featured: [], linkedin: 'linkedin.com/in/salsabilap', showLinkedin: true },
    dimas: { name: 'Dimas Aryo', ini: 'DA', kelas: 'X 3', headline: 'Backend developer, OSN Fisika', bio: 'Backend dan fisika. Cari desainer untuk hackathon.',
      interests: ['Teknologi', 'Sains'], skills: { 'Pemrograman': ['rizky'], 'Matematika': [] }, orgs: [['robotik', 'Anggota']], featured: [], linkedin: '', showLinkedin: false },
    nadia: { name: 'Nadia Azzahra', ini: 'NA', kelas: 'XII IPA 1', headline: 'Debater, penjawab teraktif forum', bio: 'Debat bahasa Inggris dan matematika.',
      interests: ['Debat', 'Bahasa', 'Sains'], skills: { 'Public speaking': ['aisyah'], 'Bahasa Inggris': ['rizky', 'salsa'], 'Matematika': [] }, orgs: [['english', 'Ketua']], featured: [], linkedin: 'linkedin.com/in/nadiaazz', showLinkedin: true },
    fajar: { name: 'Fajar Hidayat', ini: 'FH', kelas: 'XI IPA 3', headline: 'Olimpiade matematika', bio: 'Latihan soal tiap hari.',
      interests: ['Sains'], skills: { 'Matematika': ['nadia'], 'Riset': [] }, orgs: [['kir', 'Anggota']], featured: [], linkedin: '', showLinkedin: false },
    alya: { name: 'Alya Lestari', ini: 'AL', kelas: 'XI IPA 1', headline: 'Robotik dan elektronika', bio: 'Mekanik tim robotik.',
      interests: ['Teknologi'], skills: { 'Riset': [], 'Pemrograman': [] }, orgs: [['robotik', 'Wakil']], featured: [], linkedin: '', showLinkedin: false },
    rafi: { name: 'Muhammad Rafi', ini: 'MR', kelas: 'XII IPS 2', headline: 'Film pendek dan fotografi', bio: 'Suka bikin video.',
      interests: ['Seni'], skills: { 'Video': ['alya'], 'Fotografi': [] }, orgs: [['pramuka', 'Anggota']], featured: [], linkedin: '', showLinkedin: false }
  };

  var LOMBA = [
    { id: 'esai-energi', title: 'Lomba Esai Nasional Energi Bersih untuk Desa', org: 'Forum Mahasiswa Energi', cat: 'esai', form: 'Online', level: 'Nasional', fee: 0, dl: 3, ev: 8, ann: 22, added: 1,
      tema: 'Energi bersih untuk desa', peserta: 'Perorangan atau tim, maks. 3', jenjang: 'SMA, SMK, sederajat',
      syarat: ['Siswa aktif SMA, SMK, atau sederajat', 'Esai 1.500 sampai 2.000 kata', 'Karya asli, belum pernah dilombakan', 'Lampirkan kartu pelajar'],
      hadiah: ['Rp 3 jt', 'Rp 2 jt', 'Rp 1 jt'], kontak: 'Admin lomba, 0812 0000 0000' },
    { id: 'olim-mat', title: 'Olimpiade Matematika Pelajar Sumatera Utara', org: 'Himpunan Mahasiswa Matematika', cat: 'sains', form: 'Offline', level: 'Provinsi', fee: 50000, dl: 6, ev: 12, ann: 30, added: 4 },
    { id: 'debat-ing', title: 'Debat Bahasa Inggris Antar-SMA', org: 'English Society', cat: 'debat', form: 'Online', level: 'Nasional', fee: 75000, dl: 12, added: 2 },
    { id: 'hackathon', title: 'Hackathon Pelajar Kota Pintar', org: 'Komunitas Developer Muda', cat: 'tek', form: 'Hybrid', level: 'Nasional', fee: 0, dl: 19, added: 6 },
    { id: 'foto', title: 'Lomba Fotografi Budaya Lokal', org: 'Sanggar Foto Nusantara', cat: 'seni', form: 'Online', level: 'Nasional', fee: 25000, dl: 26, added: 3 },
    { id: 'robotik', title: 'Kompetisi Robotik Pelajar 2026', org: 'Asosiasi Robotika Indonesia', cat: 'tek', form: 'Offline', level: 'Nasional', fee: 150000, dl: 31, added: 8 },
    { id: 'cerpen', title: 'Lomba Cerpen Remaja Nusantara', org: 'Balai Bahasa Sumatera Utara', cat: 'esai', form: 'Online', level: 'Provinsi', fee: 0, dl: 38, added: 5 },
    { id: 'osn', title: 'OSN Tingkat Kabupaten/Kota 2027', org: 'Puspresnas', cat: 'sains', form: 'Offline', level: 'Kabupaten', fee: 0, dl: 45, added: 9 },
    { id: 'film', title: 'Festival Film Pendek Remaja', org: 'Komunitas Sinema Pelajar', cat: 'seni', form: 'Online', level: 'Nasional', fee: 0, dl: 52, added: 7 }
  ];
  function lombaById(id) { for (var i = 0; i < LOMBA.length; i++) if (LOMBA[i].id === id) return LOMBA[i]; return null; }

  var POSTS = [
    { id: 'p1', author: 'salsa', lomba: 'esai-energi', text: 'Butuh satu orang yang kuat di data dan riset lapangan.', skills: ['Riset', 'Menulis'], filled: 2, total: 3 },
    { id: 'p2', author: 'dimas', lomba: 'hackathon', text: 'Saya backend. Cari satu desainer UI dan satu yang bisa pitching.', skills: ['Desain UI', 'Public speaking'], filled: 1, total: 3 },
    { id: 'p3', author: 'nadia', lomba: 'debat-ing', text: 'Butuh dua speaker. Latihan Selasa dan Kamis sepulang sekolah.', skills: ['Public speaking', 'Bahasa Inggris'], filled: 1, total: 3 },
    { id: 'p4', author: 'fajar', lomba: 'olim-mat', text: 'Cari teman latihan soal, beregu 2 orang.', skills: ['Matematika'], filled: 1, total: 2 },
    { id: 'p5', author: 'alya', lomba: 'robotik', text: 'Sudah ada mekanik. Butuh programmer Arduino.', skills: ['Pemrograman', 'Riset'], filled: 2, total: 4 },
    { id: 'p6', author: 'rafi', lomba: 'film', text: 'Cari penulis naskah dan editor video.', skills: ['Video', 'Menulis'], filled: 1, total: 3 }
  ];
  var TEAM = { name: 'Tim Esai Energi', lomba: 'esai-energi', members: ['salsa', 'dimas', 'rizky'], last: { from: 'rizky', text: 'Oke, malam ini aku tambahin grafik konsumsi listriknya.', time: '19.21' } };

  var ANN = [
    { title: 'Briefing peserta OSN tingkat kabupaten', body: 'Semua siswa yang mendaftar OSN kumpul di aula, Jumat pukul 13.00. Bawa kartu pelajar.', pinned: true, author: 'aisyah', d: -1 },
    { title: 'Pendaftaran lomba esai energi ditutup minggu ini', body: 'Yang ikut, pastikan berkas sudah diunggah sebelum Rabu.', author: 'aisyah', d: -2 },
    { title: 'Selamat untuk tim KIR!', body: 'Juara 1 Lomba Karya Tulis Ilmiah Remaja tingkat nasional.', link: '#wall', author: 'salsa', d: -5 }
  ];

  var THREADS = [
    { title: 'Cara cepat integral parsial?', subj: 'Matematika', author: 'fajar', ago: '2 hari lalu', likes: 6, replies: 3, solved: true },
    { title: 'Struktur esai argumentatif yang dinilai juri', subj: 'Bahasa Indonesia', author: 'salsa', ago: '3 hari lalu', likes: 1, replies: 1 },
    { title: 'Perbedaan reaksi SN1 dan SN2, ada cara mudah ingat?', subj: 'Kimia', author: 'alya', ago: '4 hari lalu', likes: 0, replies: 1, solved: true }
  ];

  var EDITION_NOTES = {};
  EDITION_NOTES[mk(0)] = 'Terima kasih sudah membawa nama Adzkia sejauh ini. Kami bangga pada kalian.';
  EDITION_NOTES[mk(-1)] = 'Bulan yang ramai lomba. Selamat untuk semua yang sudah berani tampil.';
  EDITION_NOTES[mk(-2)] = 'Awal semester yang baik. Semoga jadi pembuka untuk bulan-bulan berikutnya.';

  /* Only verified wins. Private results never enter this list. */
  var WINS = [
    { title: 'Lomba Karya Tulis Ilmiah Remaja', org: 'LIPI Muda', cat: 'sains', level: 'Nasional', who: ['nadia', 'fajar'], result: 'Juara 1', d: -4, month: mk(0) },
    { title: 'OSN Fisika', org: 'Puspresnas', cat: 'sains', level: 'Provinsi', who: ['dimas'], result: 'Medali perak', d: -9, month: mk(0) },
    { title: 'Debat Bahasa Inggris Antar-SMA', org: 'English Society', cat: 'debat', level: 'Nasional', who: ['nadia'], result: 'Best speaker', d: -12, month: mk(0) },
    { title: 'Lomba Esai Kabupaten', org: 'Dinas Pendidikan Deli Serdang', cat: 'esai', level: 'Kabupaten/Kota', who: ['rizky'], result: 'Juara 2', d: -35, month: mk(-1) },
    { title: 'Debat Bahasa Indonesia', org: 'Balai Bahasa Sumatera Utara', cat: 'debat', level: 'Provinsi', who: ['aisyah', 'salsa'], ext: 'Budi (SMA Negeri 1 Medan)', result: 'Juara 1', d: -40, month: mk(-1) },
    { title: 'OSN Fisika', org: 'Puspresnas', cat: 'sains', level: 'Kabupaten/Kota', who: ['dimas'], result: 'Juara 1', d: -62, month: mk(-2) },
    { title: 'Lomba Cerpen Remaja Nusantara', org: 'Balai Bahasa', cat: 'esai', level: 'Provinsi', who: ['salsa'], result: 'Harapan 1', d: -66, month: mk(-2) }
  ];

  var NOTIFS = [
    { icon: 'clock', text: 'Lomba Esai Nasional Energi Bersih untuk Desa tutup 3 hari lagi.', href: '#lomba-detail/esai-energi', time: '08.00' },
    { icon: 'user-plus', text: 'Nadia Azzahra mengajakmu ke tim Debat Bahasa Inggris Antar-SMA.', href: '#beranda', time: 'Kemarin' },
    { icon: 'message-circle', text: 'Salsabila Putri membalas pertanyaanmu.', href: '#beranda', time: 'Kemarin' },
    { icon: 'sparkles', text: 'Hackathon Pelajar Kota Pintar cocok dengan minatmu.', href: '#lomba-detail/hackathon', time: '20 Nov', read: true },
    { icon: 'medal', text: 'Prestasimu di Lomba Esai Kabupaten tampil di Wall of Fame.', href: '#wall/' + mk(-1), time: '15 Nov', read: true }
  ];

  /* ---------- state ---------- */
  var ME = 'rizky';
  var S = { saved: ['esai-energi', 'olim-mat', 'debat-ing'], joined: ['esai-energi'], invite: 'pending', applied: [], proof: 'info', read: false, endorsed: {} };
  try { var raw = localStorage.getItem('adz-v1'); if (raw) { var o = JSON.parse(raw); for (var k in o) S[k] = o[k]; } } catch (e) { /* storage off: demo still works */ }
  function persist() { try { localStorage.setItem('adz-v1', JSON.stringify(S)); } catch (e) { /* ignore */ } }
  var F = { q: '', cat: 'all', level: 'all', form: 'all', free: false, saved: false, sort: 'dl' };

  function has(arr, v) { return arr.indexOf(v) > -1; }
  function toggle(arr, v) { var i = arr.indexOf(v); if (i > -1) arr.splice(i, 1); else arr.push(v); return i === -1; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function first(id) { return STUDENTS[id].name.split(' ')[0]; }
  function rupiah(n) { return n ? 'Rp ' + n.toLocaleString('id-ID') : 'Gratis'; }
  function daysWord(n) { return n <= 0 ? 'hari ini' : 'hari lagi'; }
  function av(id, size) { var s = STUDENTS[id]; return '<span class="av av-c-' + AVC[id] + ' ' + (size || '') + '" aria-hidden="true">' + s.ini + '</span>'; }
  function who(ids) { return ids.map(function (id) { return '<a href="#profil/' + id + '">' + esc(STUDENTS[id].name) + '</a>'; }).join(' &amp; '); }

  /* ---------- pieces ---------- */
  function teeth(c) { return '<div class="teeth" style="--c: var(--' + c + ')" aria-hidden="true"></div>'; }

  function panji(l, i) {
    var saved = has(S.saved, l.id), joined = has(S.joined, l.id);
    return '<div class="panji-wrap" style="--i:' + (i || 0) + '">' +
      '<article class="panji c-' + l.cat + '">' +
        '<a class="panji-link" href="#lomba-detail/' + l.id + '"><span class="sr">' + esc(l.title) + '</span></a>' +
        '<div class="panji-top"><span>' + CATS[l.cat].name + '</span><span>' + l.level + '</span></div>' +
        '<h3 class="panji-title">' + esc(l.title) + '</h3>' +
        '<p class="panji-org">' + esc(l.org) + '</p>' +
        '<div class="panji-days"><b>' + (l.dl <= 0 ? '!' : l.dl) + '</b><span>' + daysWord(l.dl) + '<br>' + tgl(l.dl) + '</span></div>' +
        '<p class="panji-meta">' + l.form + ', ' + (l.fee ? rupiah(l.fee) : 'gratis') + '</p>' +
        (joined ? '<span class="panji-joined"><i data-lucide="check"></i>Ikut</span>' : '') +
        '<div class="panji-hem" aria-hidden="true"></div>' +
      '</article>' +
      '<button class="save-btn" type="button" data-act="save" data-id="' + l.id + '" aria-pressed="' + saved + '" aria-label="' + (saved ? 'Hapus dari simpanan' : 'Simpan') + '"><i data-lucide="bookmark"></i></button>' +
    '</div>';
  }

  function head(title, extra) { return '<div class="sec-head"><h2>' + title + '</h2>' + (extra || '') + '</div>'; }

  /* ---------- views ---------- */
  function vBeranda() {
    var next = lombaById('esai-energi');
    var savedL = LOMBA.filter(function (l) { return has(S.saved, l.id); }).sort(function (a, b) { return a.dl - b.dl; });
    var rec = ['hackathon', 'cerpen', 'robotik', 'osn'].map(lombaById);
    var joinedMine = has(S.joined, 'esai-energi');

    var invite = S.invite === 'pending'
      ? '<div class="slip slip-invite">' + av('nadia', 'av-md') +
          '<div class="slip-body"><p><a href="#profil/nadia">Nadia Azzahra</a> mengajakmu ke tim <a href="#lomba-detail/debat-ing">Debat Bahasa Inggris Antar-SMA</a>.</p>' +
          '<div class="btn-row"><button class="btn btn-primary" type="button" data-act="invite" data-v="ok">Terima</button><button class="btn btn-quiet" type="button" data-act="invite" data-v="no">Tolak</button></div></div></div>'
      : '<div class="slip slip-done"><i data-lucide="' + (S.invite === 'ok' ? 'users' : 'x') + '"></i><p>' + (S.invite === 'ok' ? 'Kamu masuk tim Nadia untuk Debat Bahasa Inggris Antar-SMA.' : 'Undangan Nadia ditolak.') + '</p></div>';

    var proof = S.proof === 'info'
      ? '<div class="slip slip-proof"><span class="slip-ico c-tek"><i data-lucide="image-plus"></i></span>' +
          '<div class="slip-body"><p><b>Hackathon Pelajar Kota Pintar, Juara 2.</b> OSIS minta tangkapan layar pengumuman atau sertifikat.</p>' +
          '<div class="btn-row"><label class="btn btn-ink file-btn">Tambah bukti<input type="file" accept="image/*,.pdf" data-act="proof"></label></div></div></div>'
      : '<div class="slip slip-done"><i data-lucide="hourglass"></i><p>Hackathon Pelajar Kota Pintar, Juara 2. Menunggu OSIS.</p></div>';

    return '' +
    '<section class="band band-maroon home-hero">' +
      '<div class="wrap home-grid">' +
        '<div class="home-left">' +
          '<h1 class="display hello">Halo, Rizky!</h1>' +
          (joinedMine ?
          '<div class="next">' +
            '<div class="next-flag c-esai"><b>' + next.dl + '</b><span>hari lagi</span></div>' +
            '<div class="next-body">' +
              '<a class="next-title" href="#lomba-detail/esai-energi">' + esc(next.title) + '</a>' +
              '<p class="next-meta">Tutup ' + tglPanjang(next.dl) + '</p>' +
              '<div class="team-line"><span class="stack">' + TEAM.members.map(function (m) { return av(m, 'av-sm'); }).join('') + '</span><span>' + TEAM.name + '</span></div>' +
              '<p class="chat-peek"><b>Kamu:</b> ' + esc(TEAM.last.text) + '</p>' +
              '<div class="btn-row"><button class="btn btn-gold" type="button" data-act="chat"><i data-lucide="message-circle"></i>Chat tim</button><a class="btn btn-ghost-light" href="#lomba-detail/esai-energi">Lihat lomba</a></div>' +
            '</div>' +
          '</div>' : '<div class="next next-empty"><p>Belum ikut lomba.</p><a class="btn btn-gold" href="#lomba">Cari lomba</a></div>') +
        '</div>' +
        '<figure class="arch"><img src="../../img/school/life-pair.jpg" alt="Dua siswa Adzkia membaca di depan perpustakaan"></figure>' +
      '</div>' +
    '</section>' + teeth('maroon') +

    '<section class="band">' +
      '<div class="wrap two-col">' +
        '<div class="col-main">' +
          head('Untukmu') +
          '<div class="slips">' + invite + proof + '</div>' +
          head('Pengumuman') +
          '<ol class="ann-list">' + ANN.map(function (a) {
            return '<li class="ann' + (a.pinned ? ' ann-pin' : '') + '">' +
              (a.pinned ? '<span class="pin" title="Disematkan"><i data-lucide="pin"></i></span>' : '') +
              '<h3>' + (a.link ? '<a href="' + a.link + '">' + esc(a.title) + '</a>' : esc(a.title)) + '</h3>' +
              '<p>' + esc(a.body) + '</p>' +
              '<p class="ann-by">' + esc(STUDENTS[a.author].name) + ', ' + tgl(a.d) + '</p></li>';
          }).join('') + '</ol>' +
        '</div>' +
        '<aside class="col-side">' +
          head('Disimpan', '<a class="link" href="#lomba">Semua lomba</a>') +
          (savedL.length ? '<ul class="mini-list">' + savedL.map(function (l) {
            return '<li class="mini c-' + l.cat + '"><span class="mini-days"><b>' + l.dl + '</b>hari</span><a href="#lomba-detail/' + l.id + '">' + esc(l.title) + '</a>' +
              '<button class="mini-x" type="button" data-act="save" data-id="' + l.id + '" aria-label="Hapus dari simpanan"><i data-lucide="x"></i></button></li>';
          }).join('') + '</ul>' : '<div class="empty-small"><p>Belum ada yang disimpan.</p><a class="btn btn-ink" href="#lomba">Cari lomba</a></div>') +
          head('Di forum') +
          '<ul class="thread-list">' + THREADS.map(function (t) {
            return '<li><a href="#beranda">' + esc(t.title) + '</a><p>' + t.subj + ', ' + t.replies + ' balasan' + (t.solved ? ', <span class="solved">terjawab</span>' : '') + '</p></li>';
          }).join('') + '</ul>' +
        '</aside>' +
      '</div>' +
    '</section>' +

    '<section class="band band-gold">' + '<div class="rebung-up rebung-maroon" aria-hidden="true"></div>' +
      '<div class="wrap">' +
        head('Cocok buatmu', '<a class="link" href="#lomba">Semua lomba</a>') +
        '<div class="hall hall-4">' + rec.map(panji).join('') + '</div>' +
      '</div>' +
    '</section>';
  }

  function filtered() {
    var q = F.q.trim().toLowerCase();
    var out = LOMBA.filter(function (l) {
      if (F.cat !== 'all' && l.cat !== F.cat) return false;
      if (F.level !== 'all' && l.level !== F.level) return false;
      if (F.form !== 'all' && l.form !== F.form) return false;
      if (F.free && l.fee) return false;
      if (F.saved && !has(S.saved, l.id)) return false;
      if (q && (l.title + ' ' + l.org + ' ' + CATS[l.cat].name).toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
    out.sort(function (a, b) {
      if (F.sort === 'new') return a.added - b.added;
      if (F.sort === 'az') return a.title.localeCompare(b.title, 'id');
      return a.dl - b.dl;
    });
    return out;
  }
  function hallHtml() {
    var list = filtered();
    document.title = 'Lomba, ADZVANCE';
    if (!list.length) return '<div class="empty"><p class="display-sm">Tidak ada yang cocok.</p><button class="btn btn-primary" type="button" data-act="clear">Hapus filter</button></div>';
    return '<div class="hall">' + list.map(panji).join('') + '</div>';
  }
  function countText() { var n = filtered().length; return n + ' lomba'; }

  function vLomba() {
    var chips = '<button class="chip" type="button" data-act="cat" data-v="all" aria-pressed="' + (F.cat === 'all') + '">Semua</button>' +
      Object.keys(CATS).map(function (c) { return '<button class="chip chip-' + c + '" type="button" data-act="cat" data-v="' + c + '" aria-pressed="' + (F.cat === c) + '"><i data-lucide="' + CATS[c].icon + '"></i>' + CATS[c].name + '</button>'; }).join('');
    function sel(name, label, opts) {
      return '<label class="sel"><span class="sr">' + label + '</span><select data-f="' + name + '">' + opts.map(function (o) { return '<option value="' + o[0] + '"' + (F[name] === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select><i data-lucide="chevron-down"></i></label>';
    }
    return '' +
    '<section class="band band-maroon list-hero">' +
      '<div class="wrap">' +
        '<div class="list-head"><h1 class="display">Lomba</h1>' +
          '<label class="search"><i data-lucide="search"></i><span class="sr">Cari lomba</span><input type="search" id="q" placeholder="Cari lomba atau penyelenggara" value="' + esc(F.q) + '" autocomplete="off"></label></div>' +
        '<div class="chips" role="group" aria-label="Kategori">' + chips + '</div>' +
      '</div>' +
    '</section>' + teeth('maroon') +
    '<section class="band band-tight">' +
      '<div class="wrap">' +
        '<div class="toolbar">' +
          '<div class="tools">' +
            sel('level', 'Tingkat', [['all', 'Semua tingkat'], ['Nasional', 'Nasional'], ['Provinsi', 'Provinsi'], ['Kabupaten', 'Kabupaten']]) +
            sel('form', 'Bentuk', [['all', 'Online dan offline'], ['Online', 'Online'], ['Offline', 'Offline'], ['Hybrid', 'Hybrid']]) +
            '<button class="tog" type="button" data-act="free" aria-pressed="' + F.free + '">Gratis</button>' +
            '<button class="tog" type="button" data-act="savedonly" aria-pressed="' + F.saved + '"><i data-lucide="bookmark"></i>Disimpan</button>' +
          '</div>' +
          '<div class="tools tools-end"><span class="count" id="count">' + countText() + '</span>' +
            sel('sort', 'Urutkan', [['dl', 'Tutup paling cepat'], ['new', 'Terbaru'], ['az', 'Judul A sampai Z']]) + '</div>' +
        '</div>' +
        '<div id="hallBox">' + hallHtml() + '</div>' +
      '</div>' +
    '</section>';
  }

  function vDetail(id) {
    var l = lombaById(id) || lombaById('esai-energi');
    var saved = has(S.saved, l.id), joined = has(S.joined, l.id);
    var posts = POSTS.filter(function (p) { return p.lomba === l.id && !(l.id === 'esai-energi'); });
    var dates = [['Tutup pendaftaran', l.dl]];
    if (l.ev) dates.push(['Pelaksanaan', l.ev]);
    if (l.ann) dates.push(['Pengumuman', l.ann]);
    var facts = [['Bentuk', l.form], ['Tingkat', l.level], ['Biaya', rupiah(l.fee)]];
    if (l.peserta) facts.push(['Peserta', l.peserta]);
    if (l.jenjang) facts.push(['Jenjang', l.jenjang]);
    if (l.tema) facts.push(['Tema', l.tema]);
    if (l.kontak) facts.push(['Kontak', l.kontak]);
    document.title = l.title + ', ADZVANCE';

    var team = (l.id === TEAM.lomba && joined)
      ? '<div class="team-card">' + head('Timmu') +
          '<p class="team-name">' + TEAM.name + '</p>' +
          '<ul class="members">' + TEAM.members.map(function (m) { return '<li>' + av(m, 'av-md') + '<span><a href="#profil/' + m + '">' + esc(STUDENTS[m].name) + '</a><small>' + STUDENTS[m].kelas + '</small></span></li>'; }).join('') + '</ul>' +
          '<button class="btn btn-primary btn-block" type="button" data-act="chat"><i data-lucide="message-circle"></i>Buka chat tim</button></div>'
      : '';

    var postHtml = posts.length ? '<div class="posts">' + head('Cari tim') + posts.map(function (p) {
      var ap = has(S.applied, p.id);
      return '<div class="post">' + av(p.author, 'av-md') + '<div class="post-body"><p class="post-who"><a href="#profil/' + p.author + '">' + esc(STUDENTS[p.author].name) + '</a><span>' + p.filled + ' dari ' + p.total + ' orang</span></p>' +
        '<p>' + esc(p.text) + '</p><p class="post-skills">' + p.skills.map(function (s) { return '<span class="tag">' + s + '</span>'; }).join('') + '</p>' +
        '<button class="btn ' + (ap ? 'btn-quiet' : 'btn-ink') + '" type="button" data-act="apply" data-id="' + p.id + '" aria-pressed="' + ap + '">' + (ap ? '<i data-lucide="check"></i>Terkirim' : 'Gabung tim') + '</button></div></div>';
    }).join('') + '</div>' : '';

    return '' +
    '<section class="band detail-hero c-' + l.cat + '">' +
      '<div class="wrap detail-grid">' +
        '<div class="detail-main">' +
          '<a class="back" href="#lomba"><i data-lucide="arrow-left"></i>Lomba</a>' +
          '<p class="detail-cat"><i data-lucide="' + CATS[l.cat].icon + '"></i>' + CATS[l.cat].name + ', ' + l.level + '</p>' +
          '<h1 class="display detail-title">' + esc(l.title) + '</h1>' +
          '<p class="detail-org">' + esc(l.org) + '</p>' +
          '<div class="btn-row">' +
            '<button class="btn btn-join' + (joined ? ' is-on' : '') + '" type="button" data-act="join" data-id="' + l.id + '" aria-pressed="' + joined + '">' + (joined ? '<i data-lucide="check"></i>Kamu ikut' : 'Saya ikut') + '</button>' +
            '<button class="btn btn-ghost-light" type="button" data-act="save" data-id="' + l.id + '" aria-pressed="' + saved + '"><i data-lucide="bookmark"></i>' + (saved ? 'Disimpan' : 'Simpan') + '</button>' +
          '</div>' +
        '</div>' +
        '<div class="detail-flag"><div class="flag-rod" aria-hidden="true"></div><div class="flag">' +
          '<b>' + l.dl + '</b><span>' + daysWord(l.dl) + '</span><small>Tutup ' + tglPanjang(l.dl) + '</small><div class="panji-hem" aria-hidden="true"></div></div></div>' +
      '</div>' +
    '</section><div class="c-' + l.cat + '">' + teeth('cc') + '</div>' +
    '<section class="band">' +
      '<div class="wrap two-col">' +
        '<div class="col-main">' +
          head('Tanggal penting') +
          '<ol class="dates">' + dates.map(function (d) { return '<li><b>' + tgl(d[1]) + '</b><span>' + d[0] + '</span></li>'; }).join('') + '</ol>' +
          (l.syarat ? head('Syarat') + '<ul class="syarat">' + l.syarat.map(function (s) { return '<li><i data-lucide="check"></i>' + esc(s) + '</li>'; }).join('') + '</ul>' : '') +
          (l.hadiah ? head('Hadiah') + '<div class="prizes">' + l.hadiah.map(function (h, i) { return '<div class="prize"><span>Juara ' + (i + 1) + '</span><b>' + h + '</b></div>'; }).join('') + '</div>' : '') +
          postHtml +
        '</div>' +
        '<aside class="col-side">' + team +
          '<dl class="facts">' + facts.map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + esc(f[1]) + '</dd></div>'; }).join('') + '</dl>' +
        '</aside>' +
      '</div>' +
    '</section>';
  }

  function vWall(key) {
    var months = [mk(0), mk(-1), mk(-2)];
    if (!has(months, key)) key = mk(0);
    var wins = WINS.filter(function (w) { return w.month === key; }).sort(function (a, b) { return b.d - a.d; });
    document.title = 'Wall of Fame ' + monthName(key) + ', ADZVANCE';
    var bunting = ''; var cs = ['gold', 'fuchsia', 'emerald', 'gold', 'laut', 'kunyit', 'gold', 'indigo'];
    for (var i = 0; i < 40; i++) bunting += '<span style="--c: var(--' + cs[i % cs.length] + '); --n: ' + i + '"></span>';
    return '' +
    '<section class="band band-maroon wall-hero">' +
      '<div class="bunting" aria-hidden="true">' + bunting + '</div>' +
      '<div class="wrap wall-grid">' +
        '<div class="wall-title">' +
          '<h1 class="display wall-h">Wall of Fame</h1>' +
          '<p class="wall-month display">' + monthName(key) + '</p>' +
          '<blockquote class="wall-note"><p>' + esc(EDITION_NOTES[key]) + '</p><footer>OSIS Adzkia</footer></blockquote>' +
          '<nav class="editions" aria-label="Edisi">' + months.map(function (m) { return '<a href="#wall/' + m + '"' + (m === key ? ' aria-current="page"' : '') + '>' + monthShort(m) + '</a>'; }).join('') + '</nav>' +
        '</div>' +
        '<figure class="wall-photo"><img src="../../img/school/life-group.jpg" alt="Siswi Adzkia belajar bersama dalam lingkaran"></figure>' +
      '</div>' +
    '</section>' + teeth('maroon') +
    '<section class="band">' +
      '<div class="wrap">' +
        (wins.length ? '<div class="sashes">' + wins.map(function (w, i) {
          return '<article class="win c-' + w.cat + '" style="--i:' + i + '">' +
            '<span class="sash" aria-label="Hasil">' + esc(w.result) + '</span>' +
            '<div class="win-avs">' + w.who.map(function (id) { return av(id, 'av-lg'); }).join('') + '</div>' +
            '<h2 class="win-names display">' + who(w.who) + '</h2>' +
            (w.ext ? '<p class="win-ext">bersama ' + esc(w.ext) + '</p>' : '') +
            '<p class="win-class">' + w.who.map(function (id) { return STUDENTS[id].kelas; }).filter(function (v, j, a) { return a.indexOf(v) === j; }).join(', ') + '</p>' +
            '<div class="win-foot"><p class="win-title">' + esc(w.title) + '</p><p>' + esc(w.org) + '</p><p>' + w.level + '</p></div>' +
          '</article>';
        }).join('') + '</div>' : '<div class="empty"><p class="display-sm">Edisi ini masih kosong.</p></div>') +
      '</div>' +
    '</section>';
  }

  function vProfil(id) {
    if (!STUDENTS[id]) id = ME;
    var s = STUDENTS[id], mine = id === ME;
    var wins = WINS.filter(function (w) { return has(w.who, id); });
    document.title = s.name + ', ADZVANCE';
    var skills = Object.keys(s.skills).map(function (k) {
      var list = s.skills[k].slice(); var key = id + ':' + k;
      if (S.endorsed[key]) list.push(ME);
      var on = !!S.endorsed[key];
      return '<li class="skill"><span class="skill-name">' + k + '</span>' +
        '<span class="skill-by">' + (list.length ? '<span class="stack">' + list.slice(0, 3).map(function (e) { return av(e, 'av-xs'); }).join('') + '</span>' + list.length + ' dukungan' : 'Belum ada dukungan') + '</span>' +
        (mine ? '' : '<button class="tog tog-sm" type="button" data-act="endorse" data-id="' + key + '" aria-pressed="' + on + '">' + (on ? '<i data-lucide="check"></i>Didukung' : 'Dukung') + '</button>') + '</li>';
    }).join('');
    return '' +
    '<section class="prof-banner" aria-hidden="true"><div class="rebung-up rebung-gold"></div></section>' +
    '<section class="band prof-head">' +
      '<div class="wrap prof-grid">' +
        '<div class="prof-av">' + av(id, 'av-xl') + '</div>' +
        '<div class="prof-id">' +
          '<h1 class="display prof-name">' + esc(s.name) + '</h1>' +
          '<p class="prof-headline">' + esc(s.headline) + '</p>' +
          '<p class="prof-meta">Kelas ' + s.kelas + '</p>' +
          '<ul class="badges">' + s.orgs.map(function (o) { return '<li><i data-lucide="shield"></i>' + o[1] + ' ' + ORGS[o[0]] + '</li>'; }).join('') + '</ul>' +
        '</div>' +
        '<div class="prof-act">' + (mine
          ? '<button class="btn btn-ink" type="button" data-act="edit"><i data-lucide="pencil"></i>Sunting profil</button>'
          : '<button class="btn btn-primary" type="button" data-act="ajak" data-id="' + id + '"><i data-lucide="user-plus"></i>Ajak ke tim</button>') + '</div>' +
      '</div>' +
    '</section>' +
    '<section class="band band-tight">' +
      '<div class="wrap two-col">' +
        '<div class="col-main">' +
          head('Tentang') + '<p class="bio">' + esc(s.bio) + '</p>' +
          head('Prestasi') +
          (wins.length ? '<div class="sashes sashes-sm">' + wins.map(function (w) {
            return '<article class="win win-sm c-' + w.cat + '"><span class="sash">' + esc(w.result) + '</span>' +
              '<p class="win-title-lg display">' + esc(w.title) + '</p><div class="win-foot"><p>' + esc(w.org) + '</p><p>' + w.level + ', <a href="#wall/' + w.month + '">' + monthName(w.month) + '</a></p></div></article>';
          }).join('') + '</div>' : '<p class="muted">Belum ada.</p>') +
          (s.featured.length ? head('Karya') + '<ul class="works">' + s.featured.map(function (f) {
            return '<li><span class="work-ico"><i data-lucide="' + f.icon + '"></i></span><span><b>' + esc(f.title) + '</b><small>' + f.kind + ', ' + esc(f.url) + '</small></span></li>';
          }).join('') + '</ul>' : '') +
        '</div>' +
        '<aside class="col-side">' +
          head('Keahlian') + '<ul class="skills">' + skills + '</ul>' +
          head('Minat') + '<ul class="interests">' + s.interests.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>' +
          (s.showLinkedin && s.linkedin ? head('Tautan') + '<p><a class="link" href="#profil/' + id + '"><i data-lucide="linkedin"></i>' + esc(s.linkedin) + '</a></p>' : '') +
        '</aside>' +
      '</div>' +
    '</section>';
  }

  /* ---------- notifications ---------- */
  function renderBell() {
    var unread = S.read ? 0 : NOTIFS.filter(function (n) { return !n.read; }).length;
    var c = document.getElementById('bellCount'); c.textContent = unread || ''; c.hidden = !unread;
    document.getElementById('notifs').innerHTML = '<p class="notifs-h">Notifikasi</p><ul>' + NOTIFS.map(function (n) {
      return '<li class="' + (n.read || S.read ? '' : 'unread') + '"><a href="' + n.href + '"><i data-lucide="' + n.icon + '"></i><span>' + esc(n.text) + '<small>' + n.time + '</small></span></a></li>';
    }).join('') + '</ul>';
  }

  /* ---------- router ---------- */
  var current = '';
  function render(keepScroll) {
    var h = (location.hash || '#beranda').slice(1);
    var parts = h.split('/'), view = parts[0], arg = parts[1];
    var html;
    if (view === 'lomba') html = vLomba();
    else if (view === 'lomba-detail') html = vDetail(arg || 'esai-energi');
    else if (view === 'wall') html = vWall(arg);
    else if (view === 'profil') html = vProfil(arg || ME);
    else { view = 'beranda'; html = vBeranda(); document.title = 'Beranda, ADZVANCE'; }
    var app = document.getElementById('app');
    var y = window.scrollY;
    app.innerHTML = html;
    app.dataset.view = view;
    var navKey = view === 'lomba-detail' ? 'lomba' : view;
    if (view === 'profil' && arg && arg !== ME) navKey = '';
    document.querySelectorAll('[data-nav]').forEach(function (a) { if (a.dataset.nav === navKey) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    renderBell();
    icons();
    if (keepScroll) window.scrollTo(0, y);
    else if (current !== h) { window.scrollTo(0, 0); app.classList.remove('enter'); void app.offsetWidth; app.classList.add('enter'); }
    current = h;
  }
  function icons() { if (window.lucide) window.lucide.createIcons({ attrs: { 'aria-hidden': 'true' } }); }
  function refreshHall() {
    var box = document.getElementById('hallBox'); if (!box) return;
    box.innerHTML = hallHtml(); document.getElementById('count').textContent = countText();
    document.querySelectorAll('[data-act="cat"]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.v === F.cat); });
    icons();
  }

  var toastT;
  function toast(msg) { var t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, 2400); }

  /* ---------- events ---------- */
  document.addEventListener('click', function (e) {
    var bellWrap = e.target.closest('.bell-wrap');
    if (!bellWrap) closeBell();
    var el = e.target.closest('[data-act]'); if (!el) return;
    var act = el.dataset.act, id = el.dataset.id;
    if (act === 'save') {
      var on = toggle(S.saved, id); persist(); toast(on ? 'Disimpan' : 'Dihapus dari simpanan');
      if (document.getElementById('hallBox') && !F.saved) {
        document.querySelectorAll('[data-act="save"][data-id="' + id + '"]').forEach(function (b) { b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', on ? 'Hapus dari simpanan' : 'Simpan'); b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); });
      } else render(true);
    } else if (act === 'join') {
      var j = toggle(S.joined, id); persist(); toast(j ? 'Kamu ikut lomba ini' : 'Batal ikut'); render(true);
      if (j) { var b = document.querySelector('.btn-join'); if (b) b.classList.add('stamp'); }
    } else if (act === 'invite') {
      S.invite = el.dataset.v; persist(); toast(S.invite === 'ok' ? 'Bergabung dengan tim Nadia' : 'Undangan ditolak'); render(true);
    } else if (act === 'apply') {
      var a = toggle(S.applied, id); persist(); toast(a ? 'Permintaan terkirim' : 'Permintaan dibatalkan'); render(true);
    } else if (act === 'endorse') {
      S.endorsed[id] = !S.endorsed[id]; persist(); render(true);
    } else if (act === 'cat') { F.cat = el.dataset.v; refreshHall(); }
    else if (act === 'free') { F.free = !F.free; el.setAttribute('aria-pressed', F.free); refreshHall(); }
    else if (act === 'savedonly') { F.saved = !F.saved; el.setAttribute('aria-pressed', F.saved); refreshHall(); }
    else if (act === 'clear') { F = { q: '', cat: 'all', level: 'all', form: 'all', free: false, saved: false, sort: F.sort }; render(true); }
    else if (act === 'bell') {
      var box = document.getElementById('notifs'), open = box.hidden;
      box.hidden = !open; el.setAttribute('aria-expanded', open);
      if (open) { S.read = true; persist(); var c = document.getElementById('bellCount'); c.hidden = true; }
    } else if (act === 'chat') { toast('Chat tim dibuka'); }
    else if (act === 'edit') { toast('Mode sunting'); }
    else if (act === 'ajak') { toast('Ajakan terkirim ke ' + first(id)); }
  });
  function closeBell() { var box = document.getElementById('notifs'); if (box && !box.hidden) { box.hidden = true; document.querySelector('.bell').setAttribute('aria-expanded', 'false'); renderBell(); icons(); } }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeBell(); });
  document.addEventListener('input', function (e) { if (e.target.id === 'q') { F.q = e.target.value; refreshHall(); } });
  document.addEventListener('change', function (e) {
    var f = e.target.dataset.f; if (f) { F[f] = e.target.value; refreshHall(); return; }
    if (e.target.dataset.act === 'proof' && e.target.files.length) { S.proof = 'sent'; persist(); toast('Bukti terkirim'); render(true); }
  });
  window.addEventListener('hashchange', function () { closeBell(); render(false); });
  render(false);
})();
