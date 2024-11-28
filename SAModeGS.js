// Fungsi untuk mengganti background dan teks di dalam iframe
const colorModes = [
 { bg: 'white', text: 'black' }, // Default
 { bg: 'url(assets/View1.png)', text: 'yellow', isImage: true }, // Background-image 1
 { bg: 'black', text: 'white' }, // Hitam dan putih
 { bg: 'url(assets/View2.png)', text: 'black', isImage: true }, // Background-image 2
 { bg: 'green', text: 'yellow' }, // Hijau dan kuning
 { bg: 'url(assets/View3.png)', text: 'black', isImage: true }, // Background-image 3
 { bg: 'purple', text: 'pink' }, // Ungu dan pink
 { bg: 'url(assets/View4.png)', text: 'blue', isImage: true }, // Background-image 4
 { bg: 'red', text: 'black' }, // Merah dan hitam
 { bg: 'url(assets/View5.png)', text: 'black', isImage: true } // Background-image 5
];

let modeIndex = 0; // Indeks awal untuk mode warna

// Event listener untuk mode warna
document.getElementById('Mode').addEventListener('click', () => {
 const iframe = document.getElementById('Badan');
 const iframeDocument = iframe.contentWindow.document; // Mengakses konten di dalam iframe

 modeIndex = (modeIndex + 1) % colorModes.length; // Loop kembali ke awal setelah mode terakhir
 const selectedMode = colorModes[modeIndex];

 if (selectedMode.isImage) {
 // Jika mode adalah background image
 iframeDocument.body.style.backgroundColor = ''; // Reset background color
 iframeDocument.body.style.backgroundImage = selectedMode.bg; // Set background image
 iframeDocument.body.style.backgroundSize = 'cover'; // Supaya gambar penuh
 iframeDocument.body.style.backgroundRepeat = 'no-repeat'; // Jangan ulang gambar
 } else {
 // Jika mode adalah background color
 iframeDocument.body.style.backgroundImage = ''; // Reset background image
 iframeDocument.body.style.backgroundColor = selectedMode.bg; // Set background color
 }

 // Ubah warna teks di dalam iframe
 iframeDocument.body.style.color = selectedMode.text;

 // Ubah warna teks semua elemen anak dalam iframe
 const childElements = iframeDocument.querySelectorAll('*');
 childElements.forEach(child => {
 child.style.color = selectedMode.text; // Mengubah warna teks
 });
});

// Fungsi untuk menampilkan iframe setelah tombol Panggil diklik
function tampilkanIframe() {
 document.getElementById('Badan').style.display = 'block'; // Menampilkan iframe
}

// Event listener untuk tombol Panggil
document.getElementById('Mode').addEventListener('click', tampilkanIframe);