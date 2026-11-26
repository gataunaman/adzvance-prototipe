/* Demo data, copied from prototype/js/data.js. Names are made up. Dates are day offsets from today. */
window.D = {
  me: 'rizky',
  cats: {
    sains: { name: 'Sains', icon: 'flask-conical' },
    esai: { name: 'Esai', icon: 'pen-line' },
    debat: { name: 'Debat', icon: 'mic' },
    tek: { name: 'Teknologi', icon: 'cpu' },
    seni: { name: 'Seni', icon: 'palette' }
  },
  interestCat: { Sains: 'sains', Esai: 'esai', Debat: 'debat', Teknologi: 'tek', Seni: 'seni' },
  orgs: {
    osis: { name: 'OSIS', icon: 'shield' },
    english: { name: 'English Club', icon: 'languages' },
    robotik: { name: 'Klub Robotik', icon: 'cpu' },
    kir: { name: 'KIR', icon: 'flask-conical' },
    pramuka: { name: 'Pramuka', icon: 'tent' },
    rohis: { name: 'Rohis', icon: 'book-open' }
  },
  students: {
    rizky: { name: 'Rizky Pratama', ini: 'RP', kelas: 'XI IPA 2', col: 'apricot',
      headline: 'Programmer dan penulis esai', bio: 'Suka bikin aplikasi kecil dan nulis esai. Lagi cari tim buat hackathon dan lomba esai energi.',
      interests: ['Teknologi', 'Esai', 'Sains'], skills: { 'Pemrograman': ['dimas', 'alya'], 'Menulis': ['salsa'], 'Riset': [], 'Desain UI': ['dimas'] },
      orgs: [['osis', 'Anggota'], ['robotik', 'Ketua'], ['english', 'Anggota']],
      featured: [{ title: 'Aplikasi jadwal piket kelas', kind: 'Proyek', url: 'github.com/rizkyp/piket', icon: 'code' }, { title: 'Esai: Desa mandiri energi surya', kind: 'Tulisan', url: 'Esai_energi_desa.pdf', icon: 'file-text' }],
      linkedin: 'linkedin.com/in/rizkypratama' },
    aisyah: { name: 'Aisyah Rahmawati', ini: 'AR', kelas: 'XII IPA 1', col: 'pink' },
    salsa: { name: 'Salsabila Putri', ini: 'SP', kelas: 'XI IPS 1', col: 'yellow' },
    dimas: { name: 'Dimas Aryo', ini: 'DA', kelas: 'X 3', col: 'mint' },
    nadia: { name: 'Nadia Azzahra', ini: 'NA', kelas: 'XII IPA 1', col: 'pink' },
    fajar: { name: 'Fajar Hidayat', ini: 'FH', kelas: 'XI IPA 3', col: 'sky' },
    alya: { name: 'Alya Lestari', ini: 'AL', kelas: 'XI IPA 1', col: 'mint' },
    rafi: { name: 'Muhammad Rafi', ini: 'MR', kelas: 'XII IPS 2', col: 'yellow' }
  },
  lomba: [
    { id: 'esai-energi', title: 'Lomba Esai Nasional Energi Bersih untuk Desa', org: 'Forum Mahasiswa Energi', cat: 'esai', form: 'Online', level: 'Nasional', fee: 0, dl: 3, added: 9,
      tema: 'Energi bersih untuk desa', peserta: 'Perorangan atau tim, maks. 3', jenjang: 'SMA, SMK, sederajat', ev: 8, ann: 22,
      syarat: ['Siswa aktif SMA, SMK, atau sederajat', 'Esai 1.500 sampai 2.000 kata', 'Karya asli, belum pernah dilombakan', 'Lampirkan kartu pelajar'],
      hadiah: ['Rp 3 jt', 'Rp 2 jt', 'Rp 1 jt'], kontak: 'Admin lomba, 0812 0000 0000' },
    { id: 'olim-mat', title: 'Olimpiade Matematika Pelajar Sumatera Utara', org: 'Himpunan Mahasiswa Matematika', cat: 'sains', form: 'Offline', level: 'Provinsi', fee: 50000, dl: 6, added: 4, ev: 12, ann: 30 },
    { id: 'debat-ing', title: 'Debat Bahasa Inggris Antar-SMA', org: 'English Society', cat: 'debat', form: 'Online', level: 'Nasional', fee: 75000, dl: 12, added: 7 },
    { id: 'hackathon', title: 'Hackathon Pelajar Kota Pintar', org: 'Komunitas Developer Muda', cat: 'tek', form: 'Hybrid', level: 'Nasional', fee: 0, dl: 19, added: 2 },
    { id: 'foto', title: 'Lomba Fotografi Budaya Lokal', org: 'Sanggar Foto Nusantara', cat: 'seni', form: 'Online', level: 'Nasional', fee: 25000, dl: 26, added: 6 },
    { id: 'robotik', title: 'Kompetisi Robotik Pelajar 2026', org: 'Asosiasi Robotika Indonesia', cat: 'tek', form: 'Offline', level: 'Nasional', fee: 150000, dl: 31, added: 1 },
    { id: 'cerpen', title: 'Lomba Cerpen Remaja Nusantara', org: 'Balai Bahasa Sumatera Utara', cat: 'esai', form: 'Online', level: 'Provinsi', fee: 0, dl: 38, added: 3 },
    { id: 'osn', title: 'OSN Tingkat Kabupaten/Kota 2027', org: 'Puspresnas', cat: 'sains', form: 'Offline', level: 'Kabupaten', fee: 0, dl: 45, added: 8 },
    { id: 'film', title: 'Festival Film Pendek Remaja', org: 'Komunitas Sinema Pelajar', cat: 'seni', form: 'Online', level: 'Nasional', fee: 0, dl: 52, added: 5 }
  ],
  bookmarks: ['esai-energi', 'olim-mat', 'debat-ing'],
  joined: ['esai-energi'],
  posts: [
    { id: 'p1', author: 'salsa', lomba: 'esai-energi', text: 'Butuh satu orang yang kuat di data dan riset lapangan.', skills: ['Riset', 'Menulis'], filled: 2, total: 3 },
    { id: 'p2', author: 'dimas', lomba: 'hackathon', text: 'Saya backend. Cari satu desainer UI dan satu yang bisa pitching.', skills: ['Desain UI', 'Public speaking'], filled: 1, total: 3 },
    { id: 'p3', author: 'nadia', lomba: 'debat-ing', text: 'Butuh dua speaker. Latihan Selasa dan Kamis sepulang sekolah.', skills: ['Public speaking', 'Bahasa Inggris'], filled: 1, total: 3 },
    { id: 'p4', author: 'fajar', lomba: 'olim-mat', text: 'Cari teman latihan soal, beregu 2 orang.', skills: ['Matematika'], filled: 1, total: 2 },
    { id: 'p5', author: 'alya', lomba: 'robotik', text: 'Sudah ada mekanik. Butuh programmer Arduino.', skills: ['Pemrograman', 'Riset'], filled: 2, total: 4 },
    { id: 'p6', author: 'rafi', lomba: 'film', text: 'Cari penulis naskah dan editor video.', skills: ['Video', 'Menulis'], filled: 1, total: 3 }
  ],
  invite: { from: 'nadia', lomba: 'debat-ing', status: 'pending' },
  teams: [
    { id: 't1', name: 'Tim Esai Energi', lomba: 'esai-energi', members: ['salsa', 'dimas', 'rizky'], messages: [
      { from: 'salsa', text: 'Aku sudah bikin kerangka. Tolong cek bagian data ya.', time: '19.02' },
      { from: 'dimas', text: 'Data listrik desa bisa ambil dari BPS.', time: '19.10' },
      { from: 'rizky', text: 'Oke, malam ini aku tambahin grafik konsumsi listriknya.', time: '19.21' }] }
  ],
  announcements: [
    { title: 'Briefing peserta OSN tingkat kabupaten', body: 'Semua siswa yang mendaftar OSN kumpul di aula, Jumat pukul 13.00. Bawa kartu pelajar.', pinned: true, author: 'aisyah', d: -1 },
    { title: 'Pendaftaran lomba esai energi ditutup minggu ini', body: 'Yang ikut, pastikan berkas sudah diunggah sebelum Rabu.', pinned: false, author: 'aisyah', d: -2 },
    { title: 'Selamat untuk tim KIR!', body: 'Juara 1 Lomba Karya Tulis Ilmiah Remaja tingkat nasional.', pinned: false, author: 'salsa', d: -5, link: '#wall' }
  ],
  editionNotes: [
    'Terima kasih sudah membawa nama Adzkia sejauh ini. Kami bangga pada kalian.',
    'Bulan yang ramai lomba. Selamat untuk semua yang sudah berani tampil.',
    'Awal semester yang baik. Semoga jadi pembuka untuk bulan-bulan berikutnya.'
  ],
  /* month: 0 = this month, -1 = last month. Private results never appear here. */
  entries: [
    { title: 'Lomba Karya Tulis Ilmiah Remaja', org: 'LIPI Muda', cat: 'sains', level: 'Nasional', who: ['nadia', 'fajar'], result: 'Juara 1', status: 'verified', d: -4, month: 0 },
    { title: 'OSN Fisika', org: 'Puspresnas', cat: 'sains', level: 'Provinsi', who: ['dimas'], result: 'Medali perak', status: 'verified', d: -9, month: 0 },
    { title: 'Debat Bahasa Inggris Antar-SMA', org: 'English Society', cat: 'debat', level: 'Nasional', who: ['nadia'], result: 'Penghargaan khusus', award: 'Best speaker', status: 'verified', d: -12, month: 0 },
    { title: 'Lomba Esai Kabupaten', org: 'Dinas Pendidikan Deli Serdang', cat: 'esai', level: 'Kabupaten/Kota', who: ['rizky'], result: 'Juara 2', status: 'verified', d: -35, month: -1 },
    { title: 'Debat Bahasa Indonesia', org: 'Balai Bahasa Sumatera Utara', cat: 'debat', level: 'Provinsi', who: ['aisyah', 'salsa'], ext: 'Budi (SMA Negeri 1 Medan)', result: 'Juara 1', status: 'verified', d: -40, month: -1 },
    { title: 'OSN Fisika', org: 'Puspresnas', cat: 'sains', level: 'Kabupaten/Kota', who: ['dimas'], result: 'Juara 1', status: 'verified', d: -62, month: -2 },
    { title: 'Lomba Cerpen Remaja Nusantara', org: 'Balai Bahasa', cat: 'esai', level: 'Provinsi', who: ['salsa'], result: 'Harapan 1', status: 'verified', d: -66, month: -2 }
  ],
  notifs: [
    { icon: 'clock', text: 'Lomba Esai Nasional Energi Bersih untuk Desa tutup 3 hari lagi.', href: '#lomba-detail/esai-energi', time: '08.00', read: false },
    { icon: 'user-plus', text: 'Nadia Azzahra mengajakmu ke tim Debat Bahasa Inggris Antar-SMA.', href: '#beranda', time: 'Kemarin', read: false },
    { icon: 'message-circle', text: 'Salsabila Putri membalas pertanyaanmu.', href: '#beranda', time: 'Kemarin', read: false },
    { icon: 'sparkles', text: 'Hackathon Pelajar Kota Pintar cocok dengan minatmu.', href: '#lomba-detail/hackathon', time: '20 Nov', read: true },
    { icon: 'medal', text: 'Prestasimu di Lomba Esai Kabupaten tampil di Wall of Fame.', href: '#wall/-1', time: '15 Nov', read: true }
  ]
};
