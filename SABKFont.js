

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