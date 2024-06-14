
import './pages/index.css';
import {getInitialCards, getInitialProfile, patchProfileData, postNewCard, patchAvatar} from './components/api';
import {createCard, deleteCard, handleLikes} from './components/card';
import {openPopup, closePopup, closeOnClick, renderLoading} from './components/modal';
import {validationConfig, enableValidation, clearValidation} from './components/validation';




const placesList = document.querySelector('.places__list');

//Редактирование информации о себе
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector ('.profile__title');
const profileDescription = document.querySelector ('.profile__description');
const profileImage = document.querySelector ('.profile__image');

function editProfile(evt) {
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  renderLoading(true);
  closePopup();

  patchProfileData(nameInput.value, jobInput.value);
  evt.preventDefault();
}

function getName(){
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

const popupEdit = document.querySelector('.popup_type_edit');
document.querySelector('.profile__edit-button').addEventListener('click', () => 
  { getName();
    openPopup(popupEdit);
    renderLoading(false);
    clearValidation(popupEdit, validationConfig);
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
  renderLoading(true);
  closePopup();
  profileImage.style = `background-image: url(${avatarInput.value})`;
  patchAvatar(avatarInput.value);
  clearValidation(avatarForm, validationConfig);
  avatarInput.value = '';
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

document.querySelector('.profile__add-button').addEventListener('click', () => {openPopup(popupNewCard), renderLoading(false)});

function editNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: urlInput.value,
  }

  postNewCard(newCard)
  .then((newCard) => {
    placesList.prepend(createCard(newCard, deleteCard, openImage, handleLikes));
  })
  .catch((err) => {
    console.log(err);
  });
  renderLoading(true);
  closePopup();
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
}

newCardForm.addEventListener('submit', editNewCard);

const popups = document.querySelectorAll('.popup');

popups.forEach((item) => {
  item.classList.add('popup_is-animated');
  item.addEventListener("click", closeOnClick)
  });

  Promise.all([getInitialCards(), getInitialProfile()])
  .then(([initialCards, profile]) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileImage.style = `background-image: url(${profile.avatar})`;

    initialCards.forEach((card) => {
      placesList.append(createCard(card, deleteCard, openImage, handleLikes));
      
    }
    )
  })
    .catch((err) => {
          console.log(err); // выводим ошибку в консоль
  });


  // Вызовем функцию

  enableValidation();