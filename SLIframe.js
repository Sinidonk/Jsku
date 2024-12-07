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

