
// @функция лайка/дизлайка карточки
function likeCard(likeBtn) {
    if (likeBtn.classList.contains('card__like-button_is-active')) {
        likeBtn.classList.remove('card__like-button_is-active')
    }
    else {
        likeBtn.classList.add('card__like-button_is-active')
    }
}

// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove()
}


// @todo: Функция создания карточки
function createCard(
  cardTemplate,
  cardInfo,
  deleteCard,
  likeCard,
  showImage
) {
  const card = cardTemplate.cloneNode(true);
  const img = card.querySelector(".card__image");
  img.src = cardInfo.link;
  img.alt = cardInfo.name;
  img.onclick = (event) => showImage(img, cardInfo.name);
  const title = card.querySelector(".card__title");
  title.innerText = cardInfo.name;
  const likeBtn = card.querySelector(".card__like-button");
  likeBtn.onclick = (event) => likeCard(likeBtn);
  const delBtn = card.querySelector(".card__delete-button");
  delBtn.onclick = function (event) {
    deleteCard(card);
  };
  return card;
}

export { createCard, deleteCard, likeCard };
