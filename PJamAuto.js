// Tambahkan CSS agar semua elemen tampil di tengah
var css = `
body {
    margin: 0;
    display: flex;
    justify-content: top;
    align-items: center;
    flex-direction: column; /* Atur elemen dari atas ke bawah */
    height: 100vh;
    background-color: black;
}

#BodyJam {
    position: relative;
    background: url('Gbr/Jamku.png') no-repeat center/cover;
    border: 5px double yellow;
    border-radius: 50%;
    margin: auto;
    height: 150px;
    width: 150px;
}

#JJam, #JMenit, #JDetik, .JDot {
    position: absolute;
    transform-origin: bottom;
    opacity: 0.8;
}

#JJam {
    background: red;
    border-radius: 30px 30px 5px 5px;
    border: 1px solid white;
    height: 25%;
    width: 4%;
    top: 25%;
    left: 48.63%;
}

#JMenit {
    background: blue;
    border-radius: 10px;
    border: 1px solid white;
    height: 32%;
    width: 3%;
    top: 18%;
    left: 49%;
}

#JDetik {
    background: yellow;
    border-radius: 5px;
    border: 1px solid white;
    height: 36%;
    width: 1.5%;
    top: 14%;
    left: 49.8%;
}

.JDot {
    background: yellow;
    border-radius: 50%;
    border: 1px solid black;
    height: 5%;
    width: 5%;
    top: 48%;
    left: 48%;
}

.Jd, .Hi, .Ma, .Kj {
    font-family: sans-serif;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    margin: 1px 0;
}

.Jd { color: white; font-size: 18px; }
.Hi { color: red; }
.Ma { color: blue; }
.Kj { color: yellow; }
`;

// Tambahkan CSS ke dalam halaman
var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = css;
document.head.appendChild(styleSheet);

// Tambahkan elemen ke halaman
var container = document.createElement("div");
container.innerHTML = `
    <div id="BodyJam">
        <div id="JJam"></div>
        <div id="JMenit"></div>
        <div id="JDetik"></div>
        <div class="JDot"></div>
    </div>
    <div class="Jd" id="jamDigital"></div>
    <div class="Hi" id="Hijriah"></div>
    <div class="Ma" id="Masehi"></div>
    <div class="Kj" id="Kejawen"></div>
`;
document.body.appendChild(container);

// Script jam analog dan digital (gunakan script yang sebelumnya sudah berfungsi)
// Script untuk Jam Analog
var hour = document.getElementById("JJam");
var minute = document.getElementById("JMenit");
var seconds = document.getElementById("JDetik");

setInterval(function clock() {
    var now = new Date();
    hour.style.transform = "rotate(" + (now.getHours() * 30 + now.getMinutes() / 2) + "deg)";
    minute.style.transform = "rotate(" + (now.getMinutes() * 6) + "deg)";
    seconds.style.transform = "rotate(" + (now.getSeconds() * 6) + "deg)";
}, 1000);

// Jam Digital
function tampilkanJam() {
    const now = new Date();
    const waktuWIB = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} WIB`;
    document.getElementById('jamDigital').textContent = waktuWIB;
    setTimeout(tampilkanJam, 1000);
}
tampilkanJam();

// Tahun Hijriah
function gmod(a, t) {
    return (a % t + t) % t;
}
function kuwaiticalendar(adjust) {
    var today = new Date();
    if (adjust) today = new Date(today.getTime() + 86400000 * adjust);
    var jd = Math.floor(today / 86400000 + 2440587.5);
    var iyear = 10631.0 / 30.0;
    var epochastro = 1948084;
    var z = jd - epochastro;
    var cyc = Math.floor(z / 10631);
    z -= 10631 * cyc;
    var j = Math.floor((z - 0.1335) / iyear);
    var iy = 30 * cyc + j;
    z -= Math.floor(j * iyear + 0.1335);
    var im = Math.floor((z + 28.5001) / 29.5);
    if (im === 13) im = 12;
    return [iy, im - 1, z - Math.floor(29.5001 * im - 29)];
}
function writeIslamicDate() {
    var [year, month, day] = kuwaiticalendar();
    var monthNames = ["Muharrom", "Shofar", "Robi'ul Awal", "Robi'ul Akhir", "Jumadil Awal", "Jumadil Akhir", "Rojab", "Sya'ban", "Romadhan", "Syawal", "Dzulqo'dah", "Dzulhijjah"];
    document.getElementById("Hijriah").textContent = `${day} ${monthNames[month]} ${year} H`;
}
writeIslamicDate();

// Tahun Masehi
function getCurrentDate() {
    const now = new Date();
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    document.getElementById("Masehi").textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}
getCurrentDate();

// Tahun Jawa
function getJavaneseDate() {
    // Data Hari Pasaran Jawa
    var days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
    var pasaran = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];

    // Tanggal awal hitungan Jawa (27 Januari 2014)
    var baseDate = new Date("2014-01-27"); // Format: YYYY-MM-DD
    var today = new Date();

    // Hitung selisih hari dalam milidetik
    var difference = Math.floor((today.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));

    // Tentukan hari pasaran dan hari Masehi
    var hariPasaran = pasaran[gmod(difference, 5)];
    var hariMasehi = days[today.getDay()];

    // Format tanggal Masehi
    var day = today.getDate();
    var months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    var month = months[today.getMonth()];
    var year = today.getFullYear();

    // Gabungkan menjadi tanggal Jawa
    var javaneseDate = hariMasehi + " " + hariPasaran + ", " + day + " " + month + " " + year;

    // Tampilkan ke elemen dengan id "Kejawen"
    document.getElementById("Kejawen").textContent = javaneseDate;
}

// Fungsi gmod untuk modul dengan hasil positif
function gmod(a, b) {
    return ((a % b) + b) % b;
}

// Panggil fungsi untuk menampilkan Tanggal Jawa
getJavaneseDate();

//Panggil Arah Qiblat
document.getElementById('BodyJam').addEventListener('click', function() {
    window.location.href = "https://qiblafinder.withgoogle.com/";  // Arahkan ke URL
  });
