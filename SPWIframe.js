// Script untuk mengatur pergantian iframe (utama)
        let iframeIndex = 0;
        const iframe1 = document.getElementById('iframe1');
        const iframe2 = document.getElementById('iframe2');

        function toggleIframes() {
            if (iframeIndex === 0) {
                iframe1.style.display = 'block';
                iframe2.style.display = 'none';
                iframeIndex = 1;
            } else {
                iframe1.style.display = 'none';
                iframe2.style.display = 'block';
                iframeIndex = 0;
            }
        }

        // Set interval untuk mengganti iframe setiap 10d (10000 ms)
        setInterval(toggleIframes, 10000);

