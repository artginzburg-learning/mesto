class Popup {
  constructor(element) {
    this._element = element;

    this._closeButton = this._element.querySelector('.popup__close-button');

    // the methods below are set through constructor() because otherwise `this` called inside of a callback function points to `event.target`, and `.bind(this)` is bad for memory 'cause it creates a new function on every call
    this.toggle = () => {
      this._element.classList.contains(this._elementOpenedClass)
        ? this._removeListeners()
        : this._setListeners();

      this._element.classList.toggle(this._elementOpenedClass);
    };

    this._clickHandler = e =>
      (e.target === e.currentTarget || e.target === this._closeButton)
        && this.toggle();

    this._keypressHandler = e =>
      (e.key === 'Escape' && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey)
        && this.toggle();
    ;
  }

  toggle() { this.toggle() } // necessary for `super.toggle()` to work since it's explicitly set through constructor()

  _elementOpenedClass = 'popup_opened';

  _setListeners() {
    this._element.addEventListener('click', this._clickHandler);

    document.addEventListener('keypress', this._keypressHandler);
  }
  _removeListeners() {
    this._element.removeEventListener('click', this._clickHandler);

    document.removeEventListener('keypress', this._keypressHandler);
  }
}