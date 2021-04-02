export default class FormValidator {
  constructor(data, element) {
    this._data = data;
    this._element = element;
  }

  enableValidation() {
    this._setListeners(this._data, this._element);

    this._element.addEventListener('reset', () =>
      this._resetFormErrors(this._data, this._element)
    );

    this._element.addEventListener('submit', () =>
      this._disableFormButton(this._data, this._element)
    );
  }

  _showInputError = (data, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(data.errorClass);
  }

  _hideInputError = (data, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(data.inputErrorClass);
    errorElement.classList.remove(data.errorClass);
    errorElement.textContent = '';
  }

  _disableFormButton = (data, formElement) => {
    const buttonElement = formElement.querySelector(data.submitButtonSelector);
    buttonElement.disabled = 1;
  }

  _resetFormErrors = (data, formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(data.inputSelector)
    );
    inputList.forEach(inputElement =>
      this._hideInputError(data, formElement, inputElement)
    );
    this._disableFormButton(data, formElement);
  }

  _checkInputValidity = (data, formElement, inputElement) =>
    inputElement.validity.valid
      ? this._hideInputError(data, formElement, inputElement)
      : this._showInputError(data, formElement, inputElement, inputElement.validationMessage);

  _hasInvalidInput = inputList => inputList.some(inputElement => !inputElement.validity.valid)

  _toggleButtonState = (inputList, buttonElement) =>
    buttonElement.disabled = this._hasInvalidInput(inputList);

  _validationHandler = (data, formElement, inputElement, inputList, buttonElement) => {
    this._checkInputValidity(data, formElement, inputElement);

    this._toggleButtonState(inputList, buttonElement);
  }

  _setListeners = (data, formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(data.inputSelector)
    );

    const buttonElement = formElement.querySelector(data.submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach(inputElement =>
      inputElement.addEventListener('input', () => this._validationHandler(data, formElement, inputElement, inputList, buttonElement))
    );
  }
}