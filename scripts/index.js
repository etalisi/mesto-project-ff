// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard (element, delFunction) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__title').textContent = element.name;
    const cardImage = newCard.querySelector('.card__image')
    cardImage.src = element.link; 
    cardImage.alt = element.name; 

    const cardDeleteButton = newCard.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', () => delFunction(newCard));

    return newCard;
  };

  function deleteCard(cardElement) {  
    cardElement.remove(); 
  };

initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteCard));
} 
);