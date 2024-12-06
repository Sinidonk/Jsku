// Mengirim pesan ke parent window saat ada interaksi dalam iframe (click, scroll, dblclick, touchstart)
if (window.top !== window.self) {
    // Kirim pesan saat ada klik dalam iframe
    document.addEventListener('click', () => {
        parent.postMessage('iframeClick', '*');
    });

    // Kirim pesan saat scroll dalam iframe
    window.addEventListener('scroll', () => {
        parent.postMessage('scrolling', window.location.origin); // Kirim pesan saat scroll
        console.log('Iframe scrolling detected');
    });

    // Kirim pesan saat touch terjadi dalam iframe
    window.addEventListener('touchstart', () => {
        parent.postMessage('scrolling', window.location.origin); // Mengirim pesan untuk touch
        console.log('Iframe touch detected');
    });

    // Kirim pesan saat double-click dalam iframe
    window.addEventListener('dblclick', () => {
        parent.postMessage('doubleClickInIframe', window.location.origin); // Kirim pesan untuk double-click
        console.log('Iframe double-click detected');
    });
}
