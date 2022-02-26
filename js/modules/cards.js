import {getResource} from "../services/servises";

function cards() {
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

        makeMenuCard() {
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


}

export default cards;