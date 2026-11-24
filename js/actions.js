/* ADZVANCE prototype: interactions. Buttons carry data-act, forms carry data-form. */
(function () {
  var A = window.A, S = function () { return A.S; }, ACT = A.ACT, FORM = A.FORM, esc = A.esc, ic = A.ic;
  function me() { return A.me(); }
  function byId(list, id) { return list.find(function (x) { return x.id === id; }); }
  function pair(id) { return id.split(':'); }
  function thread(id) { return byId(S().threads, id); }
  function opt(list, cur) { return list.map(function (o) { var v = Array.isArray(o) ? o[0] : o, t = Array.isArray(o) ? o[1] : o; return '<option value="' + esc(v) + '"' + (v === cur ? ' selected' : '') + '>' + esc(t) + '</option>'; }).join(''); }
  function readFile(input, cb) { var f = input.files && input.files[0]; if (!f) return; if (f.size > 2 * 1024 * 1024) { A.toast('Maksimal 2 MB'); return; } var r = new FileReader(); r.onload = function () { cb(r.result); }; r.readAsDataURL(f); }

  /* ---------- session ---------- */
  ACT.logout = function () { S().me = null; S().dev = false; A.go('#masuk'); A.toast('Kamu sudah keluar'); return false; };
  ACT.demo = function (el) {
    var v = el.dataset.val;
    if (v === 'siswa') { S().me = 'rizky'; S().dev = false; A.go('#beranda'); }
    else if (v === 'admin') { S().me = S().students.find(function (s) { return s.ketua; }).id; S().dev = false; A.go('#admin'); }
    else if (v === 'dev') { S().me = null; S().dev = true; A.go('#dev'); }
    else { S().me = null; S().dev = false; A.go('#masuk'); }
    return false;
  };
  ACT.reset = function () { A.reset(); return false; };
  ACT['side-toggle'] = function (el) { el.closest('.side').classList.toggle('is-open'); return false; };
  ACT.menu = function (el) { var m = document.getElementById('me-menu'); var open = m.hidden; m.hidden = !open; el.setAttribute('aria-expanded', String(open)); return false; };
  ACT['fill-login'] = function (el) { var s = A.stu(el.dataset.id); var f = document.querySelector('[data-form="login"]'); f.elements['nisn'].value = s.nisn; f.elements['pass'].value = s.nisn.slice(-4); meter(f.elements['nisn']); return false; };
  FORM.login = function (f) {
    var nisn = f.elements['nisn'].value.trim(), pass = f.elements['pass'].value.trim(), st = document.getElementById('login-status');
    var s = S().students.find(function (x) { return x.nisn === nisn; });
    st.className = 'status status--bad';
    if (!/^\d{10}$/.test(nisn)) { st.textContent = 'NISN harus 10 angka.'; f.elements['nisn'].setAttribute('aria-invalid', 'true'); f.elements['nisn'].focus(); return; }
    if (!s) { st.textContent = 'NISN tidak ada di daftar siswa Adzkia. Hubungi OSIS.'; f.elements['nisn'].setAttribute('aria-invalid', 'true'); return; }
    if (!s.active) { st.textContent = 'Akun ini dinonaktifkan. Hubungi OSIS.'; return; }
    if (pass !== nisn.slice(-4)) { st.textContent = 'Kata sandi salah. Gunakan 4 angka terakhir NISN.'; f.elements['pass'].setAttribute('aria-invalid', 'true'); f.elements['pass'].focus(); return; }
    S().me = s.id; S().dev = false; A.go('#beranda'); A.toast('Selamat datang, ' + s.name.split(' ')[0]);
  };
  function meter(input) {
    var v = input.value.replace(/\D/g, '').slice(0, 10); input.value = v; input.removeAttribute('aria-invalid');
    var m = input.parentNode.querySelector('.otp__boxes'); if (!m) return;
    m.querySelectorAll('i').forEach(function (t, i) { t.textContent = v[i] || ''; t.classList.toggle('on', i < v.length); t.classList.toggle('cur', i === Math.min(v.length, 9)); });
    m.classList.toggle('is-full', v.length === 10);
  }
  FORM['dev-login'] = function () { A.go('#dev-2fa'); };
  FORM['dev-2fa'] = function () { S().me = null; S().dev = true; A.audit('Masuk ke konsol', 'Developer'); A.go('#dev'); A.toast('Masuk sebagai developer'); };

  /* ---------- generic ---------- */
  ACT['close-sheet'] = function () { A.closeSheet(); return false; };
  ACT.back = function () { history.back(); return false; };
  ACT.toast = function (el) { A.toast(el.dataset.val); return false; };
  ACT['view-user'] = function (el) { A.ui.viewUser = el.dataset.id; if (el.tagName !== 'A') A.go(el.dataset.id === S().me ? '#profil' : '#orang'); };
  ACT['view-lomba'] = function (el) { A.ui.viewLomba = el.dataset.id; };
  ACT['view-thread'] = function (el) { A.ui.viewThread = el.dataset.id; };
  ACT['view-team'] = function (el) { A.ui.viewTeam = el.dataset.id; if (el.tagName !== 'A') A.rerender(); };

  /* ---------- lomba ---------- */
  ACT.save = function (el) {
    var id = el.dataset.id, b = S().bookmarks[S().me] = S().bookmarks[S().me] || [], i = b.indexOf(id);
    if (i === -1) { b.push(id); A.toast('Disimpan. Kamu dapat pengingat deadline.'); } else { b.splice(i, 1); A.toast('Dihapus dari simpanan'); }
  };
  ACT.filter = function (el) { var g = el.dataset.group, v = el.dataset.val; A.ui.filters[g] = (v === 'undefined' || A.ui.filters[g] === v) ? undefined : v; };
  ACT['filter-cat'] = function (el) { A.ui.filters = { cat: el.dataset.id }; A.ui.q = ''; A.ui.lombaTab = 'all'; };
  ACT['filter-saved'] = function () { A.ui.filters = {}; A.ui.q = ''; A.ui.lombaTab = 'saved'; };
  ACT['lomba-tab'] = function (el) { A.ui.lombaTab = el.dataset.val; };
  ACT.sort = function (el) { A.ui.sort = el.value; };
  ACT['filters-clear'] = function () { A.ui.filters = {}; A.ui.q = ''; };
  ACT['filters-open'] = function () { A.ui.filterOpen = true; };
  ACT['filters-close'] = function () { A.ui.filterOpen = false; };
  ACT['open-site'] = function () { A.toast('Membuka situs penyelenggara (demo)'); return false; };
  ACT.join = function (el) {
    var l = A.lomba(el.dataset.id), teams = S().teams.filter(function (t) { return t.members.indexOf(S().me) !== -1; });
    A.sheet('Saya ikut', '<p class="muted">' + esc(l.title) + '</p><div class="field"><span class="label">Ikut sebagai</span><div class="seg"><label><input type="radio" name="as" value="solo" checked>Sendiri</label><label><input type="radio" name="as" value="team">Dengan tim</label></div></div>' +
      (teams.length ? '<div class="field"><label for="j-team">Tim</label><select class="input" id="j-team" name="team">' + opt(teams.map(function (t) { return [t.id, t.name]; })) + '</select></div>' : '') +
      '<div class="field"><span class="label">Bukti pendaftaran (opsional)</span><label class="dropzone">' + ic('upload') + '<span data-fill="fname">Pilih file (JPG, PNG, PDF)</span><input type="file" name="proof" accept="image/*,.pdf" data-act="file-name" hidden></label></div><p class="small muted">OSIS memeriksa bukti ini sebelum namamu masuk rekap.</p>', 'join:' + l.id, 'Konfirmasi');
    return false;
  };
  FORM.join = function (f, id) { (S().joined[S().me] = S().joined[S().me] || {})[id] = { result: 'Terdaftar', proof: !!(f.elements['proof'] && f.elements['proof'].files.length) }; A.audit('Siswa ikut lomba', A.lomba(id).title); A.toast('Tercatat. Semoga sukses!'); return true; };
  ACT.unjoin = function (el) { delete (S().joined[S().me] || {})[el.dataset.id]; A.toast('Dibatalkan'); };
  ACT['file-name'] = function () {};
  ACT['fame-from'] = function (el) { var l = A.lomba(el.dataset.id), j = S().joined[S().me][l.id]; fameSheet(j.result, l.title); return false; };

  ACT['suggest-lomba'] = function () {
    A.sheet('Usulkan lomba', '<div class="field"><label for="sg-title">Nama lomba</label><input class="input" id="sg-title" name="title" required></div><div class="field"><label for="sg-org">Penyelenggara</label><input class="input" id="sg-org" name="org" required></div><div class="field"><label for="sg-link">Tautan info</label><input class="input" id="sg-link" name="link" placeholder="https://"></div><div class="field"><label for="sg-cat">Kategori</label><select class="input" id="sg-cat" name="cat">' + opt(Object.keys(S().cats).map(function (k) { return [k, S().cats[k].name]; })) + '</select></div><p class="small muted">Tampil setelah disetujui admin OSIS.</p>', 'suggest', 'Kirim usulan');
    return false;
  };
  FORM.suggest = function (f) {
    S().lomba.push({ id: A.uid('l'), title: f.elements['title'].value, org: f.elements['org'].value, cat: f.elements['cat'].value, form: 'Online', level: 'Nasional', fee: 0, dl: 21, status: 'queue', source: 'Usulan siswa', suggestedBy: S().me, jenjangNote: 'Perlu dicek', filter: 'unclear' });
    A.toast('Usulan terkirim ke admin OSIS'); return true;
  };

  /* ---------- partner and teams ---------- */
  ACT.apply = function (el) {
    var p = byId(S().posts, el.dataset.id); p.applicants.push(S().me);
    A.notify(p.author, { icon: 'user-plus', tone: 'tek', text: me().name + ' mengajukan diri ke timmu.', href: '#partner' });
    A.toast('Terkirim. Tunggu jawaban ' + A.stu(p.author).name.split(' ')[0]);
  };
  ACT.skill = function (el) { A.ui.skill = A.ui.skill === el.dataset.val ? null : el.dataset.val; };
  ACT.kelas = function (el) { A.ui.kelas = A.ui.kelas === el.dataset.val ? null : el.dataset.val; };
  ACT['new-post'] = function (el) {
    var lomba = A.published();
    A.sheet('Buat posting cari partner', '<div class="field"><label for="po-l">Lomba</label><select class="input" id="po-l" name="lomba">' + opt(lomba.map(function (l) { return [l.id, l.title]; }), el.dataset.id) + '</select></div>' +
      '<div class="field"><label for="po-t">Kamu butuh siapa?</label><textarea class="input" id="po-t" name="text" required maxlength="200" placeholder="Contoh: butuh satu desainer UI"></textarea></div>' +
      '<div class="field"><span class="label">Keahlian yang dicari</span><div class="checkgrid">' + S().skills.map(function (k) { return '<label class="check"><input type="checkbox" name="skill" value="' + esc(k) + '">' + esc(k) + '</label>'; }).join('') + '</div></div>' +
      '<div class="field"><label for="po-n">Ukuran tim</label><select class="input" id="po-n" name="total">' + opt(['2', '3', '4', '5'], '3') + '</select></div>', 'post', 'Terbitkan');
    return false;
  };
  FORM.post = function (f) {
    var skills = Array.prototype.slice.call(f.querySelectorAll('[name=skill]:checked')).map(function (c) { return c.value; });
    S().posts.unshift({ id: A.uid('p'), author: S().me, lomba: f.elements['lomba'].value, text: f.elements['text'].value, skills: skills, filled: 1, total: +f.elements['total'].value, applicants: [] });
    A.toast('Posting terbit di Cari Partner'); A.go('#partner'); return true;
  };
  ACT['invite-accept'] = function (el) {
    var inv = byId(S().invites, el.dataset.id), l = A.lomba(inv.lomba), from = A.stu(inv.from); inv.status = 'accepted';
    var t = S().teams.find(function (x) { return x.lomba === inv.lomba; });
    if (!t) { t = { id: A.uid('t'), name: 'Tim ' + l.title.split(' ').slice(0, 2).join(' '), lomba: inv.lomba, members: [inv.from], messages: [] }; S().teams.push(t); }
    if (t.members.indexOf(S().me) === -1) t.members.push(S().me);
    t.messages.push({ from: inv.from, text: 'Selamat datang di tim! Kapan bisa latihan?', time: A.now() });
    A.notify(inv.from, { icon: 'circle-check', tone: 'debat', text: me().name + ' menerima ajakan timmu.', href: '#tim' });
    A.ui.viewTeam = t.id; A.toast('Kamu bergabung dengan tim ' + from.name.split(' ')[0]);
  };
  ACT['invite-decline'] = function (el) { byId(S().invites, el.dataset.id).status = 'declined'; A.toast('Ajakan ditolak'); };
  FORM.chat = function (f, id) {
    var text = f.elements['text'].value.trim(); if (!text) return;
    byId(S().teams, id).messages.push({ from: S().me, text: text, time: A.now() }); A.rerender();
    var i = document.getElementById('pesan'); if (i) i.focus();
  };
  ACT.attach = function () { A.toast('Lampiran: dokumen sampai 10 MB (demo)'); return false; };
  ACT.wa = function (el) { A.toast('Membuka WhatsApp ' + A.stu(el.dataset.id).name.split(' ')[0] + ' (demo)'); return false; };
  ACT['report-msg'] = function (el) {
    var p = pair(el.dataset.id), t = byId(S().teams, p[0]), m = t.messages[+p[1]];
    S().reports.unshift({ id: A.uid('rp'), kind: 'chat', where: t.name, by: S().me, text: m.text, status: 'open' });
    A.toast('Dilaporkan ke admin dan developer'); return false;
  };

  /* ---------- forum ---------- */
  ACT.subj = function (el) { A.ui.subj = el.dataset.val; };
  ACT['new-thread'] = function () {
    A.sheet('Buat pertanyaan', '<div class="field"><label for="th-t">Judul</label><input class="input" id="th-t" name="title" required maxlength="100" placeholder="Contoh: Cara cepat integral parsial?"></div><div class="field"><label for="th-s">Mapel</label><select class="input" id="th-s" name="subj">' + opt(Object.keys(S().subjects).filter(function (k) { return k !== 'osis'; }).map(function (k) { return [k, S().subjects[k]]; })) + '</select></div><div class="field"><label for="th-b">Pertanyaan</label><textarea class="input" id="th-b" name="body" required rows="5"></textarea></div>', 'thread', 'Kirim pertanyaan');
    return false;
  };
  FORM.thread = function (f) { var t = { id: A.uid('th'), title: f.elements['title'].value, subj: f.elements['subj'].value, author: S().me, ago: 'baru saja', body: f.elements['body'].value, likes: [], replies: [] }; S().threads.splice(1, 0, t); A.ui.viewThread = t.id; A.go('#forum-thread'); A.toast('Pertanyaan terkirim'); return true; };
  ACT['like-thread'] = function (el) { var t = thread(el.dataset.id), i = t.likes.indexOf(S().me); if (i === -1) t.likes.push(S().me); else t.likes.splice(i, 1); };
  ACT['like-reply'] = function (el) { var p = pair(el.dataset.id), r = byId(thread(p[0]).replies, p[1]), i = r.likes.indexOf(S().me); if (i === -1) r.likes.push(S().me); else r.likes.splice(i, 1); };
  ACT['mark-best'] = function (el) {
    var p = pair(el.dataset.id), t = thread(p[0]); t.replies.forEach(function (r) { r.best = r.id === p[1]; });
    var r = byId(t.replies, p[1]); A.notify(r.author, { icon: 'circle-check', tone: 'debat', text: 'Jawabanmu ditandai terbaik di "' + t.title + '".', href: '#forum-thread' }); A.toast('Ditandai sebagai jawaban terbaik');
  };
  ACT['reply-to'] = function (el) { var p = pair(el.dataset.id), r = byId(thread(p[0]).replies, p[1]); A.sheet('Balas ' + A.stu(r.author).name.split(' ')[0], '<blockquote class="quote">' + esc(r.body) + '</blockquote><div class="field"><label for="rp-b">Balasan</label><textarea class="input" id="rp-b" name="body" required rows="4"></textarea></div>', 'reply-sub:' + el.dataset.id, 'Kirim'); return false; };
  function addReply(tid, parent, body) {
    var t = thread(tid); t.replies.push({ id: A.uid('r'), author: S().me, body: body, likes: [], parent: parent });
    var to = parent ? byId(t.replies, parent).author : t.author;
    if (to !== S().me) A.notify(to, { icon: 'message-circle', tone: 'esai', text: me().name + ' membalas di "' + t.title + '".', href: '#forum-thread' });
  }
  FORM.reply = function (f, id) { var b = f.elements['body'].value.trim(); if (!b) return; addReply(id, null, b); A.rerender(); A.toast('Balasan terkirim'); };
  FORM['reply-sub'] = function (f, id) { var p = id.split(':'); addReply(p[0], p[1], f.elements['body'].value.trim()); A.toast('Balasan terkirim'); return true; };
  ACT['report-reply'] = function (el) {
    var p = pair(el.dataset.id), t = thread(p[0]), r = byId(t.replies, p[1]);
    S().reports.unshift({ id: A.uid('rp'), kind: 'forum', thread: t.id, reply: r.id, where: t.title, by: S().me, text: r.body, status: 'open' }); A.toast('Dilaporkan ke admin'); return false;
  };

  /* ---------- wall of fame ---------- */
  function fameSheet(rank, title) {
    A.sheet('Ajukan prestasi', '<div class="field"><label for="fm-t">Nama lomba</label><input class="input" id="fm-t" name="title" required value="' + esc(title || '') + '"></div><div class="field"><label for="fm-r">Hasil</label><select class="input" id="fm-r" name="rank">' + opt(['Juara 1', 'Juara 2', 'Juara 3', 'Harapan 1', 'Medali emas', 'Medali perak', 'Medali perunggu', 'Finalis'], rank) + '</select></div>' +
      '<div class="field"><span class="label">Bukti (sertifikat atau piagam)</span><label class="dropzone">' + ic('upload') + '<span data-fill="fname">Pilih file</span><input type="file" name="proof" accept="image/*,.pdf" data-act="file-name" hidden></label></div><p class="small muted">Tampil di Wall of Fame dan profilmu setelah disetujui admin OSIS.</p>', 'fame', 'Kirim');
  }
  ACT['new-fame'] = function () { fameSheet(); return false; };
  FORM.fame = function (f) {
    var r = f.elements['rank'].value, cls = /1|emas/.test(r) ? 'gold' : /2|perak/.test(r) ? 'silver' : /3|perunggu/.test(r) ? 'bronze' : 'final';
    var file = f.elements['proof'].files[0];
    S().fame.push({ id: A.uid('w'), rank: r, rcls: cls, title: f.elements['title'].value, who: [S().me], date: A.dateAt(0).split(' ').slice(1).join(' '), status: 'pending', proof: file ? file.name : 'bukti.pdf' });
    A.toast('Terkirim ke admin OSIS untuk disetujui'); return true;
  };

  /* ---------- notifications ---------- */
  ACT['read-all'] = function () { (S().notifs[S().me] || []).forEach(function (n) { n.read = true; }); A.toast('Semua ditandai dibaca'); };
  ACT['open-note'] = function (el) { var n = byId(S().notifs[S().me], el.dataset.id); n.read = true; if (n.lomba) A.ui.viewLomba = n.lomba; };
  ACT.pref = function () { A.toast('Pengaturan notifikasi disimpan'); return false; };

  /* ---------- profile ---------- */
  ACT['preview-self'] = function () { A.ui.viewUser = S().me; };
  ACT['done-edit'] = function () { A.toast('Profil disimpan'); };
  ACT.endorse = function (el) { var s = A.stu(el.dataset.id), list = s.skills[el.dataset.val], i = list.indexOf(S().me); if (i === -1) { list.push(S().me); A.notify(s.id, { icon: 'thumbs-up', tone: 'debat', text: me().name + ' mendukung keahlian ' + el.dataset.val + ' kamu.', href: '#profil' }); A.toast('Dukungan dikirim'); } else list.splice(i, 1); };
  ACT['public-link'] = function (el) { me().publicLink = el.checked; A.toast(el.checked ? 'Tautan publik aktif' : 'Tautan publik dimatikan'); };
  ACT.photo = function (el) { readFile(el, function (url) { me().photo = url; A.rerender(); A.toast('Foto diperbarui'); }); return false; };
  ACT['photo-remove'] = function () { delete me().photo; };
  ACT.banner = function (el) { me().banner = el.dataset.val; delete me().bannerImg; };
  ACT['banner-img'] = function (el) { readFile(el, function (url) { me().bannerImg = url; A.rerender(); }); return false; };
  ACT.pick = function (el) {
    var s = me(), v = el.dataset.val;
    if (el.dataset.group === 'interests') { var i = s.interests.indexOf(v); if (i === -1) { if (s.interests.length < 5) s.interests.push(v); } else s.interests.splice(i, 1); }
    else { if (s.skills[v]) delete s.skills[v]; else if (Object.keys(s.skills).length < 5) s.skills[v] = []; }
  };
  ACT['add-achv'] = function () { A.sheet('Tambah prestasi', '<div class="field"><label for="ac-t">Prestasi</label><input class="input" id="ac-t" name="title" required placeholder="Contoh: Juara 2 Lomba Esai Kabupaten"></div><div class="grid-2"><div class="field"><label for="ac-l">Tingkat</label><select class="input" id="ac-l" name="level">' + opt(['Sekolah', 'Kabupaten', 'Kota', 'Provinsi', 'Nasional', 'Internasional']) + '</select></div><div class="field"><label for="ac-y">Tahun</label><input class="input" id="ac-y" name="year" type="number" value="' + new Date().getFullYear() + '"></div></div><p class="small muted">Ajukan ke Wall of Fame untuk mendapat tanda Terverifikasi OSIS.</p>', 'achv', 'Tambah'); return false; };
  FORM.achv = function (f) { me().achievements.unshift({ id: A.uid('a'), title: f.elements['title'].value, level: f.elements['level'].value, year: +f.elements['year'].value, verified: false }); return true; };
  ACT['del-achv'] = function (el) { var s = me(); s.achievements = s.achievements.filter(function (a) { return a.id !== el.dataset.id; }); };
  ACT['add-karya'] = function () { A.sheet('Tambah karya unggulan', '<div class="field"><label for="ky-t">Judul</label><input class="input" id="ky-t" name="title" required></div><div class="field"><label for="ky-k">Jenis</label><select class="input" id="ky-k" name="kind">' + opt(['Proyek', 'Tulisan', 'Desain', 'Video', 'Sertifikat']) + '</select></div><div class="field"><label for="ky-u">Tautan atau file</label><input class="input" id="ky-u" name="url" placeholder="github.com/..., drive.google.com/..."></div>', 'karya', 'Tambah'); return false; };
  FORM.karya = function (f) { var icons = { Proyek: 'code', Tulisan: 'file-text', Desain: 'pen-tool', Video: 'video', Sertifikat: 'award' }; me().featured.unshift({ id: A.uid('f'), title: f.elements['title'].value, kind: f.elements['kind'].value, url: f.elements['url'].value || '-', icon: icons[f.elements['kind'].value] }); return true; };
  ACT['del-karya'] = function (el) { var s = me(); s.featured = s.featured.filter(function (x) { return x.id !== el.dataset.id; }); };
  function move(k, d) { var o = me().order, i = o.indexOf(k), j = i + d; if (j < 0 || j >= o.length) return; o.splice(i, 1); o.splice(j, 0, k); }
  ACT['sec-up'] = function (el) { move(el.dataset.val, -1); };
  ACT['sec-down'] = function (el) { move(el.dataset.val, 1); };
  ACT['sec-toggle'] = function (el) { var h = me().hidden, k = el.dataset.val, i = h.indexOf(k); if (el.checked && i !== -1) h.splice(i, 1); if (!el.checked && i === -1) h.push(k); };
  ACT['show-li'] = function (el) { me().showLinkedin = el.checked; return false; };

  /* ---------- admin: lomba ---------- */
  ACT['open-sheet-gs'] = function () { A.toast('Membuka Google Sheet rekap peserta (demo)'); return false; };
  ACT['admin-tab'] = function (el) { A.ui.adminTab = el.dataset.val; };
  ACT['new-lomba'] = function () { A.ui.editLomba = null; };
  ACT['edit-lomba'] = function (el) { A.ui.editLomba = el.dataset.id; A.go('#admin-lomba-form'); return false; };
  ACT.publish = function (el) { var l = A.lomba(el.dataset.id); l.status = 'published'; A.audit('Menerbitkan lomba', l.title); A.notify('all', { icon: 'sparkles', tone: 'sains', text: 'Lomba baru: ' + l.title + '.', href: '#lomba-detail', lomba: l.id }); A.toast('Diterbitkan'); };
  ACT.reject = function (el) { var l = A.lomba(el.dataset.id); l.status = 'rejected'; A.audit('Menolak lomba', l.title); A.toast('Ditolak'); };
  ACT.unpublish = function (el) { var l = A.lomba(el.dataset.id); l.status = 'queue'; A.audit('Menurunkan lomba', l.title); A.toast('Diturunkan ke antrean'); };
  ACT['del-lomba'] = function (el) { var l = A.lomba(el.dataset.id); if (!confirm('Hapus "' + l.title + '"?')) return false; S().lomba = S().lomba.filter(function (x) { return x !== l; }); A.audit('Menghapus lomba', l.title); A.toast('Lomba dihapus'); if (location.hash === '#admin-lomba-form') { A.go('#admin-lomba'); return false; } };
  ACT['round-add'] = function () { var box = document.querySelector('.rounds'); box.insertAdjacentHTML('beforeend', A.roundRow({ name: '', d: 14 })); lucide.createIcons(); box.lastElementChild.querySelector('input').focus(); return false; };
  ACT['round-del'] = function (el) { el.closest('.round-row').remove(); return false; };
  ACT.poster = function () { A.toast('Poster dipilih (demo)'); return false; };
  FORM.lomba = function (f, id) {
    var names = f.querySelectorAll('[name=rname]'), days = f.querySelectorAll('[name=rday]'), rounds = [];
    names.forEach(function (n, i) { if (n.value.trim()) rounds.push({ name: n.value.trim(), d: +days[i].value }); });
    var data = { title: f.elements['title'].value, org: f.elements['org'].value, cat: f.elements['cat'].value, form: f.elements['form'].value, level: f.elements['level'].value, fee: +f.elements['fee'].value, dl: +f.elements['dl'].value, link: f.elements['link'].value, rounds: rounds };
    var l = A.lomba(id);
    if (l) { Object.assign(l, data); A.audit('Mengubah lomba', l.title); A.toast('Perubahan disimpan'); }
    else { l = Object.assign({ id: A.uid('l'), status: 'published', source: 'Admin' }, data); S().lomba.push(l); A.audit('Menambah lomba', l.title); A.notify('all', { icon: 'sparkles', tone: 'sains', text: 'Lomba baru: ' + l.title + '.', href: '#lomba-detail', lomba: l.id }); A.toast('Lomba terbit'); }
    A.ui.adminTab = l.status; A.go('#admin-lomba');
  };

  /* ---------- admin: pengumuman ---------- */
  FORM.announce = function (f) {
    var a = { id: A.uid('an'), title: f.elements['title'].value, body: f.elements['body'].value, link: f.elements['link'].value, pinned: f.elements['pinned'].checked, author: S().me || 'aisyah', d: 0 };
    if (a.pinned) S().announcements.forEach(function (x) { x.pinned = false; });
    S().announcements.unshift(a); A.audit('Mengirim pengumuman', a.title);
    A.notify('all', { icon: 'megaphone', tone: 'peach', text: 'Pengumuman OSIS: ' + a.title, href: '#pengumuman' });
    A.rerender(); A.toast('Pengumuman terkirim ke semua siswa');
  };
  ACT['ann-pin'] = function (el) { var a = byId(S().announcements, el.dataset.id), on = !a.pinned; S().announcements.forEach(function (x) { x.pinned = false; }); a.pinned = on; A.toast(on ? 'Disematkan' : 'Sematan dilepas'); };
  ACT['ann-del'] = function (el) { var a = byId(S().announcements, el.dataset.id); if (!confirm('Hapus pengumuman ini?')) return false; S().announcements = S().announcements.filter(function (x) { return x !== a; }); A.audit('Menghapus pengumuman', a.title); A.toast('Dihapus'); };
  ACT['ann-edit'] = function (el) { var a = byId(S().announcements, el.dataset.id); A.sheet('Ubah pengumuman', '<div class="field"><label for="ae-t">Judul</label><input class="input" id="ae-t" name="title" required value="' + esc(a.title) + '"></div><div class="field"><label for="ae-b">Isi</label><textarea class="input" id="ae-b" name="body" required rows="5">' + esc(a.body) + '</textarea></div>', 'ann-edit:' + a.id); return false; };
  FORM['ann-edit'] = function (f, id) { var a = byId(S().announcements, id); a.title = f.elements['title'].value; a.body = f.elements['body'].value; A.toast('Disimpan'); return true; };

  /* ---------- admin: forum, fame, users, tags ---------- */
  ACT['report-remove'] = function (el) {
    var r = byId(S().reports, el.dataset.id); r.status = 'removed';
    if (r.thread && r.reply) { var t = thread(r.thread); t.replies = t.replies.filter(function (x) { return x.id !== r.reply; }); }
    A.audit('Menghapus konten yang dilaporkan', r.where); A.toast('Konten dihapus');
  };
  ACT['report-dismiss'] = function (el) { var r = byId(S().reports, el.dataset.id); if (r) { r.status = 'dismissed'; A.audit('Menutup laporan', r.where); } A.toast('Laporan ditutup'); };
  ACT['forward-osis'] = function () { A.audit('Meneruskan laporan ke admin', 'Tim Debat XII'); A.toast('Diteruskan ke admin OSIS'); return false; };
  ACT['thread-pin'] = function (el) { var t = thread(el.dataset.id); t.pinned = !t.pinned; A.audit(t.pinned ? 'Menyematkan topik' : 'Melepas sematan topik', t.title); A.toast(t.pinned ? 'Disematkan' : 'Sematan dilepas'); };
  ACT['thread-del'] = function (el) { var t = thread(el.dataset.id); if (!confirm('Hapus topik "' + t.title + '"?')) return false; S().threads = S().threads.filter(function (x) { return x !== t; }); A.audit('Menghapus topik', t.title); A.toast('Topik dihapus'); };
  ACT['thread-edit'] = function (el) { var t = thread(el.dataset.id); A.sheet('Ubah judul topik', '<div class="field"><label for="te-t">Judul</label><input class="input" id="te-t" name="title" required value="' + esc(t.title) + '"></div>', 'thread-edit:' + t.id); return false; };
  FORM['thread-edit'] = function (f, id) { var t = thread(id); t.title = f.elements['title'].value; A.audit('Mengubah judul topik', t.title); A.toast('Disimpan'); return true; };
  ACT['fame-approve'] = function (el) {
    var f = byId(S().fame, el.dataset.id); f.status = 'approved';
    f.elements['who'].forEach(function (id) { var s = A.stu(id); s.achievements.forEach(function (a) { if (a.title.indexOf(f.elements['title']) !== -1) a.verified = true; }); A.notify(id, { icon: 'medal', tone: 'gold', text: 'Prestasimu "' + f.elements['rank'] + ' ' + f.elements['title'] + '" tampil di Wall of Fame.', href: '#wall' }); });
    A.audit('Menyetujui Wall of Fame', f.elements['rank'] + ' ' + f.elements['title']); A.toast('Disetujui dan tampil di Wall of Fame');
  };
  ACT['fame-reject'] = function (el) { var f = byId(S().fame, el.dataset.id); S().fame = S().fame.filter(function (x) { return x !== f; }); A.audit('Menolak Wall of Fame', f.elements['title']); A.toast('Pengajuan ditolak'); };
  ACT['fame-down'] = function (el) { var f = byId(S().fame, el.dataset.id); f.status = 'pending'; A.audit('Menurunkan Wall of Fame', f.elements['title']); A.toast('Diturunkan'); };
  ACT.deactivate = function (el) { var s = A.stu(el.dataset.id); s.active = false; A.audit('Menonaktifkan akun', s.name); A.toast(s.name + ' dinonaktifkan'); };
  ACT.activate = function (el) { var s = A.stu(el.dataset.id); s.active = true; A.audit('Mengaktifkan akun', s.name); A.toast(s.name + ' aktif lagi'); };
  ACT['set-badges'] = function (el) {
    var s = A.stu(el.dataset.id);
    A.sheet('Jabatan ' + s.name.split(' ')[0], '<div class="badge-edit">' + (s.orgs.length ? s.orgs.map(function (o, i) { return '<div class="edit-row"><span>' + A.org(o) + '</span><button class="icon-btn" type="button" data-act="badge-del" data-id="' + s.id + ':' + i + '" aria-label="Hapus">' + ic('trash-2') + '</button></div>'; }).join('') : '<p class="small muted">Belum ada jabatan.</p>') + '</div>' +
      '<h3 style="margin-top: var(--space-md)">Tambah</h3><div class="grid-2"><div class="field"><label for="bg-o">Organisasi</label><select class="input" id="bg-o" name="org">' + opt(Object.keys(S().orgs).map(function (k) { return [k, S().orgs[k].name]; })) + '</select></div><div class="field"><label for="bg-r">Jabatan</label><select class="input" id="bg-r" name="role">' + opt(S().roles, 'Anggota') + '</select></div></div>', 'badge:' + s.id, 'Tambah jabatan');
    return false;
  };
  FORM.badge = function (f, id) { var s = A.stu(id); s.orgs.push([f.elements['org'].value, f.elements['role'].value]); A.audit('Memberi jabatan', s.name + ': ' + f.elements['role'].value + ' ' + S().orgs[f.elements['org'].value].name); A.toast('Jabatan ditambahkan'); return true; };
  ACT['badge-del'] = function (el) { var p = pair(el.dataset.id), s = A.stu(p[0]); s.orgs.splice(+p[1], 1); A.audit('Menghapus jabatan', s.name); A.closeSheet(); ACT['set-badges']({ dataset: { id: s.id } }); A.rerender(); return false; };
  ACT['tag-del'] = function (el) { var g = el.dataset.group, v = el.dataset.val; if (g === 'org') delete S().orgs[v]; else S()[g] = S()[g].filter(function (x) { return x !== v; }); A.toast('Dihapus'); };
  FORM.tag = function (f) { var k = f.elements['kind'].value, n = f.elements['name'].value.trim(); if (!n) return; if (k === 'org') S().orgs[n.toLowerCase().replace(/\W+/g, '-')] = { name: n, icon: 'users' }; else S()[k].push(n); A.audit('Menambah ' + (k === 'org' ? 'organisasi' : 'tag'), n); A.rerender(); A.toast('Ditambahkan'); };

  /* ---------- developer ---------- */
  function setAdmin(id, on) {
    var s = A.stu(id); s.admin = on;
    A.audit(on ? 'Memberi hak admin' : 'Mencabut hak admin', s.name);
    A.notify(id, on ? { icon: 'shield-check', tone: 'peach', text: 'Kamu sekarang admin. Buka menu profil, lalu Mode admin.', href: '#beranda' } : { icon: 'shield-off', tone: 'peach', text: 'Hak admin kamu dicabut.', href: '#beranda' });
    A.toast(on ? s.name + ' sekarang admin' : 'Hak admin ' + s.name + ' dicabut');
  }
  ACT['grant-admin'] = function (el) { setAdmin(el.dataset.id, true); A.closeSheet(); };
  ACT['revoke-admin'] = function (el) { var s = A.stu(el.dataset.id); if (!confirm('Cabut hak admin ' + s.name + '?')) return false; setAdmin(s.id, false); };
  ACT['grant-pick'] = function () {
    A.sheet('Jadikan siswa admin', '<div class="field"><label for="gp-q">Cari siswa</label><input class="input" id="gp-q" type="search" placeholder="Nama atau kelas" data-act="grant-search"></div><div class="pick-list" id="gp-list">' + grantList('') + '</div>', 'noop', false);
    return false;
  };
  function grantList(q) {
    var list = S().students.filter(function (s) { return !s.admin && s.active && (!q || (s.name + ' ' + s.kelas).toLowerCase().indexOf(q) !== -1); });
    return list.length ? list.map(function (s) { return '<div class="edit-row"><span class="user-cell"><span class="avatar av--' + s.av + '">' + s.ini + '</span><span><strong>' + esc(s.name) + '</strong><br><span class="small muted">' + esc(s.kelas) + (s.orgs[0] ? ', ' + esc(s.orgs[0][1] + ' ' + S().orgs[s.orgs[0][0]].name) : '') + '</span></span></span><button class="btn btn--secondary" type="button" data-act="grant-admin" data-id="' + s.id + '">' + ic('shield-check') + 'Jadikan admin</button></div>'; }).join('') : '<p class="small muted">Tidak ada siswa yang cocok.</p>';
  }
  ACT['change-ketua'] = function () {
    var cur = S().students.find(function (s) { return s.ketua; });
    A.sheet('Ganti Ketua OSIS', '<p class="small muted">Ketua OSIS otomatis mendapat hak admin. Ketua lama tetap admin sampai dicabut.</p><div class="field"><label for="kt">Ketua baru</label><select class="input" id="kt" name="who">' + opt(S().students.filter(function (s) { return s.active; }).map(function (s) { return [s.id, s.name + ', ' + s.kelas]; }), cur && cur.id) + '</select></div>', 'ketua', 'Simpan');
    return false;
  };
  FORM.ketua = function (f) { S().students.forEach(function (s) { s.ketua = false; }); var s = A.stu(f.elements['who'].value); s.ketua = true; s.admin = true; if (!s.orgs.some(function (o) { return o[0] === 'osis' && o[1] === 'Ketua'; })) s.orgs.unshift(['osis', 'Ketua']); A.audit('Mengganti Ketua OSIS', s.name); A.toast(s.name + ' sekarang Ketua OSIS'); return true; };
  ACT['dev-team'] = function (el) { A.ui.devTeam = el.dataset.id; if (el.dataset.id !== 'reported') A.audit('Membuka chat tim', byId(S().teams, el.dataset.id).name); A.rerender(); return false; };
  ACT['run-crawler'] = function () {
    var n = { id: A.uid('l'), title: 'Lomba Infografis Hari Bumi Pelajar', org: 'Komunitas Bumi Lestari', cat: 'seni', form: 'Online', level: 'Nasional', fee: 0, dl: 28, source: 'Google', jenjangNote: 'SMA, SMK', filter: 'ok' };
    n.status = S().settings.publishMode === 'auto' ? 'published' : 'queue'; S().lomba.push(n);
    A.audit('Menjalankan pencarian lomba', '1 lomba baru'); A.toast(n.status === 'queue' ? '1 lomba baru masuk antrean tinjauan' : '1 lomba baru langsung terbit');
  };
  ACT['publish-mode'] = function (el) { S().settings.publishMode = el.value; A.audit('Mengubah mode terbit', el.value === 'auto' ? 'Otomatis' : 'Tinjau dulu'); A.toast('Mode terbit diubah'); };
  ACT['term-del'] = function (el) { S().settings.terms.splice(+el.dataset.id, 1); };
  FORM.term = function (f) { var v = f.elements['term'].value.trim(); if (!v) return; S().settings.terms.push(v); A.rerender(); };
  ACT.sys = function (el) { S().settings[el.dataset.val] = el.checked; A.audit('Mengubah pengaturan sistem', el.dataset.val + ': ' + (el.checked ? 'aktif' : 'mati')); A.toast('Disimpan'); };
  FORM.noop = function () {};

  /* ================= dispatch ================= */
  document.addEventListener('click', function (e) {
    var menu = document.getElementById('me-menu');
    if (menu && !menu.hidden && !e.target.closest('#me-menu, [data-act="menu"]')) menu.hidden = true;
    var el = e.target.closest('[data-act]');
    if (!el || el.matches('input, select, textarea')) return;
    var fn = ACT[el.dataset.act]; if (!fn) return;
    var d = el.closest('details.more'); if (d) d.open = false;
    var res = fn(el, e);
    if (el.tagName === 'A') {
      var h = el.getAttribute('href');
      if (res === false) { e.preventDefault(); return; }
      if (h === location.hash || h === '#') { e.preventDefault(); A.render(); }
      return;
    }
    e.preventDefault();
    if (res !== false) A.rerender();
  });
  document.addEventListener('change', function (e) {
    var el = e.target;
    if (el.matches('input[type=file][data-act="file-name"]')) { var slot = el.parentNode.querySelector('[data-fill="fname"]'); if (slot && el.files[0]) slot.textContent = el.files[0].name; return; }
    var fn = el.dataset && ACT[el.dataset.act];
    if (fn && el.matches('input, select')) { if (fn(el, e) !== false) A.rerender(); }
  });
  document.addEventListener('input', function (e) {
    var el = e.target;
    if (el.id === 'nisn') return meter(el);
    if (el.dataset.bind) { me()[el.dataset.bind] = el.value; A.save(); return; }
    var act = el.dataset.act;
    if (act === 'search' || act === 'user-search') {
      if (act === 'search') A.ui.q = el.value; else A.ui.userQ = el.value;
      var id = el.id, pos = el.selectionStart; A.rerender();
      var again = document.getElementById(id); if (again) { again.focus(); again.setSelectionRange(pos, pos); }
    }
    if (act === 'grant-search') document.getElementById('gp-list').innerHTML = grantList(el.value.toLowerCase());
    if (act === 'grant-search') lucide.createIcons();
  });
  document.addEventListener('submit', function (e) {
    var f = e.target.closest('[data-form]'); if (!f) return;
    e.preventDefault();
    var parts = f.dataset.form.split(':'), name = parts.shift(), arg = parts.join(':') || f.dataset.id;
    var fn = FORM[name]; if (!fn) return;
    var close = fn(f, arg);
    if (f.closest('dialog')) { if (close) { A.closeSheet(); A.rerender(); } }
  });
  document.getElementById('sheet').addEventListener('click', function (e) { if (e.target === this) A.closeSheet(); });

  A.render();
})();
