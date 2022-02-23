function slider() {
    // ______________S L I D E R______________

    const slides = document.querySelectorAll('.offer__slide'), // каждый слайд
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'), // окно слайдов
        slidesField = document.querySelector('.offer__slider-inner'), // вся полоса слайдов
        width = window.getComputedStyle(slidesWrapper).width; // ширина окна

    let slideIndex = 1;
    let offset = 0;

    slidesField.style.width = 100 * slides.length + '%'; // длина полосы слайдов = длине всех слайдов
    slidesField.style.display = 'flex'; // горизонтальная разметка полосы слайдов
    slidesField.style.transition = '0.5s all'; // вроде скорость прокрутки

    slidesWrapper.style.overflow = 'hidden'; // скрытие всего, что не попадает в область окна

    slides.forEach(slide => {
        slide.style.width = width; // ширина каждого слайда = ширине окна
    });

    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); // атрибут у каждой dot
        dot.classList.add('dot');
        if (i === 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset === (slides.length - 1) * +delNotNum(width)) {
            offset = 0;
        } else {
            offset += +delNotNum(width);
        }
        if (slideIndex > slides.length - 1) {
            slideIndex = 1;
        } else {
            slideIndex++
        }

        setNum();

        slidesField.style.transform = `translateX(-${offset}px`;

        activeDot();
    });

    prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = (slides.length - 1) * +delNotNum(width);
        } else {
            offset -= +delNotNum(width);
        }
        if (slideIndex == 1) {
            slideIndex = (slides.length);
        } else {
            slideIndex--
        }

        setNum();

        slidesField.style.transform = `translateX(-${offset}px`;

        activeDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = (slideTo - 1) * +delNotNum(width);

            slidesField.style.transform = `translateX(-${offset}px`;
            setNum();

            activeDot();
        })
    })


    function setNum() {
        if (slideIndex >= 10) {
            current.textContent = `${slideIndex}`;
        } else {
            current.textContent = `0${slideIndex}`;
        }
    }

    function activeDot() {
        dots.forEach(dot => dot.style.opacity = '.5');
        console.log(slideIndex);
        dots[slideIndex - 1].style.opacity = 1;
    }


    // width.replace(/\D/g, '')
    function delNotNum(num) {
        return num.replace(/\D/g, '');
    }
}

module.exports = slider;