import './../index.css';
import {
  enableValidation,
  checkInputValidity,
  disableButton,
} from './validation.js';
import { handlePopup, closePopup, openPopup, fillInput } from './modal.js';
import { createCard } from './card.js';

const validationConfig = {
  formSelector: '.popup__blank',
  inputSelector: '.popup__input',
  inputInvalidClass: 'popup__input_invalid',
  buttonSelector: '.popup__save-button',
  buttonDisabledClass: 'popup__save-button_active_false',
};

enableValidation(validationConfig);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

//Вся страница
const page = document.querySelector('.page');

//Секция profile
const editProfileButton = page.querySelector('.profile__edit-box');
const addImage = page.querySelector('.profile__add-button');
const profileName = page.querySelector('.profile__name');
const profileBusiness = page.querySelector('.profile__business');

//Секция Elements
const elements = page.querySelector('.elements');

// editPtofilePopup
const editProfilePopup = page.querySelector('.profile__ediprofilepopup');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-button');
const profileNameInput = document.getElementById('profile-name');
const profileBusinessInput = document.getElementById('profile-business');
const profileForm = editProfilePopup.querySelector('.popup__blank');
const editProfileNameInput = document.getElementById('profile-name');
const editProfileImageLinkInput = document.getElementById('profile-business');

// addImagePopup
const addImagePopup = page.querySelector('.profile__addimagepopup');
const addImagePopupCloseButton = addImagePopup.querySelector('.popup__close-button');
const addImageForm = addImagePopup.querySelector('.popup__blank');
const imageNameInput = document.getElementById('image-name');
const imageLinkInput = document.getElementById('image-link');
const addImageButton = addImageForm.querySelector('.popup__save-button');

// cardPopup
const cardPopup = page.querySelector('.card__cardpopup');
const cardPopupCloseButton = cardPopup.querySelector('.popup__close-button');

// Кнопка открыть редактор профиля
editProfileButton.addEventListener('click', function () {
  openPopup(editProfilePopup);
  fillInput(
    profileNameInput,
    profileBusinessInput,
    profileName,
    profileBusiness
  );
  checkInputValidity(
    editProfilePopup,
    editProfileNameInput,
    validationConfig);
  checkInputValidity(
    editProfilePopup,
    editProfileImageLinkInput,
    validationConfig
  );
});

//Сабмит редактор профиля
profileForm.addEventListener('submit', function submitEditProfilePopup(evt) {
  evt.preventDefault();
  closePopup(editProfilePopup);
  profileName.textContent = profileNameInput.value;
  profileBusiness.textContent = profileBusinessInput.value;
  disableButton();
});

//Кнопка открыть добавление карточки
addImage.addEventListener('click', function () {
  openPopup(addImagePopup);
});

//Сабмит добавления картинки
addImageForm.addEventListener('submit', function addImageSubmit(evt) {
  evt.preventDefault();
  closePopup(addImagePopup);
  elements.prepend(
    createCard({
      name: imageNameInput.value,
      link: imageLinkInput.value,
    })
  );
  checkInputValidity(addImagePopup, imageNameInput, validationConfig);
  checkInputValidity(addImagePopup, imageLinkInput, validationConfig);
  //Спасибо Gennadiy Barsegyan
  addImageForm.reset();
  disableButton(addImageButton, validationConfig);
});

//Кнопка закрытия добавления формы карточки
addImagePopupCloseButton.addEventListener('click', () => {
  handlePopup(addImagePopup);
});

//Кнопка закрытия попапа просмотра картинок
cardPopupCloseButton.addEventListener('click', () => {
  handlePopup(cardPopup);
});

//Кнопка закрыть редактор профиля
editProfilePopupCloseButton.addEventListener('click', () => {
  handlePopup(editProfilePopup);
});

//Создание карточек из начального массива
initialCards.forEach((element) => {
  elements.append(createCard(element));
});
