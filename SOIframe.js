			// Mengirim pesan ke parent window saat ada interaksi dalam iframe (click, scroll, dblclick, touchstart)
if (window.top !== window.self) {
    // Kirim pesan saat ada klik dalam iframe
    document.addEventListener('click', () => {
        parent.postMessage('iframeClick', '*');
    });

    // Kirim pesan saat scroll dalam iframe
    window.addEventListener('scroll', () => {
        parent.postMessage('scrolling', window.location.origin); // Kirim pesan saat scroll
        console.log('Iframe scrolling detected');
    });

    // Kirim pesan saat touch terjadi dalam iframe
    window.addEventListener('touchstart', () => {
        parent.postMessage('scrolling', window.location.origin); // Mengirim pesan untuk touch
        console.log('Iframe touch detected');
    });

    // Kirim pesan saat double-click dalam iframe
    window.addEventListener('dblclick', () => {
        parent.postMessage('doubleClickInIframe', window.location.origin); // Kirim pesan untuk double-click
        console.log('Iframe double-click detected');
    });
}

// Kirim pesan ke halaman utama (parent window) untuk menutup menu saat ada interaksi
        document.addEventListener('click', function() {
            parent.postMessage("closeMenu", "*"); // Mengirim pesan ke halaman utama
        });

//Untuk Loading Iframe
// Kirim pesan ke parent window (halaman utama) setelah konten selesai dimuat
        window.onload = function() {
            // Mengirim pesan ke window induk (halaman utama)
            window.parent.postMessage("IframeLoaded", "*");
        };

//Pesan Pemanggil Clas
// Mendengarkan pesan dari halaman utama
window.addEventListener("message", (event) => {
    if (!event.data || event.data.type !== "updateState") return;

    const state = event.data.state; // Ambil state terbaru
    const tampilanElement = document.getElementById("Tampilan");

    if (!tampilanElement) {
        console.error("Elemen #Tampilan tidak ditemukan.");
        return;
    }

    // Sembunyikan semua elemen terlebih dahulu
    const allElements = tampilanElement.querySelectorAll("*");
    allElements.forEach((el) => (el.style.display = "none"));

    // Menangani state
    if (state === "Azam") {
        showElements(["judul","arte", "arab", "azam"], tampilanElement);
    } else if (state === "Latin") {
        showElements(["judul","arte", "arab", "latin"], tampilanElement);
    } else if (state === "Arti") {
        showElements(["judul","arte", "arab", "arti"], tampilanElement);
    } else if (state === "Semua") {
        showElements(["judul","arte", "arab", "azam", "latin", "arti"], tampilanElement);
    } else if (state === "Arab") {
        combineArabicWithTitle(tampilanElement); // Gabungkan arab saat state Arab
    }
});

// Fungsi untuk menampilkan elemen berdasarkan class
function showElements(classes, parentElement) {
    classes.forEach((className) => {
        const elements = parentElement.getElementsByClassName(className);
        for (const el of elements) {
            el.style.display = "block";
        }
    });
}

// Fungsi untuk menggabungkan tag arab dengan judul
function combineArabicWithTitle(parentElement) {
    const judulElements = parentElement.getElementsByClassName("judul");

    Array.from(judulElements).forEach((judul) => {
        // Pastikan judul tetap terlihat
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
            } else if (sibling.tagName === "BR") {
                // Tambahkan tag <br> yang berdiri sendiri
                combinedContent += "<br>";
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
