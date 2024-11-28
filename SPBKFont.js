
// Fungsi untuk mendapatkan ukuran font saat ini
 function getCurrentFontSize(element) {
 const computedStyle = window.getComputedStyle(element);
 return parseFloat(computedStyle.fontSize); // Ambil ukuran font yang sedang tampil
 }

 // Inisialisasi ukuran font saat ini
 let currentFontSize = getCurrentFontSize(document.getElementById('Badan'));
 const minFontSize = 2; // Batas minimum ukuran font

 // Event listener untuk memBesar teks tanpa batas
 document.getElementById('Besar').addEventListener('click', () => {
 const Badan = document.getElementById('Badan');
 const childElements = Badan.querySelectorAll('*');
 
 childElements.forEach(child => {
 const isRtlText = child.classList.contains('rtl-text');
 let fontSize = getCurrentFontSize(child);
 
 // Jika elemen bukan teks Arab atau sudah lebih kecil, Besar
 if (!isRtlText || fontSize < 30) { // Jika ukuran font Arab < 30px, lanjutkan memBesar
 fontSize += 2;
 child.style.fontSize = fontSize + 'px';
 }
 });
 });
        
 // Event listener untuk memKecil teks
 document.getElementById('Kecil').addEventListener('click', () => {
 const Badan = document.getElementById('Badan');
 const childElements = Badan.querySelectorAll('*');
 
 childElements.forEach(child => {
 const isRtlText = child.classList.contains('rtl-text');
 let fontSize = getCurrentFontSize(child);
 
 // Jangan Kecil teks Arab yang sudah lebih besar dari ukuran minimal
 if (!isRtlText || fontSize > 30) { // Jika teks Arab lebih besar dari 30px, lanjutkan memKecil
 if (fontSize > minFontSize) {
 fontSize -= 2;
 child.style.fontSize = fontSize + 'px';
 }
 }
 });
 });
