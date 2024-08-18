// script.js
let currentIndex = 1; // Start from the first real slide
let isTransitioning = false;

const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const indicators = document.querySelectorAll('.indicator');

function updateCarousel() {
    const offset = -currentIndex * 100;
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
    isTransitioning = true;
}

function updateIndicators() {
    let indicatorIndex = currentIndex - 1;
    if (currentIndex === 0) {
        indicatorIndex = totalSlides - 3; // Last real slide
    } else if (currentIndex === totalSlides - 1) {
        indicatorIndex = 0; // First real slide
    }
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === indicatorIndex);
    });
}

function prevSlide() {
    if (isTransitioning) return;
    currentIndex--;
    updateCarousel();
}

function nextSlide() {
    if (isTransitioning) return;
    currentIndex++;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index + 1; // Adjust for the duplicated first slide
    updateCarousel();
}

document.querySelector('.slides').addEventListener('transitionend', () => {
    if (currentIndex === 0) {
        currentIndex = totalSlides - 2; // Jump to last real slide
        document.querySelector('.slides').style.transition = 'none';
        updateCarousel();
        setTimeout(() => {
            document.querySelector('.slides').style.transition = '';
        }, 0);
    } else if (currentIndex === totalSlides - 1) {
        currentIndex = 1; // Jump to first real slide
        document.querySelector('.slides').style.transition = 'none';
        updateCarousel();
        setTimeout(() => {
            document.querySelector('.slides').style.transition = '';
        }, 0);
    }
    updateIndicators();
    isTransitioning = false;
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Mouse drag functionality (same as before)
const slidesContainer = document.querySelector('.slides');
let startX;
let isDragging = false;

slidesContainer.addEventListener('mousedown', (e) => {
    startX = e.pageX;
    isDragging = true;
});

slidesContainer.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const dragDistance = e.pageX - startX;
        const threshold = 50; // Minimum drag distance to consider as swipe
        if (dragDistance < -threshold) {
            nextSlide();
            isDragging = false;
        } else if (dragDistance > threshold) {
            prevSlide();
            isDragging = false;
        }
    }
});

slidesContainer.addEventListener('mouseup', () => {
    isDragging = false;
});

slidesContainer.addEventListener('mouseleave', () => {
    isDragging = false;
});

// Touch events for mobile devices (same as before)
slidesContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
    isDragging = true;
});

slidesContainer.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const dragDistance = e.touches[0].pageX - startX;
        const threshold = 50; // Minimum drag distance to consider as swipe
        if (dragDistance < -threshold) {
            nextSlide();
            isDragging = false;
        } else if (dragDistance > threshold) {
            prevSlide();
            isDragging = false;
        }
    }
});

slidesContainer.addEventListener('touchend', () => {
    isDragging = false;
});
