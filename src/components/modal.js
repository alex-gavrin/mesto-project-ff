import { clearValidation } from "./validation";

let onEscapeEvent;

// функция-обработчик нажатия Escape
function onEscapeClick(event, modal) {
    if (event.key == "Escape") {
        closeModal(modal);
    }
}

function deleteListeners(modal) {
    window.removeEventListener("keydown", onEscapeEvent);
    modal.onclick = null;
    const closeBtn = modal.querySelector(".popup__close");
    closeBtn.onclick = null;
}

// функция закрытия модального окна
function closeModal(modal) {
    deleteListeners(modal)
    modal.classList.remove("popup_is-opened");

    // Получаем все поля формы внутри модального окна
    const inputs = modal.querySelectorAll('input');

    // Очищаем значения каждого поля
    inputs.forEach(input => {
        input.value = ''; // устанавливаем пустое значение
    });
}

// функция создания обработчика нажатия клавиши Escape
function addEscapeListener(modal) {
    onEscapeEvent = (event) => onEscapeClick(event, modal);
    window.addEventListener("keydown", onEscapeEvent);
}

// функция-обработчик нажатия вне формы модального окна
function addBackgroupListener(modal) {
    modal.onclick = function (event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    };
}

// функция-обработчик нажатия крестика
function addCloseBtnListener(modal) {
    const closeBtn = modal.querySelector(".popup__close");
    closeBtn.onclick = function () {
        closeModal(modal);
    };
}

function openModal(modal) {
    modal.classList.add("popup_is-opened");
    addCloseBtnListener(modal);
    addBackgroupListener(modal);
    addEscapeListener(modal);
    
    // // Ищем кнопку "Сохранить" и принудительно отключаем её - колхозный вариант, но работает
    // const form = modal.querySelector('.popup__form');
    // const button = form.querySelector('.popup__button');
    // button.disabled = true; // принудительное отключение кнопки при открытии
    // button.classList.add('popup__button_disabled'); // добавляем визуальный класс

}

export { openModal, closeModal };
