//Темплейт карточек

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

export function createCard (element, delFunction, openImage, addLike) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__title').textContent = element.name;
    const cardImage = newCard.querySelector('.card__image');
    cardImage.src = element.link; 
    cardImage.alt = element.name; 

    const cardDeleteButton = newCard.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', () => delFunction(newCard));
    placesList.addEventListener('click', addLike);
    placesList.addEventListener('click', openImage);  
    return newCard;
  };

export function deleteCard(cardElement) {  
    cardElement.remove(); 
  };

  //Лайк карточки

export function addLike(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
};


//Добавление новой карточки

export const newCardForm = document.forms["new-place"];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

export function editNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: urlInput.value,
  }
  placesList.prepend(createCard(newCard, deleteCard));
  document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
  newCardForm.reset();
}