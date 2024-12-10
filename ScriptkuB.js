// Elemen-elemen utama
const MenuToggle = document.querySelector('.MenuUtama');
const DMenu = document.querySelector('.DMenu');
const iframe = document.getElementById('Badan');
const Kepala = document.querySelector('.Kepala');
const Kaki = document.querySelector('.Kaki');

// Fungsi toggle menu utama
function toggleDMenu() {
    DMenu.classList.toggle('open');
    iframe.classList.toggle('DMenu-open');
}

// Fungsi menutup menu utama
function closeDMenu() {
    DMenu.classList.remove('open');
    iframe.classList.remove('DMenu-open');
}

// Fungsi menutup semua dropdown
function closeAllDropdowns() {
    document.querySelectorAll('.Menuli.Hsm').forEach(menu => {
        menu.classList.remove('open');
        const SubMenu = menu.querySelector('.SubMenu');
        if (SubMenu) SubMenu.classList.remove('open');
    });
}

// Fungsi memuat file ke iframe
function loadcontent(page) {
    if (iframe) {
        iframe.src = page;
        closeDMenu();
    } else {
        console.error("Iframe dengan ID 'Badan' tidak ditemukan.");
    }
}

// Fungsi toggle tampilan Kepala dan Kaki
function toggleKepalaKaki(show) {
    Kepala.style.display = show ? 'block' : 'none';
    Kaki.style.display = show ? 'block' : 'none';
}

// Event Listener
MenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDMenu();
});

document.addEventListener('click', (e) => {
    if (!DMenu.contains(e.target) && !e.target.closest('.MenuUtama')) {
        closeDMenu();
    }
    closeAllDropdowns();
});

// Tambahkan event listener ke iframe untuk mendeteksi klik di dalam iframe
iframe.addEventListener('load', () => {
    const iframeDoc = iframe.contentWindow.document;

    // Tutup DMenu jika ada klik di iframe
    iframeDoc.addEventListener('click', () => {
        closeDMenu();
    });

    // Event tambahan untuk toggle Kepala dan Kaki
    ['scroll', 'click'].forEach(event => iframeDoc.addEventListener(event, () => toggleKepalaKaki(false)));
    iframeDoc.addEventListener('dblclick', () => toggleKepalaKaki(true));
});

document.querySelectorAll('.Menuli.Hsm').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllDropdowns();
        item.classList.toggle('open');
        const SubMenu = item.querySelector('.SubMenu');
        if (SubMenu) SubMenu.classList.toggle('open');
    });
});

document.addEventListener('dblclick', () => toggleKepalaKaki(true));
['scroll'].forEach(event => document.addEventListener(event, () => toggleKepalaKaki(false)));

window.addEventListener('message', (event) => {
    if (event.data === 'closeDMenu') {
        closeDMenu();
    }
});
// Script Baru

let isHeaderClicked = false; // Status apakah Header sudah diklik

// Fungsi untuk mengatur status Header
function toggleHeader() {
    isHeaderClicked = !isHeaderClicked; // Toggle status Header
    console.log("Header clicked:", isHeaderClicked);
}

// Fungsi untuk mengontrol menu
function MenuUtama() {
    const DMenu = document.getElementById('DMenu');
    const badan = document.getElementById('Badan');

    if (isHeaderClicked) {
        // Jika Header sudah diklik, menu tidak mendorong badan
        if (DMenu.style.left === '0px') {
            // Sembunyikan menu
            DMenu.style.left = '-215px';
        } else {
            // Tampilkan menu tanpa mendorong badan
            DMenu.style.left = '0px';
        }
        // Pastikan margin badan tidak berubah
        badan.style.marginLeft = '0';
    } else {
        // Jika Header belum diklik, menu mendorong badan
        if (DMenu.style.left === '0px') {
            // Sembunyikan menu
            DMenu.style.left = '-215px';
            badan.style.marginLeft = '0'; // Kembalikan posisi badan
        } else {
            // Tampilkan menu dan dorong badan
            DMenu.style.left = '0px';
            badan.style.marginLeft = '200px'; // Geser badan ke kanan
        }
    }
}


