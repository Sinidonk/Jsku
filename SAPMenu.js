// Fungsi untuk toggle menu utama
function MenuUtama() {
    const SubMenu1 = document.getElementById('SubMenu1');
    if (SubMenu1) {
        SubMenu1.classList.toggle('open');
    }
}

// Fungsi untuk menangani pemilihan menu (Terpilih) dan mengganti src iframe
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
function toggleSubMenu(event, submenuId) {
    event.stopPropagation();
    const submenu = document.getElementById(submenuId);
    const panah = event.target.querySelector('.Tpanah');
    if (submenu) {
        const isVisible = submenu.style.display === "block";
        submenu.style.display = isVisible ? "none" : "block";
        if (panah) {
            panah.innerHTML = isVisible ? "&#9654;" : "&#9660;";
        }
    }
}

// Fungsi untuk menutup semua menu saat klik di luar menu
function closeAllMenus() {
    document.querySelectorAll('.Terpilih').forEach(sub => {
        sub.style.display = "none";
        const panah = sub.previousElementSibling?.querySelector('.Tpanah');
        if (panah) panah.innerHTML = "&#9654;";
    });

    const SubMenu1 = document.getElementById('SubMenu1');
    if (SubMenu1) {
        SubMenu1.classList.remove('open');
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

    // Pastikan elemen .surat tidak ada sebelumnya sebelum menambahkannya
    const existingSuratContainer = iframeDoc.querySelector('.surat');
    if (existingSuratContainer) {
        return; // Menghindari pembuatan duplikat, keluar jika sudah ada
    }

    // Menghapus elemen .surat jika ada
    const existingSuratElements = iframeDoc.querySelectorAll('.surat');
    existingSuratElements.forEach(el => {
        el.remove();
    });

    // Membuat wadah untuk class .surat
    const suratContainer = iframeDoc.createElement('div');
    suratContainer.classList.add('surat');
    suratContainer.style.textAlign = 'justify';
    suratContainer.style.lineHeight = '1.6';
    suratContainer.style.margin = '10px 0';

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
        suratContainer.appendChild(arabClone);
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