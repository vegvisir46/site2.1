"use strict";



window.addEventListener('DOMContentLoaded', () => {

    // let now = new Date();

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');


    // ________________________________TABS________________________________

        function hideTabContent () {
        tabsContent.forEach(item => {
           item.classList.add('hide');
           item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
           item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent (i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }



    hideTabContent ();
    showTabContent ();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        console.log(event);
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent ();
                    showTabContent (i);
                }
            });
        }
    });




    // ________________________________TIMER________________________________

    const deadline = '2022-11-16 20:32:00';

    function getTime() {
        const t =  (Date.parse(deadline) - Date.parse(new Date())),
              years = Math.floor(t/ (1000 * 60 * 60 * 24 * 365)),
              days = Math.floor((t / (1000 * 60 * 60 * 24)) % 365),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / (1000 * 60)) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'years': years,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }

    }

    function getZero (num) {
        if ((num > 0) && (num < 10)) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock () {
        const timer = document.querySelector('.timer'),
              years = timer.querySelector('#years'),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              update = setInterval(updateTimer, 1000);

        updateTimer();

        function updateTimer () {
            let time = getTime();
            years.innerHTML = getZero(time.years);
            days.innerHTML = getZero(time.days);
            hours.innerHTML = getZero(time.hours);
            minutes.innerHTML = getZero(time.minutes);
            seconds.innerHTML = getZero(time.seconds);

            if (time.total < 1) {
                clearInterval(update);
                years.innerHTML = 'Ы';
                days.innerHTML = 'Ы';
                hours.innerHTML = 'Ы';
                minutes.innerHTML = 'Ы';
                seconds.innerHTML = 'Ы';
            }
        }

    }

    setClock();


    // ________________________________Modal________________________________



    const modal = document.querySelector('.modal'),
          modalTrigger = document.querySelectorAll('[data-modal]');
          // call = document.querySelector('[data-call]'),
          // closeBtn = document.querySelector('[data-close]');

    function openModal() {
        modal.classList.add('show', 'fade');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.remove('show', 'fade');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(item =>  {
        item.addEventListener('click', openModal);
    });

    // closeBtn.addEventListener('click', (event) => {
    //     closeModal();
    // });

    modal.addEventListener('click', (e) =>{
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal ();
        }

    });

    // call.addEventListener('click', (event) => {
    //     alert('haha nope');
    // });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal ();
        }
    });

    const modalTimerId = setTimeout(openModal, 60000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    // ________________________________CLASSES________________________________


    const containerBox = document.querySelector('.menu__field'),
          containers = containerBox.querySelector('.container');
    // console.log(containerBox);
    // console.log(containers);
    class MenuCard {
        constructor(src, alt, title, descr, price, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        makeMenuCard () {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
<!--                <div class="menu__item">-->
                    <img src="${this.src}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
<!--                </div>-->
            `;
            containers.append(element);
        }

    }

    // ::ЗАПРОС НА СЕРВЕР::
    const getResource = async (url) => { // нет data, потому что только получаем инфу
        const res = await fetch(url);

        if (!res.ok) { // если не пришел ответ от сервера, генерируем ошибку
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => { // деструктуризация кода BD
                new MenuCard(img, altimg, title, descr, price).makeMenuCard(); // рендер карточки
            });
        });

    // const dscr1 = "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. " +
    //         "Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    //       dscr2 = "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. " +
    //           "Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    //       dscr3 = "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного " +
    //           "происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и " +
    //           "импортных вегетарианских стейков.";
    //
    // containers.innerHTML = "";
    // new MenuCard('vegy','vegy','Меню "Фитнес',dscr1,9).makeMenuCard();
    // new MenuCard('elite','elite','Меню “Премиум”',dscr2,12, 'menu__item').makeMenuCard();
    // new MenuCard('post','post','Меню "Постное"',dscr3,11, 'menu__item').makeMenuCard();


    // ________________________________FORMS________________________________


    const forms = document.querySelectorAll('form');
    // console.log(forms);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    function bindPostData(form) {
        // console.log('postData');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            // const object = {};
            // formData.forEach(function (value,key){
            //     object[key] = value;
            // });

            // console.log(formData); // formData собрала все данные с формы
            // console.log(formData.entries()); // преобразуем данные в массив массивов
            // console.log(Object.fromEntries(formData.entries())); // в классический объект
            // console.log(JSON.stringify(Object.fromEntries(formData.entries()))); // в формат JSON
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            // console.log(json);



            postData('http://localhost:3000/requests', json)
            // .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const  prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);

    }

fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));



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
        if (offset === (slides.length - 1) * +delNotNum (width)){
            offset = 0;
        } else {
            offset += +delNotNum (width);
        }
        if (slideIndex > slides.length - 1) {
            slideIndex = 1;
        } else {slideIndex++}

        setNum();

        slidesField.style.transform = `translateX(-${offset}px`;

        activeDot();
    });

    prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = (slides.length - 1) * +delNotNum (width);
        } else {
            offset -= +delNotNum (width);
        }
        if (slideIndex == 1) {
            slideIndex = (slides.length);
        } else {slideIndex--}

        setNum();

        slidesField.style.transform = `translateX(-${offset}px`;

        activeDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = (slideTo - 1) * +delNotNum (width);

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
    function delNotNum (num) {
        return num.replace(/\D/g, '');
    }


// ___________К А Л Ь К У Л Я Т О Р___________

    const result = document.querySelector('.calculating__result span');
    let sex = 'female',
        height, weight, age,
        ratio = 1.375;

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return; // чтобы код ниже не выполнялся
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation (parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                } else {
                    sex = e.target.getAttribute('id');
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        })
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');






    // const deadline = '2022-11-17 00:00';
    //
    // function getTimeRemaining(endtime) { // вычисление количества единиц времени
    //     const t = Date.parse(endtime) - Date.parse(new Date()),
    //           days = Math.floor(t / (1000 * 60 * 60 * 24)),
    //           hours = Math.floor((t / (1000 * 60 * 60) % 24)),
    //           minutes = Math.floor((t / (1000 * 60)) % 60),
    //           seconds = Math.floor((t / 1000) % 60);
    //     return {
    //         'total': t,
    //         'days': days,
    //         'hours': hours,
    //         'minutes': minutes,
    //         'seconds': seconds
    //     };
    // }
    //
    // function  getZero(num) { // добавление нулей перед числами 1..9
    //     if (num >= 0 && num < 10) {
    //         return `0${num}`;
    //     } else {
    //         return num;
    //     }
    // }
    //
    // function setClock(selector, endtime) {
    //     const timer = document.querySelector(selector), // получаем адреса
    //           days = timer.querySelector('#days'),
    //           hours = timer.querySelector('#hours'),
    //           minutes = timer.querySelector('#minutes'),
    //           seconds = timer.querySelector('#seconds'),
    //           timeInterval = setInterval(updateClock, 1000); // запуск обновления таймера
    //
    //     updateClock();
    //     function updateClock() {  // обновление таймера
    //         const t = getTimeRemaining(endtime); // массив текущего значения в моменте
    //
    //         days.innerHTML = getZero(t.days); // запись новых значений на страницу
    //         hours.innerHTML = getZero(t.hours);
    //         minutes.innerHTML = getZero(t.minutes);
    //         seconds.innerHTML = getZero(t.seconds);
    //
    //         if (t.total <= 0) {  // остановка таймера
    //             clearInterval(timeInterval);
    //         }
    //     }
    // }
    //
    // setClock('.timer', deadline);















});