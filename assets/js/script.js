// 1. Toggle Menu Hamburger untuk Mobile
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Tutup menu saat link diklik di HP
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// 2. Data Proyek (Render Dinamis / Minimal 3 Proyek Sesuai Ketentuan Modul)
const projects = [
    {
        title: "Konfigurasi Jaringan & Subnetting /18",
        desc: "Simulasi perhitungan IP address dan pengaturan routing RIP antar router Cisco.",
        tag: "Networking",
        img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=500&q=80"
    },
    {
        title: "Manajemen Database SQL",
        desc: "Pengelolaan tabel MariaDB/MySQL via XAMPP, DDL/DML, dan phpMyAdmin.",
        tag: "Database",
        img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80"
    },
    {
        title: "Website Portofolio Pribadi",
        desc: "Membangun website portofolio interaktif dengan HTML, CSS, dan JavaScript murni.",
        tag: "Web Development",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80"
    }
];

const grid = document.getElementById('projectGrid');

projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <img src="${p.img}" alt="${p.title}">
        <div class="project-info">
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <span class="tag">${p.tag}</span>
        </div>
    `;
    grid.appendChild(card);
});

// 3. Toggle Dark / Light Mode Nyata
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

// // 4. Pengiriman Form Kontak Nyata (FormSubmit via AJAX)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah reload halaman
        
        const formData = new FormData(this);

        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Terima kasih! Pesan Anda telah berhasil terkirim ke email saya.');
                contactForm.reset();
            } else {
                alert('Gagal mengirim pesan. Silakan coba lagi nanti.');
            }
        }).catch(error => {
            alert('Terjadi kesalahan koneksi.');
        });
    });
}

// 5. Fitur Galeri Sertifikat (Lightbox)
const certs = [
    { src: "assets/img/cert1.jpg", caption: "Sertifikat Kompetensi Keahlian (TJKT)" },
    { src: "assets/img/cert2.jpg", caption: "Peraih Medali Perak - Radar Science Competition" },
    { src: "assets/img/cert3.jpg", caption: "Peringkat 4 - BIOS" },
    { src: "assets/img/cert4.jpg", caption: "Juara 4 Bahasa Inggris - JSO" },
    { src: "assets/img/cert5.jpg", caption: "Finalis Provinsi Bahasa Inggris - JSO" }
];

let currentSlideIndex = 0;
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("modalImg");
const modalCaption = document.getElementById("modalCaption");

// Fungsi buka folder/galeri
function openModal(index) {
    if (modal) {
        modal.style.display = "flex";
        showSlide(index);
    }
}

// Fungsi tutup galeri
function closeModal() {
    if (modal) {
        modal.style.display = "none";
    }
}

// Fungsi geser foto (Next / Prev)
function changeSlide(step) {
    let newIndex = currentSlideIndex + step;
    
    // Looping jika sudah mentok di ujung
    if (newIndex >= certs.length) newIndex = 0;
    if (newIndex < 0) newIndex = certs.length - 1;
    
    showSlide(newIndex);
}

// Menampilkan gambar dan caption sesuai urutan
function showSlide(index) {
    currentSlideIndex = index;
    modalImg.src = certs[index].src;
    modalCaption.innerText = certs[index].caption;
}

// 6. Animasi Fade-In / Fade-Out saat Layar Digulir (Scroll Reveal)
const observerOptions = {
    threshold: 0.15 // Animasi terpicu saat 15% elemen masuk ke area layar
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Saat bagian masuk ke layar, munculkan (fade in)
            entry.target.classList.add('active');
        } else {
            // Saat bagian keluar dari layar, sembunyikan kembali (fade out)
            entry.target.classList.remove('active'); 
        }
    });
}, observerOptions);

// Menerapkan pengamat ke semua elemen yang memiliki class 'reveal'
document.querySelectorAll('.reveal').forEach(element => {
    revealObserver.observe(element);
});

// 7. Animated Cyber Welcome Screen (Durasi Lebih Lama & Santai)
window.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const progressBar = document.getElementById('welcomeProgress');
    const percentText = document.getElementById('loading-percent');
    const statusText = document.getElementById('loading-status');
    const typewriterEl = document.getElementById('typewriter');

    if (!welcomeScreen) return;

    document.body.style.overflow = 'hidden';

    // 1. Efek Ketik Otomatis (Diperlambat ke 70ms per huruf)
    const textToType = "Arshavin Dega Nazaro | XI TJKT 1";
    let charIndex = 0;

    function typeEffect() {
        if (charIndex < textToType.length) {
            typewriterEl.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 70); // Ubah angka ini jika ingin lebih lambat/cepat
        }
    }
    typeEffect();

    // 2. Hitungan Persentase & Loading Bar (Diperlambat ke 65ms per update)
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 2) + 1; // Naik 1-2% per langkah

        if (progress >= 35 && progress < 70) {
            statusText.textContent = "LOADING SYSTEM MODULES...";
        } else if (progress >= 70 && progress < 95) {
            statusText.textContent = "PREPARING INTERFACE...";
        }

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            statusText.textContent = "SYSTEM READY!";
            
            // Jeda 1.2 detik (1200ms) sebelum tirai naik
            setTimeout(() => {
                welcomeScreen.classList.add('fade-out');
                document.body.style.overflow = 'auto';
            }, 1200); 
        }

        progressBar.style.width = progress + '%';
        percentText.textContent = progress + '%';
    }, 65); // Ubah angka ini untuk mengatur total lama loading
});

// =========================================
// 8. LOGIKA ANIMATED COUNTER (Angka Berjalan)
// =========================================
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

function startCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // Total durasi animasi 2 detik
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.innerText = target;
                clearInterval(timer);
            } else {
                counter.innerText = Math.ceil(current);
            }
        }, stepTime);
    });
}

// Menjalankan hitungan angka hanya saat section statistik masuk layar
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterStarted) {
                startCounters();
                counterStarted = true; // Hanya berjalan 1 kali agar stabil
            }
        });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
}

// =========================================
// 9. LOGIKA 3D TILT CARD (Kartu Miring 3D)
// =========================================
const tiltCards = document.querySelectorAll('.tilt-card, .achievement-card, .edu-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Posisi horizontal kursor dalam kartu
        const y = e.clientY - rect.top;  // Posisi vertikal kursor dalam kartu

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Hitung derajat kemiringan (maksimal 12 derajat)
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    // Kembalikan ke posisi semula saat mouse meninggalkan kartu
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) progressBar.style.width = scrolled + '%';
});