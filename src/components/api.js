const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '90c8f3a2-9b67-444c-bf21-3cf498d59d73',
    'Content-Type': 'application/json',
  },
}

function _checkResponse(res) {
  if (res.ok) {
    return res.json()
  }

  return Promise.reject(`Ошибка: ${res.status}`)
}

//Удалить карточку на сервере
export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(_checkResponse)
}

//Добавить лайк на сервере
export function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(_checkResponse)
}

//Удалить лайк на сервере
export function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(_checkResponse)
}

//Забрать карточки пользователей с сервера
export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(_checkResponse)
}

//Завбрать Данные с сервера
export function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(_checkResponse)
}

// Отправляем name и about на сервер
export function patchProfileInfo(profileName, profileAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${profileName}`,
      about: `${profileAbout}`,
    })
  })
    .then(_checkResponse)
}

// Добавляем картинку на сервер
export function addCard(cardName, cardLlink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${cardName}`,
      link: `${cardLlink}`,
    })
  })
    .then(_checkResponse)
}

// Отправляем картинку на сервер
export function patchAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${avatarLink}`,
    })
  })
    .then(_checkResponse)
}
