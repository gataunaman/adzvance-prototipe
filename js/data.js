/* ADZVANCE prototype: demo data. Every name and NISN here is made up.
 * Dates are stored as day offsets from today so the demo never goes stale. */
window.SEED = function () {
  function mk(off) { var t = new Date(); t.setDate(1); t.setMonth(t.getMonth() + off); return t.getFullYear() + '-' + ('0' + (t.getMonth() + 1)).slice(-2); }
  return {
    version: 5,
    me: null,             // logged-in student id (null = logged out)
    dev: false,           // developer session
    adminMode: false,     // admin is currently in admin view

    cats: {
      sains: { name: 'Sains', icon: 'flask-conical' },
      esai: { name: 'Esai', icon: 'pen-line' },
      debat: { name: 'Debat', icon: 'mic' },
      tek: { name: 'Teknologi', icon: 'cpu' },
      seni: { name: 'Seni', icon: 'palette' }
    },
    subjects: {
      mat: 'Matematika', fis: 'Fisika', kim: 'Kimia', bio: 'Biologi', bin: 'Bahasa Indonesia', big: 'Bahasa Inggris', osis: 'OSIS'
    },
    interests: ['Sains', 'Esai', 'Debat', 'Teknologi', 'Seni', 'Olahraga', 'Bisnis', 'Bahasa'],
    skills: ['Pemrograman', 'Menulis', 'Riset', 'Desain UI', 'Public speaking', 'Matematika', 'Bahasa Inggris', 'Video', 'Fotografi'],
    orgs: {
      osis: { name: 'OSIS', icon: 'shield' },
      english: { name: 'English Club', icon: 'languages' },
      robotik: { name: 'Klub Robotik', icon: 'cpu' },
      kir: { name: 'KIR', icon: 'flask-conical' },
      pramuka: { name: 'Pramuka', icon: 'tent' },
      rohis: { name: 'Rohis', icon: 'book-open' }
    },
    roles: ['Ketua', 'Wakil', 'Sekretaris', 'Bendahara', 'Anggota'],

    students: [
      { id: 'rizky', name: 'Rizky Pratama', ini: 'RP', nisn: '0051234567', kelas: 'XI IPA 2', av: '', banner: 'peach',
        headline: 'Programmer dan penulis esai', bio: 'Suka bikin aplikasi kecil dan nulis esai. Lagi cari tim buat hackathon dan lomba esai energi.',
        interests: ['Teknologi', 'Esai', 'Sains'], skills: { 'Pemrograman': ['dimas', 'alya'], 'Menulis': ['salsa'], 'Riset': [], 'Desain UI': ['dimas'] },
        orgs: [['osis', 'Anggota'], ['robotik', 'Ketua'], ['english', 'Anggota']],
        featured: [{ id: 'f1', title: 'Aplikasi jadwal piket kelas', kind: 'Proyek', url: 'github.com/rizkyp/piket', icon: 'code' }, { id: 'f2', title: 'Esai: Desa mandiri energi surya', kind: 'Tulisan', url: 'Esai_energi_desa.pdf', icon: 'file-text' }],
        linkedin: 'linkedin.com/in/rizkypratama', wa: '0812 0000 0001', showLinkedin: true, publicLink: false,
        order: ['about', 'prestasi', 'riwayat', 'karya', 'keahlian', 'organisasi', 'tautan'], hidden: [], fameHidden: false, admin: false, active: true },
      { id: 'aisyah', name: 'Aisyah Rahmawati', ini: 'AR', nisn: '0057654321', kelas: 'XII IPA 1', av: 'seni', banner: 'rose',
        headline: 'Ketua OSIS, suka debat dan sains', bio: 'Ketua OSIS 2026. Senang membantu teman-teman ikut lomba.',
        interests: ['Debat', 'Sains'], skills: { 'Public speaking': ['nadia', 'salsa'], 'Riset': [] },
        orgs: [['osis', 'Ketua']], featured: [],
        linkedin: '', wa: '0812 0000 0002', showLinkedin: false, publicLink: false,
        order: ['about', 'prestasi', 'riwayat', 'karya', 'keahlian', 'organisasi', 'tautan'], hidden: ['karya'], fameHidden: false, admin: true, ketua: true, active: true },
      { id: 'salsa', name: 'Salsabila Putri', ini: 'SP', nisn: '0067788990', kelas: 'XI IPS 1', av: 'esai', banner: 'violet',
        headline: 'Penulis, riset sosial', bio: 'Menulis esai dan cerpen. Sekretaris OSIS.',
        interests: ['Esai', 'Debat'], skills: { 'Menulis': ['rizky', 'nadia'], 'Riset': ['fajar'] },
        orgs: [['osis', 'Sekretaris']], featured: [],
        linkedin: 'linkedin.com/in/salsabilap', wa: '0812 0000 0003', showLinkedin: true, publicLink: false,
        order: ['about', 'prestasi', 'riwayat', 'karya', 'keahlian', 'organisasi', 'tautan'], hidden: [], fameHidden: false, admin: false, active: true },
      { id: 'dimas', name: 'Dimas Aryo', ini: 'DA', nisn: '0071122334', kelas: 'X 3', av: 'tek', banner: 'teal',
        headline: 'Backend developer, OSN Fisika', bio: 'Backend dan fisika. Cari desainer untuk hackathon.',
        interests: ['Teknologi', 'Sains'], skills: { 'Pemrograman': ['rizky'], 'Matematika': [] },
        orgs: [['robotik', 'Anggota']], featured: [],
        linkedin: '', wa: '0812 0000 0004', showLinkedin: false, publicLink: false,
        order: ['about', 'prestasi', 'riwayat', 'karya', 'keahlian', 'organisasi', 'tautan'], hidden: [], fameHidden: false, admin: false, active: true },
      { id: 'nadia', name: 'Nadia Azzahra', ini: 'NA', nisn: '0063344556', kelas: 'XII IPA 1', av: 'seni', banner: 'peach',
        headline: 'Debater, penjawab teraktif forum', bio: 'Debat bahasa Inggris dan matematika.',
        interests: ['Debat', 'Bahasa', 'Sains'], skills: { 'Public speaking': ['aisyah'], 'Bahasa Inggris': ['rizky', 'salsa'], 'Matematika': [] },
        orgs: [['english', 'Ketua']], featured: [],
        linkedin: 'linkedin.com/in/nadiaazz', wa: '0812 0000 0005', showLinkedin: true, publicLink: true,
        order: ['about', 'prestasi', 'riwayat', 'karya', 'keahlian', 'organisasi', 'tautan'], hidden: [], fameHidden: false, admin: false, active: true },
      { id: 'fajar', name: 'Fajar Hidayat', ini: 'FH', nisn: '0069900112', kelas: 'XI IPA 3', av: 'sains', banner: 'sky',
        headline: 'Olimpiade matematika', bio: 'Latihan soal tiap hari.',
        interests: ['Sains'], skills: { 'Matematika': ['nadia'], 'Riset': [] },
        orgs: [['kir', 'Anggota']], featured: [],
        linkedin: '', wa: '0812 0000 0006', showLinkedin: false, publicLink: false,
        order: ['about', 'prestasi', 'riwayat', 'karya', 'keahlian', 'organisasi', 'tautan'], hidden: [], fameHidden: false, admin: false, active: true },
      { id: 'alya', name: 'Alya Lestari', ini: 'AL', nisn: '0074455667', kelas: 'XI IPA 1', av: 'debat', banner: 'mint',
        headline: 'Robotik dan elektronika', bio: 'Mekanik tim robotik.',
        interests: ['Teknologi'], skills: { 'Riset': [], 'Pemrograman': [] },
        orgs: [['robotik', 'Wakil']], featured: [],
        linkedin: '', wa: '0812 0000 0007', showLinkedin: false, publicLink: false,
        order: ['about', 'prestasi', 'riwayat', 'karya', 'keahlian', 'organisasi', 'tautan'], hidden: [], fameHidden: false, admin: false, active: true },
      { id: 'rafi', name: 'Muhammad Rafi', ini: 'MR', nisn: '0078899001', kelas: 'XII IPS 2', av: 'esai', banner: 'violet',
        headline: 'Film pendek dan fotografi', bio: 'Suka bikin video.',
        interests: ['Seni'], skills: { 'Video': ['alya'], 'Fotografi': [] },
        orgs: [['pramuka', 'Anggota']], featured: [],
        linkedin: '', wa: '0812 0000 0008', showLinkedin: false, publicLink: false,
        order: ['about', 'prestasi', 'riwayat', 'karya', 'keahlian', 'organisasi', 'tautan'], hidden: [], fameHidden: false, admin: false, active: true }
    ],

    lomba: [
      { id: 'esai-energi', title: 'Lomba Esai Nasional Energi Bersih untuk Desa', org: 'Forum Mahasiswa Energi', cat: 'esai', form: 'Online', level: 'Nasional', fee: 0, dl: 3, status: 'published', source: 'Google',
        tema: 'Energi bersih untuk desa', peserta: 'Perorangan atau tim, maks. 3', jenjang: 'SMA, SMK, sederajat',
        ev: 8, ann: 22,
        syarat: ['Siswa aktif SMA, SMK, atau sederajat', 'Esai 1.500 sampai 2.000 kata', 'Karya asli, belum pernah dilombakan', 'Lampirkan kartu pelajar'],
        hadiah: ['Rp 3 jt', 'Rp 2 jt', 'Rp 1 jt'], kontak: 'Admin lomba, 0812 0000 0000' },
      { id: 'olim-mat', title: 'Olimpiade Matematika Pelajar Sumatera Utara', org: 'Himpunan Mahasiswa Matematika', cat: 'sains', form: 'Offline', level: 'Provinsi', fee: 50000, dl: 6, status: 'published', source: 'Google', ev: 12, ann: 30 },
      { id: 'debat-ing', title: 'Debat Bahasa Inggris Antar-SMA', org: 'English Society', cat: 'debat', form: 'Online', level: 'Nasional', fee: 75000, dl: 12, status: 'published', source: 'Google' },
      { id: 'hackathon', title: 'Hackathon Pelajar Kota Pintar', org: 'Komunitas Developer Muda', cat: 'tek', form: 'Hybrid', level: 'Nasional', fee: 0, dl: 19, status: 'published', source: 'Google' },
      { id: 'foto', title: 'Lomba Fotografi Budaya Lokal', org: 'Sanggar Foto Nusantara', cat: 'seni', form: 'Online', level: 'Nasional', fee: 25000, dl: 26, status: 'published', source: 'Google' },
      { id: 'robotik', title: 'Kompetisi Robotik Pelajar 2026', org: 'Asosiasi Robotika Indonesia', cat: 'tek', form: 'Offline', level: 'Nasional', fee: 150000, dl: 31, status: 'published', source: 'Google' },
      { id: 'cerpen', title: 'Lomba Cerpen Remaja Nusantara', org: 'Balai Bahasa Sumatera Utara', cat: 'esai', form: 'Online', level: 'Provinsi', fee: 0, dl: 38, status: 'published', source: 'Admin' },
      { id: 'osn', ladder: true, title: 'OSN Tingkat Kabupaten/Kota 2027', org: 'Puspresnas', cat: 'sains', form: 'Offline', level: 'Kabupaten', fee: 0, dl: 45, status: 'published', source: 'Admin' },
      { id: 'film', title: 'Festival Film Pendek Remaja', org: 'Komunitas Sinema Pelajar', cat: 'seni', form: 'Online', level: 'Nasional', fee: 0, dl: 52, status: 'published', source: 'Google' },
      { id: 'q-robot', title: 'Lomba Desain Robot Pemilah Sampah', org: 'Politeknik Negeri Medan', cat: 'tek', form: 'Offline', level: 'Provinsi', fee: 100000, dl: 40, status: 'queue', source: 'Google', jenjangNote: 'SMA, SMK, Mahasiswa', filter: 'ok' },
      { id: 'q-film', title: 'Kompetisi Video Edukasi Iklim', org: 'Komunitas Hijau', cat: 'seni', form: 'Online', level: 'Nasional', fee: 0, dl: 33, status: 'queue', source: 'Google', jenjangNote: 'Jenjang tidak dicantumkan', filter: 'unclear' },
      { id: 'q-puisi', title: 'Lomba Puisi Hari Pahlawan', org: 'Sanggar Sastra Kota', cat: 'esai', form: 'Online', level: 'Kota', fee: 0, dl: 14, status: 'queue', source: 'Usulan siswa', suggestedBy: 'salsa', jenjangNote: 'SMA', filter: 'ok' }
    ],

    bookmarks: { rizky: ['esai-energi', 'olim-mat', 'debat-ing'] },

    posts: [
      { id: 'p1', author: 'salsa', lomba: 'esai-energi', text: 'Butuh satu orang yang kuat di data dan riset lapangan.', skills: ['Riset', 'Menulis'], filled: 2, total: 3, applicants: [] },
      { id: 'p2', author: 'dimas', lomba: 'hackathon', text: 'Saya backend. Cari satu desainer UI dan satu yang bisa pitching.', skills: ['Desain UI', 'Public speaking'], filled: 1, total: 3, applicants: [] },
      { id: 'p3', author: 'nadia', lomba: 'debat-ing', text: 'Butuh dua speaker. Latihan Selasa dan Kamis sepulang sekolah.', skills: ['Public speaking', 'Bahasa Inggris'], filled: 1, total: 3, applicants: [] },
      { id: 'p4', author: 'fajar', lomba: 'olim-mat', text: 'Cari teman latihan soal, beregu 2 orang.', skills: ['Matematika'], filled: 1, total: 2, applicants: [] },
      { id: 'p5', author: 'alya', lomba: 'robotik', text: 'Sudah ada mekanik. Butuh programmer Arduino.', skills: ['Pemrograman', 'Riset'], filled: 2, total: 4, applicants: [] },
      { id: 'p6', author: 'rafi', lomba: 'film', text: 'Cari penulis naskah dan editor video.', skills: ['Video', 'Menulis'], filled: 1, total: 3, applicants: [] }
    ],
    invites: [{ id: 'i1', from: 'nadia', to: 'rizky', lomba: 'debat-ing', status: 'pending' }],
    teams: [
      { id: 't1', name: 'Tim Esai Energi', lomba: 'esai-energi', members: ['salsa', 'dimas', 'rizky'], messages: [
        { from: 'salsa', text: 'Aku sudah bikin kerangka. Tolong cek bagian data ya.', time: '19.02', file: 'Kerangka esai v1.docx, 48 KB' },
        { from: 'dimas', text: 'Data listrik desa bisa ambil dari BPS.', time: '19.10' },
        { from: 'rizky', text: 'Oke, malam ini aku tambahin grafik konsumsi listriknya.', time: '19.21' }] }
    ],

    threads: [
      { id: 'th0', title: 'Aturan forum dan cara menandai jawaban terbaik', subj: 'osis', author: 'aisyah', ago: '1 minggu lalu', pinned: true, body: 'Tanya dengan jelas, sertakan soalnya, dan tandai jawaban terbaik kalau sudah terbantu.', likes: ['rizky', 'nadia'], replies: [] },
      { id: 'th1', title: 'Cara cepat integral parsial?', subj: 'mat', author: 'fajar', ago: '2 hari lalu', body: 'Untuk soal seperti integral x kali e pangkat x, ada cara cepat menentukan u dan dv tanpa coba-coba?', likes: ['rizky', 'nadia', 'dimas', 'salsa', 'alya', 'aisyah'], replies: [
        { id: 'r1', author: 'nadia', body: 'Pakai urutan LIATE: logaritma, invers trigonometri, aljabar, trigonometri, eksponen. Yang muncul lebih dulu jadi u. Jadi u = x dan dv = e pangkat x dx.', likes: ['fajar', 'rizky', 'dimas'], parent: null, best: true },
        { id: 'r2', author: 'fajar', body: 'Mantap, langsung kepakai di latihan tadi.', likes: ['nadia'], parent: 'r1' },
        { id: 'r3', author: 'dimas', body: 'Untuk soal yang berulang seperti e pangkat x kali sin x, pakai metode tabel biar tidak bolak-balik.', likes: ['rizky'], parent: null }] },
      { id: 'th2', title: 'Struktur esai argumentatif yang dinilai juri', subj: 'bin', author: 'salsa', ago: '3 hari lalu', body: 'Juri biasanya menilai apa saja? Pembukaan harus langsung tesis?', likes: ['rizky'], replies: [{ id: 'r1', author: 'rizky', body: 'Tesis di paragraf pertama, lalu tiga argumen dengan data.', likes: [], parent: null }] },
      { id: 'th3', title: 'Perbedaan reaksi SN1 dan SN2, ada cara mudah ingat?', subj: 'kim', author: 'alya', ago: '4 hari lalu', body: 'Sering ketuker.', likes: [], replies: [{ id: 'r1', author: 'fajar', body: 'SN1 dua langkah lewat karbokation, SN2 satu langkah serangan dari belakang.', likes: ['alya'], parent: null, best: true }] },
      { id: 'th4', title: 'Tips rebuttal yang tidak terdengar menyerang', subj: 'big', author: 'nadia', ago: '5 hari lalu', body: 'Bagaimana membantah tanpa terdengar kasar?', likes: [], replies: [] },
      { id: 'th5', title: 'Konsep momentum sudut untuk OSN Fisika', subj: 'fis', author: 'nadia', ago: '6 hari lalu', body: 'Ada sumber yang enak dibaca?', likes: [], replies: [] },
      { id: 'th6', title: 'Sumber belajar genetika untuk OSN Biologi', subj: 'bio', author: 'rafi', ago: '1 minggu lalu', body: 'Selain buku Campbell?', likes: [], replies: [] }
    ],
    reports: [
      { id: 'rp1', kind: 'chat', where: 'Tim Debat XII', by: 'nadia', text: '[pesan yang dilaporkan anggota tim]', status: 'open' },
      { id: 'rp2', kind: 'forum', thread: 'th4', where: 'Tips rebuttal yang tidak terdengar menyerang', by: 'salsa', text: 'Balasan berisi iklan joki tugas.', status: 'open' }
    ],

    announcements: [
      { id: 'an1', title: 'Briefing peserta OSN tingkat kabupaten', body: 'Semua siswa yang mendaftar OSN kumpul di aula, Jumat pukul 13.00. Bawa kartu pelajar.', link: '', pinned: true, author: 'aisyah', d: -1 },
      { id: 'an2', title: 'Pendaftaran lomba esai energi ditutup minggu ini', body: 'Yang ikut, pastikan berkas sudah diunggah sebelum Rabu.', link: '', pinned: false, author: 'aisyah', d: -2 },
      { id: 'an3', title: 'Selamat untuk tim KIR!', body: 'Juara 1 Lomba Karya Tulis Ilmiah Remaja tingkat nasional.', link: '#wall', pinned: false, author: 'salsa', d: -5 }
    ],

    /* One entry per student/team per competition (or per tier of a ladder competition).
     * status: joined → pending → (info) → verified | rejected. month = the edition (month it was verified).
     * Wall-eligible: see A.eligible in core.js. "Terdaftar", "Tidak lolos", "Mundur" are private. */
    editionNotes: {
      [mk(0)]: 'Terima kasih sudah membawa nama Adzkia sejauh ini. Kami bangga pada kalian.',
      [mk(-1)]: 'Bulan yang ramai lomba. Selamat untuk semua yang sudah berani tampil.',
      [mk(-2)]: 'Awal semester yang baik. Semoga jadi pembuka untuk bulan-bulan berikutnya.'
    },
    entries: [
      { id: 'e1', title: 'Lomba Karya Tulis Ilmiah Remaja', org: 'LIPI Muda', cat: 'sains', level: 'Nasional', who: ['nadia', 'fajar'], result: 'Juara 1', status: 'verified', proofLink: 'instagram.com/p/adzkia-kti', d: -4, month: mk(0), source: 'osis' },
      { id: 'e2', title: 'OSN Fisika', org: 'Puspresnas', cat: 'sains', level: 'Provinsi', ladder: true, prev: 'e5', who: ['dimas'], result: 'Medali perak', status: 'verified', proofLink: 'pusatprestasinasional.kemdikbud.go.id', cert: 'piagam-osn.pdf', d: -9, month: mk(0), source: 'siswa' },
      { id: 'e3', title: 'Debat Bahasa Inggris Antar-SMA', org: 'English Society', cat: 'debat', level: 'Nasional', who: ['nadia'], result: 'Penghargaan khusus', award: 'Best speaker', status: 'verified', proofLink: 'instagram.com/p/english-society', d: -12, month: mk(0), source: 'siswa' },
      { id: 'e4', title: 'Lomba Esai Kabupaten', org: 'Dinas Pendidikan Deli Serdang', cat: 'esai', level: 'Kabupaten/Kota', who: ['rizky'], result: 'Juara 2', status: 'verified', proofFile: 'pengumuman.jpg', d: -35, month: mk(-1), source: 'siswa' },
      { id: 'e6', title: 'Debat Bahasa Indonesia', org: 'Balai Bahasa Sumatera Utara', cat: 'debat', level: 'Provinsi', who: ['aisyah', 'salsa'], ext: 'Budi (SMA Negeri 1 Medan)', result: 'Juara 1', status: 'verified', proofLink: 'instagram.com/p/adzkia-debat', d: -40, month: mk(-1), source: 'osis' },
      { id: 'e5', title: 'OSN Fisika', org: 'Puspresnas', cat: 'sains', level: 'Kabupaten/Kota', ladder: true, who: ['dimas'], result: 'Juara 1', status: 'verified', proofLink: 'instagram.com/p/adzkia-osn', d: -62, month: mk(-2), source: 'osis' },
      { id: 'e7', title: 'Lomba Cerpen Remaja Nusantara', org: 'Balai Bahasa', cat: 'esai', level: 'Provinsi', who: ['salsa'], result: 'Harapan 1', status: 'verified', proofLink: 'balaibahasa.id/pengumuman', d: -66, month: mk(-2), source: 'siswa' },
      { id: 'e8', title: 'Lomba Poster Hari Guru', org: 'PGRI Kota Medan', cat: 'seni', level: 'Kabupaten/Kota', who: ['fajar'], result: 'Juara 3', status: 'pending', proofFile: 'pengumuman.png', d: -2, source: 'siswa' },
      { id: 'e9', lomba: 'hackathon', title: 'Hackathon Pelajar Kota Pintar', org: 'Komunitas Developer Muda', cat: 'tek', level: 'Nasional', who: ['rizky', 'dimas'], result: 'Juara 2', status: 'info', proofLink: 'devmuda.id/hasil', note: 'Tautannya tidak menampilkan nama tim kalian. Tambahkan tangkapan layar pengumuman atau sertifikat.', d: -5, source: 'siswa' },
      { id: 'e10', title: 'Lomba Pidato Bahasa Arab', org: 'Kemenag Kota Medan', cat: 'debat', level: 'Kabupaten/Kota', who: ['aisyah'], result: 'Juara 1', status: 'pending', proofLink: 'instagram.com/p/kemenag-medan', d: -3, source: 'siswa' },
      { id: 'e11', lomba: 'esai-energi', title: 'Lomba Esai Nasional Energi Bersih untuk Desa', org: 'Forum Mahasiswa Energi', cat: 'esai', level: 'Nasional', who: ['rizky', 'salsa', 'dimas'], result: 'Terdaftar', status: 'joined' }
    ],

    notifs: {
      rizky: [
        { id: 'n1', icon: 'clock', tone: 'peach', text: 'Lomba Esai Nasional Energi Bersih untuk Desa tutup 3 hari lagi.', href: '#lomba-detail', lomba: 'esai-energi', time: '08.00', read: false },
        { id: 'n2', icon: 'user-plus', tone: 'tek', text: 'Nadia Azzahra mengajakmu ke tim Debat Bahasa Inggris Antar-SMA.', href: '#beranda', time: 'Kemarin', read: false },
        { id: 'n3', icon: 'message-circle', tone: 'esai', text: 'Salsabila Putri membalas pertanyaanmu.', href: '#forum', time: 'Kemarin', read: false },
        { id: 'n4', icon: 'sparkles', tone: 'sains', text: 'Hackathon Pelajar Kota Pintar cocok dengan minatmu.', href: '#lomba-detail', lomba: 'hackathon', time: '20 Nov', read: true },
        { id: 'n5', icon: 'medal', tone: 'gold', text: 'Prestasimu di Lomba Esai Kabupaten tampil di Wall of Fame.', href: '#wall', time: '15 Nov', read: true }
      ]
    },

    audit: [
      { t: '22 Nov, 20.31', who: 'Developer', act: 'Membuka chat tim', target: 'Tim Debat XII' },
      { t: '22 Nov, 18.02', who: 'Aisyah R. (admin)', act: 'Menerbitkan lomba', target: 'Lomba Cerpen Remaja Nusantara' },
      { t: '22 Nov, 09.15', who: 'Developer', act: 'Mengubah mode terbit ke Tinjau dulu', target: 'Pencari lomba' }
    ],
    settings: { publishMode: 'review', maintenance: false, chat: true, forum: true, terms: ['lomba SMA 2026', 'lomba SMK', 'olimpiade pelajar', 'lomba esai pelajar'] }
  };
};
