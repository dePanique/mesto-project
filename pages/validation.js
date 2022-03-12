//функция выбирает span по id
const checkInputValidity = (formElement, inputElement, config) => {
  //у каждого инпута есть validity

  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  //const passwordsCorrect = checkPasswords(inputElement);
  if (!inputElement.validity.valid) {
    //hideInputError(inputElement, errorElement, config);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add('popup__input_invalid');
  } else {
    //showInputError(inputElement, errorElement, inputElement.validationMessage, config);
    errorElement.textContent = '';
  }
};

// Вешает лисенеры на инпуты
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      //toggleButtonState(formElement, inputList, config)
    });
  });

  // toggleButtonState(formElement, inputList, config);
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
