

// Fungsi untuk mengganti background dan teks di dalam iframe
const colorModes = [
  { bg: "white", text: "black" }, // Default
  { bg: "url('https://sinidonk.github.io/Gbrku/V1A.jpg')", text: "white", isImage: true }, // Background-image 1
  { bg: "green", text: "yellow" }, // Hijau dan kuning
  { bg: "url('https://sinidonk.github.io/Gbrku/V1B.jpg')", text: "black", isImage: true }, // Background-image 2
  { bg: "blue", text: "white" }, // Biru dan putih
  { bg: "url('https://sinidonk.github.io/Gbrku/V1C.jpg')", text: "black", isImage: true }, // Background-image 3
  { bg: "brown", text: "gold" }, // Coklat dan emas
  { bg: "url('https://sinidonk.github.io/Gbrku/V1D.jpg')", text: "white", isImage: true }, // Background-image 4
  { bg: "grey", text: "black" }, // Abu-abu dan hitam
  { bg: "url('https://sinidonk.github.io/Gbrku/V1E.jpg')", text: "yellow", isImage: true } // Background-image 5
];

let modeIndex = 0; // Indeks awal untuk mode warna

// Event listener untuk mode warna
document.getElementById("Mode").addEventListener("click", () => {
  const iframe = document.getElementById("Badan");
  const iframeDocument = iframe.contentWindow.document; // Mengakses konten di dalam iframe

  modeIndex = (modeIndex + 1) % colorModes.length; // Loop kembali ke awal setelah mode terakhir
  const selectedMode = colorModes[modeIndex];

  if (selectedMode.isImage) {
    // Jika mode adalah background image
    iframeDocument.body.style.backgroundColor = ""; // Reset background color
    iframeDocument.body.style.backgroundImage = selectedMode.bg; // Set background image
    iframeDocument.body.style.backgroundSize = "cover"; // Supaya gambar penuh
    iframeDocument.body.style.backgroundRepeat = "no-repeat"; // Jangan ulang gambar
    iframeDocument.body.style.backgroundAttachment = "fixed"; // Tambahkan agar background tetap saat scrolling
  } else {
    // Jika mode adalah background color
    iframeDocument.body.style.backgroundImage = ""; // Reset background image
    iframeDocument.body.style.backgroundColor = selectedMode.bg; // Set background color
    iframeDocument.body.style.backgroundAttachment = ""; // Reset background attachment
  }

  // Ubah warna teks di dalam iframe
  iframeDocument.body.style.color = selectedMode.text;

  // Ubah warna teks semua elemen anak dalam iframe
  const childElements = iframeDocument.querySelectorAll("*");
  childElements.forEach(child => {
    child.style.color = selectedMode.text; // Mengubah warna teks
  });
});

// Fungsi untuk menampilkan iframe setelah tombol Panggil diklik
function tampilkanIframe() {
  document.getElementById("Badan").style.display = "block"; // Menampilkan iframe
}

// Event listener untuk tombol Panggil
document.getElementById("Mode").addEventListener("click", tampilkanIframe);

