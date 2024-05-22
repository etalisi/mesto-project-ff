
import './pages/index.css';
import { initialCards } from './components/cards';
import {createCard, deleteCard, editNewCard, newCardForm, addLike} from './components/card';
import {openPopup, handleFormSubmit, closePopup, page} from './components/modal';


const placesList = document.querySelector('.places__list');

initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteCard, openImage, addLike));
} 
);

const profilePage = document.querySelector('.profile');
profilePage.addEventListener('click', openPopup);

const profileForm = document.forms["edit-profile"];
profileForm.addEventListener('submit', handleFormSubmit);

newCardForm.addEventListener('submit', editNewCard);


const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

function openImage (evt) {
  if (evt.target.classList.contains('card__image')) {
      document.querySelector('.popup_type_image').classList.add('popup_is-opened');
      popupImage.src = evt.target.src; 
      popupImage.alt = evt.target.alt;
      popupCaption.textContent = evt.target.alt;
  }
    page.addEventListener('click', closePopup);
    document.addEventListener('keydown', closePopup);
  
  }


