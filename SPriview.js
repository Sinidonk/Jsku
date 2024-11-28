document.addEventListener("DOMContentLoaded", () => {
  // Tampilkan hasil View secara default saat halaman dimuat
  viewResult();
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

