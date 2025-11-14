// script.js - interaksi & modal project untuk persona Data Analytics

/* ========================
   Theme toggle (light/dark)
   ======================== */
const toggleBtn = document.getElementById('toggleThemeBtn');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const pressed = toggleBtn.getAttribute('aria-pressed') === 'true';
    toggleBtn.setAttribute('aria-pressed', String(!pressed));
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
      document.documentElement.style.setProperty('--bg', '#071025');
      document.documentElement.style.setProperty('--card', '#071a2b');
      document.documentElement.style.setProperty('--text', '#e6eef8');
      document.documentElement.style.setProperty('--muted', '#9fb0ca');
      document.documentElement.style.setProperty('--accent', '#0fb2a6');
      document.documentElement.style.setProperty('--accent-2', '#60a5fa');
    } else {
      // reset to default light (values same as CSS root)
      document.documentElement.style.setProperty('--bg', '#f6f8fb');
      document.documentElement.style.setProperty('--card', '#ffffff');
      document.documentElement.style.setProperty('--text', '#0f1724');
      document.documentElement.style.setProperty('--muted', '#6b7280');
      document.documentElement.style.setProperty('--accent', '#0b98a6');
      document.documentElement.style.setProperty('--accent-2', '#1e3a8a');
    }
  });
}

/* ========================
   Clock (realtime)
   ======================== */
function updateClock() {
  const d = new Date();
  const opts = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const dateStr = d.toLocaleDateString('id-ID', opts);
  const timeStr = d.toLocaleTimeString('id-ID');
  const el = document.getElementById('clockDisplay');
  if (el) el.textContent = `${dateStr} — ${timeStr}`;
}
setInterval(updateClock, 1000);
updateClock();

/* ========================
   Footer year(s)
   ======================== */
const y = new Date().getFullYear();
['year','year2','year3','year4'].forEach(id => {
  const e = document.getElementById(id);
  if (e) e.textContent = y;
});

/* ========================
   Contact form handling
   ======================== */
function handleSubmit(event) {
  event.preventDefault();
  const nama = document.getElementById('nama')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const pesan = document.getElementById('pesan')?.value.trim();

  if (!nama || !email || !pesan) {
    alert('Mohon lengkapi semua field sebelum mengirim.');
    return;
  }

  // Simulasi pengiriman (bisa diganti ke backend)
  alert(`Terima kasih, ${nama}. Pesan Anda telah terkirim dan akan saya tinjau.`);
  document.getElementById('contactForm')?.reset();
}

function resetForm(){
  document.getElementById('contactForm')?.reset();
}

/* ========================
   Modal project detail (image + narrative)
   ======================== */
function openProjectModal(id) {
  const modal = document.getElementById('projectModal');
  const content = document.getElementById('modalContent');
  if (!modal || !content) return;

  // default isi
  let title = '';
  let img = '';
  let htmlText = '';

  if (id === 1) {
    title = 'Eksplorasi Awal Dataset Produksi Pangan';
    img = 'img/project1.jpg';
    htmlText = `
      <p>Pada proyek ini dilakukan eksplorasi awal terhadap dataset produksi pangan (sumber: FAOSTAT). Tahapan awal ditampilkan melalui fungsi-fungsi seperti <code>head()</code> dan <code>tail()</code> di Jupyter Notebook untuk mengamati struktur data, kolom, dan contoh baris.</p>
      <p>Tujuan eksplorasi awal ini antara lain:</p>
      <ul>
        <li>Memahami jumlah dan nama kolom (mis. Area, Item, Element Code, Unit, serta kolom tahun).</li>
        <li>Mendeteksi kebutuhan pra-pembersihan seperti missing values, duplikasi, atau format tanggal yang tidak konsisten.</li>
        <li>Membentuk hipotesis awal untuk analisis lebih lanjut.</li>
      </ul>
      <p><strong>Tools:</strong> Python, Pandas, Jupyter Notebook.</p>
    `;
  } else if (id === 2) {
    title = 'Pembuatan Dashboard Analisis Online Marketing';
    img = 'img/project2.jpg';
    htmlText = `
      <p>Proyek ini menyajikan dashboard sederhana untuk analisis performa online marketing: monitoring trafik, Click Through Rate (CTR), dan tingkat konversi. Dashboard membantu pemangku kepentingan dalam menilai efektivitas kampanye secara visual.</p>
      <p>Kegunaan utama dashboard:</p>
      <ul>
        <li>Analisis tren pengunjung (harian/mingguan).</li>
        <li>Pembandingan performa antar-kampanye.</li>
        <li>Identifikasi sumber trafik (organic, paid, social, referral).</li>
      </ul>
      <p><strong>Tools:</strong> Excel/Tableau atau library visualisasi di Python.</p>
    `;
  } else if (id === 3) {
    title = 'Analisis Performa Mahasiswa';
    img = 'img/project3.jpg';
    htmlText = `
      <p>Analisis ini mengevaluasi performa akademik mahasiswa berdasarkan variabel seperti skor ujian, tingkat kehadiran, dan jam belajar. Tahapan meliputi analisis deskriptif dan pemeriksaan korelasi sederhana antar-variabel.</p>
      <p>Output awal yang dihasilkan termasuk:</p>
      <ul>
        <li>Tabel ringkasan statistik (mean, median, std) untuk skor.</li>
        <li>Visualisasi distribusi nilai (histogram) dan scatter plot korelasi.</li>
        <li>Rekomendasi awal berbasis temuan data.</li>
      </ul>
      <p><strong>Tools:</strong> Pandas, Matplotlib / Seaborn, Jupyter Notebook.</p>
    `;
  } else {
    title = 'Detail Proyek';
    img = '';
    htmlText = `<p>Detail proyek tidak tersedia.</p>`;
  }

  // bangun HTML modal: judul + body (gambar + teks)
  const modalHTML = `
    <h2 style="margin-top:0;margin-bottom:12px;">${title}</h2>
    <div class="modal-body">
      <div>
        <img src="${img}" alt="${title}" class="modal-image" onerror="this.style.display='none'">
      </div>
      <div class="modal-text">
        ${htmlText}
      </div>
    </div>
  `;

  content.innerHTML = modalHTML;
  modal.setAttribute('aria-hidden', 'false');

  // fokus ke modal content untuk aksesibilitas
  content.focus();
}

/* ========================
   Close modal & background click handling
   ======================== */
function closeProjectModal(){
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
}

// close modal on background click (but not inside modal inner)
document.addEventListener('click', (e) => {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  if (e.target === modal) closeProjectModal();
});

// Back to top smooth
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});
