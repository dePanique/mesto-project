// проверка клика по оверлэю
function handleOverlayClick(popup) {
  if (popup.target.classList.contains('popup_active')) {
    closePopup(popup.target);
  }
}

//Закрытие попапа по нажатию Esc
function handleEscapeKey(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_active'))
  }
}

//Функция закрытия попапа
export function closePopup(activePopup) {
  activePopup.classList.remove('popup_active');
  document.removeEventListener('mousedown', handleOverlayClick);
  document.removeEventListener('keydown', handleEscapeKey);
}

//Функция открытия попапа
export function openPopup(activePopup) {
  activePopup.classList.add('popup_active');
  document.addEventListener('mousedown', handleOverlayClick);
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