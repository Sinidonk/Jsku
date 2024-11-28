

document.addEventListener("DOMContentLoaded", () => {
  // Tampilkan hasil View secara default saat halaman dimuat
  viewResult();

  const iframe = document.getElementById('Badan');
  const kepala = document.querySelector('.Kepala');
  const kaki = document.querySelector('.Kaki');

  let hideTimeout;

  // Fungsi untuk menyembunyikan Kepala dan Kaki
  function hideHeaderFooter() {
    kepala.style.transform = 'translateX(-50%) translateY(-100%)'; // Menggeser Kepala ke atas sambil tetap di tengah horizontal
    kaki.style.transform = 'translateX(-50%) translateY(100%)'; // Menggeser Kaki ke bawah sambil tetap di tengah horizontal
  }

  // Fungsi untuk menampilkan Kepala dan Kaki
  function showHeaderFooter() {
    kepala.style.transform = 'translateX(-50%) translateY(0)'; // Mengembalikan Kepala ke posisi awal sambil tetap di tengah horizontal
    kaki.style.transform = 'translateX(-50%) translateY(0)'; // Mengembalikan Kaki ke posisi awal sambil tetap di tengah horizontal 
  }

  // Sembunyikan saat iframe di-scroll atau disentuh
  iframe.contentWindow.addEventListener('scroll', () => {
    clearTimeout(hideTimeout);
    hideHeaderFooter();
    hideTimeout = setTimeout(showHeaderFooter, 2000); // Delay untuk mengembalikan header/footer setelah 2 detik
  });

  iframe.contentWindow.addEventListener('touchmove', () => {
    hideHeaderFooter();
  });

  // Tampilkan saat iframe diklik dua kali
  iframe.contentWindow.addEventListener('dblclick', showHeaderFooter);
});

function showCode(type) {
  const iframe = document.getElementById('Badan').contentWindow.document;
  let content = '';

  switch (type) {
    case 'html':
      content = `<pre>${escapeHtml(document.getElementById('htmlContent').value)}</pre>`;
      break;
    case 'css':
      content = `<pre>${escapeHtml(document.getElementById('cssContent').value)}</pre>`;
      break;
    case 'js':
      content = `<pre>${escapeHtml(document.getElementById('jsContent').value)}</pre>`;
      break;
  }

  iframe.open();
  iframe.write(content);
  iframe.close();
}

function viewResult() {
  const html = document.getElementById('htmlContent').value;
  const css = `<style>${document.getElementById('cssContent').value}</style>`;
  const js = `<script>${document.getElementById('jsContent').value}<\/script>`;
  const iframe = document.getElementById('Badan').contentWindow.document;

  iframe.open();
  iframe.write(html + css + js);
  iframe.close();
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}