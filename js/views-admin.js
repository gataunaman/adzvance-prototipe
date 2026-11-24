/* ADZVANCE prototype: admin (OSIS) and developer screens. */
(function () {
  var A = window.A, V = A.V, esc = A.esc, ic = A.ic;

  function head(title, sub, actions) { return '<div class="page__head"><div><h1>' + title + '</h1>' + (sub ? '<p>' + sub + '</p>' : '') + '</div>' + (actions ? '<div class="head__actions">' + actions + '</div>' : '') + '</div>'; }
  function more(items) { return '<details class="more"><summary class="icon-btn" aria-label="Aksi lainnya">' + ic('ellipsis') + '</summary><div class="more__menu">' + items.join('') + '</div></details>'; }
  function mi(act, id, icon, label, danger, val) { return '<button type="button" data-act="' + act + '" data-id="' + id + '"' + (val ? ' data-val="' + esc(val) + '"' : '') + (danger ? ' class="is-danger"' : '') + '>' + ic(icon) + label + '</button>'; }
  function filterBadge(l) { return l.filter === 'unclear' ? '<span class="badge badge--warn">Jenjang tidak jelas</span>' : '<span class="badge badge--ok">Lolos, ' + esc(l.jenjangNote || 'SMA, SMK') + '</span>'; }
  function sourceLabel(l) { return l.source === 'Usulan siswa' ? 'Usulan ' + esc(A.short(A.stu(l.suggestedBy) || { name: 'siswa' })) : esc(l.source); }
  A.more = more; A.mi = mi;

  /* ---------- ringkasan ---------- */
  V.admin = function () {
    var pub = A.S.lomba.filter(function (l) { return l.status === 'published'; }).length;
    var queue = A.S.lomba.filter(function (l) { return l.status === 'queue'; });
    var reports = A.S.reports.filter(function (r) { return r.status === 'open'; }).length;
    var pendingFame = A.S.fame.filter(function (f) { return f.status === 'pending'; }).length;
    var catCount = { sains: 43, esai: 31, debat: 18, tek: 27, seni: 12 }, max = 43;
    return '<div class="page page--ws">' + head('Ringkasan', 'Data contoh untuk prototipe.', '<button class="btn btn--secondary" type="button" data-act="open-sheet-gs">' + ic('sheet') + 'Buka Google Sheet</button><a class="btn btn--primary" href="#admin-lomba-form" data-act="new-lomba">' + ic('plus') + 'Tambah lomba</a>') +
      '<div class="figures">' +
      '<div><span class="fig__icon tone-sains">' + ic('users') + '</span><span class="figure">412</span><span class="label">Siswa di daftar sekolah</span></div>' +
      '<a href="#admin-lomba"><span class="fig__icon tone-debat">' + ic('award') + '</span><span class="figure">' + pub + '</span><span class="label">Lomba aktif</span></a>' +
      '<a href="#admin-lomba" data-act="admin-tab" data-val="queue"' + (queue.length ? ' class="is-alert"' : '') + '><span class="fig__icon tone-esai">' + ic('inbox') + '</span><span class="figure">' + queue.length + '</span><span class="label">Menunggu tinjauan</span></a>' +
      '<a href="#admin-forum"' + (reports ? ' class="is-alert"' : '') + '><span class="fig__icon tone-peach">' + ic('flag') + '</span><span class="figure">' + reports + '</span><span class="label">Laporan forum dan chat</span></a></div>' +
      '<div class="admin-grid"><div class="well chart"><div class="section-title"><h2>Peserta per kategori</h2><span class="label">Semester ini</span></div><div class="bars">' +
      Object.keys(catCount).map(function (k) { return '<div class="bar-row"><span>' + A.cat(k).name + '</span><span class="bar-track"><span class="bar-fill fill--' + k + '" style="width:' + Math.round(catCount[k] / max * 100) + '%"></span></span><span class="mono">' + catCount[k] + '</span></div>'; }).join('') + '</div></div>' +
      '<div class="well"><div class="section-title"><h2>Aktivitas terbaru</h2><a class="link small" href="#admin-fame">' + (pendingFame ? pendingFame + ' prestasi menunggu' : '') + '</a></div><ul class="activity">' +
      A.S.audit.slice(0, 4).map(function (a) { return '<li><span class="note__icon tone-sains">' + ic('activity') + '</span><div><strong>' + esc(a.who) + '</strong> ' + esc(a.act.toLowerCase()) + ': ' + esc(a.target) + '<div class="small muted">' + esc(a.t) + '</div></div></li>'; }).join('') + '</ul></div></div>' +
      '<div class="section-title" style="margin-top: var(--space-xl)"><h2>Antrean lomba</h2><a class="link small" href="#admin-lomba" data-act="admin-tab" data-val="queue">Semua</a></div>' + queueTable(queue) + '</div>';
  };
  function queueTable(queue) {
    if (!queue.length) return A.empty('inbox', 'Antrean kosong. Semua lomba sudah ditinjau.');
    return '<div class="sheet sheet--ws"><div class="sheet__head"><span>Lomba</span><span>Saringan jenjang</span><span>Sumber</span><span></span></div>' + queue.map(function (l) {
      return '<div class="row"><div><div class="row__title">' + esc(l.title) + '</div><div class="row__sub">' + esc(l.org) + ', tutup ' + A.dateAt(l.dl, false) + '</div></div><div>' + filterBadge(l) + '</div><div class="row__meta">' + sourceLabel(l) + '</div>' +
        '<div class="row__actions"><button class="btn btn--primary" type="button" data-act="publish" data-id="' + l.id + '">Terbitkan</button>' + more([mi('edit-lomba', l.id, 'pencil', 'Ubah'), mi('reject', l.id, 'x', 'Tolak', true)]) + '</div></div>';
    }).join('') + '</div>';
  }

  /* ---------- lomba ---------- */
  V['admin-lomba'] = function () {
    var tab = A.ui.adminTab || 'published';
    var tabs = [['published', 'Terbit'], ['queue', 'Antrean'], ['rejected', 'Ditolak']];
    var list = A.S.lomba.filter(function (l) { return l.status === tab; }).sort(function (a, b) { return a.dl - b.dl; });
    var table = tab === 'queue' ? queueTable(list) : !list.length ? A.empty('award', 'Belum ada lomba di sini.') :
      '<div class="sheet sheet--ws"><div class="sheet__head"><span>Lomba</span><span>Kategori</span><span>Deadline</span><span></span></div>' + list.map(function (l) {
        return '<div class="row"><div><div class="row__title">' + esc(l.title) + '</div><div class="row__sub">' + esc(l.org) + ', ' + sourceLabel(l) + '</div></div><div><span class="tag tag--' + l.cat + '">' + A.cat(l.cat).name + '</span></div><div class="row__meta mono">' + A.dateAt(l.dl, false) + ' (' + l.dl + ' hari)</div>' +
          '<div class="row__actions"><button class="btn btn--secondary" type="button" data-act="edit-lomba" data-id="' + l.id + '">' + ic('pencil') + 'Ubah</button>' + more(tab === 'published' ? [mi('unpublish', l.id, 'eye-off', 'Turunkan'), mi('del-lomba', l.id, 'trash-2', 'Hapus', true)] : [mi('publish', l.id, 'upload', 'Terbitkan'), mi('del-lomba', l.id, 'trash-2', 'Hapus', true)]) + '</div></div>';
      }).join('') + '</div>';
    return '<div class="page page--ws">' + head('Lomba', 'Lomba dari pencarian Google, usulan siswa, dan tambahan admin.', '<a class="btn btn--primary" href="#admin-lomba-form" data-act="new-lomba">' + ic('plus') + 'Tambah lomba</a>') +
      '<div class="tabs-bar">' + tabs.map(function (t) { var n = A.S.lomba.filter(function (l) { return l.status === t[0]; }).length; return '<button type="button" class="tab" aria-pressed="' + (tab === t[0]) + '" data-act="admin-tab" data-val="' + t[0] + '">' + t[1] + ' <span class="tab__n">' + n + '</span></button>'; }).join('') + '</div>' + table + '</div>';
  };

  V['admin-lomba-form'] = function () {
    var l = A.lomba(A.ui.editLomba) || { id: '', title: '', org: '', cat: 'sains', form: 'Online', level: 'Nasional', fee: 0, dl: 14, rounds: [], link: '' };
    var rounds = (l.rounds && l.rounds.length ? l.rounds : [{ name: 'Pendaftaran ditutup', d: l.dl }]);
    function sel(name, opts, cur) { return '<select class="input" name="' + name + '">' + opts.map(function (o) { var arr = Array.isArray(o), v = arr ? o[0] : o, t = arr ? o[1] : o; return '<option value="' + v + '"' + (v == cur ? ' selected' : '') + '>' + t + '</option>'; }).join('') + '</select>'; }
    function roundRow(r) { return '<div class="round-row"><input class="input" name="rname" value="' + esc(r.name) + '" placeholder="Nama babak, mis. Semifinal" aria-label="Nama babak"><input class="input" name="rday" type="number" value="' + r.d + '" aria-label="Hari dari sekarang"><span class="small muted">hari lagi</span><button class="icon-btn" type="button" data-act="round-del" aria-label="Hapus babak">' + ic('trash-2') + '</button></div>'; }
    A.roundRow = roundRow;
    return '<div class="page page--ws"><p class="crumb"><a class="link small" href="#admin-lomba">' + ic('arrow-left') + 'Kembali ke daftar lomba</a></p>' + head(l.id ? 'Ubah lomba' : 'Tambah lomba', l.id ? esc(l.title) : 'Untuk lomba yang tidak ditemukan pencarian otomatis, misalnya Puspresnas.') +
      '<form class="ws-form" data-form="lomba" data-id="' + l.id + '"><div class="edit-card"><h2>Informasi</h2>' +
      '<div class="field"><label>Judul lomba</label><input class="input" name="title" required value="' + esc(l.title) + '"></div>' +
      '<div class="field"><label>Penyelenggara</label><input class="input" name="org" required value="' + esc(l.org) + '"></div>' +
      '<div class="grid-3"><div class="field"><label>Kategori</label>' + sel('cat', Object.keys(A.S.cats).map(function (k) { return [k, A.S.cats[k].name]; }), l.cat) + '</div>' +
      '<div class="field"><label>Bentuk</label>' + sel('form', ['Online', 'Offline', 'Hybrid'], l.form) + '</div>' +
      '<div class="field"><label>Tingkat</label>' + sel('level', ['Sekolah', 'Kabupaten', 'Kota', 'Provinsi', 'Nasional', 'Internasional'], l.level) + '</div></div>' +
      '<div class="grid-3"><div class="field"><label>Biaya (Rp, 0 = gratis)</label><input class="input" name="fee" type="number" min="0" value="' + (l.fee || 0) + '"></div>' +
      '<div class="field"><label>Deadline daftar (hari lagi)</label><input class="input" name="dl" type="number" min="0" value="' + l.dl + '"></div>' +
      '<div class="field"><label>Tautan pendaftaran</label><input class="input" name="link" type="url" placeholder="https://" value="' + esc(l.link || '') + '"></div></div>' +
      '<div class="field"><label>Poster</label><label class="dropzone">' + ic('image-plus') + '<span>Pilih gambar poster (JPG/PNG)</span><input type="file" accept="image/*" data-act="poster" hidden></label></div></div>' +
      '<div class="edit-card"><div class="pblock__head"><h2>Jadwal dan babak</h2><button class="btn btn--quiet" type="button" data-act="round-add">' + ic('plus') + 'Tambah babak</button></div><p class="small muted">Siswa dapat pengingat untuk tiap babak.</p><div class="rounds">' + rounds.map(roundRow).join('') + '</div></div>' +
      '<div class="ws-form__foot">' + (l.id ? '<button class="btn btn--quiet is-danger" type="button" data-act="del-lomba" data-id="' + l.id + '">' + ic('trash-2') + 'Hapus lomba</button>' : '<span></span>') + '<div class="head__actions"><a class="btn btn--secondary" href="#admin-lomba">Batal</a><button class="btn btn--primary" type="submit">' + (l.id ? 'Simpan perubahan' : 'Terbitkan lomba') + '</button></div></div></form></div>';
  };

  /* ---------- pengumuman ---------- */
  V['admin-pengumuman'] = function () {
    var list = A.S.announcements.slice().sort(function (a, b) { return (b.pinned - a.pinned) || (b.d - a.d); });
    return '<div class="page page--ws">' + head('Pengumuman', 'Tampil di beranda semua siswa dan dikirim sebagai notifikasi.') +
      '<div class="ws-two"><form class="edit-card" data-form="announce"><h2>Tulis pengumuman</h2><div class="field"><label for="an-title">Judul</label><input class="input" id="an-title" name="title" required maxlength="80"></div>' +
      '<div class="field"><label for="an-body">Isi</label><textarea class="input" id="an-body" name="body" required maxlength="400"></textarea></div>' +
      '<div class="field"><label for="an-link">Tautan (opsional)</label><input class="input" id="an-link" name="link" placeholder="https://"></div>' +
      '<label class="check"><input type="checkbox" name="pinned"> Sematkan di atas</label><button class="btn btn--primary" type="submit" style="margin-top: var(--space-md)">' + ic('send') + 'Kirim ke semua siswa</button></form>' +
      '<div class="ann-list ann-list--admin">' + (list.length ? list.map(function (a) {
        return '<div class="ann-admin">' + A.annItem(a) + '<div class="ann-admin__actions"><button class="btn btn--quiet" type="button" data-act="ann-pin" data-id="' + a.id + '">' + ic(a.pinned ? 'pin-off' : 'pin') + (a.pinned ? 'Lepas sematan' : 'Sematkan') + '</button><button class="btn btn--quiet" type="button" data-act="ann-edit" data-id="' + a.id + '">' + ic('pencil') + 'Ubah</button><button class="btn btn--quiet is-danger" type="button" data-act="ann-del" data-id="' + a.id + '">' + ic('trash-2') + 'Hapus</button></div></div>';
      }).join('') : A.empty('megaphone', 'Belum ada pengumuman.')) + '</div></div></div>';
  };

  /* ---------- forum moderation ---------- */
  V['admin-forum'] = function () {
    var open = A.S.reports.filter(function (r) { return r.status === 'open'; });
    return '<div class="page page--ws">' + head('Forum', 'Laporan dari siswa dan pengaturan topik.') +
      '<div class="section-title"><h2>Laporan</h2><span class="label">' + open.length + ' terbuka</span></div>' +
      (open.length ? '<div class="report-list">' + open.map(function (r) {
        var by = A.stu(r.by);
        return '<div class="report"><span class="note__icon tone-peach">' + ic(r.kind === 'chat' ? 'messages-square' : 'message-circle') + '</span><div><div class="small muted">' + (r.kind === 'chat' ? 'Chat' : 'Forum') + ', ' + esc(r.where) + '</div><p class="report__text">"' + esc(r.text) + '"</p><div class="small muted">Dilaporkan oleh ' + esc(by ? by.name : 'siswa') + '</div></div>' +
          '<div class="row__actions"><button class="btn btn--secondary" type="button" data-act="report-remove" data-id="' + r.id + '">' + ic('trash-2') + 'Hapus konten</button><button class="btn btn--quiet" type="button" data-act="report-dismiss" data-id="' + r.id + '">Abaikan</button></div></div>';
      }).join('') + '</div>' : A.empty('shield-check', 'Tidak ada laporan terbuka.')) +
      '<div class="section-title" style="margin-top: var(--space-xl)"><h2>Topik</h2></div><div class="sheet sheet--ws"><div class="sheet__head"><span>Pertanyaan</span><span>Mapel</span><span>Balasan</span><span></span></div>' +
      A.S.threads.map(function (t) {
        return '<div class="row"><div><div class="row__title">' + (t.pinned ? ic('pin', 'pin-ic') : '') + esc(t.title) + '</div><div class="row__sub">' + esc(A.stu(t.author).name) + '</div></div><div><span class="subj subj--' + t.subj + '">' + A.S.subjects[t.subj] + '</span></div><div class="row__meta mono">' + t.replies.length + '</div>' +
          '<div class="row__actions"><button class="btn btn--secondary" type="button" data-act="thread-pin" data-id="' + t.id + '">' + ic(t.pinned ? 'pin-off' : 'pin') + (t.pinned ? 'Lepas' : 'Sematkan') + '</button>' + more([mi('thread-edit', t.id, 'pencil', 'Ubah judul'), mi('thread-del', t.id, 'trash-2', 'Hapus topik', true)]) + '</div></div>';
      }).join('') + '</div></div>';
  };

  /* ---------- wall of fame ---------- */
  V['admin-fame'] = function () {
    var pend = A.S.fame.filter(function (f) { return f.status === 'pending'; }), ok = A.S.fame.filter(function (f) { return f.status === 'approved'; });
    function row(f, pending) {
      return '<div class="row"><div><div class="row__title">' + esc(f.rank + ' ' + f.title) + '</div><div class="row__sub">' + f.who.map(function (id) { var s = A.stu(id); return esc(s.name + ', ' + s.kelas); }).join('; ') + '</div></div><div class="row__meta"><span class="link">' + ic('paperclip') + esc(f.proof) + '</span></div><div><span class="badge ' + (pending ? 'badge--warn">Menunggu' : 'badge--ok">Terbit') + '</span></div>' +
        '<div class="row__actions">' + (pending ? '<button class="btn btn--primary" type="button" data-act="fame-approve" data-id="' + f.id + '">Setujui</button><button class="btn btn--quiet" type="button" data-act="fame-reject" data-id="' + f.id + '">Tolak</button>' : '<button class="btn btn--quiet" type="button" data-act="fame-down" data-id="' + f.id + '">Turunkan</button>') + '</div></div>';
    }
    return '<div class="page page--ws">' + head('Wall of Fame', 'Prestasi tampil setelah disetujui. Prestasi yang disetujui mendapat tanda "Terverifikasi OSIS" di profil siswa.') +
      '<div class="section-title"><h2>Menunggu persetujuan</h2><span class="label">' + pend.length + '</span></div>' + (pend.length ? '<div class="sheet sheet--ws">' + pend.map(function (f) { return row(f, true); }).join('') + '</div>' : A.empty('circle-check', 'Tidak ada pengajuan baru.')) +
      '<div class="section-title" style="margin-top: var(--space-xl)"><h2>Sudah terbit</h2><span class="label">' + ok.length + '</span></div><div class="sheet sheet--ws">' + ok.map(function (f) { return row(f, false); }).join('') + '</div></div>';
  };

  /* ---------- pengguna ---------- */
  V['admin-pengguna'] = function () {
    var q = (A.ui.userQ || '').toLowerCase();
    var list = A.S.students.filter(function (s) { return !q || (s.name + ' ' + s.kelas + ' ' + s.nisn).toLowerCase().indexOf(q) !== -1; });
    return '<div class="page page--ws">' + head('Pengguna', 'Akun berasal dari daftar NISN sekolah. Masuk dengan NISN dan 4 digit terakhirnya.') +
      '<form class="search search--side search--wide" role="search" data-form="noop">' + ic('search') + '<label class="visually-hidden" for="cari-user">Cari siswa</label><input class="input" id="cari-user" type="search" placeholder="Cari nama, kelas, atau NISN" value="' + esc(A.ui.userQ || '') + '" data-act="user-search"></form>' +
      '<div class="sheet sheet--ws sheet--users"><div class="sheet__head"><span>Siswa</span><span>Kelas</span><span>Organisasi</span><span>Status</span><span></span></div>' +
      list.map(function (s) {
        var items = [mi('set-badges', s.id, 'tags', 'Atur jabatan'), mi('view-user', s.id, 'user', 'Lihat profil')];
        if (A.S.dev) items.push(s.admin ? mi('revoke-admin', s.id, 'shield-off', 'Cabut admin', true) : mi('grant-admin', s.id, 'shield-check', 'Jadikan admin'));
        items.push(s.active ? mi('deactivate', s.id, 'user-x', 'Nonaktifkan', true) : mi('activate', s.id, 'user-check', 'Aktifkan lagi'));
        return '<div class="row' + (s.active ? '' : ' is-off') + '"><div class="user-cell"><span class="avatar av--' + s.av + '">' + s.ini + '</span><div><div class="row__title">' + esc(s.name) + (s.admin ? ' <span class="tag tag--hot">' + ic('shield-check') + 'Admin</span>' : '') + '</div><div class="row__sub mono">' + s.nisn + '</div></div></div><div class="row__meta">' + esc(s.kelas) + '</div>' +
          '<div class="orgs orgs--tight">' + (s.orgs.length ? s.orgs.map(function (o) { return A.org(o, true); }).join('') : '<span class="small muted">-</span>') + '</div><div><span class="badge ' + (s.active ? 'badge--ok">Aktif' : 'badge--bad">Nonaktif') + '</span></div><div class="row__actions">' + more(items) + '</div></div>';
      }).join('') + '</div><p class="small muted" style="margin-top: var(--space-sm)">Menampilkan ' + list.length + ' siswa contoh dari 412.</p></div>';
  };

  /* ---------- tag & organisasi ---------- */
  V['admin-tag'] = function () {
    function group(title, kind, items, render) { return '<div class="edit-card"><div class="pblock__head"><h2>' + title + '</h2><span class="label">' + items.length + '</span></div><div class="tags tags--edit">' + items.map(render).join('') + '</div></div>'; }
    return '<div class="page page--ws">' + head('Organisasi dan tag', 'Daftar pilihan untuk profil siswa.') + '<div class="ws-two"><div class="stack">' +
      group('Organisasi', 'org', Object.keys(A.S.orgs), function (k) { var o = A.S.orgs[k]; return '<span class="org' + (k === 'osis' ? ' org--osis' : '') + '">' + ic(o.icon) + esc(o.name) + (k === 'osis' ? '' : '<button type="button" class="chip-x" data-act="tag-del" data-group="org" data-val="' + k + '" aria-label="Hapus ' + esc(o.name) + '">' + ic('x') + '</button>') + '</span>'; }) +
      group('Minat', 'interests', A.S.interests, function (t) { return '<span class="tag">' + esc(t) + '<button type="button" class="chip-x" data-act="tag-del" data-group="interests" data-val="' + esc(t) + '" aria-label="Hapus ' + esc(t) + '">' + ic('x') + '</button></span>'; }) +
      group('Keahlian', 'skills', A.S.skills, function (t) { return '<span class="tag">' + esc(t) + '<button type="button" class="chip-x" data-act="tag-del" data-group="skills" data-val="' + esc(t) + '" aria-label="Hapus ' + esc(t) + '">' + ic('x') + '</button></span>'; }) +
      '<div class="edit-card"><h2>Jabatan</h2><div class="tags">' + A.S.roles.map(function (r) { return '<span class="tag">' + r + '</span>'; }).join('') + '</div></div></div>' +
      '<form class="edit-card" data-form="tag"><h2>Tambah</h2><div class="field"><label for="tag-name">Nama</label><input class="input" id="tag-name" name="name" required placeholder="Contoh: Klub Fotografi"></div><div class="field"><span class="label">Jenis</span><div class="seg"><label><input type="radio" name="kind" value="org" checked>Organisasi</label><label><input type="radio" name="kind" value="interests">Minat</label><label><input type="radio" name="kind" value="skills">Keahlian</label></div></div><button class="btn btn--primary" type="submit" style="margin-top: var(--space-md)">Tambah</button></form></div></div>';
  };

  /* ================= DEVELOPER ================= */
  V['dev-masuk'] = function () {
    return '<div class="auth auth--dev"><div class="auth__main"><form class="auth__form" data-form="dev-login"><p class="brand auth__brand">ADZVANCE <span class="brand__tag">Developer</span></p><h2>Masuk developer</h2>' +
      '<div class="field"><label for="dm-email">Email</label><input class="input" id="dm-email" type="email" autocomplete="username" value="dev@adzvance.com"></div><div class="field"><label for="dm-pass">Kata sandi</label><input class="input" id="dm-pass" type="password" autocomplete="current-password" value="demo-password"></div>' +
      '<button class="btn btn--primary btn--block" type="submit">Lanjut</button><div class="auth__foot"><a class="link" href="#masuk">Halaman siswa</a></div></form></div></div>';
  };
  V['dev-2fa'] = function () {
    return '<div class="auth auth--dev"><div class="auth__main"><form class="auth__form" data-form="dev-2fa"><p class="brand auth__brand">ADZVANCE <span class="brand__tag">Developer</span></p><h2>Kode authenticator</h2><p>Kode 6 angka dari aplikasi authenticator. Untuk demo, isi angka apa saja.</p>' +
      '<div class="field"><label for="d2-code">Kode</label><input class="input input--code" id="d2-code" inputmode="numeric" maxlength="6" autocomplete="one-time-code" value="123456"></div><button class="btn btn--primary btn--block" type="submit">Verifikasi</button><div class="auth__foot"><a class="link" href="#dev-masuk">Kembali</a></div></form></div></div>';
  };

  V.dev = function () {
    var sel = A.ui.devTeam || 'reported';
    var team = A.S.teams.find(function (t) { return t.id === sel; });
    var log = team ? team.messages.map(function (m) { var s = A.stu(m.from); return '<div class="msg">' + '<span class="avatar av--' + s.av + '">' + s.ini + '</span><div><span class="msg__who">' + esc(s.name) + '</span><span class="msg__time">' + m.time + '</span><p class="msg__body">' + esc(m.text) + '</p></div></div>'; }).join('')
      : '<div class="msg"><span class="avatar av--seni">NA</span><div><span class="msg__who">Nadia Azzahra</span><span class="msg__time">20.02</span><p class="msg__body">Latihan besok jam 3 di perpustakaan ya.</p></div></div><div class="msg"><span class="avatar av--sains">KS</span><div><span class="msg__who">Kevin S.</span><span class="msg__time">20.14</span><p class="msg__body">[pesan yang dilaporkan anggota tim]</p><span class="badge badge--bad">Dilaporkan oleh Nadia Azzahra</span></div></div>';
    return '<div class="page page--ws">' + head('Monitor chat', 'Hanya baca. Setiap chat yang dibuka tercatat di log audit.') + '<div class="chat chat--dev"><aside>' +
      '<form class="search search--side" role="search" data-form="noop">' + ic('search') + '<input class="input" type="search" placeholder="Cari di semua chat" aria-label="Cari di semua chat"></form>' +
      '<div class="section-title" style="margin-top: var(--space-md)"><h2 class="h-s">Dilaporkan</h2><span class="tag tag--hot">1</span></div><nav class="chat-list"><a href="#dev" data-act="dev-team" data-id="reported" aria-current="' + (sel === 'reported') + '"><span><strong>Tim Debat XII</strong><br><span class="small muted">1 pesan dilaporkan</span></span><span class="mono small">20.14</span></a></nav>' +
      '<div class="section-title" style="margin-top: var(--space-lg)"><h2 class="h-s">Semua tim</h2><span class="label">' + A.S.teams.length + '</span></div><nav class="chat-list">' + A.S.teams.map(function (t) { return '<a href="#dev" data-act="dev-team" data-id="' + t.id + '" aria-current="' + (sel === t.id) + '"><span><strong>' + esc(t.name) + '</strong><br><span class="small muted">' + t.members.length + ' anggota</span></span><span class="mono small">' + (t.messages.length ? t.messages[t.messages.length - 1].time : '') + '</span></a>'; }).join('') + '</nav></aside>' +
      '<div><div class="readonly-banner"><span>' + ic('eye') + ' Hanya baca. Tercatat di log audit.</span><span class="mono">' + A.dateAt(0) + '</span></div><div class="chat__log">' + log + '</div>' +
      (team ? '' : '<div class="head__actions" style="margin-top: var(--space-lg)"><button class="btn btn--secondary" type="button" data-act="report-dismiss" data-id="rp1">Tandai sudah ditinjau</button><button class="btn btn--quiet" type="button" data-act="forward-osis">Teruskan ke admin OSIS</button></div>') + '</div></div></div>';
  };

  V['dev-impor'] = function () {
    var st = A.S.settings;
    return '<div class="page page--ws">' + head('Pencari lomba', 'Mencari lomba lewat Google setiap hari, lalu menyaring jenjang SMA, SMK, dan Umum.', '<button class="btn btn--primary" type="button" data-act="run-crawler">' + ic('refresh-cw') + 'Jalankan sekarang</button>') +
      '<div class="ws-two"><div class="edit-card"><h2>Pengaturan</h2>' +
      '<div class="setting"><div><strong>Mode terbit</strong><p>Tinjau dulu atau langsung terbit kalau lolos saringan.</p></div><div class="seg"><label><input type="radio" name="mode" value="review" data-act="publish-mode"' + (st.publishMode === 'review' ? ' checked' : '') + '>Tinjau dulu</label><label><input type="radio" name="mode" value="auto" data-act="publish-mode"' + (st.publishMode === 'auto' ? ' checked' : '') + '>Otomatis</label></div></div>' +
      '<div class="setting"><div><strong>Saringan jenjang</strong><p>Simpan SMA, SMK, Umum. Buang Mahasiswa, SD, SMP. Tidak jelas masuk antrean.</p></div><span class="badge">Tetap</span></div>' +
      '<h3 style="margin-top: var(--space-lg)">Kata kunci pencarian</h3><div class="tags tags--edit" style="margin-top: var(--space-xs)">' + st.terms.map(function (t, i) { return '<span class="tag">' + esc(t) + '<button type="button" class="chip-x" data-act="term-del" data-id="' + i + '" aria-label="Hapus">' + ic('x') + '</button></span>'; }).join('') + '</div>' +
      '<form class="composer" data-form="term"><input class="input" name="term" placeholder="Tambah kata kunci, mis. lomba debat pelajar" aria-label="Kata kunci baru"><button class="btn btn--secondary" type="submit">Tambah</button></form></div>' +
      '<div><h2>Pencarian terakhir</h2><div class="figures figures--2" style="margin-top: var(--space-sm)"><div><span class="figure">31</span><span class="label">Hasil Google</span></div><div><span class="figure">12</span><span class="label">Lolos saringan</span></div><div><span class="figure">17</span><span class="label">Ditolak otomatis</span></div><div><span class="figure">2</span><span class="label">Jenjang tidak jelas</span></div></div>' +
      '<p class="small muted" style="margin-top: var(--space-sm)">Berjalan setiap hari pukul 05.00. Lomba yang sama dari beberapa situs digabung.</p></div></div></div>';
  };

  V['dev-akun'] = function () {
    var admins = A.S.students.filter(function (s) { return s.admin; }), st = A.S.settings;
    return '<div class="page page--ws">' + head('Admin dan sistem', 'Hak admin diberikan ke akun siswa. Bawaan: Ketua OSIS.', '<button class="btn btn--primary" type="button" data-act="grant-pick">' + ic('shield-plus') + 'Jadikan siswa admin</button>') +
      '<div class="sheet sheet--ws"><div class="sheet__head"><span>Admin</span><span>Kelas</span><span>Keterangan</span><span></span></div>' + admins.map(function (s) {
        return '<div class="row"><div class="user-cell"><span class="avatar av--' + s.av + '">' + s.ini + '</span><div><div class="row__title">' + esc(s.name) + '</div><div class="row__sub">' + (s.orgs[0] ? esc(s.orgs[0][1] + ' ' + A.S.orgs[s.orgs[0][0]].name) : '') + '</div></div></div><div class="row__meta">' + esc(s.kelas) + '</div><div>' + (s.ketua ? '<span class="badge badge--ok">Bawaan, Ketua OSIS</span>' : '<span class="badge">Ditambahkan developer</span>') + '</div>' +
          '<div class="row__actions">' + (s.ketua ? '<button class="btn btn--secondary" type="button" data-act="change-ketua">Ganti ketua</button>' : '<button class="btn btn--secondary is-danger" type="button" data-act="revoke-admin" data-id="' + s.id + '">' + ic('shield-off') + 'Cabut admin</button>') + '</div></div>';
      }).join('') + '</div>' +
      '<div class="ws-two" style="margin-top: var(--space-xl)"><div class="edit-card"><h2>Sistem</h2>' +
      [['maintenance', 'Mode pemeliharaan', 'Siswa melihat halaman pemeliharaan.'], ['chat', 'Chat tim', 'Matikan kalau sekolah tidak memakai chat.'], ['forum', 'Forum Soal', '']].map(function (x) { return '<div class="setting"><div><strong>' + x[1] + '</strong>' + (x[2] ? '<p>' + x[2] + '</p>' : '') + '</div><label class="switch"><input type="checkbox"' + (st[x[0]] ? ' checked' : '') + ' data-act="sys" data-val="' + x[0] + '" aria-label="' + x[1] + '"><span></span></label></div>'; }).join('') +
      '<div class="setting"><div><strong>Batas lampiran chat</strong></div><span class="mono">10 MB, dokumen</span></div><div class="setting"><div><strong>Batas foto profil</strong></div><span class="mono">2 MB</span></div></div>' +
      '<div class="edit-card"><h2>Daftar siswa</h2><p class="small muted">Diimpor dari file sekolah di server. Isi file tidak ditampilkan di sini.</p><div class="figures figures--2" style="margin-top: var(--space-sm)"><div><span class="figure">412</span><span class="label">Siswa terimpor</span></div><div><span class="figure">3</span><span class="label">Baris dilewati</span></div></div><p class="small muted" style="margin-top: var(--space-sm)">Impor terakhir: 20 Nov 2026, 10.12</p></div></div></div>';
  };

  V['dev-audit'] = function () {
    return '<div class="page page--ws">' + head('Log audit', 'Semua tindakan admin dan developer.', '<button class="btn btn--secondary" type="button" data-act="toast" data-val="CSV diunduh (demo)">' + ic('download') + 'Unduh CSV</button>') +
      '<div class="sheet sheet--audit sheet--ws"><div class="sheet__head"><span>Waktu</span><span>Pelaku</span><span>Tindakan</span><span>Sasaran</span></div>' + A.S.audit.map(function (a) { return '<div class="row"><span class="mono small">' + esc(a.t) + '</span><span>' + esc(a.who) + '</span><span>' + esc(a.act) + '</span><span>' + esc(a.target) + '</span></div>'; }).join('') + '</div></div>';
  };
})();
