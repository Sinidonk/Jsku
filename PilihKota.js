// PilihKota.js

// Fungsi untuk menambahkan elemen select dan options ke dalam div dengan id 'Pilihanku'
function renderPilihanku() {
    const kotaContainer = document.getElementById('Pilihanku');
    if (!kotaContainer) return; // Pastikan elemen dengan id 'Pilihanku' ada

    // Buat elemen <select>
    const selectElement = document.createElement('select');
    selectElement.id = 'PilihKota';
    selectElement.style = `
    display: flex;
    justify-content: top;
    align-items: center;
        margin: 5px auto;
        width: 250px;
        background: green;
        border: 5px double yellow;
        border-radius: 20px;
        text-transform: uppercase;
        color: white;
        vertical-align: middle;
        height: 30px;
        cursor: pointer;
        overflow: hidden;
        font-weight: bold;
        text-align: center;
        font-size: 16px;
        outline: none;
    `;
    selectElement.setAttribute('onchange', 'WJSholat()');

    // Daftar lengkap kota
    const kotaList = [
        { value: 1, text: "Abepura" },
        { value: 2, text: "Ambarawa" },
        { value: 3, text: "Ambon" },
        { value: 4, text: "Atambua" },
        { value: 5, text: "Babat" },
        { value: 6, text: "Balikpapan" },
        { value: 7, text: "Banda Aceh" },
        { value: 8, text: "Bandar Lampung" },
        { value: 9, text: "Bandung" },
        { value: 10, text: "Bangkalan" },
        { value: 11, text: "Banjarmasin" },
        { value: 129, text: "Banjarnegara" },
        { value: 12, text: "Bantul" },
        { value: 13, text: "Banyumas" },
        { value: 14, text: "Banyuwangi" },
        { value: 15, text: "Batam" },
        { value: 131, text: "Batang" },
        { value: 146, text: "Batu" },
        { value: 16, text: "Bekasi" },
        { value: 17, text: "Bengkulu" },
        { value: 18, text: "Biak" },
        { value: 19, text: "Bima" },
        { value: 20, text: "Binjai" },
        { value: 21, text: "Bireun" },
        { value: 22, text: "Blitar" },
        { value: 23, text: "Blora" },
        { value: 24, text: "Kaum Hubbussalam", selected: true },
        { value: 25, text: "Bojonegoro" },
        { value: 26, text: "Bojong Gede" },
        { value: 27, text: "Bondowoso" },
        { value: 28, text: "Bone" },
        { value: 29, text: "Bontang" },
        { value: 30, text: "Boyolali" },
        { value: 31, text: "Brebes" },
        { value: 32, text: "Buaran" },
        { value: 33, text: "Bukit Tinggi" },
        { value: 34, text: "Bumiayu" },
        { value: 35, text: "Cepu" },
        { value: 36, text: "Cianjur" },
        { value: 37, text: "Cikarang" },
        { value: 38, text: "Cilacap" },
        { value: 39, text: "Cilegon" },
        { value: 40, text: "Cirebon" },
        { value: 41, text: "Demak" },
        { value: 42, text: "Denpasar" },
        { value: 43, text: "Depok" },
        { value: 44, text: "Dumai" },
        { value: 45, text: "Ende" },
        { value: 46, text: "Garut" },
        { value: 47, text: "Gombong" },
        { value: 48, text: "Gorontalo" },
        { value: 49, text: "Gresik" },
        { value: 132, text: "Grobogan" },
        { value: 148, text: "Gunung Kidul" },
        { value: 50, text: "Indramayu" },
        { value: 51, text: "Jakarta" },
        { value: 52, text: "Jambi" },
        { value: 53, text: "Jayapura" },
        { value: 54, text: "Jember" },
        { value: 55, text: "Jepara" },
        { value: 151, text: "Jombang" },
        { value: 133, text: "Karanganyar" },
        { value: 56, text: "Karangasem" },
        { value: 57, text: "Kebumen" },
        { value: 58, text: "Kediri" },
        { value: 134, text: "Kendal" },
        { value: 59, text: "Kendari" },
        { value: 60, text: "Klaten" },
        { value: 62, text: "Kuala Simpang" },
        { value: 61, text: "Kualakapuas" },
        { value: 63, text: "Kudus" },
        { value: 149, text: "Kulon Progo" },
        { value: 64, text: "Kuta" },
        { value: 65, text: "Lamongan" },
        { value: 66, text: "Langsa" },
        { value: 67, text: "Lhokseumawe" },
        { value: 68, text: "Lubuk Linggau" },
        { value: 69, text: "Lumajang" },
        { value: 70, text: "Madiun" },
        { value: 71, text: "Magelang" },
        { value: 72, text: "Magetan" },
        { value: 73, text: "Majalengka" },
        { value: 74, text: "Makassar" },
        { value: 75, text: "Malang" },
        { value: 76, text: "Manado" },
        { value: 77, text: "Manokwari" },
        { value: 78, text: "Martapura" },
        { value: 79, text: "Mataram" },
        { value: 80, text: "Maumere" },
        { value: 81, text: "Medan" },
        { value: 82, text: "Merauke" },
        { value: 83, text: "Meulaboh" },
        { value: 84, text: "Mojokerto" },
        { value: 85, text: "Nabire" },
        { value: 86, text: "Nganjuk" },
        { value: 152, text: "Ngawi" },
        { value: 153, text: "Pacitan" },
        { value: 87, text: "Padang" },
        { value: 88, text: "Palangka Raya" },
        { value: 89, text: "Palembang" },
        { value: 90, text: "Palu" },
        { value: 91, text: "Pamekasan" },
        { value: 92, text: "Pandaan" },
        { value: 93, text: "Pangkal Pinang" },
        { value: 94, text: "Pasuruan" },
        { value: 135, text: "Pati" },
        { value: 136, text: "Pekalongan" },
        { value: 95, text: "Pekanbaru" },
        { value: 137, text: "Pemalang" },
        { value: 96, text: "Pematang Siantar" },
        { value: 97, text: "Polewali" },
        { value: 98, text: "Ponorogo" },
        { value: 99, text: "Pontianak" },
        { value: 100, text: "Poso" },
        { value: 101, text: "Prigen" },
        { value: 102, text: "Probolinggo" },
        { value: 138, text: "Purbalingga" },
        { value: 130, text: "Purworejo" },
        { value: 140, text: "Purwokerto" },
        { value: 103, text: "Rangkasbitung" },
        { value: 104, text: "Rembang" },
        { value: 105, text: "Ruteng" },
        { value: 106, text: "Sabang" },
        { value: 107, text: "Salatiga" },
        { value: 108, text: "Samarinda" },
        { value: 109, text: "Sampang" },
        { value: 110, text: "Sawang" },
        { value: 111, text: "Sekayu" },
        { value: 112, text: "Semarang" },
        { value: 113, text: "Serang" },
        { value: 114, text: "Sidoarjo" },
        { value: 115, text: "Singaraja" },
        { value: 116, text: "Situbondo" },
        { value: 117, text: "Sleman" },
        { value: 118, text: "Soreang" },
        { value: 119, text: "Sorong" },
        { value: 120, text: "Sragen" },
        { value: 121, text: "Subang" },
        { value: 122, text: "Sukabumi" },
        { value: 123, text: "Sumedang" },
        { value: 124, text: "Surabaya" },
        { value: 125, text: "Surakarta" },
        { value: 126, text: "Tangerang" },
        { value: 127, text: "Tanjung Balai" },
        { value: 128, text: "Tanjung Pandan" },
        { value: 141, text: "Tanjung Pinang" },
        { value: 142, text: "Tapanuli Tengah" },
        { value: 143, text: "Tasikmalaya" },
        { value: 144, text: "Tegal" },
        { value: 145, text: "Temanggung" },
        { value: 146, text: "Trenggalek" },
        { value: 147, text: "Tuban" },
        { value: 148, text: "Tulungagung" },
        { value: 149, text: "Ubud" },
        { value: 150, text: "Ungaran" },
        { value: 151, text: "Waingapu" },
        { value: 152, text: "Wonosobo" },
        { value: 153, text: "Yogyakarta" }
    ];

    // Tambahkan <option> ke <select>
    kotaList.forEach((kota) => {
        const option = document.createElement('option');
        option.value = kota.value;
        option.textContent = kota.text;
        if (kota.selected) option.selected = true;
        selectElement.appendChild(option);
    });

    // Tambahkan <select> ke dalam container
    kotaContainer.appendChild(selectElement);
}
            
