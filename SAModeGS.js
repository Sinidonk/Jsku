// Fungsi untuk mengganti background dan teks di dalam iframe dan body utama
const colorModes = [
  { bg: 'white', text: 'black' }, // Default
  { bg: 'url(Gbr/V1A.jpg)', text: 'white', isImage: true }, // Background-image 1
  { bg: 'green', text: 'yellow' }, // Hijau dan kuning
  { bg: 'url(Gbr/V1B.jpg)', text: 'black', isImage: true }, // Background-image 2
  { bg: 'blue', text: 'white' }, // Biru dan putih
  { bg: 'url(Gbr/V1C.jpg)', text: 'black', isImage: true }, // Background-image 3
  { bg: 'brown', text: 'gold' }, // Coklat dan emas
  { bg: 'url(Gbr/V1D.jpg)', text: 'white', isImage: true }, // Background-image 4
  { bg: 'grey', text: 'black' }, // Abu-abu dan hitam
  { bg: 'url(Gbr/V1E.jpg)', text: 'yellow', isImage: true } // Background-image 5
];

let modeIndex = 0; // Indeks awal untuk mode warna

// Fungsi untuk mengubah background dan teks di dalam iframe dan body utama
function changeBackgroundAndText() {
  const iframe = document.getElementById('Badan');
  const iframeDocument = iframe.contentWindow.document; // Mengakses konten di dalam iframe
  const selectedMode = colorModes[modeIndex];

  // Ubah background dan teks di body utama (halaman utama)
  if (selectedMode.isImage) {
    document.body.style.backgroundColor = ''; // Reset background color
    document.body.style.backgroundImage = selectedMode.bg; // Set background image
    document.body.style.backgroundSize = 'cover'; // Supaya gambar penuh
    document.body.style.backgroundRepeat = 'no-repeat'; // Jangan ulang gambar
    document.body.style.backgroundAttachment = 'fixed'; // Tambahkan agar background tetap saat scrolling
  } else {
    document.body.style.backgroundImage = ''; // Reset background image
    document.body.style.backgroundColor = selectedMode.bg; // Set background color
    document.body.style.backgroundAttachment = ''; // Reset background attachment
  }
  document.body.style.color = selectedMode.text; // Ubah warna teks di body utama

  // Ubah background dan teks di dalam iframe
  if (selectedMode.isImage) {
    iframeDocument.body.style.backgroundColor = ''; // Reset background color
    iframeDocument.body.style.backgroundImage = selectedMode.bg; // Set background image
    iframeDocument.body.style.backgroundSize = 'cover'; // Supaya gambar penuh
    iframeDocument.body.style.backgroundRepeat = 'no-repeat'; // Jangan ulang gambar
    iframeDocument.body.style.backgroundAttachment = 'fixed'; // Tambahkan agar background tetap saat scrolling
  } else {
    iframeDocument.body.style.backgroundImage = ''; // Reset background image
    iframeDocument.body.style.backgroundColor = selectedMode.bg; // Set background color
    iframeDocument.body.style.backgroundAttachment = ''; // Reset background attachment
  }
  iframeDocument.body.style.color = selectedMode.text; // Ubah warna teks di dalam iframe

  // Ubah warna teks semua elemen anak dalam iframe
  const childElements = iframeDocument.querySelectorAll('*');
  childElements.forEach(child => {
    child.style.color = selectedMode.text; // Mengubah warna teks
  });
}

// Event listener untuk mode warna
document.getElementById('Mode').addEventListener('click', () => {
  modeIndex = (modeIndex + 1) % colorModes.length; // Loop kembali ke awal setelah mode terakhir
  changeBackgroundAndText(); // Panggil fungsi untuk mengubah background dan teks
});

// Fungsi untuk menampilkan iframe setelah tombol Panggil diklik
function tampilkanIframe() {
  document.getElementById('Badan').style.display = 'block'; // Menampilkan iframe
}

// Event listener untuk tombol Panggil
document.getElementById('panggilBtn').addEventListener('click', tampilkanIframe);
