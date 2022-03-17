//Закрытие попапа по нажатию Esc
function handleEscapeKey(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_active'))
  }
}

//Функция закрытия попапа
export function closePopup(activePopup) {
  activePopup.classList.remove('popup_active');
  document.removeEventListener('keydown', handleEscapeKey);
}

//Функция открытия попапа
export function openPopup(activePopup) {
  activePopup.classList.add('popup_active');
  document.addEventListener('keydown', handleEscapeKey);
}

//Функция передает информацию в поля попапа редактирования профиля
export function fillProfileInput(profileNameInput, profileBusinessInput, profileName, profileBusiness) {
  profileNameInput.value = profileName.textContent.trim();
  profileBusinessInput.value = profileBusiness.textContent.trim();
}

export function showLoadingStatus(evt, status) {
  evt.target.querySelector('.popup__save-button').textContent = `${status}`;
}