//Script untuk Menu 
 const menuToggle = document.querySelector('.MenuUtama');
 const menu = document.querySelector('.menu');
 const iframe = document.getElementById('Badan');

 function MenuUtama() {
 menu.classList.toggle('open');
 iframe.classList.toggle('menu-open');
 }

 function toggleSubmenu(el, submenuId) {
 const allSubmenus = document.querySelectorAll('.submenu');
 allSubmenus.forEach(submenu => {
 if (submenu.id !== submenuId) {
 submenu.classList.remove('open');
 }
 });
 const submenu = document.getElementById(submenuId);
 submenu.classList.toggle('open');
 }

 function loadcontent(page) {
 iframe.src = page;
 closeMenu();
 }

 function closeMenu() {
 menu.classList.remove('open');
 iframe.classList.remove('menu-open');
 }

 document.addEventListener('click', (e) => {
 if (!menu.contains(e.target) && !e.target.classList.contains('MenuUtama') && !e.target.closest('.menu') && !e.target.closest('#Badan')) {
 closeMenu();
 }
 });

 window.addEventListener("message", function(event) {
 if (event.data === "closeMenu") {
 closeMenu();
 }
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

