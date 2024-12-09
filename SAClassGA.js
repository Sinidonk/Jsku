let state = "Azam"; // State awal
const button = document.getElementById("Susun");

// Fungsi kirim state ke iframe
function sendStateToIframe(state) {
    const iframe = document.getElementById("Badan");
    const iframeWindow = iframe.contentWindow;
    console.log(`[DEBUG] Mengirim state ke iframe: ${state}`);
    iframeWindow.postMessage({ type: "updateState", state }, "*");
}

// Fungsi update tombol dan background
function updateButtonState() {
    console.log(`[DEBUG] State sebelum update: ${state}`);
    if (state === "Azam") {
        button.style.backgroundImage = "url('https://sinidonk.github.io/Gbrku/icoC.png')";
        state = "Latin";
    } else if (state === "Latin") {
        button.style.backgroundImage = "url('https://sinidonk.github.io/Gbrku/icoD.png')";
        state = "Arti";
    } else if (state === "Arti") {
        button.style.backgroundImage = "url('https://sinidonk.github.io/Gbrku/icoE.png')";
        state = "Semua";
    } else if (state === "Semua") {
        button.style.backgroundImage = "url('https://sinidonk.github.io/Gbrku/icoA.png')";
        state = "Arab";
    } else if (state === "Arab") {
        button.style.backgroundImage = "url('https://sinidonk.github.io/Gbrku/icoB.png')";
        state = "Azam";
    }
    console.log(`[DEBUG] State setelah update: ${state}`);
    console.log(`[DEBUG] Background tombol saat ini: ${button.style.backgroundImage}`);
}

// Event listener tombol
button.addEventListener("click", () => {
    console.log("Tombol diklik! Event berhasil terdeteksi.");
    sendStateToIframe(state); // Kirim state terbaru ke iframe
    updateButtonState(); // Perbarui state tombol
});

// Saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    console.log("[DEBUG] Halaman dimuat. Inisialisasi...");
    button.style.backgroundImage = "url('https://sinidonk.github.io/Gbrku/icoB.png')"; // Background awal
    document.getElementById("Badan").style.display = "block"; // Menampilkan iframe
    sendStateToIframe(state); // Kirim state awal
    console.log(`[DEBUG] Background tombol awal: ${button.style.backgroundImage}`);
});
