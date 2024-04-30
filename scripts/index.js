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
    newCard.querySelector('.card__image').src = element.link;
    newCard.querySelector('.card__image').alt = element.name;
    placesList.append(newCard); 

    const cardDeleteButton = newCard.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', delFunction);

    return newCard;
  };

function deleteCard (evt) {
  const eventTarget = evt.target;
  const card = eventTarget.closest('.card'); 
  card.remove();
};

initialCards.forEach(item => createCard(item, deleteCard));