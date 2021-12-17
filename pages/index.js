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
    link: 'Битая ссылка'
  }
];

const profileName = document.querySelector('.profile__name');
const profileBusiness = document.querySelector('.profile__business');
const popup = document.querySelectorAll('.popup');
const editProfileButton = document.querySelector('.profile__edit-box');
const addImage = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const submitProfileEdit = document.querySelectorAll('.popup__save-button')[0];
const submitAddImage = document.querySelectorAll('.popup__save-button')[1];
const elements = document.querySelector('.elements');
const card = document.querySelector('#card').content;
const inputName = document.querySelectorAll('.popup__input')[0];
const inputBusiness = document.querySelectorAll('.popup__input')[1];
const inputImageName = document.querySelectorAll('.popup__input')[2];
const inputLink = document.querySelectorAll('.popup__input')[3];
const figcaption = popup[2].querySelector('.popup__figcaption');
const popupImage = document.querySelector('.popup__image');
let activepopup = popup;


//Функция отвечает за появление и исчезновение элементов
function toFadePopup() {
  activepopup.classList.toggle('popup_fade');
}

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

      activepopup = popup[2];
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

// Туглит окно редактирования профиля
function handlePopup() {

  activepopup.classList.toggle('popup_active');

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

// Кнопка редактировать профиль
editProfileButton.addEventListener('click', () => {

  activepopup = popup[0];
  handlePopup();
  setTimeout(toFadePopup, 100);
  fillInput();

});

//Кнопка добавить картинку
addImage.addEventListener('click', () => {

  activepopup = popup[1];
  handlePopup();
  setTimeout(toFadePopup, 100);

});

//Кнопка закрыть редактирование профиля
closeButtons[0].addEventListener('click', () => {

  toFadePopup();
  setTimeout(handlePopup, 300);

});

//Кнопка закрыть добавление картинки
closeButtons[1].addEventListener('click', () => {

  toFadePopup();
  setTimeout(handlePopup, 300);

});

//Кнопка закрыть просмотр
closeButtons[2].addEventListener('click', () => {

  toFadePopup();
  setTimeout(handlePopup, 300);

});

//Сабмит попап редактирования профиля
submitProfileEdit.addEventListener('click', submitPopup);

//Сабмит попап добавления фотографии
submitAddImage.addEventListener('click', submitPopup);

//Рендер карточек при загрузке страницы
renderCards(initialCards);