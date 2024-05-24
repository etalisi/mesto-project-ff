
import './pages/index.css';
import { initialCards } from './components/cards';
import {createCard, deleteCard, addLike} from './components/card';
import {openPopup, closePopup, closeOnClick} from './components/modal';


const placesList = document.querySelector('.places__list');

initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteCard, openImage, addLike));
} 
);

//Редактирование информации о себе

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector ('.profile__title');
const profileDescription = document.querySelector ('.profile__description');



function editProfile(evt) {
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
  evt.preventDefault();
}

function getName(){
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

const popupEdit = document.querySelector('.popup_type_edit');
document.querySelector ('.profile__edit-button').addEventListener('click', () => 
  { getName();
    openPopup(popupEdit);
});

const profileForm = document.forms["edit-profile"];
profileForm.addEventListener('submit', editProfile);

//Открытие картинки

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

function openImage (evt) {
      openPopup(popupTypeImage);
      popupImage.src = evt.target.src; 
      popupImage.alt = evt.target.alt;
      popupCaption.textContent = evt.target.alt;
  }

//Добавление новой карточки

const newCardForm = document.forms["new-place"];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const popupNewCard = document.querySelector('.popup_type_new-card');

document.querySelector('.profile__add-button').addEventListener('click', () => openPopup(popupNewCard));

function editNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: urlInput.value,
  }
  placesList.prepend(createCard(newCard, deleteCard, openImage, addLike));
  closePopup();
  newCardForm.reset();
}

newCardForm.addEventListener('submit', editNewCard);




const popups = document.querySelectorAll('.popup');

popups.forEach((item) => {
  item.classList.add('popup_is-animated');
  item.addEventListener("click", closeOnClick)
  });


