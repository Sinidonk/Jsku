const Kepala = document.querySelector('.Kepala');
        const Kaki = document.querySelector('.Kaki');
        const iframe = document.getElementById('badan');
        let isVisible = true; // Menandakan apakah Kepala dan Kaki terlihat
        let canToggle = true; // Menandakan apakah interaksi bisa dilakukan

        // Fungsi untuk menyembunyikan Kepala dan Kaki
        function hideKepalaKaki() {
            Kepala.style.transform = 'translateX(-50%) translateY(-100%)'; // Menggeser Kepala ke atas sambil tetap di tengah horizontal
    Kaki.style.transform = 'translateX(-50%) translateY(100%)'; // Menggeser Kaki ke bawah sambil tetap di tengah horizontal
            isVisible = false;
        }

        // Fungsi untuk menampilkan Kepala dan Kaki
        function showKepalaKaki() {
            Kepala.style.transform = 'translateX(-50%) translateY(0)'; // Mengembalikan Kepala ke posisi awal sambil tetap di tengah horizontal
    Kaki.style.transform = 'translateX(-50%) translateY(0)'; // Mengembalikan Kaki ke posisi awal sambil tetap di tengah horizontal
            isVisible = true;
        }

        // Menangani pesan dari iframe
        window.addEventListener('message', (event) => {
            // Hanya proses pesan yang berasal dari iframe
            if (event.origin !== window.location.origin) return;

            if (event.data === 'scrolling' && isVisible && canToggle) {
                hideKepalaKaki();
                canToggle = false; // Menandakan bahwa interaksi telah terjadi, tidak bisa langsung diulang
            }

            // Pesan untuk double-click dalam iframe
            if (event.data === 'doubleClickInIframe') {
                showKepalaKaki();
                canToggle = false; // Menandakan bahwa double-click telah terjadi, tidak bisa langsung diulang
            }
        });

        // Reset status interaksi setelah 2 detik untuk memungkinkan interaksi baru
        setInterval(() => {
            canToggle = true; // Reset agar interaksi dapat dilakukan ulang
        }, 1000); // Reset status setiap 2 detik
