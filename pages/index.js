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
const card = document.querySelector('#card').content;

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
const cardPopupImage = cardPopup.querySelector('.popup__image');
const cardPopupFigcaption = cardPopup.querySelector('.popup__figcaption');

//Функция отвечает за появление и исчезновение элементов
function toFadePopup(activePopup) {
  activePopup.classList.toggle('popup_fade');
}

//Функция передает информацию в поля попапа редактирования профиля
function fillInput() {
  profileNameInput.value = profileName.textContent.trim();
  profileBusinessInput.value = profileBusiness.textContent.trim();
}

//Функция открытия попапа
function openPopup(activePopup) {
  activePopup.classList.add('popup_active');
  setTimeout(function() {
    toFadePopup(activePopup)
  }, 400);
}

//Функция закрытия попапа
function closePopup(activePopup) {
  activePopup.classList.remove('popup_active');
}

//Функция создает карточку
function createCard(cardInfoObject) {

  //Присвоим элемент переменной чтобы не искать его каждый раз
  const element = card.querySelector('.card').cloneNode(true);

  //Запишем нужную информацию в карточку
  element.querySelector('.card__image').src = cardInfoObject.link;
  element.querySelector('.card__title').textContent = cardInfoObject.name;
  element.querySelector('.card__image').alt = `Изображение ${cardInfoObject.name}`;

  //Добавим реакцию на клик по сердечку
  element.querySelector('.card__icon').addEventListener('click', (el) => {
    el.target.classList.toggle('card__icon_active');
  });

  //Добавим реакцию на клик по иконке корзина
  element.querySelector('.card__trash').addEventListener('click', () => {
    element.remove();
  });

  //Добавим реакцию на клик по картинке
  element.querySelector('.card__image').addEventListener('click', () => {
    openPopup(cardPopup);
    cardPopupFigcaption.textContent = cardInfoObject.name;
    cardPopupImage.src = cardInfoObject.link;
    cardPopupImage.alt = `Изображение ${cardInfoObject.name}`;
  });

  return element;

}

// Кнопка открыть редактор профиля
editProfileButton.addEventListener('click', function() {
  openPopup(editProfilePopup);
  fillInput();
});

//Кнопка закрыть редактор профиля
editProfilePopupCloseButton.addEventListener('click', function() {
  toFadePopup(editProfilePopup);
  setTimeout(function() {
    closePopup(editProfilePopup)
  }, 400);
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
})

//Кнопка закрытия добавления формы карточки
addImagePopupCloseButton.addEventListener('click', function() {
  toFadePopup(addImagePopup);
  setTimeout(function() {
    closePopup(addImagePopup);
  }, 400);
});

//Кнопка закрытия попапа просмотра картинок
cardPopupCloseButton.addEventListener('click', function() {
  toFadePopup(cardPopup);
  setTimeout(function() {
    closePopup(cardPopup);
  }, 400);
})

//Создание карточек из начального массива
initialCards.forEach(element => {
  elements.append(createCard(element));
});
