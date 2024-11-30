const Kepala = document.querySelector('.Kepala');
const Kaki = document.querySelector('.Kaki');
let isVisible = false; // Elemen mulai dalam keadaan tersembunyi

// Fungsi untuk menyembunyikan Kepala dan Kaki
function hideKepalaKaki() {
    Kepala.style.transform = 'translateX(-50%) translateY(-100%)'; // Menyembunyikan Kepala
    Kaki.style.transform = 'translateX(-50%) translateY(100%)';    // Menyembunyikan Kaki
    isVisible = false;
}

// Fungsi untuk menampilkan Kepala dan Kaki
function showKepalaKaki() {
    Kepala.style.transform = 'translateX(-50%) translateY(0)';    // Menampilkan Kepala
    Kaki.style.transform = 'translateX(-50%) translateY(0)';      // Menampilkan Kaki
    isVisible = true;
}

// Awalnya sembunyikan elemen
hideKepalaKaki();

// Event listener untuk menerima pesan dari iframe
window.addEventListener('message', (event) => {
    // Verifikasi pesan yang datang hanya dari iframe yang benar
    if (event.origin !== window.location.origin) return;

    // Pesan untuk scrolling dalam iframe
    if (event.data === 'scrolling' && isVisible) {
        hideKepalaKaki(); // Menyembunyikan elemen jika menerima pesan "scrolling"
    }

    // Pesan untuk double-click dalam iframe
    if (event.data === 'doubleClickInIframe') {
        showKepalaKaki(); // Menampilkan elemen jika menerima pesan "doubleClickInIframe"
    }
});

// Event listener untuk double-click pada layar
document.addEventListener('dblclick', () => {
    if (isVisible) {
        hideKepalaKaki(); // Jika elemen terlihat, sembunyikan
    } else {
        showKepalaKaki(); // Jika elemen tersembunyi, tampilkan
    }
});

// Event listener untuk scroll pada layar
window.addEventListener('scroll', () => {
    if (isVisible) {
        hideKepalaKaki(); // Sembunyikan elemen saat scroll pada halaman utama
    }
});