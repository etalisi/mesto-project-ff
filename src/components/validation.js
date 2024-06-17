  /* Валидация */
  const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}__input-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
  };
  
  const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}__input-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.textContent = '';
  };
  
  const isValid = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      hideInputError(formElement, inputElement, validationConfig);
    }
  };

  const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  };

  export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig);
    });
  };


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};


const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
        buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};


/* Очистка ошибок и деактивация кнопки*/
export function clearValidation(form, validationConfig){
    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const submitButton = form.querySelector(validationConfig.submitButtonSelector);
    form.reset();
    toggleButtonState(inputList, submitButton, validationConfig);
    inputList.forEach((inputItem) => {
      hideInputError(form, inputItem, validationConfig);
    });
  }