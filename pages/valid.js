// form class action
// form method post
// для отображения ошибки span id=class=error-xxx

const validationConfig = {
  formSelector: ".popup__blank",
  inputSelector: ".popup__inputErrorMessage",
  errorClass: 'error-message_visible',
  inputInvalidClass: 'input__text_invalid',
  buttonSelector: '.popup__save-button',
  buttonDisabledClass: '.popup__save-button_active_false'
};

// const passwordElement = document.querySelector('#password');
// const passwordRepeatElement = document.querySelector('#passwordRepeat');

const hideInputError = (inputElement, errorElement, errorMessage, config) => {
  inputElement.classList.remove(config.inputInvalidClass);
  inputElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

const showInputError = (inputElement, errorElement, config) => {
  inputElement.classList.remove(config.inputInvalidClass);
  inputElement.classList.remove(config.errorClass);
  errorElement.textContent = errorMessage;
}

// const checkPasswords = (inputElement) => {
//   if (inputElement.id !== 'password' && inputElement.id !== 'passwordRepeat') {
//     return true;
//   }

//   if (passwordElement.value = passwordRepeatElement.value) {
//     return true;
//   }

//   return false;
// }

//функция выбирает span по id
const checkInputValidity = (formElement, inputElement, config) => {
  //у каждого инпута есть validity
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  const passwordsCorrect = checkPasswords(inputElement);
  if (!inputElement.validity.valid) {
    hideInputError(inputElement, errorElement, config);
  } else {
    showInputError(inputElement, errorElement, inputElement.validationMessage, config);
  }
};

//+
const disabledButton = (buttonElement, config) => {
  buttonElement.classList.add(config.buttonDisabledClass);
  buttonElement.disabled = true;
}

const enableButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.buttonDisabledClass);
  buttonElement.disabled = false;
}

const hasInvalidInput = inputList => inputList.some(inputElement => !inputElement.validity.valid);

const toggleButtonState = (formElement, inputList, config) => {
  const buttonElement = formElement.querySelector(config.buttonSelector);

  if (hasInvalidInput(inputList)) {
    disabledButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
}

//+
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElementm, config);
      toggleButtonState(formElement, inputList, config)
    });
  });

  toggleButtonState(formElement, inputList, config);
};

//+
export const enableValidation = (config) => {
  //выбрать все формы на странице
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

enableValidation(validationConfig);
