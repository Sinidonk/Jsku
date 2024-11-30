// Fungsi untuk toggle menu utama
function MenuUtama() {
    const SubMenu1 = document.getElementById('SubMenu1');
    if (SubMenu1) {
        SubMenu1.classList.toggle('open');  // Menggunakan class toggle agar menu terbuka/tutup
    }
}

// Fungsi untuk menangani pemilihan menu dan mengganti src iframe
function Terpilih(event, url) {
    event.preventDefault();  // Mencegah perilaku default link
    const iframe = document.getElementById('Badan');
    if (iframe) {
        iframe.src = url;  // Mengatur src iframe dengan URL baru
        iframe.onload = handleIframeContent; // Memanggil handleIframeContent saat iframe selesai dimuat
    }
    closeAllMenus();  // Menutup semua menu setelah pemilihan
}

// Fungsi untuk toggle submenu
let lastClickedSubMenu = null;  // Untuk menyimpan submenu terakhir yang diklik

function toggleSubMenu(event, submenuId) {
    event.stopPropagation();  // Menghentikan event agar tidak bubble ke elemen lain

    const submenu = document.getElementById(submenuId);
    const panah = event.target.querySelector('.Tpanah');
    
    // Jika submenu yang sama diklik dua kali, tutup submenu tersebut
    if (submenu === lastClickedSubMenu) {
        submenu.style.display = "none";  // Menutup submenu
        if (panah) {
            panah.innerHTML = "&#9654;";  // Mengembalikan panah menjadi ▶
        }
        lastClickedSubMenu = null;  // Reset lastClickedSubMenu
        return;  // Keluar dari fungsi jika submenu yang sama diklik
    }

    // Tutup semua submenu terlebih dahulu
    closeAllSubMenus();

    if (submenu) {
        submenu.style.display = "block";  // Membuka submenu yang baru dipilih
        if (panah) {
            panah.innerHTML = "&#9660;";  // Mengubah panah menjadi ▼
        }
    }

    // Update submenu yang terakhir diklik
    lastClickedSubMenu = submenu;
}

// Fungsi untuk menutup semua submenu
function closeAllSubMenus() {
    document.querySelectorAll('.Terpilih').forEach(sub => {
        sub.style.display = "none"; // Menyembunyikan submenu
        const panah = sub.previousElementSibling?.querySelector('.Tpanah');
        if (panah) panah.innerHTML = "&#9654;";  // Mengembalikan panah menjadi ▶
    });
}

// Fungsi untuk menutup semua menu saat klik di luar menu
function closeAllMenus() {
    closeAllSubMenus();  // Menutup semua submenu yang terbuka
    
    // Menutup menu utama
    const SubMenu1 = document.getElementById('SubMenu1');
    if (SubMenu1) {
        SubMenu1.classList.remove('open');  // Menutup menu utama
    }
}

// Fungsi untuk menangani klik di luar menu
document.addEventListener('click', function (event) {
    const SubMenu1 = document.getElementById('SubMenu1');
    const MenuUtama = document.querySelector('.MenuUtama');
    if (SubMenu1 && MenuUtama && !SubMenu1.contains(event.target) && !MenuUtama.contains(event.target)) {
        closeAllMenus();  // Menutup menu saat klik di luar menu utama
    }
});

// Fungsi untuk menangani konten yang dimuat dalam iframe
function handleIframeContent() {
    const iframe = document.getElementById('Badan');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // Menambahkan event listener klik di dalam iframe
    iframeDoc.addEventListener('click', function () {
        iframe.contentWindow.postMessage('iframeClick', '*');  // Kirim pesan ke dokumen utama
    });

    // Pastikan elemen .surat tidak ada sebelumnya sebelum menambahkannya
    const existingDivSurat = iframeDoc.querySelector('.surat');
    if (existingDivSurat) {
        return; // Menghindari pembuatan duplikat, keluar jika sudah ada
    }

    // Menghapus elemen .surat jika ada
    const existingSuratElements = iframeDoc.querySelectorAll('.surat');
    existingSuratElements.forEach(el => {
        el.remove();
    });

    // Membuat wadah untuk class .surat
    const DivSurat = iframeDoc.createElement('div');
    DivSurat.classList.add('surat');
    DivSurat.style.textAlign = 'justify';
    DivSurat.style.lineHeight = '1.6';
    DivSurat.style.margin = '10px 0';

    // Menggabungkan elemen-elemen .arab ke dalam wadah surat tanpa class .arab
    const arabElements = iframeDoc.querySelectorAll('.arab');
    arabElements.forEach(arabEl => {
        // Cloning elemen arab dan menghapus class 'arab'
        const arabClone = arabEl.cloneNode(true);
        arabClone.classList.remove('arab');  // Menghapus class 'arab' agar tidak duplikat

        // Menjaga <br> tetap terlihat
        const brElements = arabClone.querySelectorAll('br');
        brElements.forEach(br => {
            br.style.display = 'inline';  // Menampilkan <br> sebagai baris baru
        });

        // Menambahkan elemen arab yang telah digabungkan ke wadah surat
        DivSurat.appendChild(arabClone);
    });

    // Menyembunyikan elemen selain .judul dan .surat
    iframeDoc.querySelectorAll('.latin, .azam, .arti').forEach(el => {
        el.style.display = 'none';  // Menyembunyikan elemen lainnya
    });

    // Menampilkan hanya class .judul
    const judulElements = iframeDoc.querySelectorAll('.judul');
    judulElements.forEach(judulElement => {
        judulElement.style.display = 'block';  // Pastikan judul terlihat
    });
}

// Event listener untuk menangani konten iframe setelah dimuat
document.getElementById('Badan').addEventListener('load', handleIframeContent);

// Event listener untuk menerima pesan dari iframe
window.addEventListener('message', function (event) {
    if (event.data === 'iframeClick') {
        closeAllMenus();  // Tutup semua menu saat klik di dalam iframe
    }
});