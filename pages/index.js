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

const profileName = document.querySelector('.profile__name');
const profileBusiness = document.querySelector('.profile__business');

const editProfileButton = document.querySelector('.profile__edit-box');
const addImage = document.querySelector('.profile__add-button');

const elements = document.querySelector('.elements');

const card = document.querySelector('#card').content;

// popups
const editProfilePopup =  document.querySelector('.profile__ediprofilepopup');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-button');

const addImagePopup =  document.querySelector('.profile__addimagepopup');
const addImagePopupCloseButton = addImagePopup.querySelector('.popup__close-button');

const cardPopup =  document.querySelector('.card__cardpopup');
const cardPopupCloseButton = cardPopup.querySelector('.popup__close-button');

let activepopup;
// TODO убрать popup2
const popupImage = document.querySelector('.popup__image');

//Функция отвечает за появление и исчезновение элементов
function toFadePopup() {
  activepopup.classList.toggle('popup_fade');
}

function openPopup() {
  console.log(activepopup)
  activepopup.classList.add('popup_active');
  setTimeout(toFadePopup, 400);
}

function closePopup() {
  activepopup.classList.remove('popup_active');
}

// Кнопка редактировать профиль
editProfileButton.addEventListener('click', function() {
  console.log(777);
  activepopup = editProfilePopup;
  openPopup();
});

//Кнопка закрыть редактировать профиль
editProfilePopupCloseButton.addEventListener('click', function() {
  toFadePopup();
  setTimeout(closePopup, 400);
});

//Кнопка добавить карточку
addImage.addEventListener('click', function() {
  console.log(777);
  activepopup = addImagePopup;
  openPopup();
});

//Кнопка закрытия добавления формы карточки
addImagePopupCloseButton.addEventListener('click', function() {
  toFadePopup();
  setTimeout(closePopup, 400);
});

//Кнопка открытия просмотра фотографии
cardPopup.addEventListener('click', function() {
  console.log(777);
  activepopup = addImagePopup;
  openPopup();
});

//Кнопка закрытия просмотра фотографии
cardPopupCloseButton.addEventListener('click', function() {
  toFadePopup();
  setTimeout(closePopup, 400);
});


//Функция рендерит карточки на странице
function renderCards(cardArray) {

  //cardArray это массив с объектами, каждый из которых содержит информацию об одной карточке
  //Нужно взять информацию из каждого элемента массива
  cardArray.forEach((cardArrayElement, index) => {

    //Присвоим элемент переменной чтобы не искать его каждый раз
    const element = card.querySelector('.card').cloneNode(true);

    //Запишем нужную информацию в карточку
    element.querySelector('.card__image').src = cardArrayElement.link;
    element.querySelector('.card__title').textContent = cardArrayElement.name;
    element.querySelector('.card__image').alt = `Изображение ${cardArrayElement.name}`;

    //Добавим реакцию на клик по сердечку
    element.querySelector('.card__icon').addEventListener('click', (el) => {

      el.target.classList.toggle('card__icon_active');

    });

    //Добавим реакцию на клик по иконке корзина
    element.querySelector('.card__trash').addEventListener('click', () => {

      element.remove();
      initialCards.splice(index, 1);
      // elements.querySelectorAll('.card').forEach((el) => el.remove());
      // renderCards(cardArray);

    });

    //Добавим реакцию на клик по картинке
    element.querySelector('.card__image').addEventListener('click', () => {

      activepopup = cardPopup;
      popup[2].classList.toggle('popup_active');
      setTimeout(toFadePopup, 100);
      figcaption.textContent = cardArrayElement.name;
      popupImage.src = cardArrayElement.link;
      popupImage.alt = `Изображение ${cardArrayElement.name}`;

    });

    // Добавим карточку
    elements.append(element);

  });

}

//Функция передает информацию в поля попапа редактирования профиля
function fillInput() {

  inputName.value = profileName.textContent.trim();
  inputBusiness.value = profileBusiness.textContent.trim();

}


//Отправка данных на сервер
function submitPopup(evt) {

  evt.preventDefault();

  // Первая ветка отвечает за сабмит Редактирования профиля
  if (activepopup === popup[0]) {

    profileName.textContent = inputName.value;
    profileBusiness.textContent = inputBusiness.value;

  } else {

    elements.querySelectorAll('.card').forEach((el) => el.remove());

    //Добавим объект в начало массива
    initialCards.unshift({
      name: inputImageName.value,
      link: inputLink.value
    });

    //И рендерим карточки
    renderCards(initialCards);

  }

  //Можно закрывать
  toFadePopup();
  setTimeout(handlePopup, 300);

}


//Кнопка добавить картинку
addImage.addEventListener('click', () => {

  activepopup = popup[1];
  handlePopup();
  setTimeout(toFadePopup, 100);

});

//Рендер карточек при загрузке страницы
renderCards(initialCards);