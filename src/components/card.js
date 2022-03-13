import {openPopup} from './modal.js'
const cardPopup =  document.querySelector('.card__cardpopup');
const cardPopupImage = cardPopup.querySelector('.popup__image');
const cardPopupFigcaption = cardPopup.querySelector('.popup__figcaption');

//Функция создает карточку
export function createCard(cardInfoObject) {
  const card = document.querySelector('#card').content;
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