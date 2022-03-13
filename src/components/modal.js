//Функция отвечает за появление и исчезновение элементов
export function toFadePopup(activePopup) {
  activePopup.classList.toggle('popup_fade');
}

// проверка клика по оверлэю
function isTargetPopup(popup) {
  if (popup.target.classList.contains('popup_active')) {
    handlePopup(popup.target);
  }
}

//Закрытие попапа по нажатию Esc
function escapePopup(evt) {
  if (evt.key === 'Escape') {
    console.log(2)
    handlePopup(document.querySelector('.popup_active'))
  }
}

//Закрыть попап с fade эффектом
export function handlePopup(evt) {
  toFadePopup(evt);
  setTimeout(function() {
    closePopup(evt);
  }, 400);
}

//Функция закрытия попапа
export function closePopup(activePopup) {
  activePopup.classList.remove('popup_active');
  document.removeEventListener('click', isTargetPopup);
  document.removeEventListener('keydown', escapePopup);
}

//Функция открытия попапа
export function openPopup(activePopup) {
  activePopup.classList.add('popup_active');
  document.addEventListener('click', isTargetPopup);
  document.addEventListener('keydown', escapePopup);
  setTimeout(function() {
    toFadePopup(activePopup)
  }, 400);
}

//Функция передает информацию в поля попапа редактирования профиля
export function fillInput(profileNameInput, profileBusinessInput, profileName, profileBusiness) {
  profileNameInput.value = profileName.textContent.trim();
  profileBusinessInput.value = profileBusiness.textContent.trim();
}