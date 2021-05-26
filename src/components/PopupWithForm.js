import Popup from './Popup';

import { defaultFormConfig } from '../utils/constants';

export default class PopupWithForm extends Popup {
  constructor(elementSelector, formSubmitHandler) {
    super(elementSelector);

    this.form = this._element.querySelector(defaultFormConfig.formSelector);
    this._submitButton = this.form.querySelector(defaultFormConfig.submitButtonSelector);
    this._submitButtonTitle = this._submitButton.textContent;

    this._formSubmitHandler = formSubmitHandler;
  }

  _defaultFormSubmitHandler = e => {
    e.preventDefault();

    this._submitButton.textContent = 'Сохранение...';

    if (this._formSubmitHandler) {
      this._formSubmitHandler(this._getInputValues())
        .then(() => this.close())
        .catch(console.error)
        .finally(() =>
          this._submitButton.textContent = this._submitButtonTitle
        );
    }

    document.activeElement.blur(); // fixes mobile keyboard being stuck on the screen after form submission (due to `event.preventDefault()`)
  }

  setEventListeners() {
    super.setEventListeners();
    
    this.form.addEventListener('submit', this._defaultFormSubmitHandler);
  }

  close() {
    super.close();

    this.form.reset();
  }

  _getInputValues() {
    const { elements } = this.form;
    const values = {};
    Array.from(elements).forEach(el => {
      if (el.tagName === 'INPUT') {
        values[el.name] = el.value;
      }
    })
    return values;
  }
}