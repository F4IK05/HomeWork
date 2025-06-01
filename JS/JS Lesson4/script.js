let nextBtn = document.querySelector('#next');
let prevBtn = document.querySelector('#prev');

let dots = document.querySelectorAll('.dot')

let carouselPhotoItems = document.querySelectorAll('.carousel-item');
let currentPhoto = 0;

let carouselTextItems = document.querySelectorAll('.carousel-caption');
let currentText = 0;

nextBtn.addEventListener('click', () => {
    currentPhoto++;
    if (currentPhoto >= carouselPhotoItems.length) {
        currentPhoto = 0;
    }

    for (let i = 0; i < carouselPhotoItems.length; i++) {
        carouselPhotoItems[i].style.display = 'none';
    }

    carouselPhotoItems[currentPhoto].style.display = 'block';
})

prevBtn.addEventListener('click', () => {
    currentPhoto--;
    if (currentPhoto < 0) {
        currentPhoto = carouselPhotoItems.length - 1;
    }

    for (let i = 0; i < carouselPhotoItems.length; i++) {
        carouselPhotoItems[i].style.display = 'none';
    }

    carouselPhotoItems[currentPhoto].style.display = 'block'
})

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        for (let i = 0; i < carouselTextItems.length; i++) {
            carouselTextItems[i].style.display = 'none';
            dots[i].classList.remove('active');
        }
        carouselTextItems[index].style.display = 'block';
        dots[index].classList.add('active');
        currentText = index;
    });
})

// Авто прокрут текста
setInterval(() => {
        currentText++;
        if (currentText >= carouselTextItems.length) {
            currentText = 0;
        }

        for (let i = 0; i < carouselTextItems.length; i++) {
            carouselTextItems[i].style.display = 'none';
            dots[i].classList.remove('active');
        }

        carouselTextItems[currentText].style.display = 'block';
        dots[currentText].classList.add('active');
    }, 3000);
