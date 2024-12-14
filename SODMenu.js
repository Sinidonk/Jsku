document.querySelectorAll('.Menuli.Hsm').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation(); // Mencegah event bubbling

        // Tutup semua dropdown lain, lalu toggle item yang diklik
        document.querySelectorAll('.Menuli.Hsm').forEach(menu => {
            const SubMenu = menu.querySelector('.SubMenu');
            menu.classList.toggle('open', menu === item && !menu.classList.contains('open'));
            if (SubMenu) SubMenu.classList.toggle('open', menu === item && !SubMenu.classList.contains('open'));
        });
    });
});

// Tutup semua dropdown saat area luar iframe diklik
document.addEventListener('click', () => {
    document.querySelectorAll('.Menuli.Hsm').forEach(menu => {
        menu.classList.remove('open');
        const SubMenu = menu.querySelector('.SubMenu');
        if (SubMenu) SubMenu.classList.remove('open');
    });
});

// Menerima pesan dari parent untuk Menutup semua dropdown
window.addEventListener('message', (event) => {
    if (event.data === 'closeDropdown') {
        document.querySelectorAll('.Menuli.Hsm').forEach(menu => {
            menu.classList.remove('open');
            const SubMenu = menu.querySelector('.SubMenu');
            if (SubMenu) SubMenu.classList.remove('open');
        });
    }
});
