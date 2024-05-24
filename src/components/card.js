//Темплейт карточек


const cardTemplate = document.querySelector('#card-template').content;

export function createCard (card, deleteCard, openImage, addLike) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__title').textContent = card.name;
    const cardImage = newCard.querySelector('.card__image');
    cardImage.src = card.link; 
    cardImage.alt = card.name; 

    const cardDeleteButton = newCard.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', () => deleteCard(newCard));
    const likeButton = newCard.querySelector('.card__like-button');
    likeButton.addEventListener('click', addLike);
    cardImage.addEventListener('click', openImage);  
    return newCard;
  };

export function deleteCard(cardElement) {  
    cardElement.remove(); 
  };

  //Лайк карточки
export function addLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};


