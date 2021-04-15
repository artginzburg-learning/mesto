export default class FormValidator {
  constructor(data, element) {
    this._data = data;
    this._element = element;

    this._inputList = Array.from(
      this._element.querySelectorAll(this._data.inputSelector)
    );

    this._buttonElement = this._element.querySelector(this._data.submitButtonSelector);
  }

  enableValidation() {
    this._toggleButtonState();

    this._setListeners();
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._data.errorClass);
  }

  _hideInputError = inputElement => {
    const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._data.inputErrorClass);
    errorElement.classList.remove(this._data.errorClass);
    errorElement.textContent = '';
  }

  _resetFormErrors = () => {
    this._inputList.forEach(inputElement =>
      this._hideInputError(inputElement)
    );
    this._toggleButtonState(1);
  }

  _checkInputValidity = inputElement =>
    inputElement.validity.valid
      ? this._hideInputError(inputElement)
      : this._showInputError(inputElement, inputElement.validationMessage);

  _hasInvalidInput = inputList => inputList.some(inputElement => !inputElement.validity.valid)

  _toggleButtonState = disable =>
    this._buttonElement.disabled = disable || this._hasInvalidInput(this._inputList);

  _validationHandler = inputElement => {
    this._checkInputValidity(inputElement);

    this._toggleButtonState();
  }

  _setListeners = () => {
    this._element.addEventListener('reset', this._resetFormErrors);

    this._inputList.forEach(inputElement =>
      inputElement.addEventListener('input', () => this._validationHandler(inputElement))
    );
  }
}