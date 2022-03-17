import { openPopup } from './modal.js';
import { deleteCard, addLike, deleteLike, getCards} from './api.js';

const card = document.querySelector('#card').content;
const cardPopup = document.querySelector('.card__cardpopup');
const cardPopupImage = cardPopup.querySelector('.popup__image');
const cardPopupFigcaption = cardPopup.querySelector('.popup__figcaption');

//Функция создает карточку
export function createCard(cardInfoObject) {
  //Присвоим элемент переменной чтобы не искать его каждый раз
  const element = card.querySelector('.card').cloneNode(true);
  const amountOfLike = element.querySelector('.card__amountOfLikes');
  const cardIcon = element.querySelector('.card__icon');
  //Массив перебераем массив до первого объекта с нашим id, false если массив пуст или нет нашего id
  if (cardInfoObject.likes) {
    amountOfLike.textContent = cardInfoObject.likes.length;
    if (cardInfoObject.likes.some(user => user._id == createCard.user_id)) {
      cardIcon.classList.add('card__icon_active');
    }
  }

  //Запишем нужную информацию в карточку
  const cardImage = element.querySelector('.card__image');
  cardImage.src = cardInfoObject.link;
  element.querySelector('.card__title').textContent = cardInfoObject.name;
  cardImage.alt = `Изображение ${cardInfoObject.name}`;

  //Добавим реакцию на клик по сердечку
  element.querySelector('.card__icon').addEventListener('click', (el) => {
    getCards()
    .then((result) => {
      //find вернёт новую информацию о карточке, а some проверит есть ли на ней лайк юзера
      const res = result.find(el => el._id === cardInfoObject._id).likes.some(user => user._id == createCard.user_id);
      if (res) {
        deleteLike(cardInfoObject._id)
        .then((result) => {
          cardIcon.classList.remove('card__icon_active');
          amountOfLike.textContent = result.likes.length;
        })
      } else {
        addLike(cardInfoObject._id)
        .then((result) => {
          cardIcon.classList.add('card__icon_active');
          amountOfLike.textContent = result.likes.length;
        })
      }
    })
  })

  //Добавим реакцию на клик по иконке корзина
  if (cardInfoObject.owner._id == createCard.user_id) {
    element.querySelector('.card__trash').classList.remove('card__trash_active_false');
    element.querySelector('.card__trash').addEventListener('click', () => {
      deleteCard(cardInfoObject._id)
      .then(() => {
        element.remove();
      })
    })
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