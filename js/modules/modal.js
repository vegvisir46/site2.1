function modal() {
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

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    });

    // closeBtn.addEventListener('click', (event) => {
    //     closeModal();
    // });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }

    });

    // call.addEventListener('click', (event) => {
    //     alert('haha nope');
    // });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
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
}

module.exports = modal;