// Fungsi untuk toggle menu utama
function MenuUtama() {
    const SubMenu1 = document.getElementById('SubMenu1');
    if (SubMenu1) {
        SubMenu1.classList.toggle('open');  // Toggle buka/tutup menu utama
    }
}

// Fungsi untuk menangani pemilihan menu dan mengganti src iframe
function Terpilih(event, url) {
    event.preventDefault();  // Mencegah perilaku default link
    const iframe = document.getElementById('Badan');
    if (iframe) {
        iframe.src = url;  // Set src iframe
        iframe.onload = showInitialElements; // Panggil saat iframe selesai dimuat
    }
    closeAllMenus();  // Tutup semua menu setelah pemilihan
}

// Fungsi untuk toggle submenu
let lastClickedSubMenu = null;

function toggleSubMenu(event, submenuId) {
    event.stopPropagation();  // Hentikan bubbling event
    const submenu = document.getElementById(submenuId);
    const panah = event.target.querySelector('.Tpanah');

    if (submenu === lastClickedSubMenu) {
        submenu.style.display = "none";  // Tutup submenu
        if (panah) {
            panah.innerHTML = "&#9654;";  // Kembali ke panah ▶
        }
        lastClickedSubMenu = null;
        return;
    }

    closeAllSubMenus();

    if (submenu) {
        submenu.style.display = "block";  // Buka submenu
        if (panah) {
            panah.innerHTML = "&#9660;";  // Ubah panah ke ▼
        }
    }

    lastClickedSubMenu = submenu;
}

// Fungsi untuk menutup semua submenu
function closeAllSubMenus() {
    document.querySelectorAll('.Terpilih').forEach(sub => {
        sub.style.display = "none";  // Tutup semua submenu
        const panah = sub.previousElementSibling?.querySelector('.Tpanah');
        if (panah) panah.innerHTML = "&#9654;";  // Reset panah ▶
    });
}

// Fungsi untuk menutup semua menu
function closeAllMenus() {
    closeAllSubMenus();
    const SubMenu1 = document.getElementById('SubMenu1');
    if (SubMenu1) {
        SubMenu1.classList.remove('open');  // Tutup menu utama
    }
}

// Event listener untuk menerima pesan dari iframe
window.addEventListener('message', function (event) {
    if (event.data === 'iframeClick') {
        closeAllMenus();  // Tutup semua menu saat klik di dalam iframe
    }
});

// Event listener untuk iframe load
document.getElementById('Badan').addEventListener('load', showInitialElements);


// Fungsi untuk menyembunyikan semua elemen kecuali judul dan surat
function hideAllElements() {
    const iframeDocument = document.getElementById('Badan').contentWindow.document;

    iframeDocument.querySelectorAll('.latin, .azam, .arti').forEach(el => {
        el.style.display = 'none';  // Sembunyikan elemen selain judul dan surat
    });

    iframeDocument.querySelectorAll('.judul').forEach(judul => {
        judul.style.display = 'block';  // Tampilkan elemen judul
    });

    iframeDocument.querySelectorAll('.surat').forEach(el => {
        el.style.display = 'block';  // Tampilkan elemen surat jika ada
    });
}

// Fungsi untuk menampilkan elemen judul dan menggabungkan elemen arab dalam div surat
function showInitialElements() {
    const iframeDocument = document.getElementById('Badan').contentWindow.document;
    const judulElements = iframeDocument.querySelectorAll(".judul");

    hideAllElements();  // Sembunyikan elemen lainnya

    judulElements.forEach(judul => {
        // Hapus elemen .surat lama jika ada, sebelum membuat yang baru
        const existingSurat = judul.nextElementSibling;
        if (existingSurat && existingSurat.classList.contains('surat')) {
            existingSurat.remove();
        }

        let combinedText = "";  // Reset combinedText untuk setiap judul
        let sibling = judul.nextElementSibling;
        let hasArab = false;    // Cek apakah ada elemen arab

        // Gabungkan elemen .arab di bawah judul
        while (sibling && !sibling.classList.contains("judul")) {
            if (sibling.classList.contains("arab")) {
                combinedText += sibling.innerHTML + " ";  // Gabungkan konten arab
                sibling.style.display = 'none';  // Sembunyikan elemen arab asli
                hasArab = true;
            }
            sibling = sibling.nextElementSibling;
        }

        // Buat elemen .surat baru jika ada teks arab
        if (hasArab) {
            const suratDiv = iframeDocument.createElement("div");
            suratDiv.className = "surat";  // Tetapkan class surat
            suratDiv.style.textAlign = "justify";
            suratDiv.style.lineHeight = "1.6";
            suratDiv.innerHTML = combinedText.trim();  // Isi div surat dengan teks gabungan
            judul.insertAdjacentElement("afterend", suratDiv);  // Tempelkan surat setelah judul
        }
    });
}

