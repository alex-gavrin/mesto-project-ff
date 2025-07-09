import "./index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { closeModal, openModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
    addCard,
    getInitialCards,
    getInitialUser,
    updateUser,
    updateUserAvatar,
} from "./components/api.js";

// темплейт карточки
const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");

// DOM-элементы, связанные с формой изменения данных
const editModal = document.querySelector(".popup_type_edit");
editModal.classList.add("popup_is-animated");
const editBtn = document.querySelector(".profile__edit-button");
const formEditProfile = document.querySelector(
    '.popup__form[name="edit-profile"]'
); //editForm
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const nameValue = document.querySelector(".profile__title");
const descValue = document.querySelector(".profile__description");
const popupFormEditProfile = document.forms["edit-profile"];
const popupFormEditAvatar = document.forms["edit-avatar"];
const editAvatarPopap = document.querySelector(".popup_type_avatar");
const avatarElement = document.querySelector(".profile__image");

// DOM-элементы, связанные с формой добавления карточки
const addModal = document.querySelector(".popup_type_new-card");
addModal.classList.add("popup_is-animated");
const addBtn = document.querySelector(".profile__add-button");
const formAddCard = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const typeUrlInput = document.querySelector(".popup__input_type_url");

// DOM-элемент со списком карточек
const cardList = document.querySelector(".places__list");

// DOM-элементы, связанные с окном просмотра изображения
const imageModal = document.querySelector(".popup_type_image");
imageModal.classList.add("popup_is-animated");

const modalImage = imageModal.querySelector(".popup__image");
const modalCaption = imageModal.querySelector(".popup__caption");

let userData = null;

const renderLoading = (isLoading, button) => {
    button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

// функция добавления карточки в начало списка
function prepandCard(card) {
    cardList.prepend(card);
}

// функция добавления карточек на страницу
function showCards(cards, userId) {
    for (let itemInfo of cards) {
        const card = createCard(
            cardTemplate,
            itemInfo,
            deleteCard,
            likeCard,
            showImage,
            imageModal,
            userId
        );
        cardList.append(card);
    }
}

function loadUserInfo(user) {
    setDataValues(user.name, user.about);
    setUserAvatar(user.avatar);
    userData = user;
}

function loadUserAndCards() {
    Promise.all([getInitialUser(), getInitialCards()])
        .then((values) => {
            const user = values[0];
            if (user) {
                loadUserInfo(user);
            }
            const cards = values[1];
            if (cards) {
                showCards(cards, user._id);
            }
            console.log(user);
            console.log(cards);
        })
        .catch((err) => {
            console.log(err);
        });
}

loadUserAndCards();

// функции открытия модального окна с изображением и подписью
function showImage(image, caption) {
    modalImage.src = image.src;
    modalCaption.textContent = caption;
    openModal(imageModal);
}

// обработчик открытия окна добавления карточки
function onAddModalOpen(modal) {
    openModal(modal);

    clearValidation(formAddCard, validationConfig);
}
addBtn.onclick = (event) => onAddModalOpen(addModal);

// функция получения данных формы для создания карточки
function getAddFormValues() {
    const cardInfo = {
        name: cardNameInput.value,
        link: typeUrlInput.value,
    };
    return cardInfo;
}

// обработчик отправки формы добавления новой карточки
function submitAddCardForm(event) {
    event.preventDefault();
    renderLoading(true, addModal.querySelector(".popup__button"));
    addCard({
        name: cardNameInput.value,
        link: typeUrlInput.value,
    }).then((cardInfo) => {
        console.log(cardInfo);
        // const cardInfo = getAddFormValues();
        const card = createCard(
            cardTemplate,
            cardInfo,
            deleteCard,
            likeCard,
            showImage,
            imageModal,
            userData._id
        );
        
        prepandCard(card);
        closeModal(addModal);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
      renderLoading(
        false,
        addModal.querySelector(".popup__button")
      );
    });
}
formAddCard.addEventListener("submit", submitAddCardForm);

// установка значений формы из данных со страницы
function setEditFormValues() {
    nameInput.value = nameValue.textContent;
    jobInput.value = descValue.textContent;
}

function setUserAvatar(avatarUrl) {
    // const avatarElement = document.querySelector(".profile__image");
    avatarElement.style.backgroundImage = `url(${avatarUrl})`;
}

function setDataValues(name, desc) {
    nameValue.textContent = name;
    descValue.textContent = desc;
}

// обработчик открытия окна редактирования
function onEditModalOpen(modal) {
    openModal(modal);
    clearValidation(formEditProfile, validationConfig);
    setEditFormValues();
}
editBtn.onclick = (event) => onEditModalOpen(editModal);

// обработчик отправки формы на изменение данных
function handleEditFormSubmit(event) {
    event.preventDefault();
    renderLoading(true, popupFormEditProfile.querySelector(".popup__button"));
    updateUser({
        name: nameInput.value,
        about: jobInput.value,
    })
        .then((user) => {
            setDataValues(user.name, user.about);
            closeModal(editModal);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
      renderLoading(
        false,
        popupFormEditProfile.querySelector(".popup__button")
      );
    });
}
formEditProfile.addEventListener("submit", handleEditFormSubmit);

//включение валидации форм
const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

avatarElement.addEventListener("click", (event) => {
    if (event.target.classList.contains("profile__image")) {
        openModal(editAvatarPopap);
        clearValidation(popupFormEditAvatar, validationConfig);
        
        
    }
});

const handleAvatarFormSubmit = async (evt) => {
    evt.preventDefault();
    renderLoading(true, popupFormEditAvatar.querySelector(".popup__button"));
    updateUserAvatar(popupFormEditAvatar.link.value)
        .then((user) => {
            avatarElement.style.backgroundImage = `url(${user.avatar})`;
            closeModal(editAvatarPopap);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(
                false,
                popupFormEditAvatar.querySelector(".popup__button")
            );
        });
};
popupFormEditAvatar.addEventListener("submit", handleAvatarFormSubmit);

enableValidation(validationConfig);
