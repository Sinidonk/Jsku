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
