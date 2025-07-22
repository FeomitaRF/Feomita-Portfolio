document.addEventListener('DOMContentLoaded', () => {
    // === Theme Toggle ===
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    let theme = localStorage.getItem('theme') || 'light';

    const updateTheme = () => {
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Ikon matahari untuk tema gelap
        } else {
            body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Ikon bulan untuk tema terang
        }
    };

    updateTheme(); // Terapkan tema saat halaman dimuat

    themeToggle.addEventListener('click', () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
        updateTheme();
    });

    // === Mobile Menu ===
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Menutup menu saat link diklik (di mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }
        });
    });

    // === Smooth Scrolling ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Pastikan menu tertutup saat link navigasi diklik
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }

            const targetId = this.getAttribute('href');
            // Pastikan tidak ada scroll jika href hanya '#'
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset untuk header tetap
                const headerOffset = 80; // Sesuaikan dengan tinggi header Anda
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === Form Submission (Contoh sederhana) ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Biasanya, data formulir akan dikirim ke server di sini
            // Menggunakan Fetch API atau XMLHttpRequest
            // Contoh:
            // const formData = new FormData(this);
            // fetch('your-server-endpoint.php', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert('Pesan Anda telah terkirim!');
            //     this.reset();
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            //     alert('Terjadi kesalahan saat mengirim pesan.');
            // });

            alert('Pesan Anda telah terkirim! Saya akan segera menghubungi Anda kembali.');
            this.reset(); // Reset form setelah submit
        });
    }


    // === Set Current Year in Footer ===
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }


    // === Animation on Scroll (Intersection Observer API) ===
    const animateElements = document.querySelectorAll('.animate');

    const observerOptions = {
        root: null, // Mengamati viewport
        rootMargin: '0px',
        threshold: 0.1 // Ketika 10% elemen terlihat, picu
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Hentikan observasi setelah terlihat
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

});