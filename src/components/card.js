//Темплейт карточек
import {delCardFromServer, putCardLike, delCardLike} from './api';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard (card, deleteCard, openImage, handleLikes, userId) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__title').textContent = card.name;
    const cardImage = newCard.querySelector('.card__image');
    cardImage.src = card.link; 
    cardImage.alt = card.name; 

    const cardDeleteButton = newCard.querySelector('.card__delete-button');
    if (!(card.owner._id === userId)) {
      cardDeleteButton.style.display = 'none';
    }
    cardDeleteButton.addEventListener('click', () => deleteCard(card._id, newCard));
    const likeButton = newCard.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => handleLikes(card._id, newCard));
    cardImage.addEventListener('click', openImage);  
    if (card.likes.some((likedUser) => likedUser._id === userId)) {
      likeButton.classList.add('card__like-button_is-active');
    }
    newCard.querySelector('.likes').textContent = card.likes.length;
    return newCard;
  };

//Удаление карточки

export function deleteCard (cardId, newCard) {
  delCardFromServer(cardId)
    .then(removeCard(newCard))
    .catch(err => console.log(err));
  };

function removeCard (newCard) {
  newCard.remove();
}

  //Лайк карточки

export function handleLikes(cardId, newCard) {
  const likeButton = newCard.querySelector('.card__like-button');
  const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? delCardLike : putCardLike;
  likeMethod(cardId) 
    .then(arrayLenght => {
    likeButton.classList.toggle('card__like-button_is-active'); 
    newCard.querySelector('.likes').textContent = arrayLenght; 
        })
.catch(err => console.log(err));
}
