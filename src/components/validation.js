
// Функция включения валидации

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
}



// Функция отображения ошибки

function showInputError(formElement, inputElement, errorMessage, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

// Функия скрытия и печати ошибки

function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
}

// Функция валидации полей форм

function isValid(formElement, inputElement, validationConfig) {
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
}

// Функция проверки валидности формы для отображения состояния кнопки
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция переключения состояния кнопки при валидации полей

function toggleButtonState(inputList, someButton, validationConfig) {
  if (hasInvalidInput(inputList)) {
    someButton.disabled = true;
    someButton.classList.add(validationConfig.inactiveButtonClass);
  } else {
    someButton.disabled = false;
    someButton.classList.remove(validationConfig.inactiveButtonClass);
  }
}

// Функция очистки ошибки при закрытии формы

function clearValidation(formElement, validationConfig) {
  const inputArray = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  inputArray.forEach(function (inputElement) {
    hideInputError(formElement, inputElement, validationConfig);
  });
  submitButton.disabled = true;
  submitButton.classList.add(validationConfig.inactiveButtonClass);
}

// Слушатель события input и вызов функции проверки валидности формы

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const someButton = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, someButton, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, someButton, validationConfig);
    });
  });
}
export { enableValidation, clearValidation };