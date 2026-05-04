<<<<<<< HEAD
/* ==========================================================
   FUNGSI MODAL (Menampilkan dan Menutup Pop-up Detail)
   ========================================================== */

/**
 * Fungsi ini dipanggil saat salah satu kartu diklik.
 * Tugasnya memasukkan data (teks dan gambar) ke dalam elemen pop-up.
 */
function showDetail(title, description, imageSrc, types) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-description').innerText = description;
    document.getElementById('modal-img').src = imageSrc;
    document.getElementById('modal-types').innerText = "Spesifikasi/Merek: " + types;
    
    // Ubah status display (tampilan) modal menjadi terlihat
    document.getElementById('modal').style.display = "block";
}

/**
 * Fungsi ini dipanggil saat tombol silang (X) ditekan.
 * Tugasnya menyembunyikan kembali pop-up.
 */
function closeModal() {
    document.getElementById('modal').style.display = "none";
}

// Fitur tambahan: Menutup pop-up jika pengunjung mengklik di luar area putih
window.onclick = function(event) {
    let modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

/* ==========================================================
   FUNGSI PENCARIAN & FILTER KATEGORI
   ========================================================== */

/**
 * Fungsi ini berjalan secara otomatis setiap kali ada huruf yang 
 * diketik di dalam kotak pencarian (search bar).
 */
function cariKomponen() {
    // Ambil input user dan ubah jadi huruf kecil semua agar tidak sensitif huruf besar/kecil
    let input = document.getElementById('searchBar').value.toLowerCase();
    let cards = document.getElementsByClassName('card');

    // Loop (cek berulang) untuk mencocokkan setiap nama di kartu dengan input pencarian
    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].querySelector('h3').innerText.toLowerCase();
        
        if (title.includes(input)) {
            cards[i].style.display = ""; // Tampilkan
        } else {
            cards[i].style.display = "none"; // Sembunyikan
        }
    }
}

/**
 * Fungsi ini dijalankan saat tombol "Semua", "Hardware PC", atau "Jaringan" diklik.
 * Tugasnya memfilter kartu berdasarkan atribut 'data-kategori'.
 */
function filterKategori(kategori, elemenTombol) {
    // 1. Reset warna semua tombol filter kembali transparan
    let tombolTombol = document.getElementsByClassName('btn-filter');
    for (let i = 0; i < tombolTombol.length; i++) {
        tombolTombol[i].classList.remove('aktif');
    }
    // 2. Beri warna putih terang hanya pada tombol yang baru saja diklik
    elemenTombol.classList.add('aktif');

    // 3. Sembunyikan atau tampilkan kartu sesuai kategori
    let cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        let kategoriKartu = cards[i].getAttribute('data-kategori');
        
        // Kondisi: Jika ditekan 'semua' ATAU jika kategori cocok
        if (kategori === 'semua' || kategori === kategoriKartu) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}
/* ==========================================================
   EFEK VISUAL: ANIMASI PARTIKEL NODE JARINGAN
   ========================================================== */
const canvas = document.getElementById('canvas-jaringan');
const ctx = canvas.getContext('2d');

// Menyesuaikan ukuran kanvas dengan ukuran layar browser
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let partikelArray = [];

// Fungsi untuk membuat "Cetak Biru" (Blueprint) dari sebuah titik/node
class Partikel {
    constructor(x, y, arahX, arahY, ukuran, warna) {
        this.x = x;
        this.y = y;
        this.arahX = arahX;
        this.arahY = arahY;
        this.ukuran = ukuran;
        this.warna = warna;
    }
    
    // Menggambar titik di kanvas
    gambar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ukuran, 0, Math.PI * 2, false);
        ctx.fillStyle = '#ffffff'; // Titik warna putih
        ctx.fill();
    }
    
    // Memperbarui posisi titik setiap frame
    update() {
        // Jika titik menyentuh ujung layar, pantulkan kembali
        if (this.x > canvas.width || this.x < 0) { this.arahX = -this.arahX; }
        if (this.y > canvas.height || this.y < 0) { this.arahY = -this.arahY; }
        
        // Gerakkan titik
        this.x += this.arahX;
        this.y += this.arahY;
        this.gambar();
    }
}

// Fungsi untuk mengisi kanvas dengan banyak titik awal
function inisialisasi() {
    partikelArray = [];
    let jumlahPartikel = (canvas.height * canvas.width) / 10000; // Jumlah disesuaikan ukuran layar
    
    for (let i = 0; i < jumlahPartikel; i++) {
        let ukuran = (Math.random() * 2) + 1; // Ukuran titik acak
        let x = (Math.random() * (innerWidth - ukuran * 2));
        let y = (Math.random() * (innerHeight - ukuran * 2));
        let arahX = (Math.random() * 1) - 0.5; // Kecepatan gerak X
        let arahY = (Math.random() * 1) - 0.5; // Kecepatan gerak Y
        let warna = 'white';
        
        partikelArray.push(new Partikel(x, y, arahX, arahY, ukuran, warna));
    }
}

// Fungsi untuk menggambar garis penghubung antar titik yang berdekatan
function hubungkanTitik() {
    for (let a = 0; a < partikelArray.length; a++) {
        for (let b = a; b < partikelArray.length; b++) {
            let jarakX = partikelArray[a].x - partikelArray[b].x;
            let jarakY = partikelArray[a].y - partikelArray[b].y;
            // Rumus Pythagoras untuk mencari jarak antar dua titik
            let jarak = Math.sqrt((jarakX * jarakX) + (jarakY * jarakY));
            
            // Jika jaraknya kurang dari 120 pixel, gambar garis (koneksi jaringan)
            if (jarak < 120) {
                // Semakin dekat, garisnya semakin tebal/jelas
                let opasitas = 1 - (jarak/120);
                ctx.strokeStyle = 'rgba(255, 255, 255, ' + opasitas + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(partikelArray[a].x, partikelArray[a].y);
                ctx.lineTo(partikelArray[b].x, partikelArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Menjalankan animasi tanpa henti (Looping)
function animasi() {
    requestAnimationFrame(animasi);
    ctx.clearRect(0, 0, innerWidth, innerHeight); // Hapus layar lama sebelum menggambar layar baru
    
    for (let i = 0; i < partikelArray.length; i++) {
        partikelArray[i].update();
    }
    hubungkanTitik(); // Panggil fungsi garis penghubung
}

// Jalankan sistem saat browser mengubah ukuran layar
window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    inisialisasi();
});

// Mulai program partikel
inisialisasi();
animasi();

/* ==========================================================
   FITUR UI: TOMBOL SCROLL KE ATAS
   ========================================================== */
// 1. Menyimpan elemen tombol dari HTML ke dalam variabel JS
let btnScroll = document.getElementById("btnScrollTop");

// 2. Fungsi ini akan dipanggil otomatis setiap kali layar browser digulir (di-scroll)
window.onscroll = function() {
    aturTombolScroll();
};

function aturTombolScroll() {
    // Jika posisi layar sudah turun sejauh 250 pixel dari atas, tombol ditampilkan
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        btnScroll.style.display = "block";
    } else {
        // Jika layar masih di bagian atas, sembunyikan tombol
        btnScroll.style.display = "none";
    }
}

// 3. Fungsi ini dijalankan ketika tombol diklik (diatur melalui atribut onclick di HTML)
function scrollToTop() {
    // Membawa layar kembali ke koordinat Y=0 (paling atas) dengan pergerakan yang halus (smooth)
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
=======
/* ==========================================================
   FUNGSI MODAL (Menampilkan dan Menutup Pop-up Detail)
   ========================================================== */

/**
 * Fungsi ini dipanggil saat salah satu kartu diklik.
 * Tugasnya memasukkan data (teks dan gambar) ke dalam elemen pop-up.
 */
function showDetail(title, description, imageSrc, types) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-description').innerText = description;
    document.getElementById('modal-img').src = imageSrc;
    document.getElementById('modal-types').innerText = "Spesifikasi/Merek: " + types;
    
    // Ubah status display (tampilan) modal menjadi terlihat
    document.getElementById('modal').style.display = "block";
}

/**
 * Fungsi ini dipanggil saat tombol silang (X) ditekan.
 * Tugasnya menyembunyikan kembali pop-up.
 */
function closeModal() {
    document.getElementById('modal').style.display = "none";
}

// Fitur tambahan: Menutup pop-up jika pengunjung mengklik di luar area putih
window.onclick = function(event) {
    let modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

/* ==========================================================
   FUNGSI PENCARIAN & FILTER KATEGORI
   ========================================================== */

/**
 * Fungsi ini berjalan secara otomatis setiap kali ada huruf yang 
 * diketik di dalam kotak pencarian (search bar).
 */
function cariKomponen() {
    // Ambil input user dan ubah jadi huruf kecil semua agar tidak sensitif huruf besar/kecil
    let input = document.getElementById('searchBar').value.toLowerCase();
    let cards = document.getElementsByClassName('card');

    // Loop (cek berulang) untuk mencocokkan setiap nama di kartu dengan input pencarian
    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].querySelector('h3').innerText.toLowerCase();
        
        if (title.includes(input)) {
            cards[i].style.display = ""; // Tampilkan
        } else {
            cards[i].style.display = "none"; // Sembunyikan
        }
    }
}

/**
 * Fungsi ini dijalankan saat tombol "Semua", "Hardware PC", atau "Jaringan" diklik.
 * Tugasnya memfilter kartu berdasarkan atribut 'data-kategori'.
 */
function filterKategori(kategori, elemenTombol) {
    // 1. Reset warna semua tombol filter kembali transparan
    let tombolTombol = document.getElementsByClassName('btn-filter');
    for (let i = 0; i < tombolTombol.length; i++) {
        tombolTombol[i].classList.remove('aktif');
    }
    // 2. Beri warna putih terang hanya pada tombol yang baru saja diklik
    elemenTombol.classList.add('aktif');

    // 3. Sembunyikan atau tampilkan kartu sesuai kategori
    let cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        let kategoriKartu = cards[i].getAttribute('data-kategori');
        
        // Kondisi: Jika ditekan 'semua' ATAU jika kategori cocok
        if (kategori === 'semua' || kategori === kategoriKartu) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}
/* ==========================================================
   EFEK VISUAL: ANIMASI PARTIKEL NODE JARINGAN
   ========================================================== */
const canvas = document.getElementById('canvas-jaringan');
const ctx = canvas.getContext('2d');

// Menyesuaikan ukuran kanvas dengan ukuran layar browser
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let partikelArray = [];

// Fungsi untuk membuat "Cetak Biru" (Blueprint) dari sebuah titik/node
class Partikel {
    constructor(x, y, arahX, arahY, ukuran, warna) {
        this.x = x;
        this.y = y;
        this.arahX = arahX;
        this.arahY = arahY;
        this.ukuran = ukuran;
        this.warna = warna;
    }
    
    // Menggambar titik di kanvas
    gambar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ukuran, 0, Math.PI * 2, false);
        ctx.fillStyle = '#ffffff'; // Titik warna putih
        ctx.fill();
    }
    
    // Memperbarui posisi titik setiap frame
    update() {
        // Jika titik menyentuh ujung layar, pantulkan kembali
        if (this.x > canvas.width || this.x < 0) { this.arahX = -this.arahX; }
        if (this.y > canvas.height || this.y < 0) { this.arahY = -this.arahY; }
        
        // Gerakkan titik
        this.x += this.arahX;
        this.y += this.arahY;
        this.gambar();
    }
}

// Fungsi untuk mengisi kanvas dengan banyak titik awal
function inisialisasi() {
    partikelArray = [];
    let jumlahPartikel = (canvas.height * canvas.width) / 10000; // Jumlah disesuaikan ukuran layar
    
    for (let i = 0; i < jumlahPartikel; i++) {
        let ukuran = (Math.random() * 2) + 1; // Ukuran titik acak
        let x = (Math.random() * (innerWidth - ukuran * 2));
        let y = (Math.random() * (innerHeight - ukuran * 2));
        let arahX = (Math.random() * 1) - 0.5; // Kecepatan gerak X
        let arahY = (Math.random() * 1) - 0.5; // Kecepatan gerak Y
        let warna = 'white';
        
        partikelArray.push(new Partikel(x, y, arahX, arahY, ukuran, warna));
    }
}

// Fungsi untuk menggambar garis penghubung antar titik yang berdekatan
function hubungkanTitik() {
    for (let a = 0; a < partikelArray.length; a++) {
        for (let b = a; b < partikelArray.length; b++) {
            let jarakX = partikelArray[a].x - partikelArray[b].x;
            let jarakY = partikelArray[a].y - partikelArray[b].y;
            // Rumus Pythagoras untuk mencari jarak antar dua titik
            let jarak = Math.sqrt((jarakX * jarakX) + (jarakY * jarakY));
            
            // Jika jaraknya kurang dari 120 pixel, gambar garis (koneksi jaringan)
            if (jarak < 120) {
                // Semakin dekat, garisnya semakin tebal/jelas
                let opasitas = 1 - (jarak/120);
                ctx.strokeStyle = 'rgba(255, 255, 255, ' + opasitas + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(partikelArray[a].x, partikelArray[a].y);
                ctx.lineTo(partikelArray[b].x, partikelArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Menjalankan animasi tanpa henti (Looping)
function animasi() {
    requestAnimationFrame(animasi);
    ctx.clearRect(0, 0, innerWidth, innerHeight); // Hapus layar lama sebelum menggambar layar baru
    
    for (let i = 0; i < partikelArray.length; i++) {
        partikelArray[i].update();
    }
    hubungkanTitik(); // Panggil fungsi garis penghubung
}

// Jalankan sistem saat browser mengubah ukuran layar
window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    inisialisasi();
});

// Mulai program partikel
inisialisasi();
animasi();

/* ==========================================================
   FITUR UI: TOMBOL SCROLL KE ATAS
   ========================================================== */
// 1. Menyimpan elemen tombol dari HTML ke dalam variabel JS
let btnScroll = document.getElementById("btnScrollTop");

// 2. Fungsi ini akan dipanggil otomatis setiap kali layar browser digulir (di-scroll)
window.onscroll = function() {
    aturTombolScroll();
};

function aturTombolScroll() {
    // Jika posisi layar sudah turun sejauh 250 pixel dari atas, tombol ditampilkan
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        btnScroll.style.display = "block";
    } else {
        // Jika layar masih di bagian atas, sembunyikan tombol
        btnScroll.style.display = "none";
    }
}

// 3. Fungsi ini dijalankan ketika tombol diklik (diatur melalui atribut onclick di HTML)
function scrollToTop() {
    // Membawa layar kembali ke koordinat Y=0 (paling atas) dengan pergerakan yang halus (smooth)
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
>>>>>>> fa6f43221a4e3990c77cb37b9e7430b8ae9781fd
}