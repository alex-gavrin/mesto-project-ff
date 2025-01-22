// функция-обработчик надатия Escape
function onEscapeClick (event, modal) {
    if(event.key == 'Escape') {
        closeModal(modal)
    }  	
}

// функция закрытия модального окна
function closeModal(modal, onEscapeClick) {
    window.removeEventListener('keydown', (event) => onEscapeClick(event, modal))
    modal.classList.remove('popup_is-opened')
}

// функция создания обработчика нажатия клавиши Escape
function addEscapeListener(modal) {
    window.addEventListener('keydown', (event) => onEscapeClick(event, modal));
}

// функция-обработчик нажатия вне формы модального окна
function addBackgroupListener(modal) {
    modal.onclick = function (event) {
        if (event.target === modal) {
            closeModal(modal)
        }
    }
}

// функция-обработчик нажатия крестика
function addCloseBtnListener(modal) {
    const closeBtn = modal.querySelector('.popup__close')
    closeBtn.onclick = function () {
        closeModal(modal)
    }
}

function openModal(modal) {
    modal.classList.add('popup_is-opened')
    addCloseBtnListener(modal)
    addBackgroupListener(modal)
    addEscapeListener(modal)
}

export {openModal, closeModal}