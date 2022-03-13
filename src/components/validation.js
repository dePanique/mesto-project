//функция выбирает span по id
export const checkInputValidity = (formElement, inputElement, config) => {
  //у каждого инпута есть validity
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;

  //const passwordsCorrect = checkPasswords(inputElement);
  if (!inputElement.validity.valid) {
    //hideInputError(inputElement, errorElement, config);
    inputElement.classList.add('popup__input_invalid');
  } else {
    //showInputError(inputElement, errorElement, inputElement.validationMessage, config);
    inputElement.classList.remove('popup__input_invalid');
  }
};

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

// Вешает лисенеры на инпуты
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(formElement, inputList, config)
    });
  });

  toggleButtonState(formElement, inputList, config);
};

export const enableValidation = (config) => {
  //выбрать все формы на странице
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(form, config);
  });
};

