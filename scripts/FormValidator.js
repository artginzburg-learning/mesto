import { validation } from "./validate.js";

export default class FormValidator {
  constructor(data, element) {
    this._data = data;
    this._element = element;
  }

  enableValidation() {
    validation.setEventListeners(this._data, this._element);

    this._element.addEventListener('reset', () =>
      validation.resetFormErrors(this._data, this._element)
    );

    this._element.addEventListener('submit', () =>
      validation.disableFormButton(this._data, this._element)
    );
  }
}