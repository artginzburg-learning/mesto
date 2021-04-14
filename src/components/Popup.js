export default class Popup {
  constructor(elementSelector) {
    this._element = document.querySelector(elementSelector);

    this._closeButton = this._element.querySelector('.popup__close-button');
  }

  _elementOpenedClass = 'popup_opened';

  _clickHandler = e =>
    (e.target === e.currentTarget || e.target === this._closeButton)
      && this.close();

  _handleEscClose = e =>
    (e.key === 'Escape' && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey)
      && this.close();

  open() {
    this._element.classList.add(this._elementOpenedClass);

    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._element.classList.remove(this._elementOpenedClass);

    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._element.addEventListener('click', this._clickHandler);
  }
}