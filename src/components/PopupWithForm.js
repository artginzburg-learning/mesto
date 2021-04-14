import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(elementSelector, formSubmitHandler) {
    super(elementSelector);

    this.form = this._element.querySelector('.popup__form');

    this._formSubmitHandler = formSubmitHandler;
  }

  _defaultFormSubmitHandler = e => {
    e.preventDefault();

    this._formSubmitHandler
      && this._formSubmitHandler(this._getInputValues());

    this.close();

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