//Script untuk Menu 
 const MenuToggle = document.querySelector('.MenuUtama');
 const Menu = document.querySelector('.Menu');
 const iframe = document.getElementById('Badan');

 function MenuUtama() {
 Menu.classList.toggle('open');
 iframe.classList.toggle('Menu-open');
 }

 function toggleSubMenu(el, SubMenuId) {
 const allSubMenus = document.querySelectorAll('.SubMenu');
 allSubMenus.forEach(SubMenu => {
 if (SubMenu.id !== SubMenuId) {
 SubMenu.classList.remove('open');
 }
 });
 const SubMenu = document.getElementById(SubMenuId);
 SubMenu.classList.toggle('open');
 }

 function loadcontent(page) {
 iframe.src = page;
 closeMenu();
 }

 function closeMenu() {
 Menu.classList.remove('open');
 iframe.classList.remove('Menu-open');
 }

 document.addEventListener('click', (e) => {
 if (!Menu.contains(e.target) && !e.target.classList.contains('MenuUtama') && !e.target.closest('.Menu') && !e.target.closest('#Badan')) {
 closeMenu();
 }
 });

 window.addEventListener("message", function(event) {
 if (event.data === "closeMenu") {
 closeMenu();
 }
 });

document.querySelectorAll('.Menu li.has-SubMenu').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation(); // Mencegah bubbling agar tidak memengaruhi elemen lain
        item.classList.toggle('open'); // Tambahkan atau hapus kelas `open`
        
        // Buka atau tutup sub-Menu
        const SubMenu = item.querySelector('.SubMenu');
        if (SubMenu) {
            SubMenu.classList.toggle('open');
        }
    });
});

 // Script untuk Kepala dan Kaki
 const Kepala = document.querySelector('.Kepala');
 const Kaki = document.querySelector('.Kaki');

 function showKepalaKaki() {
 Kepala.style.display = 'block';
 Kaki.style.display = 'block';
 }

 function hideKepalaKaki() {
 Kepala.style.display = 'none';
 Kaki.style.display = 'none';
 }

 document.addEventListener('dblclick', showKepalaKaki);

 iframe.addEventListener('load', () => {
 const iframeDoc = iframe.contentWindow.document;
 iframeDoc.addEventListener('scroll', hideKepalaKaki);
 iframeDoc.addEventListener('click', hideKepalaKaki);
 iframeDoc.addEventListener('dblclick', showKepalaKaki);
 });

 document.addEventListener('scroll', hideKepalaKaki);
 iframe.addEventListener('click', hideKepalaKaki);

// Script Agar Iframe Punya Kendali Sendiri

// Fungsi untuk memproses konten dalam iframe setelah dimuat
        function processIframeContent() {
            const iframe = document.getElementById('Badan');
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            const tampilanElement = iframeDocument.getElementById('Tampilan');

            if (!tampilanElement) {
                console.error("Elemen #Tampilan tidak ditemukan dalam iframe.");
                return;
            }

            // Sembunyikan semua elemen dalam #Tampilan terlebih dahulu
            const allElements = tampilanElement.querySelectorAll('*');
            allElements.forEach(el => {
                el.style.display = 'none'; // Sembunyikan semua elemen
            });

            // Ambil semua elemen judul dalam #Tampilan
            const judulElements = tampilanElement.querySelectorAll(".judul");

            judulElements.forEach(judul => {
                // Tampilkan elemen judul
                judul.style.display = "block";

                // Buat div gabungan untuk elemen arab
                let combinedDiv = document.createElement("div");
                combinedDiv.className = "surat"; // Tambahkan class surat
                combinedDiv.style.textAlign = "justify";

                let sibling = judul.nextElementSibling;
                let combinedContent = "";

                // Gabungkan semua elemen arab di bawah judul
                while (sibling && !sibling.classList.contains("judul")) {
                    if (sibling.classList.contains("arab")) {
                        combinedContent += sibling.innerHTML + " "; // Gabungkan teks arab
                        sibling.style.display = "none"; // Sembunyikan elemen asli arab
                    }
                    sibling = sibling.nextElementSibling;
                }

                // Masukkan gabungan arab ke dalam div surat
                if (combinedContent.trim()) {
                    combinedDiv.innerHTML = combinedContent.trim();
                    judul.insertAdjacentElement("afterend", combinedDiv); // Tempelkan surat setelah judul
                }
            });

            // Tampilkan hanya judul dan surat yang sudah digabungkan
            const visibleElements = tampilanElement.querySelectorAll(".judul, .surat");
            visibleElements.forEach(el => {
                el.style.display = 'block'; // Pastikan hanya judul dan surat yang ditampilkan
            });
        }

        // Fungsi untuk menangani pesan yang diterima dari iframe
        window.addEventListener("message", function(event) {
            if (event.data === "IframeLoaded") {
                console.log("Pesan diterima dari iframe: IframeLoaded");
                processIframeContent(); // Proses konten setelah iframe dimuat
            }
        });

// Fungsi untuk mendapatkan ukuran font saat ini
        function getCurrentFontSize(element) {
            const computedStyle = window.getComputedStyle(element);
            return parseFloat(computedStyle.fontSize); // Ambil ukuran font yang sedang tampil
        }

        // Inisialisasi ukuran font saat ini
        let currentFontSize = 16; // Default font size
        const minFontSize = 2; // Batas minimum ukuran font

        // Fungsi untuk menangani perubahan ukuran font di dalam iframe
        function adjustFontSizeInIframe(increase) {
            const iframeDocument = document.getElementById('Badan').contentWindow.document;
            const childElements = iframeDocument.querySelectorAll('*');
            
            childElements.forEach(child => {
                const isRtlText = child.classList.contains('rtl-text');
                let fontSize = getCurrentFontSize(child);
                
                // Jika elemen bukan teks Arab atau sudah lebih kecil, sesuaikan ukuran font
                if (!isRtlText || fontSize < 30) { 
                    if (increase) {
                        fontSize += 2; // Besarkan font
                    } else {
                        if (fontSize > minFontSize) {
                            fontSize -= 2; // Perkecil font
                        }
                    }
                    child.style.fontSize = fontSize + 'px';
                }
            });
        }

        // Event listener untuk memBesar teks di dalam iframe
        document.getElementById('Besar').addEventListener('click', () => {
            adjustFontSizeInIframe(true); // Besarkan font
        });

        // Event listener untuk memKecil teks di dalam iframe
        document.getElementById('Kecil').addEventListener('click', () => {
            adjustFontSizeInIframe(false); // Perkecil font
        });

        // Fungsi untuk menampilkan iframe setelah tombol Panggil diklik
        function tampilkanIframe() {
            document.getElementById('Badan').style.display = 'block'; // Menampilkan iframe
        }

        // Event listener untuk tombol Panggil
        document.getElementById('panggilBtn').addEventListener('click', tampilkanIframe);


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

// Script untuk mengatur pergantian iframe (utama)
        let iframeIndex = 0;
        const iframe1 = document.getElementById('iframe1');
        const iframe2 = document.getElementById('iframe2');

        function toggleIframes() {
            if (iframeIndex === 0) {
                iframe1.style.display = 'block';
                iframe2.style.display = 'none';
                iframeIndex = 1;
            } else {
                iframe1.style.display = 'none';
                iframe2.style.display = 'block';
                iframeIndex = 0;
            }
        }

        // Set interval untuk mengganti iframe setiap 10d (10000 ms)
        setInterval(toggleIframes, 10000);

let state = "Azam"; // State awal
const button = document.getElementById("Susun");

// Fungsi kirim state ke iframe
function sendStateToIframe(state) {
    const iframe = document.getElementById("Badan");
    const iframeWindow = iframe.contentWindow;
    console.log(`[DEBUG] Mengirim state ke iframe: ${state}`);
    iframeWindow.postMessage({ type: "updateState", state }, "*");
}

// Fungsi update tombol dan background
function updateButtonState() {
    console.log(`[DEBUG] State sebelum update: ${state}`);
    if (state === "Azam") {
        button.style.backgroundImage = "url('https://sinidonk.github.io/Gbrku/icoC.png')";
        state = "Latin";
    } else if (state === "Latin") {
        button.style.backgroundImage = "url('https://sinidonk.github.io/Gbrku/icoD.png')";
        state = "Arti";
    } else if (state === "Arti") {
        button.style.backgroundImage = "url('https://sinidonk.github.io/Gbrku/icoE.png')";
        state = "Semua";
    } else if (state === "Semua") {
        button.style.backgroundImage = "url('https://sinidonk.github.io/Gbrku/icoA.png')";
        state = "Arab";
    } else if (state === "Arab") {
        button.style.backgroundImage = "url('https://sinidonk.github.io/Gbrku/icoB.png')";
        state = "Azam";
    }
    console.log(`[DEBUG] State setelah update: ${state}`);
    console.log(`[DEBUG] Background tombol saat ini: ${button.style.backgroundImage}`);
}

// Event listener tombol
button.addEventListener("click", () => {
    console.log("Tombol diklik! Event berhasil terdeteksi.");
    sendStateToIframe(state); // Kirim state terbaru ke iframe
    updateButtonState(); // Perbarui state tombol
});

// Saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    console.log("[DEBUG] Halaman dimuat. Inisialisasi...");
    button.style.backgroundImage = "url('https://sinidonk.github.io/Gbrku/icoB.png')"; // Background awal
    document.getElementById("Badan").style.display = "block"; // Menampilkan iframe
    sendStateToIframe(state); // Kirim state awal
    console.log(`[DEBUG] Background tombol awal: ${button.style.backgroundImage}`);
});
