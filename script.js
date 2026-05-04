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
    document.getElementById('modal').style.display = "block";
}

/**
 * Fungsi ini dipanggil saat tombol silang (X) ditekan.
 * Tugasnya menyembunyikan kembali pop-up.
 */
function closeModal() {
    document.getElementById('modal').style.display = "none";
}

// Menutup pop-up jika pengunjung mengklik di luar area putih
window.onclick = function(event) {
    let modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

/* ==========================================================
   FUNGSI PENCARIAN & FILTER KATEGORI
   ========================================================== */

/**
 * Fungsi ini berjalan otomatis setiap kali ada huruf yang
 * diketik di dalam kotak pencarian.
 */
function cariKomponen() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    let cards = document.getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].querySelector('h3').innerText.toLowerCase();
        cards[i].style.display = title.includes(input) ? "" : "none";
    }
}

/**
 * Memfilter kartu berdasarkan kategori yang dipilih.
 */
function filterKategori(kategori, elemenTombol) {
    let tombolTombol = document.getElementsByClassName('btn-filter');
    for (let i = 0; i < tombolTombol.length; i++) {
        tombolTombol[i].classList.remove('aktif');
    }
    elemenTombol.classList.add('aktif');

    let cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        let kategoriKartu = cards[i].getAttribute('data-kategori');
        cards[i].style.display = (kategori === 'semua' || kategori === kategoriKartu) ? "" : "none";
    }
}

/* ==========================================================
   EFEK VISUAL: ANIMASI PARTIKEL NODE JARINGAN
   ========================================================== */
const canvas = document.getElementById('canvas-jaringan');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let partikelArray = [];

class Partikel {
    constructor(x, y, arahX, arahY, ukuran, warna) {
        this.x = x;
        this.y = y;
        this.arahX = arahX;
        this.arahY = arahY;
        this.ukuran = ukuran;
        this.warna = warna;
    }

    gambar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ukuran, 0, Math.PI * 2, false);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) { this.arahX = -this.arahX; }
        if (this.y > canvas.height || this.y < 0) { this.arahY = -this.arahY; }
        this.x += this.arahX;
        this.y += this.arahY;
        this.gambar();
    }
}

function inisialisasi() {
    partikelArray = [];
    let jumlahPartikel = Math.floor((canvas.height * canvas.width) / 10000);

    for (let i = 0; i < jumlahPartikel; i++) {
        let ukuran = (Math.random() * 2) + 1;
        let x = Math.random() * (innerWidth - ukuran * 2);
        let y = Math.random() * (innerHeight - ukuran * 2);
        let arahX = (Math.random() * 1) - 0.5;
        let arahY = (Math.random() * 1) - 0.5;
        let warna = 'white';
        partikelArray.push(new Partikel(x, y, arahX, arahY, ukuran, warna));
    }
}

function hubungkanTitik() {
    for (let a = 0; a < partikelArray.length; a++) {
        for (let b = a; b < partikelArray.length; b++) {
            let jarakX = partikelArray[a].x - partikelArray[b].x;
            let jarakY = partikelArray[a].y - partikelArray[b].y;
            let jarak = Math.sqrt((jarakX * jarakX) + (jarakY * jarakY));

            if (jarak < 120) {
                let opasitas = 1 - (jarak / 120);
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

function animasi() {
    requestAnimationFrame(animasi);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < partikelArray.length; i++) {
        partikelArray[i].update();
    }
    hubungkanTitik();
}

window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    inisialisasi();
});

inisialisasi();
animasi();

/* ==========================================================
   FITUR UI: TOMBOL SCROLL KE ATAS
   ========================================================== */
let btnScroll = document.getElementById("btnScrollTop");

window.onscroll = function() {
    aturTombolScroll();
};

function aturTombolScroll() {
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        btnScroll.style.display = "block";
    } else {
        btnScroll.style.display = "none";
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
