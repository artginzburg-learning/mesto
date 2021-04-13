import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(elementSelector) {
    super(elementSelector);

    this.form = this._element.querySelector('.popup__form');

    this._fullSubmitHandler = e => {
      e.preventDefault();
  
      this.submitHandler
        && this.submitHandler();
  
      this.close();

      document.activeElement.blur(); // fixes mobile keyboard being stuck on the screen after form submission (due to `event.preventDefault()`)
    }
  }

  setEventListeners() {
    super.setEventListeners();
    
    this.form.addEventListener('submit', this._fullSubmitHandler);
  }
  _removeEventListeners() {
    super._removeEventListeners();

    this.form.removeEventListener('submit', this._fullSubmitHandler);
  }
}