//Темплейт карточек
import {delCardFromServer, putCardLike, delCardLike} from './api';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard (card, deleteCard, openImage, handleLikes) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__title').textContent = card.name;
    const cardImage = newCard.querySelector('.card__image');
    cardImage.src = card.link; 
    cardImage.alt = card.name; 

    const cardDeleteButton = newCard.querySelector('.card__delete-button');
    const userID = '2a15b8d0ccef33ffc31866d5';
    if (!(card.owner._id === userID)) {
      cardDeleteButton.style.display = 'none';
    }
    cardDeleteButton.addEventListener('click', () => (deleteCard(newCard), delCardFromServer(card._id)));
    const likeButton = newCard.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => handleLikes(card._id, newCard));
    cardImage.addEventListener('click', openImage);  
    if (card.likes.some((likedUser) => likedUser._id === userID)) {
      likeButton.classList.add('card__like-button_is-active');
    }
    newCard.querySelector('.likes').textContent = card.likes.length;
    return newCard;
  };

export function deleteCard(cardElement) {  
    cardElement.remove();
  };

  //Лайк карточки

export function handleLikes(cardId, newCard) {
  const likeButton = newCard.querySelector('.card__like-button');
  if (likeButton.classList.contains('card__like-button_is-active')) {
    delCardLike(cardId)
    .then(function (arrayLenght){
    likeButton.classList.remove('card__like-button_is-active');
    newCard.querySelector('.likes').textContent = arrayLenght;
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    putCardLike(cardId)
    .then(function (arrayLenght){
    likeButton.classList.add('card__like-button_is-active');
    newCard.querySelector('.likes').textContent = arrayLenght;
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
