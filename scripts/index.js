// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardInfo) {
    const card = cardTemplate.cloneNode(true)
    const img = card.querySelector('.card__image')
    img.src = cardInfo.link
    img.alt = cardInfo.name

    const title = card.querySelector('.card__title')
    title.innerText = cardInfo.name

    const delBtn = card.querySelector('.card__delete-button')
    delBtn.onclick = function (event) {
        deleteCard(card)
    }

    return card
}

// @todo: Функция удаления карточки

function deleteCard(card) {
    card.remove()
}

// @todo: Вывести карточки на страницу

function showCards(cards) {
    for (let item of cards) {
        const card = createCard(item)
        cardList.append(card)
    }
}  

showCards(initialCards)




