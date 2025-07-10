import { addLike, deleteCardById, deleteLike } from "./api";

// @функция лайка/дизлайка карточки
function likeCard(likeBtn, likeCount, cardInfo) {
    if (likeBtn.classList.contains("card__like-button_is-active")) {
        deleteLike(cardInfo._id)
            .then((res) => {
                likeBtn.classList.remove("card__like-button_is-active");
                const likesLength = res.likes.length;
                likeCount.innerText = likesLength
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        addLike(cardInfo._id)
            .then((res) => {
                likeBtn.classList.toggle("card__like-button_is-active");
                const likesLength = res.likes.length;
                likeCount.innerText = likesLength
                
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

// @todo: Функция удаления карточки
function deleteCard(card, cardInfo) {
    // card.querySelector(".popup_type_confirm").classList.add("popup_is-opened");

    deleteCardById(cardInfo._id)
        .then(() => {
            card.remove();
        })
        .catch((err) => {
            console.log(err);
        });
}

// @todo: Функция создания карточки
function createCard(
    cardTemplate,
    cardInfo,
    deleteCard,
    likeCard,
    showImage,
    imageModal,
    userId
) {
    const card = cardTemplate.cloneNode(true);
    const img = card.querySelector(".card__image");
    img.src = cardInfo.link;
    img.alt = cardInfo.name;
    img.onclick = (event) => showImage(img, cardInfo.name);
    const title = card.querySelector(".card__title");
    title.innerText = cardInfo.name;
    const likeBtn = card.querySelector(".card__like-button");
    const likeCount = card.querySelector(".card__like-counter");
    likeCount.innerText = cardInfo.likes.length;
    if (cardInfo.likes.some((like) => like._id === userId)) {
        likeBtn.classList.add("card__like-button_is-active");
    }
    likeBtn.onclick = (event) => likeCard(likeBtn, likeCount, cardInfo);
    console.log(cardInfo.owner, userId);
    if (cardInfo.owner._id === userId) {
        // card.querySelector(".card__delete-button")
        const delBtn = card.querySelector(".card__delete-button");
        delBtn.classList.add("card__delete-button_is-visible");
        delBtn.onclick = function (event) {
            deleteCard(card, cardInfo);
        };
    }

    return card;
}

export { createCard, deleteCard, likeCard };
