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

        // Gabungkan elemen arab langsung di tempatnya
        let sibling = judul.nextElementSibling;
        let combinedContent = "";
        let suratInserted = false; // Menandai apakah sudah menyisipkan gabungan surat

        while (sibling && !sibling.classList.contains("judul")) {
            if (sibling.classList.contains("arab")) {
                // Gabungkan konten elemen arab
                combinedContent += sibling.innerHTML + " ";
                sibling.style.display = "none"; // Sembunyikan elemen asli arab
            } else if (sibling.classList.contains("arte")) {
                // Jika ada konten arab yang digabungkan, sisipkan gabungan sebelum elemen arte
                if (combinedContent.trim() && !suratInserted) {
                    let combinedDiv = document.createElement("div");
                    combinedDiv.className = "surat"; // Tambahkan class surat
                    combinedDiv.style.textAlign = "justify";
                    combinedDiv.innerHTML = combinedContent.trim();
                    sibling.parentNode.insertBefore(combinedDiv, sibling); // Sisipkan sebelum arte
                    suratInserted = true;
                    combinedContent = ""; // Reset gabungan
                }

                // Tampilkan elemen arte sesuai posisi aslinya
                sibling.style.display = "block";
            }
            sibling = sibling.nextElementSibling;
        }

        // Jika ada gabungan arab yang belum dimasukkan, tambahkan di akhir sebelum elemen berikutnya
        if (combinedContent.trim() && !suratInserted) {
            let combinedDiv = document.createElement("div");
            combinedDiv.className = "surat"; // Tambahkan class surat
            combinedDiv.style.textAlign = "justify";
            combinedDiv.innerHTML = combinedContent.trim();
            judul.parentNode.insertBefore(combinedDiv, judul.nextElementSibling);
        }
    });

    // Tampilkan elemen-elemen yang diperlukan
    const visibleElements = tampilanElement.querySelectorAll(".judul, .surat, .arte");
    visibleElements.forEach(el => {
        el.style.display = 'block'; // Pastikan elemen-elemen ini ditampilkan
    });
}

// Fungsi untuk menangani pesan yang diterima dari iframe
window.addEventListener("message", function(event) {
    if (event.data === "IframeLoaded") {
        console.log("Pesan diterima dari iframe: IframeLoaded");
        processIframeContent(); // Proses konten setelah iframe dimuat
    }
});
