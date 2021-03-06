function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show', 'fade');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show', 'fade');
    document.body.style.overflow = '';
}


function modal(triggerSelector, modalSelector, modalTimerId) {
    // ________________________________Modal________________________________


    const modal = document.querySelector(modalSelector),
        modalTrigger = document.querySelectorAll(triggerSelector);
    // call = document.querySelector('[data-call]'),
    // closeBtn = document.querySelector('[data-close]');


    modalTrigger.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    // closeBtn.addEventListener('click', (event) => {
    //     closeModal();
    // });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }

    });

    // call.addEventListener('click', (event) => {
    //     alert('haha nope');
    // });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;

export {closeModal};
export {openModal};