// Script untuk Menu
const MenuToggle = document.querySelector('.MenuUtama');
const Menu = document.querySelector('.Menu');
const iframe = document.getElementById('Badan');
const Kepala = document.querySelector('.Kepala');
const Kaki = document.querySelector('.Kaki');

// Fungsi toggle menu utama
function toggleMenu() {
    Menu.classList.toggle('open');
    iframe.classList.toggle('Menu-open');
}

// Fungsi menutup menu utama
function closeMenu() {
    Menu.classList.remove('open');
    iframe.classList.remove('Menu-open');
}

// Fungsi memuat file ke iframe
function loadcontent(page) {
    if (iframe) {
        iframe.src = page; // Mengatur sumber file ke iframe
        closeMenu(); // Menutup menu setelah file dimuat
    } else {
        console.error("Iframe dengan ID 'Badan' tidak ditemukan.");
    }
}

// Fungsi menutup semua dropdown
function closeAllDropdowns() {
    document.querySelectorAll('.Menuli.Hsm').forEach(menu => {
        menu.classList.remove('open');
        const SubMenu = menu.querySelector('.SubMenu');
        if (SubMenu) SubMenu.classList.remove('open');
    });
}

// Menangani klik pada tombol menu utama
MenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Menangani klik pada area luar
document.addEventListener('click', (e) => {
    if (!Menu.contains(e.target) && !e.target.closest('.MenuUtama')) {
        closeMenu();
    }
    closeAllDropdowns(); // Tutup semua dropdown
});

// Menangani pesan dari iframe
window.addEventListener('message', (event) => {
    if (event.data === 'closeMenu') {
        closeMenu();
    }
});

// Menangani klik pada item menu dengan dropdown
document.querySelectorAll('.Menuli.Hsm').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllDropdowns(); // Tutup semua dropdown lain
        item.classList.toggle('open');
        const SubMenu = item.querySelector('.SubMenu');
        if (SubMenu) SubMenu.classList.toggle('open');
    });
});

// Script untuk Kepala dan Kaki
function toggleKepalaKaki(show) {
    Kepala.style.display = show ? 'block' : 'none';
    Kaki.style.display = show ? 'block' : 'none';
}

// Menangani double-click untuk menampilkan Kepala dan Kaki
document.addEventListener('dblclick', () => toggleKepalaKaki(true));

// Mengatur event pada iframe untuk menyembunyikan Kepala dan Kaki
iframe.addEventListener('load', () => {
    const iframeDoc = iframe.contentWindow.document;
    ['scroll', 'click'].forEach(event => iframeDoc.addEventListener(event, () => toggleKepalaKaki(false)));
    iframeDoc.addEventListener('dblclick', () => toggleKepalaKaki(true));
});

// Sembunyikan Kepala dan Kaki saat scroll di dokumen utama
['scroll'].forEach(event => document.addEventListener(event, () => toggleKepalaKaki(false)));
