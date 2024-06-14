//Функция открытия попапа
let openedPopup;

export function openPopup (popup) {
  openedPopup = popup;
  openedPopup.classList.add('popup_is-opened'); 
  document.addEventListener('keydown', closeOnKeydown);
}
  
//Функции закрытия попапа

export function closePopup() {
  openedPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeOnKeydown);
};

function closeOnKeydown (evt) {
  if (evt.key === 'Escape') {
    closePopup();
  } 
}

export function closeOnClick (evt) {
  if(evt.target === evt.currentTarget) {
    closePopup();
} else if(evt.target.classList.contains('popup__close')) {
    closePopup();
  }
}

export function renderLoading (isLoading) {
  const button = openedPopup.querySelector('.popup__button');
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}