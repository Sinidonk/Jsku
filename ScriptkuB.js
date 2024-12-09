//Script untuk Menu 
 const MenuToggle = document.querySelector('.MenuUtama');
 const Menu = document.querySelector('.Menu');
 const iframe = document.getElementById('Badan');

 function MenuUtama() {
 Menu.classList.toggle('open');
 iframe.classList.toggle('Menu-open');
 }

 function toggleSubMenu(el, SubMenuId) {
 const allSubMenus = document.querySelectorAll('.SubMenu');
 allSubMenus.forEach(SubMenu => {
 if (SubMenu.id !== SubMenuId) {
 SubMenu.classList.remove('open');
 }
 });
 const SubMenu = document.getElementById(SubMenuId);
 SubMenu.classList.toggle('open');
 }

 function loadcontent(page) {
 iframe.src = page;
 closeMenu();
 }

 function closeMenu() {
 Menu.classList.remove('open');
 iframe.classList.remove('Menu-open');
 }

 document.addEventListener('click', (e) => {
 if (!Menu.contains(e.target) && !e.target.classList.contains('MenuUtama') && !e.target.closest('.Menu') && !e.target.closest('#Badan')) {
 closeMenu();
 }
 });

 window.addEventListener("message", function(event) {
 if (event.data === "closeMenu") {
 closeMenu();
 }
 });

document.querySelectorAll('.Menu li.has-SubMenu').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation(); // Mencegah bubbling agar tidak memengaruhi elemen lain
        item.classList.toggle('open'); // Tambahkan atau hapus kelas `open`
        
        // Buka atau tutup sub-Menu
        const SubMenu = item.querySelector('.SubMenu');
        if (SubMenu) {
            SubMenu.classList.toggle('open');
        }
    });
});

 // Script untuk Kepala dan Kaki
 const Kepala = document.querySelector('.Kepala');
 const Kaki = document.querySelector('.Kaki');

 function showKepalaKaki() {
 Kepala.style.display = 'block';
 Kaki.style.display = 'block';
 }

 function hideKepalaKaki() {
 Kepala.style.display = 'none';
 Kaki.style.display = 'none';
 }

 document.addEventListener('dblclick', showKepalaKaki);

 iframe.addEventListener('load', () => {
 const iframeDoc = iframe.contentWindow.document;
 iframeDoc.addEventListener('scroll', hideKepalaKaki);
 iframeDoc.addEventListener('click', hideKepalaKaki);
 iframeDoc.addEventListener('dblclick', showKepalaKaki);
 });

 document.addEventListener('scroll', hideKepalaKaki);
 iframe.addEventListener('click', hideKepalaKaki);

