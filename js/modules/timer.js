function timer() {
    // ________________________________TIMER________________________________

    const deadline = '2022-11-16 20:32:00';

    function getTime() {
        const t = (Date.parse(deadline) - Date.parse(new Date())),
            years = Math.floor(t / (1000 * 60 * 60 * 24 * 365)),
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

    function getZero(num) {
        if ((num > 0) && (num < 10)) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock() {
        const timer = document.querySelector('.timer'),
            years = timer.querySelector('#years'),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            update = setInterval(updateTimer, 1000);

        updateTimer();

        function updateTimer() {
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


}

module.exports = timer;