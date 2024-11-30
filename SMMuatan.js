// Fungsi untuk mengontrol visibilitas elemen muatan
function Kunci(idMuatan, tombol) {
    console.log(`Fungsi Kunci dipanggil untuk: ${idMuatan}`);

    // Dapatkan dokumen target (halaman utama atau iframe)
    const targetDocument = getTargetDocument();

    const muatan = targetDocument.getElementById(idMuatan);
    if (!muatan) {
        console.error(`Muatan dengan ID ${idMuatan} tidak ditemukan.`);
        return;
    }

    // Toggle visibilitas elemen muatan
    muatan.style.display = muatan.style.display === "none" ? "block" : "none";

    // Toggle teks tombol
    tombol.textContent = tombol.textContent === "Buka" ? "Tutup" : "Buka";
}

// Fungsi untuk mendapatkan dokumen target (halaman utama atau iframe)
function getTargetDocument() {
    const iframe = document.getElementById('Badan'); // ID iframe, ubah jika diperlukan
    return iframe?.contentWindow?.document || document; // Gunakan konten iframe jika ada, jika tidak gunakan dokumen utama
}

// Menyembunyikan semua elemen muatan saat halaman atau iframe dimuat
document.addEventListener("DOMContentLoaded", () => {
    const targetDocument = getTargetDocument();

    targetDocument.querySelectorAll(".muatan").forEach(muatan => {
        muatan.style.display = "none"; // Sembunyikan semua elemen dengan kelas "muatan"
    });
});

