import { openPopup } from './modal.js';
import { deleteCard, addLike, deleteLike} from './api.js';

const card = document.querySelector('#card').content;
const cardPopup = document.querySelector('.card__cardpopup');
const cardPopupImage = cardPopup.querySelector('.popup__image');
const cardPopupFigcaption = cardPopup.querySelector('.popup__figcaption');

//Функция создает карточку
export function createCard(cardInfoObject) {
  //Присвоим элемент переменной чтобы не искать его каждый раз
  const element = card.querySelector('.card').cloneNode(true);
  const amountOfLike = element.querySelector('.card__amountOfLikes');

  //Массив перебераем массив до первого объекта с нашим id, false если массив пуст или нет нашего id
  if (cardInfoObject.likes) {
    amountOfLike.textContent = cardInfoObject.likes.length;
    if (cardInfoObject.likes.some(user => user._id == '6ec2dd0c29635edfa90109af')) {
      element.querySelector('.card__icon').classList.add('card__icon_active');
    }
  }

  //Запишем нужную информацию в карточку
  const cardImage = element.querySelector('.card__image');
  cardImage.src = cardInfoObject.link;
  element.querySelector('.card__title').textContent = cardInfoObject.name;
  cardImage.alt = `Изображение ${cardInfoObject.name}`;

  //Добавим реакцию на клик по сердечку
  element.querySelector('.card__icon').addEventListener('click', (el) => {
    el.target.classList.toggle('card__icon_active');
    if (el.target.classList.contains('card__icon_active')) {
      addLike(cardInfoObject._id, amountOfLike);
    } else {
      deleteLike(cardInfoObject._id, amountOfLike);
    }
  });

  //Добавим реакцию на клик по иконке корзина
  if (cardInfoObject.owner._id == '6ec2dd0c29635edfa90109af') {
    element.querySelector('.card__trash').classList.remove('card__trash_active_false');
    element.querySelector('.card__trash').addEventListener('click', () => {
      element.remove();
      deleteCard(cardInfoObject._id);
    });
  }

  //Добавим реакцию на клик по картинке
  cardImage.addEventListener('click', () => {
    openPopup(cardPopup);
    cardPopupFigcaption.textContent = cardInfoObject.name;
    cardPopupImage.src = cardInfoObject.link;
    cardPopupImage.alt = `Изображение ${cardInfoObject.name}`;
  });

  return element;
}