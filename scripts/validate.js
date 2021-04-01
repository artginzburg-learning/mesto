export const validation = {
  showInputError: (data, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(data.errorClass);
  },

  hideInputError: (data, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(data.inputErrorClass);
    errorElement.classList.remove(data.errorClass);
    errorElement.textContent = '';
  },

  disableFormButton: (data, formElement) => {
    const buttonElement = formElement.querySelector(data.submitButtonSelector);
    buttonElement.disabled = 1;
  },

  resetFormErrors: (data, formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(data.inputSelector)
    );
    inputList.forEach(inputElement =>
      validation.hideInputError(data, formElement, inputElement)
    );
    validation.disableFormButton(data, formElement);
  },

  checkInputValidity: (data, formElement, inputElement) =>
    inputElement.validity.valid
      ? validation.hideInputError(data, formElement, inputElement)
      : validation.showInputError(data, formElement, inputElement, inputElement.validationMessage),

  hasInvalidInput: inputList => inputList.some(inputElement => !inputElement.validity.valid),

  toggleButtonState: (inputList, buttonElement) =>
    buttonElement.disabled = validation.hasInvalidInput(inputList),

  validationHandler: (data, formElement, inputElement, inputList, buttonElement) => {
    validation.checkInputValidity(data, formElement, inputElement);

    validation.toggleButtonState(inputList, buttonElement);
  },

  setEventListeners: (data, formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(data.inputSelector)
    );

    const buttonElement = formElement.querySelector(data.submitButtonSelector);

    validation.toggleButtonState(inputList, buttonElement);

    inputList.forEach(inputElement =>
      inputElement.addEventListener('input', () => validation.validationHandler(data, formElement, inputElement, inputList, buttonElement))
    );
  },
}