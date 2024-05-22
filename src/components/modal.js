//Работа модальных окон

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
export const page = document.querySelector('.page');



export function openPopup (evt) {

  if (evt.target.classList.contains('profile__edit-button')) {
    popupEdit.classList.add('popup_is-opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  } else if (evt.target.classList.contains('profile__add-button')) {
    popupNewCard.classList.add('popup_is-opened');
  }
  page.addEventListener('click', closePopup);
  document.addEventListener('keydown', closePopup);

}




export function closePopup(evt) {
  if (evt.target.classList.contains('popup__close') || evt.key === 'Escape' || (evt.target.classList.contains('popup'))) {
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
  } 

};

document.removeEventListener('keydown', closePopup);

//Редактирование информации о себе


const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector ('.profile__title');
const profileDescription = document.querySelector ('.profile__description');



export function handleFormSubmit(evt) {

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
  evt.preventDefault();
}



//Анимация попапов

const popup = document.querySelectorAll('.popup');
popup.forEach((item) => {
  item.classList.add('popup_is-animated');
});
