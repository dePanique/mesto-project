const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers : {
    authorization: '90c8f3a2-9b67-444c-bf21-3cf498d59d73',
    'Content-Type': 'application/json'
  }
}

//Удалить карточку на сервере
export function deleteCard(cardId) {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
  method: 'DELETE',
  headers: config.headers
  })
  .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

//Добавить лайк на сервере
export function addLike(cardId, amountOfLike) {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: 'PUT',
  headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .then((result) => {
    amountOfLike.textContent = result.likes.length;
  });
}

//Удалить лайк на сервере
export function deleteLike(cardId, amountOfLike) {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: 'DELETE',
  headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  })
  .then((result) => {
    amountOfLike.textContent = result.likes.length;
  });
}

//Забрать карточки пользователей с сервера
export function getCards(elements, createCard) {
  return fetch(`${config.baseUrl}/cards`, {
  headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
  });
}

//Завбрать Данные с сервера
export function getProfile(profileNameText, profileBusinessText, profileAvatar) {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .then((result) => {
    profileNameText.textContent = result.name;
    profileBusinessText.textContent = result.about;
    console.log(result.avatar)
    profileAvatar.style.backgroundImage = `url(${result.avatar})`;
  })
  .finally(() => {
  });
}

// Отправляем name и about на сервер
export function patchProfileInfo(profileName, profileAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: `${profileName}`,
    about: `${profileAbout}`
  })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

// Добавляем картинку на сервер
export function addCard(cardName, cardLlink) {
  return fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({
    name: `${cardName}`,
    link: `${cardLlink}`
  })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
  })
}

// Отправляем картинку на сервер
export function patchAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: `${avatarLink}`
  })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}