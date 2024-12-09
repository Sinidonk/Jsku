// *** Fungsi Mode Warna ***
    const colorModes = [
        { bg: "white", text: "black" },
        { bg: "url('https://sinidonk.github.io/Gbrku/V1A.jpg')", text: "white", isImage: true },
        { bg: "green", text: "yellow" },
        { bg: "url('https://sinidonk.github.io/Gbrku/V1B.jpg')", text: "black", isImage: true },
        { bg: "blue", text: "white" },
        { bg: "url('https://sinidonk.github.io/Gbrku/V1C.jpg')", text: "black", isImage: true },
        { bg: "brown", text: "gold" },
        { bg: "url('https://sinidonk.github.io/Gbrku/V1D.jpg')", text: "white", isImage: true },
        { bg: "grey", text: "black" },
        { bg: "url('https://sinidonk.github.io/Gbrku/V1E.jpg')", text: "yellow", isImage: true }
    ];

    function toggleColorMode() {
        modeIndex = (modeIndex + 1) % colorModes.length;
        const selectedMode = colorModes[modeIndex];
        const iframeDoc = iframe.contentWindow.document;

        if (selectedMode.isImage) {
            iframeDoc.body.style.backgroundColor = "";
            iframeDoc.body.style.backgroundImage = selectedMode.bg;
            iframeDoc.body.style.backgroundSize = "cover";
            iframeDoc.body.style.backgroundRepeat = "no-repeat";
        } else {
            iframeDoc.body.style.backgroundImage = "";
            iframeDoc.body.style.backgroundColor = selectedMode.bg;
        }

        iframeDoc.body.style.color = selectedMode.text;
        iframeDoc.querySelectorAll("*").forEach(child => child.style.color = selectedMode.text);
    }

    // *** Fungsi Tombol State ***
    function updateButtonState() {
        const backgrounds = [
            "url('https://sinidonk.github.io/Gbrku/icoB.png')", // Azam
            "url('https://sinidonk.github.io/Gbrku/icoC.png')", // Latin
            "url('https://sinidonk.github.io/Gbrku/icoD.png')", // Arti
            "url('https://sinidonk.github.io/Gbrku/icoE.png')", // Semua
            "url('https://sinidonk.github.io/Gbrku/icoA.png')"  // Arab
        ];
        const states = ["Latin", "Arti", "Semua", "Arab", "Azam"];
        const index = states.indexOf(state);

        state = states[(index + 1) % states.length];
        button.style.backgroundImage = backgrounds[(index + 1) % backgrounds.length];
        sendStateToIframe(state);
    }

    // *** Event Listener ***
    MenuToggle.addEventListener('click', toggleMenu);
    button.addEventListener('click', updateButtonState);
    document.getElementById("Mode").addEventListener('click', toggleColorMode);

    // Inisialisasi awal
    button.style.backgroundImage = "url('https://sinidonk.github.io/Gbrku/icoB.png')";
    iframe.style.display = "block";
    sendStateToIframe(state);
});
//Besar Kecil Huruf
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
