//Membaca Kepala Dan Kaki
 let lastScrollTop = 0;
 const Kepala = document.querySelector('.Kepala');
 const Kaki = document.querySelector('.Kaki');
 let hasScrolledOnce = false; 
 let isVisible = true;
 const Badan = document.querySelector('.Badan');

// Pastikan elemen Kepala dan Kaki selalu berada di tengah secara horizontal
Kepala.style.position = 'fixed';
Kepala.style.left = '50%';
Kepala.style.transform = 'translateX(-50%) translateY(0)'; // Awalnya terlihat
Kaki.style.position = 'fixed';
Kaki.style.left = '50%';
Kaki.style.transform = 'translateX(-50%) translateY(0)'; // Awalnya terlihat

 // Fungsi untuk menyembunyikan Kepala/Kaki Di File Utama
function hideKepalaKaki() {
    Kepala.style.transform = 'translateX(-50%) translateY(-100%)'; // Menggeser Kepala ke atas sambil tetap di tengah horizontal
    Kaki.style.transform = 'translateX(-50%) translateY(100%)'; // Menggeser Kaki ke bawah sambil tetap di tengah horizontal
    isVisible = false;
}

 // Fungsi untuk menampilkan Kepala/Kaki
function showKepalaKaki() {
    Kepala.style.transform = 'translateX(-50%) translateY(0)'; // Mengembalikan Kepala ke posisi awal sambil tetap di tengah horizontal
    Kaki.style.transform = 'translateX(-50%) translateY(0)'; // Mengembalikan Kaki ke posisi awal sambil tetap di tengah horizontal
    isVisible = true;
}

 // Fungsi untuk menangani scroll dan sentuhan ke atas/bawah
 function handleInteraction() {
 let currentScroll = Badan.scrollTop;

 // Sembunyikan Kepala dan kaki jika ada interaksi (scroll atau sentuhan)
 if (isVisible) {
 hideKepalaKaki();
 }

 // Update posisi scroll terakhir
 lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
 }

 // Event listener untuk scroll pada elemen Badan
 Badan.addEventListener('scroll', handleInteraction);

 // Event listener untuk sentuhan pada Badan
 Badan.addEventListener('touchstart', handleInteraction);

 // Event listener untuk double-click untuk menampilkan Kepala/Kaki kembali
 window.addEventListener('dblclick', () => {
 if (!isVisible) {
 showKepalaKaki();
 // Mengizinkan interaksi (scroll atau sentuhan) untuk menyembunyikan lagi
 Badan.addEventListener('scroll', handleInteraction);
 Badan.addEventListener('touchstart', handleInteraction);
 }
 });
 
  
  

