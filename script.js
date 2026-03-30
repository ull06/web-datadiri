console.log("JS berhasil terhubung!"); //pengecekan

// 1. Efek Navbar saat Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)'; // Lebih gelap saat scroll
        navbar.style.padding = '10px 0'; // Navbar jadi lebih ramping
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.padding = '20px 0';
        navbar.style.boxShadow = 'none';
    }
});

// 2. Smooth Scroll untuk Link Menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 3. Efek Muncul saat Scroll (Scroll Reveal)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Daftarkan semua section agar punya efek muncul
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});


// HERO (HOME)
//Fungsi untuk Typing Effect
const textElement = document.getElementById("typing-text");
const message = "Informatics student passionate about web development";
let index = 0;

function typeEffect() {
    if (index < message.length) {
        textElement.innerHTML += message.charAt(index);
        index++;
        setTimeout(typeEffect, 80); // Kecepatan ngetik (50ms)
    }
}

// Jalankan fungsi saat halaman selesai dimuat
window.addEventListener('load', typeEffect);


// Fungsi untuk memantau kapan elemen masuk ke layar
const observeAbout = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Jika elemen terlihat, tambahkan gaya muncul
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.2 }); // Muncul kalau sudah 20% terlihat

// Ambil semua elemen teks di dalam about-text
const aboutElements = document.querySelectorAll('.about-text h2, .about-text p');

aboutElements.forEach((el, index) => {
    // 1. Set gaya awal lewat JS (transparan & agak ke bawah)
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    
    // 2. Kasih delay/jeda antar elemen (0s, 0.2s, 0.4s) biar munculnya gantian
    el.style.transitionDelay = `${index * 0.2}s`;
    
    // 3. Masukkan ke dalam "pengintai" (observer)
    observeAbout.observe(el);
});


const counters = document.querySelectorAll('.counter');
const speed = 300; // Semakin besar angka, semakin lambat hitungannya

const startCounter = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Hitung kecepatan pertambahan
                const inc = target / speed;

                if (count < target) {
                    // Tambahkan angka dan bulatkan ke atas
                    counter.innerText = Math.ceil(count + inc);
                    // Panggil lagi fungsi ini setiap 10ms
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target + "+"; // Tambahkan tanda + di akhir
                }
            };
            updateCount();
            // Berhenti mengamati kalau sudah selesai animasi sekali
            observer.unobserve(counter);
        }
    });
};

const counterObserver = new IntersectionObserver(startCounter, {
    threshold: 1.0 // Mulai hitung kalau kotak angkanya sudah terlihat sepenuhnya
});

counters.forEach(counter => counterObserver.observe(counter));


// efek isi otomatis
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItem = entry.target;
            const percent = skillItem.getAttribute('data-percent');
            const progressBar = skillItem.querySelector('.progress-line span');
            
            // Gerakkan bar sesuai persentase
            progressBar.style.width = percent + "%";
            
            // Efek tambahan: Skill item sedikit bergeser ke kanan
            skillItem.style.transform = "translateX(0)";
            skillItem.style.opacity = "1";
            
            skillObserver.unobserve(skillItem); // Cukup sekali animasi
        }
    });
}, { threshold: 0.5 });

// Ambil semua item skill
const allSkills = document.querySelectorAll('.skill-item');
allSkills.forEach(skill => {
    // Set awal: transparan dan agak ke kiri
    skill.style.opacity = "0";
    skill.style.transform = "translateX(-20px)";
    skill.style.transition = "all 0.6s ease";
    
    skillObserver.observe(skill);
});

// BIODATA
const observerBiodata = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.bio-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = "1";
                    item.style.transform = "translateX(0)";
                }, index * 150); // Jeda 150ms tiap baris
            });
        }
    });
}, { threshold: 0.5 });

// Set gaya awal lewat JS (biar CSS kamu tetap bersih)
const bioCard = document.querySelector('.biodata-card');
const bioItems = document.querySelectorAll('.bio-item');

bioItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-20px)";
    item.style.transition = "all 0.5s ease";
});

observerBiodata.observe(bioCard);

// Fungsi hitung umur otomatis
function updateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Cek apakah sudah lewat hari ulang tahun di tahun ini atau belum
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    // Tampilkan ke HTML
    const ageElement = document.getElementById('display-age');
    if (ageElement) {
        ageElement.innerText = age + " Years Old";
    }
}

// Panggil fungsi ini (Ganti formatnya: YYYY-MM-DD)
updateAge("2004-05-20");


// FAMILY
const familyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.family-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = "1";
                    item.style.transform = "translateY(0)";
                }, index * 200); // Jeda 0.2 detik tiap kartu
            });
        }
    });
}, { threshold: 0.2 });

// Set awal (sembunyikan)
const familyList = document.querySelector('.family-list');
const familyItems = document.querySelectorAll('.family-item');

familyItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(50px)";
    item.style.transition = "all 0.6s ease-out";
});

familyObserver.observe(familyList);


// DREAM
// Efek muncul untuk Timeline (Dream)
const dreamObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
        }
    });
}, { threshold: 0.3 });

const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
    // Set awal: transparan
    item.style.opacity = "0";
    item.style.transition = "all 0.8s ease-out";
    
    // Kalau item di kiri, muncul dari kiri. Kalau di kanan, muncul dari kanan.
    if (item.classList.contains('left')) {
        item.style.transform = "translateX(-50px)";
    } else {
        item.style.transform = "translateX(50px)";
    }
    
    dreamObserver.observe(item);
});


// ACTIVITY
// 1. Efek Muncul Berurutan (Pop-up) saat Scroll
const activityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.activity-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = "1";
                    item.style.transform = "scale(1)";
                }, index * 150);
            });
        }
    });
}, { threshold: 0.2 });

// Set gaya awal lewat JS
const activityContainer = document.querySelector('.activity-container');
const activityItems = document.querySelectorAll('.activity-item');

activityItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "scale(0.7)"; // Mulai dari kecil
    item.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"; // Efek pegas
});

if (activityContainer) activityObserver.observe(activityContainer);

// 2. Efek "Tilt" Sederhana saat Mouse Bergerak di atas Kartu
activityItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const { offsetWidth: width, offsetHeight: height } = item;
        const { offsetX: x, offsetY: y } = e;

        // Hitung sudut miring berdasarkan posisi kursor
        const xRotation = ((y - height / 2) / height) * 15; // Maks miring 15 derajat
        const yRotation = ((x - width / 2) / width) * -15;

        item.style.transform = `perspective(1000px) scale(1.05) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    });

    // Balikkan ke posisi normal saat mouse keluar
    item.addEventListener('mouseleave', () => {
        item.style.transform = `perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)`;
    });
});

// HOBBY
// Animasi Muncul untuk Hobby
const hobbyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.hobby-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0) rotate(0deg)";
                }, index * 100);
            });
        }
    });
}, { threshold: 0.1 });


const hobbyContainer = document.querySelector('.hobby-container');
const hobbyCards = document.querySelectorAll('.hobby-card');

hobbyCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px) rotate(-2deg)"; // Sedikit miring pas belum muncul
    card.style.transition = "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
});

if (hobbyContainer) hobbyObserver.observe(hobbyContainer);


// GALLERY
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const img = item.querySelector('img');
        const { width, height } = item.getBoundingClientRect();
        const x = (e.clientX - item.offsetLeft) / width;
        const y = (e.clientY - item.offsetTop) / height;
        
        // Gambar seolah bergerak di dalam bingkai
        img.style.transform = `scale(1.1) translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px)`;
    });

    item.addEventListener('mouseleave', () => {
        const img = item.querySelector('img');
        img.style.transform = 'scale(1) translate(0, 0)';
    });
});

// Efek Muncul Berurutan untuk Gallery
const gallerySections = document.querySelectorAll('.gallery-section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

gallerySections.forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "all 1s ease-out";
    sectionObserver.observe(section);
});



//FOOTER
const footer = document.querySelector('.footer');
if (footer) {
    footer.style.opacity = '0';
    footer.style.transition = 'opacity 1s ease';
    
    const footerObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            footer.style.opacity = '1';
        }
    }, { threshold: 0.1 });
    
    footerObserver.observe(footer);
}
