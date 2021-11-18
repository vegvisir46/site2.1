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
          modalTrigger = document.querySelectorAll('[data-modal]'),
          call = document.querySelector('[data-call]'),
          closeBtn = document.querySelector('[data-close]');

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

    closeBtn.addEventListener('click', (event) => {
        closeModal();
    });

    modal.addEventListener('click', (e) =>{
        if (e.target === modal) {
            closeModal ();
        }

    });

    call.addEventListener('click', (event) => {
        alert('haha nope');
    });

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
                    <img src="img/tabs/${this.src}.jpg" alt="${this.alt}">
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


    const dscr1 = "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. " +
            "Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
          dscr2 = "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. " +
              "Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
          dscr3 = "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного " +
              "происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и " +
              "импортных вегетарианских стейков.";

    containers.innerHTML = "";
    new MenuCard('vegy','vegy','Меню "Фитнес',dscr1,9).makeMenuCard();
    new MenuCard('elite','elite','Меню “Премиум”',dscr2,12, 'menu__item').makeMenuCard();
    new MenuCard('post','post','Меню "Постное"',dscr3,11, 'menu__item').makeMenuCard();























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