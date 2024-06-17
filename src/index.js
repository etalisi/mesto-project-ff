
import './pages/index.css';
import {getInitialCards, getInitialProfile, patchProfileData, postNewCard, patchAvatar} from './components/api';
import {createCard, deleteCard, handleLikes} from './components/card';
import {openPopup, closePopup, closeOnClick, renderLoading} from './components/modal';
import {enableValidation, clearValidation} from './components/validation';


const placesList = document.querySelector('.places__list');

let userId;

Promise.all([getInitialCards(), getInitialProfile()])
.then(([initialCards, profile]) => {
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
  profileImage.style = `background-image: url(${profile.avatar})`;
  userId = profile._id;

  initialCards.forEach((card) => {
    placesList.append(createCard(card, deleteCard, openImage, handleLikes, userId));
  }
  )
})
  .catch((err) => {
    console.log(err);
});

//Редактирование информации о себе
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector ('.profile__title');
const profileDescription = document.querySelector ('.profile__description');
const profileImage = document.querySelector ('.profile__image');

function editProfile(evt) {
  patchProfileData(nameInput.value, jobInput.value)
  .then(() => {
    getInitialProfile()
    .then((profile) =>{
      profileTitle.textContent = profile.name;
      profileDescription.textContent = profile.about;
    })
    .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
  renderLoading(true);
  closePopup();
  evt.preventDefault();
}

function getName(){
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

const popupEdit = document.querySelector('.popup_type_edit');
document.querySelector('.profile__edit-button').addEventListener('click', () => 
  { clearValidation(profileForm, validationConfig);
    getName();
    openPopup(popupEdit);
    renderLoading(false);
});

const profileForm = document.forms["edit-profile"];
profileForm.addEventListener('submit', editProfile);

//Редактирование аватара
const editIcon = document.querySelector('.popup__edit-icon');
profileImage.addEventListener('mouseover', avatarHover);
profileImage.addEventListener('mouseout', avatarHover);

function avatarHover(){
  editIcon.classList.toggle('popup__edit-icon_visible');
}

const popupEditAvatar = document.querySelector('.popup_type_avatar');

profileImage.addEventListener('click', () => {openPopup(popupEditAvatar), renderLoading(false);clearValidation(avatarForm, validationConfig)});

const avatarInput = document.querySelector('.popup__input_avatar_link');
const avatarForm = document.forms["change-avatar"];

function editAvatar(evt) {
  patchAvatar(avatarInput.value)
  .then(() => {
    getInitialProfile()
    .then((profile) =>{
      profileImage.style = `background-image: url(${profile.avatar})`;
    })
    .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

  renderLoading(true);
  closePopup();
  evt.preventDefault();
}


avatarForm.addEventListener('submit', editAvatar);

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

document.querySelector('.profile__add-button').addEventListener('click', () => {openPopup(popupNewCard), renderLoading(false), clearValidation(newCardForm, validationConfig)});

function editNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: urlInput.value,
  }

  postNewCard(newCard)
  .then((newCard) => {
    placesList.prepend(createCard(newCard, deleteCard, openImage, handleLikes, userId));
  })
  .catch((err) => {
    console.log(err);
  });
  renderLoading(true);
  closePopup();
  clearValidation(newCardForm, validationConfig);
}

newCardForm.addEventListener('submit', editNewCard);

const popups = document.querySelectorAll('.popup');

popups.forEach((item) => {
  item.classList.add('popup_is-animated');
  item.addEventListener("click", closeOnClick)
  });




  // Вызовем функцию

  const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  };

  enableValidation(validationConfig);