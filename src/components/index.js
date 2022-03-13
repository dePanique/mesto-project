import './../index.css';
import {enableValidation, checkInputValidity} from './validation.js'
import {toFadePopup, handlePopup, closePopup, openPopup, fillInput} from './modal.js'
import {createCard} from './card.js'

const validationConfig = {
  formSelector: ".popup__blank",
  inputSelector: ".popup__input",
  inputInvalidClass: 'input__text_invalid',
  buttonSelector: '.popup__save-button',
  buttonDisabledClass: 'popup__save-button_active_false',
};

enableValidation(validationConfig);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Секция profile
const editProfileButton = document.querySelector('.profile__edit-box');
const addImage = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileBusiness = document.querySelector('.profile__business');

//Секция Elements
const elements = document.querySelector('.elements');

// editPtofilePopup
const editProfilePopup =  document.querySelector('.profile__ediprofilepopup');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-button');
const profileNameInput = document.getElementById('profile-name');
const profileBusinessInput = document.getElementById('profile-business');
const profileForm = editProfilePopup.querySelector('.popup__blank');

// addImagePopup
const addImagePopup =  document.querySelector('.profile__addimagepopup');
const addImagePopupCloseButton = addImagePopup.querySelector('.popup__close-button');
const addImageForm = addImagePopup.querySelector('.popup__blank');
const imageNameInput = document.getElementById('image-name');
const imageLinkInput = document.getElementById('image-link');

// cardPopup
const cardPopup =  document.querySelector('.card__cardpopup');
const cardPopupCloseButton = cardPopup.querySelector('.popup__close-button');

// Кнопка открыть редактор профиля
editProfileButton.addEventListener('click', function() {
  openPopup(editProfilePopup);
  fillInput(profileNameInput, profileBusinessInput, profileName, profileBusiness);
  const popupActive = document.querySelector('.popup_active');
  const popupActiveInputs = popupActive.querySelectorAll('.popup__input');
  checkInputValidity(popupActive, popupActiveInputs[0], validationConfig);
  checkInputValidity(popupActive, popupActiveInputs[1], validationConfig);
});

//Сабмит редактор профиля
profileForm.addEventListener('submit', function submitEditProfilePopup(evt){
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileBusiness.textContent = profileBusinessInput.value;
  toFadePopup(editProfilePopup);
  setTimeout(function() {
    closePopup(editProfilePopup);
  }, 400);
});

//Кнопка открыть добавление карточки
addImage.addEventListener('click', function() {
  openPopup(addImagePopup);
});

//Сабмит добавления картинки
addImageForm.addEventListener('submit', function addImageSubmit(evt) {
  evt.preventDefault();
  elements.prepend(createCard({
    name: imageNameInput.value,
    link: imageLinkInput.value
  }));
  toFadePopup(addImagePopup);
  imageNameInput.value = '';
  imageLinkInput.value = '';
  setTimeout(function() {
    closePopup(addImagePopup);
  }, 400);
});

//Кнопка закрытия добавления формы карточки
addImagePopupCloseButton.addEventListener('click',() => {
  handlePopup(addImagePopup);
});

//Кнопка закрытия попапа просмотра картинок
cardPopupCloseButton.addEventListener('click', ()=> {
  handlePopup(cardPopup);
});

//Кнопка закрыть редактор профиля
editProfilePopupCloseButton.addEventListener('click', () => {
  handlePopup(editProfilePopup);
});

//Создание карточек из начального массива
initialCards.forEach(element => {
  elements.append(createCard(element));
});
