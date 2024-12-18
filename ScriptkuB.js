// ** Elemen-elemen utama **
const MenuToggle = document.querySelector('.MenuUtama');
const DMenu = document.querySelector('.DMenu');
const iframe = document.getElementById('Badan');
let isHeaderClicked = false; // Status untuk Header

// ** Fungsi terkait menu utama **
function toggleDMenu() {
    DMenu.classList.toggle('open');
    if (!isHeaderClicked) {
        iframe.classList.toggle('DMenu-open'); // Dorong iframe hanya jika Header tidak diaktifkan
    }
}

function closeDMenu() {
    DMenu.classList.remove('open'); // Tutup menu utama
    if (!isHeaderClicked) {
        iframe.classList.remove('DMenu-open'); // Kembalikan iframe ke posisi semula jika terdorong
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

// ** Fungsi iframe **
function loadcontent(page) {
    if (iframe) {
        iframe.src = page;
        closeDMenu();
    } else {
        console.error("Iframe dengan ID 'Badan' tidak ditemukan.");
    }
}

// ** Event Listener **
// Menu toggle
MenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDMenu();
});

// Klik di luar menu menutup menu dan dropdown
document.addEventListener('click', (e) => {
    if (!DMenu.contains(e.target) && !e.target.closest('.MenuUtama')) {
        closeDMenu(); // Tutup menu
    }
    closeAllDropdowns(); // Tutup semua dropdown
});

// Klik pada item dropdown
document.querySelectorAll('.Menuli.Hsm').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllDropdowns();
        item.classList.toggle('open');
        const SubMenu = item.querySelector('.SubMenu');
        if (SubMenu) SubMenu.classList.toggle('open');
    });
});

// Event pada iframe
iframe.addEventListener('load', () => {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // Menangani dropdown di dalam iframe
    const menuItems = iframeDoc.querySelectorAll('.Menuli.Hsm');
    menuItems.forEach(menuItem => {
        menuItem.addEventListener('click', (e) => {
            e.stopPropagation();

            // Tutup semua dropdown lain
            menuItems.forEach(item => {
                if (item !== menuItem) {
                    item.classList.remove('open');
                    const SubMenu = item.querySelector('.SubMenu');
                    if (SubMenu) SubMenu.classList.remove('open');
                }
            });

            // Toggle dropdown untuk menu yang diklik
            menuItem.classList.toggle('open');
            const SubMenu = menuItem.querySelector('.SubMenu');
            if (SubMenu) SubMenu.classList.toggle('open');
        });
    });

    // Tutup semua dropdown saat klik di luar iframe
    iframeDoc.addEventListener('click', () => {
        closeDMenu();
    });
});

// ** Fungsi untuk toggle Header **
function toggleHeader() {
    isHeaderClicked = !isHeaderClicked; // Toggle status Header
    if (isHeaderClicked) {
        iframe.classList.remove('DMenu-open'); // Hilangkan dorongan ke iframe
    } else {
        if (DMenu.classList.contains('open')) {
            iframe.classList.add('DMenu-open'); // Kembalikan dorongan jika menu terbuka
        }
    }
}

// Event untuk Header
document.querySelector('.Header').addEventListener('click', (e) => {
    toggleHeader();
});
