const showInputError = (data, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(data.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(data.errorClass);
};

const hideInputError = (data, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(data.inputErrorClass);
  errorElement.classList.remove(data.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (data, formElement, inputElement) =>
  inputElement.validity.valid
    ? hideInputError(data, formElement, inputElement)
    : showInputError(data, formElement, inputElement, inputElement.validationMessage);

const hasInvalidInput = inputList => inputList.some(inputElement => !inputElement.validity.valid);

const toggleButtonState = (data, inputList, buttonElement) =>
  buttonElement.disabled = hasInvalidInput(inputList);

const validationHandler = (data, formElement, inputElement, inputList, buttonElement) => {
  checkInputValidity(data, formElement, inputElement);

  toggleButtonState(data, inputList, buttonElement);
};

const setEventListeners = (data, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(data.inputSelector)
  );

  const buttonElement = formElement.querySelector(data.submitButtonSelector);

  toggleButtonState(data, inputList, buttonElement);

  inputList.forEach(inputElement =>
    inputElement.addEventListener('input', () => validationHandler(data, formElement, inputElement, inputList, buttonElement))
  );
};

const enableValidation = data => {
  const formList = Array.from(
    document.querySelectorAll(data.formSelector)
  );
  formList.forEach(formElement =>
    setEventListeners(data, formElement)
  );
};


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});