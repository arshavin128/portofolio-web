// =========================================
// 1. CYBER WELCOME SCREEN (TYPEWRITER + COUNTER)
// =========================================
window.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const progressBar = document.getElementById('welcomeProgress');
    const percentText = document.getElementById('loading-percent');
    const statusText = document.getElementById('loading-status');
    const typewriterEl = document.getElementById('typewriter');

    if (!welcomeScreen) return;

    document.body.style.overflow = 'hidden';

    const textToType = "Arshavin Dega Nazaro | XI TJKT 1";
    let charIndex = 0;

    function typeEffect() {
        if (charIndex < textToType.length) {
            typewriterEl.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 70);
        }
    }
    typeEffect();

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 2) + 1;

        if (progress >= 35 && progress < 70) {
            statusText.textContent = "LOADING SYSTEM MODULES...";
        } else if (progress >= 70 && progress < 95) {
            statusText.textContent = "PREPARING INTERFACE...";
        }

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            statusText.textContent = "SYSTEM READY!";

            setTimeout(() => {
                welcomeScreen.classList.add('fade-out');
                document.body.style.overflow = 'auto';
            }, 1200);
        }

        progressBar.style.width = progress + '%';
        percentText.textContent = progress + '%';
    }, 65);
});

// =========================================
// 2. TOGGLE DARK MODE / LIGHT MODE
// =========================================
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    const themeIcon = themeToggleBtn.querySelector('i');

    if (localStorage.getItem('portfolio-theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');

        if (themeIcon) {
            if (isDark) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('portfolio-theme', 'dark');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('portfolio-theme', 'light');
            }
        }
    });
}

// =========================================
// 3. SCROLL PROGRESS BAR & TOMBOL BACK TO TOP
// =========================================
const progressBarScroll = document.getElementById('scroll-progress');
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if (progressBarScroll && height > 0) {
        const scrolled = (winScroll / height) * 100;
        progressBarScroll.style.width = scrolled + '%';
    }

    if (backToTopBtn) {
        if (window.scrollY > 350) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =========================================
// 4. ANIMASI SCROLL REVEAL BERULANG (NAIK & TURUN)
// =========================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(element => {
    revealObserver.observe(element);
});

// =========================================
// 5. TEKS ROLE BERGANTI OTOMATIS (HERO)
// =========================================
const typingRoleEl = document.getElementById('typing-role');
if (typingRoleEl) {
    const roles = [
        "Networking & IP Subnetting",
        "Database & MySQL Administrator",
        "Java OOP Programmer",
        "Web Developer"
    ];
    let roleIndex = 0;
    let roleCharIndex = 0;
    let isDeleting = false;

    function typeRoleLoop() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingRoleEl.textContent = currentRole.substring(0, roleCharIndex - 1);
            roleCharIndex--;
        } else {
            typingRoleEl.textContent = currentRole.substring(0, roleCharIndex + 1);
            roleCharIndex++;
        }

        let speed = isDeleting ? 45 : 85;

        if (!isDeleting && roleCharIndex === currentRole.length) {
            speed = 1800;
            isDeleting = true;
        } else if (isDeleting && roleCharIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 400;
        }

        setTimeout(typeRoleLoop, speed);
    }

    typeRoleLoop();
}

// =========================================
// 6. ANIMATED COUNTER (STATISTIK ANGKA BERJALAN)
// =========================================
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

function startCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
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

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterStarted) {
                startCounters();
                counterStarted = true;
            }
        });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
}

// =========================================
// 7. EFEK KARTU 3D TILT (MOUSE FOLLOW)
// =========================================
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

 // =========================================
// 8. GALERI MODAL SERTIFIKAT INTERAKTIF (SLIDE & SWIPE)
// =========================================
const certificatesData = [
    {
        src: "assets/img/cert1.jpg",
        title: "Sertifikat Kompetensi Keahlian (Kompeten) — SMKN 1 Blitar & CV. FIA Sejahtera Abadi"
    },
    {
        src: "assets/img/cert2.jpg",
        title: "Peraih Medali Perak Bidang Bahasa Inggris — Radar Science Competition (RSC) 2025"
    },
    {
        src: "assets/img/cert3.jpg",
        title: "Peringkat 4 - Bidang Bahasa Inggris (SMA/SMK) — Blitar Olympiad of Science (BIOS) 2026"
    },
    {
        src: "assets/img/cert4.jpg",
        title: "Juara 4 Bahasa Inggris Level 4 — Jenius Science Olympiad (JSO) 2025"
    },
    {
        src: "assets/img/cert5.jpg",
        title: "Finalis Provinsi - Bahasa Inggris Level 4 — Jenius Science Olympiad (JSO) 2025"
    }
];

const imageModal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const galleryCounter = document.getElementById('galleryCounter');
const galleryDots = document.getElementById('galleryDots');
const openGalleryBtn = document.getElementById('openGalleryBtn');
const closeModalBtn = document.querySelector('.close-modal');
const prevCertBtn = document.getElementById('prevCertBtn');
const nextCertBtn = document.getElementById('nextCertBtn');
const galleryStage = document.getElementById('galleryStage');

let currentCertIndex = 0;

function renderDots() {
    if (!galleryDots) return;
    galleryDots.innerHTML = '';
    certificatesData.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = `gallery-dot ${idx === currentCertIndex ? 'active' : ''}`;
        dot.addEventListener('click', () => updateGallerySlide(idx));
        galleryDots.appendChild(dot);
    });
}

function updateGallerySlide(index) {
    if (!modalImg || !modalCaption) return;
    currentCertIndex = (index + certificatesData.length) % certificatesData.length;

    modalImg.classList.add('sliding');
    setTimeout(() => {
        modalImg.src = certificatesData[currentCertIndex].src;
        modalCaption.textContent = certificatesData[currentCertIndex].title;
        if (galleryCounter) {
            galleryCounter.textContent = `${currentCertIndex + 1} / ${certificatesData.length}`;
        }
        renderDots();
        modalImg.classList.remove('sliding');
    }, 150);
}

function openCertificateGallery(startIndex = 0) {
    if (!imageModal) return;
    imageModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    updateGallerySlide(startIndex);
}

function closeCertificateGallery() {
    if (!imageModal) return;
    imageModal.classList.remove('open');
    document.body.style.overflow = 'auto';
}

if (imageModal) {
    // Buka galeri dari tombol "Buka Galeri Sertifikat"
    if (openGalleryBtn) {
        openGalleryBtn.addEventListener('click', () => openCertificateGallery(0));
    }

    // Buka langsung ke sertifikat terkait saat kartu prestasi diklik
    document.querySelectorAll('.achievement-card').forEach((card, idx) => {
        card.addEventListener('click', () => openCertificateGallery(idx));
    });

    if (prevCertBtn) prevCertBtn.addEventListener('click', () => updateGallerySlide(currentCertIndex - 1));
    if (nextCertBtn) nextCertBtn.addEventListener('click', () => updateGallerySlide(currentCertIndex + 1));
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeCertificateGallery);

    // Tutup jika klik area gelap di luar gambar
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) closeCertificateGallery();
    });

    // Navigasi tombol keyboard (Panah Kiri, Panah Kanan, ESC)
    document.addEventListener('keydown', (e) => {
        if (!imageModal.classList.contains('open')) return;
        if (e.key === 'ArrowLeft') updateGallerySlide(currentCertIndex - 1);
        if (e.key === 'ArrowRight') updateGallerySlide(currentCertIndex + 1);
        if (e.key === 'Escape') closeCertificateGallery();
    });

    // Fitur Geser / Swipe (Layar Sentuh HP & Drag Mouse)
    let startX = 0;
    if (galleryStage) {
        galleryStage.addEventListener('touchstart', (e) => {
            startX = e.changedTouches[0].screenX;
        }, { passive: true });

        galleryStage.addEventListener('touchend', (e) => {
            const diff = e.changedTouches[0].screenX - startX;
            if (diff > 50) updateGallerySlide(currentCertIndex - 1);
            if (diff < -50) updateGallerySlide(currentCertIndex + 1);
        }, { passive: true });

        galleryStage.addEventListener('mousedown', (e) => {
            startX = e.clientX;
        });

        galleryStage.addEventListener('mouseup', (e) => {
            const diff = e.clientX - startX;
            if (diff > 50) updateGallerySlide(currentCertIndex - 1);
            if (diff < -50) updateGallerySlide(currentCertIndex + 1);
        });
    }
}

// =========================================
// 9. TOAST NOTIFICATION & FORM KONTAK FORMSUBMIT
// =========================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const iconClass = type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
    toast.innerHTML = `<i class="${iconClass}"></i><span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hide');
        toast.addEventListener('animationend', () => toast.remove());
    }, 3500);
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);

        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                showToast('Pesan berhasil terkirim ke email saya!', 'success');
                contactForm.reset();
            } else {
                showToast('Gagal mengirim pesan. Silakan coba lagi.', 'error');
            }
        }).catch(() => {
            showToast('Terjadi kesalahan koneksi internet.', 'error');
        });
    });
}