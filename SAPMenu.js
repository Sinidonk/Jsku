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
