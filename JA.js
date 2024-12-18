
// CSS Jam disatukan dalam JavaScript
var css = `

a{text-decoration:none; color:inherit;
    border:none;
    outline:none;
}

  #BodyJam {
    position: relative;
    background: url(Gbr/Jamku.png),url('https://sinidonk.github.io/Gbrku/Jamku.png');
      
      background-repeat:no-repeat;
    background-size: 100%;
    border: 5px double black;
    border-radius: 50%;
    margin: auto;
    height: 150px;
    width: 150px;
  }

  #JJam {
    position: absolute;
    background: red;
    border-radius: 30px 30px 5px 5px;
    border: 1px solid white;
    transform-origin: bottom;
    height: 25%;
    top: 25%;
    left: 48.63%;
    opacity: 0.8;
    width: 4%;
  }

  #JMenit {
    position: absolute;
    background: blue;
    border-radius: 10px;
    border: 1px solid white;
    transform-origin: bottom;
    left: 49%;
    opacity: 0.8;
    width: 3%;
    height: 32%;
    top: 18%;
  }

  #JDetik {
    position: absolute;
    background: yellow;
    border-radius: 5px;
    border: 1px solid white;
    transform-origin: bottom;
    width: 1.5%;
    height: 36%;
    top: 14%;
    left: 49.8%;
    opacity: 0.8;
  }

  .JDot {
    position: absolute;
    background: yellow;
    border-radius: 50%;
    border: 1px solid black;
    transform-origin: bottom;
    width: 5%;
    height: 5%;
    top: 48%;
    left: 48%;
    opacity: 1;
  }

.Jd, .Ma, .Hi, .Kj{
  position:relative;
  left:50%;
 transform: translateX(-50%);
  width:100%;
font-family: sans-serif;
font-weight: bold;
  font-size: 16px;
  }

.Jd{color:white;font-size:18px;}
.Hi{color:Red;}
.Ma{color:Blue;}
.Kj{color:Yellow;}


`;

// --- Jam Analog Bulat ---->
var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = css;
document.head.appendChild(styleSheet);

// Script untuk Jam
var hour = document.getElementById("JJam");
var minute = document.getElementById("JMenit");
var seconds = document.getElementById("JDetik");

var addClock = setInterval(function clock() {
  var date_now = new Date();
  var hr = date_now.getHours();
  var min = date_now.getMinutes();
  var sec = date_now.getSeconds();

  var calc_hr = hr * 30 + min / 2;
  var calc_min = min * 6;
  var calc_sec = sec * 6;

  hour.style.transform = "rotate(" + calc_hr + "deg)";
  minute.style.transform = "rotate(" + calc_min + "deg)";
  seconds.style.transform = "rotate(" + calc_sec + "deg)";
}, 1000);


// ------- Jaam Digital format Jam:Menit:Detik WIB --->
function tampilkanJam() {
    const sekarang = new Date();
    // Ambil jam, menit, dan detik
    let jam = sekarang.getHours();
    let menit = sekarang.getMinutes();
    let detik = sekarang.getSeconds();
    // Formatkan agar jam, menit, detik selalu memiliki 2 digit
    jam = jam < 10 ? '0' + jam : jam; // Tambahkan angka 0 di depan jika jam < 10
    menit = menit < 10 ? '0' + menit : menit; // Tambahkan angka 0 di depan jika menit < 10
    detik = detik < 10 ? '0' + detik : detik; // Tambahkan angka 0 di depan jika detik < 10
    // Gabungkan jam, menit, detik dengan titik dua sebagai pemisah
    const waktuWIB = `${jam}:${menit}:${detik}`;
    // Tampilkan di elemen dengan id "jamDigital"
    document.getElementById('jamDigital').textContent = `${waktuWIB} WIB`;
    // Perbarui setiap detik
    setTimeout(tampilkanJam, 1000);
}
// Jalankan fungsi jam digital
tampilkanJam();

//----- Tahun Hijriah --->
function gmod(a, t) {
    return (a % t + t) % t;
}

function kuwaiticalendar(adjust) {
    var today = new Date();
    if (adjust) {
        var adjustMilli = 86400000 * adjust;
        var todayMilli = today.getTime() + adjustMilli;
        today = new Date(todayMilli);
    }

    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();

    var m = month + 1;
    var y = year;

    if (m < 3) {
        y -= 1;
        m += 12;
    }

    var a = Math.floor(y / 100);
    var b = 2 - a + Math.floor(a / 4);

    if (y < 1583) b = 0;
    if (y === 1582) {
        if (m > 10) b = -10;
        if (m === 10) {
            b = 0;
            if (day > 4) b = -10;
        }
    }

    var jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;

    var wd;
    if (adjust) {
        wd = gmod(jd + 1 - adjust, 7) + 1;
    } else {
        wd = gmod(jd + 1, 7) + 1;
    }

    var iyear = 10631.0 / 30.0;
    var epochastro = 1948084;
    var shift1 = 0.1335;

    var z = jd - epochastro;
    var cyc = Math.floor(z / 10631);
    z -= 10631 * cyc;
    var j = Math.floor((z - shift1) / iyear);
    var iy = 30 * cyc + j;
    z -= Math.floor(j * iyear + shift1);

    var im = Math.floor((z + 28.5001) / 29.5);
    if (im === 13) im = 12;

    var id = z - Math.floor(29.5001 * im - 29);

    return [day, month, year, jd - 1, wd - 1, id, im - 1, iy];
}

function writeIslamicDate(adjust) {
    var dayNames = ["Ahad", "Itsnain", "Tsulatsa", "Arbi'a", "Khomis", "Jum'ah", "Sabt"];
    var monthNames = [
        "Muharrom",
        "Shofar",
        "Robi'ul Awal",
        "Robi'ul Akhir",
        "Jumadil Awal",
        "Jumadil Akhir",
        "Rojab",
        "Sya'ban",
        "Romadhan",
        "Syawal",
        "Dzulqo'dah",
        "Dzulhijjah"
    ];

    var iDate = kuwaiticalendar(adjust);
    
    // Menambahkan nama hari di depan tanggal
    var dayName = dayNames[iDate[4]];  // Mendapatkan nama hari
    var output = dayName + ", " + iDate[5] + " " + monthNames[iDate[6]] + " " + iDate[7] + " H";
    
    return output;
}

// Contoh penggunaan (hasil akan ditampilkan di console atau halaman web):
console.log(writeIslamicDate());
document.getElementById("Hijriah").innerText = writeIslamicDate();


// Script Tahun Masehi
function getCurrentDate() {
    var now = new Date();

    var days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
    var months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    var dayName = days[now.getDay()];
    var day = now.getDate();
    var monthName = months[now.getMonth()];
    var year = now.getFullYear();

    return dayName + ", " + day + " " + monthName + " " + year;
}

// Contoh penggunaan (hasil akan ditampilkan di console atau halaman web):
console.log(getCurrentDate());
document.getElementById("Masehi").innerText = getCurrentDate();


// Script Tahun Jawa
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
    var hariPasaran = pasaran[difference % 5];
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
    return hariMasehi + " " + hariPasaran + ", " + day + " " + month + " " + year;
}

// Debugging: Cetak ke konsol untuk memastikan fungsi berjalan
console.log("Kalender Jawa: " + getJavaneseDate());
document.getElementById("Kejawen").innerText = getJavaneseDate();




