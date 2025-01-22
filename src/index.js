
import './index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { closeModal, openModal } from './components/modal.js';

// темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// DOM-элемент со списком карточек
const cardList = document.querySelector('.places__list');

// DOM-элементы, связанные с окном просмотра изображения
const imageModal = document.querySelector('.popup_type_image');
imageModal.classList.add('popup_is-animated')

// DOM-элементы, связанные с формой изменения данных
const editModal = document.querySelector('.popup_type_edit');
editModal.classList.add('popup_is-animated')
const editBtn = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form[name="edit-profile"]');//editForm
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameValue = document.querySelector('.profile__title');
const descValue = document.querySelector('.profile__description')

// DOM-элементы, связанные с формой добавления карточки
const addModal = document.querySelector('.popup_type_new-card')
addModal.classList.add('popup_is-animated')
const addBtn = document.querySelector('.profile__add-button')
const addForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = document.querySelector('.popup__input_type_card-name')
const typeUrlInput = document.querySelector('.popup__input_type_url')

// функция добавления карточки в начало списка
function prepandCard(card) {
    cardList.prepend(card)
}

// функция добавления карточек на страницу
function showCards(cards) {
    for (let itemInfo of cards) {
        const card = createCard(cardTemplate, itemInfo, deleteCard, likeCard, showImage, imageModal)
        cardList.append(card)
    }
}  
showCards(initialCards)


// функции открытия модального окна с изображением и подписью
function showImage(image, caption) {
    const modalImage = imageModal.querySelector('.popup__image')
    modalImage.src = image.src
    const modalCaption = imageModal.querySelector('.popup__caption')
    modalCaption.textContent = caption
    openModal(imageModal)
}

// обработчик открытия окна добавления карточки
function onAddModalOpen(modal) {
    openModal(modal)
}
addBtn.onclick = (event) => onAddModalOpen(addModal)

// функция получения данных формы для создания карточки
function getAddFormValues() {
    const cardInfo = {
        name: cardNameInput.value,
        link: typeUrlInput.value
    }
    return cardInfo
} 

// обработчик отправки формы добавления новой карточки
function handleFormSubmit(event) {
    event.preventDefault();
    const cardInfo = getAddFormValues()
    const card = createCard(cardTemplate, cardInfo, deleteCard, likeCard, showImage, imageModal)
    prepandCard(card)
    closeModal(addModal)
}
addForm.addEventListener('submit', handleFormSubmit);

// установка значений формы из данных со страницы
function setEditFormValues (){
    nameInput.value = nameValue.textContent;
    jobInput.value = descValue.textContent;   
}

function setDataValues() {
    nameValue.textContent = nameInput.value
    descValue.textContent = jobInput.value
}

// обработчик открытия окна редактирования
function onEditModalOpen(modal) {
    openModal(modal)
    setEditFormValues()
}
editBtn.onclick = (event) => onEditModalOpen(editModal)

// обработчик отправки формы на изменение данных
function handleEditFormSubmit(event) {
    event.preventDefault();
    setDataValues()
    closeModal(editModal)
};
formElement.addEventListener('submit', handleEditFormSubmit);
 