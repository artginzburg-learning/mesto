export default class Popup {
  constructor(elementSelector) {
    this._element = document.querySelector(elementSelector);

    this._closeButton = this._element.querySelector('.popup__close-button');
  }

  _elementOpenedClass = 'popup_opened';

  open() {
    this.setEventListeners();

    this._element.classList.add(this._elementOpenedClass)
  }

  close() {
    this.removeEventListeners();

    this._element.classList.remove(this._elementOpenedClass)
  }

  _clickHandler = e =>
    (e.target === e.currentTarget || e.target === this._closeButton)
      && this.close();

  _handleEscClose = e =>
    (e.key === 'Escape' && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey)
      && this.close();

  setEventListeners() {
    this._element.addEventListener('click', this._clickHandler);

    document.addEventListener('keydown', this._handleEscClose);
  }
  _removeEventListeners() {
    this._element.removeEventListener('click', this._clickHandler);

    document.removeEventListener('keydown', this._handleEscClose);
  }
}