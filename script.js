// Countdown Timer
let countdownData = {
    days: 90,
    hours: 12,
    minutes: 45,
    seconds: 20
};

function updateCountdown() {
    // Update seconds
    if (countdownData.seconds > 0) {
        countdownData.seconds--;
    } else if (countdownData.minutes > 0) {
        countdownData.minutes--;
        countdownData.seconds = 59;
    } else if (countdownData.hours > 0) {
        countdownData.hours--;
        countdownData.minutes = 59;
        countdownData.seconds = 59;
    } else if (countdownData.days > 0) {
        countdownData.days--;
        countdownData.hours = 23;
        countdownData.minutes = 59;
        countdownData.seconds = 59;
    }

    // Update DOM
    document.getElementById('days').textContent = countdownData.days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = countdownData.hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = countdownData.minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = countdownData.seconds.toString().padStart(2, '0');
}

// Start countdown
setInterval(updateCountdown, 1000);

// Gallery Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.gallery-slide');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Add active class to current slide
    slides[index].classList.add('active');
    
    // Update dots
    updateDots();
}

function changeSlide(direction) {
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Create dots for gallery
function createDots() {
    const dotsContainer = document.getElementById('gallery-dots');
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'gallery-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.gallery-dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Auto-slide gallery every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);

// Modal Functions
function openPartnershipModal() {
    document.getElementById('partnershipModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePartnershipModal() {
    document.getElementById('partnershipModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('partnershipModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closePartnershipModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePartnershipModal();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    createDots();
    showSlide(0);
});

// Smooth scroll for any future anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});