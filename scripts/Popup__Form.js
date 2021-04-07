import Popup from './Popup.js';

export default class Form extends Popup {
  constructor(element) {
    super(element);

    this.form = this._element.querySelector('.popup__form');

    this._fullSubmitHandler = e => {
      e.preventDefault();
  
      this.submitHandler
        && this.submitHandler();
  
      this.toggle();

      document.activeElement.blur(); // fixes mobile keyboard being stuck on the screen after form submission (due to `event.preventDefault()`)
    }
  }

  _setListeners() {
    super._setListeners();
    
    this.form.addEventListener('submit', this._fullSubmitHandler);
  }
  _removeListeners() {
    super._removeListeners();

    this.form.removeEventListener('submit', this._fullSubmitHandler);
  }
}