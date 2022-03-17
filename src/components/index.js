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
const profileNameInput = document.getElementById('profile-name');
const profileBusinessInput = document.getElementById('profile-business');
const profileForm = editProfilePopup.querySelector('.popup__blank');
const editProfileNameInput = document.getElementById('profile-name');
const profileNameText = document.querySelector('.profile__name');
const profileBusinessText = document.querySelector('.profile__business');
;
// addImagePopup
const addImagePopup = page.querySelector('.profile__addimagepopup');
const addImageForm = addImagePopup.querySelector('.popup__blank');
const imageNameInput = document.getElementById('image-name');
const imageLinkInput = document.getElementById('image-link');
const addImageButton = addImageForm.querySelector('.popup__save-button');

// editPopup
const avatarEditPopup = page.querySelector('.profile__avatarapprovalpopup');
const avatarEditPopupSubmit = avatarEditPopup.querySelector('.popup__blank');
const avatarEditPopupInput = avatarEditPopup.querySelector('.popup__input');

// Кнопка открыть редактор профиля
editProfileButton.addEventListener('click', function (evt) {
  openPopup(editProfilePopup);
  fillProfileInput(profileNameInput, profileBusinessInput, profileName, profileBusiness);
  checkInputValidity( editProfilePopup,editProfileNameInput,validationConfig);
});

//Сабмит редактор профиля
profileForm.addEventListener('submit', function submitEditProfilePopup(evt) {
  evt.preventDefault();
  showLoadingStatus(evt, 'Сохранение...');
  patchProfileInfo(profileNameInput.value, profileBusinessInput.value)
  .then(() => {
    profileName.textContent = profileNameInput.value;
    profileBusiness.textContent = profileBusinessInput.value;
    closePopup(editProfilePopup);
  })
  .catch((err) => {
   console.log(err)
  })
  .finally(() => {
    showLoadingStatus(evt, 'Сохранить');
  })
});

//Кнопка открыть добавление карточки
addImage.addEventListener('click', function (evt) {
  openPopup(addImagePopup);
});

//Кнопка открытия редактора аватара
avatarEdit.addEventListener('click', (evt) => {
  openPopup(avatarEditPopup);
});

//Сабмит добавления картинки
addImageForm.addEventListener('submit', function addImageSubmit(evt) {
  evt.preventDefault();
  showLoadingStatus(evt, 'Сохранение...');
  addCard(imageNameInput.value, imageLinkInput.value)
  .then((result) => {
    elements.prepend(createCard(result));
    elements.lastChild.remove();
    closePopup(addImagePopup)
    checkInputValidity(addImagePopup, imageNameInput, validationConfig);
    checkInputValidity(addImagePopup, imageLinkInput, validationConfig);
    //Спасибо Gennadiy Barsegyan
    addImageForm.reset();
    disableButton(addImageButton, validationConfig);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    showLoadingStatus(evt, 'Сохранить');
  })
});

//Будем искать все попапы и слушать на них крестики и оверлэи
const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_active') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

avatarEditPopupSubmit.addEventListener('submit', (evt) => {
  showLoadingStatus(evt, 'Сохранение...');
  avatarEdit.style.backgroundImage = `url(${avatarEditPopupInput.value})`
  patchAvatar(avatarEditPopupInput.value)
  .then(() => {
    avatarEditPopupSubmit.reset()
    closePopup(avatarEditPopup)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    showLoadingStatus(evt, 'Сохранить')
  })
})

Promise.all([getProfile(), getCards()])
.then(([userData, cards]) => {
  //Добавляем информацию о пользователе
  createCard.user_id = userData._id
  profileNameText.textContent = userData.name
  profileBusinessText.textContent = userData.about
  avatarEdit.style.backgroundImage = `url(${userData.avatar})`
  //Добавляем карточки
  for (let key in cards) elements.append(createCard(cards[key]))
})
.catch((err) => {
  console.log(err)
})