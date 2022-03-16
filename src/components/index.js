import './../index.css';
import { enableValidation, checkInputValidity, disableButton } from './validation.js';
import { closePopup, openPopup, fillProfileInput, showLoadingStatus } from './modal.js';
import { getCards, getProfile, patchProfileInfo, addCard, patchAvatar } from './api.js';
import { createCard } from './card.js';

const validationConfig = {
  formSelector: '.popup__blank',
  inputSelector: '.popup__input',
  inputInvalidClass: 'popup__input_invalid',
  buttonSelector: '.popup__save-button',
  buttonDisabledClass: 'popup__save-button_active_false',
};

enableValidation(validationConfig);

//Вся страница
const page = document.querySelector('.page');

//Секция profile
const editProfileButton = page.querySelector('.profile__edit-box');
const addImage = page.querySelector('.profile__add-button');
const profileName = page.querySelector('.profile__name');
const profileBusiness = page.querySelector('.profile__business');
const avatarEdit = page.querySelector('.profile__avatar');

//Секция Elements
const elements = page.querySelector('.elements');

// editPtofilePopup
const editProfilePopup = page.querySelector('.profile__ediprofilepopup');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-button');
const profileNameInput = document.getElementById('profile-name');
const profileBusinessInput = document.getElementById('profile-business');
const profileForm = editProfilePopup.querySelector('.popup__blank');
const editProfileNameInput = document.getElementById('profile-name');
const profileNameText = document.querySelector('.profile__name');
const profileBusinessText = document.querySelector('.profile__business');
;
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

// editPopup
const avatarEditPopup = page.querySelector('.profile__avatarapprovalpopup');
const avatarEditPopupCloseButton = avatarEditPopup.querySelector('.popup__close-button');
const avatarEditPopupSubmit = avatarEditPopup.querySelector('.popup__blank');
const avatarEditPopupInput = avatarEditPopup.querySelector('.popup__input');

// Кнопка открыть редактор профиля
editProfileButton.addEventListener('click', function () {
  openPopup(editProfilePopup);
  fillProfileInput(profileNameInput, profileBusinessInput, profileName, profileBusiness);
  checkInputValidity( editProfilePopup,editProfileNameInput,validationConfig);
});

//Сабмит редактор профиля
profileForm.addEventListener('submit', function submitEditProfilePopup(evt) {
  evt.preventDefault();
  showLoadingStatus(evt, 'Сохранение...');
  profileName.textContent = profileNameInput.value;
  profileBusiness.textContent = profileBusinessInput.value;
  patchProfileInfo(profileNameInput.value, profileBusinessInput.value)
    .finally(() => {
      showLoadingStatus(evt, 'Сохранить');
    });
});

//Кнопка открыть добавление карточки
addImage.addEventListener('click', function () {
  openPopup(addImagePopup);
});

//Сабмит добавления картинки
addImageForm.addEventListener('submit', function addImageSubmit(evt) {
  evt.preventDefault();
  showLoadingStatus(evt, 'Сохранение...');
  addCard(imageNameInput.value, imageLinkInput.value).
    then((result) => {
      elements.prepend(createCard(result));
    })
    .finally(() => {
      showLoadingStatus(evt, 'Сохранить');
    });
  elements.lastChild.remove();
  checkInputValidity(addImagePopup, imageNameInput, validationConfig);
  checkInputValidity(addImagePopup, imageLinkInput, validationConfig);
  //Спасибо Gennadiy Barsegyan
  addImageForm.reset();
  disableButton(addImageButton, validationConfig);
});

//Кнопка закрытия добавления формы карточки
addImagePopupCloseButton.addEventListener('click', () => {
  closePopup(addImagePopup);
});

//Кнопка закрытия попапа просмотра картинок
cardPopupCloseButton.addEventListener('click', () => {
  closePopup(cardPopup);
});

//Кнопка закрыть редактор профиля
editProfilePopupCloseButton.addEventListener('click', () => {
  closePopup(editProfilePopup);
});

//Кнопка открытия редактора аватара
avatarEdit.addEventListener('click', () => {
  openPopup(avatarEditPopup);
});

avatarEditPopupCloseButton.addEventListener('click', () => {
  closePopup(avatarEditPopup)
})


avatarEditPopupSubmit.addEventListener('submit', (evt) => {
  showLoadingStatus(evt, 'Сохранение...');
  avatarEdit.style.backgroundImage = `url(${avatarEditPopupInput.value})`;
  patchAvatar(avatarEditPopupInput.value)
  .finally(() => {
    showLoadingStatus(evt, 'Сохранить');
  });
})


getProfile(profileNameText, profileBusinessText, avatarEdit);
getCards(elements, createCard)
  .then((result) => {
    const currentCards = [];
      for (let key in result) {
        currentCards.push(result[key]);
      }
      currentCards.forEach(element => {
        elements.append(createCard(element));
    });
  })

