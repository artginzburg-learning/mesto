class Popup {
  constructor(element) {
    this.element = element;

    this.closeButton = this.element.querySelector('.popup__close-button');

    // the methods below are set through constructor() because otherwise `this` called inside of a callback function points to `event.target`, and `.bind(this)` is bad for memory 'cause it creates a new function on every call
    this.toggle = () => {
      this.element.classList.contains(this.elementOpenedClass)
        ? this.removeListeners()
        : this.setListeners();

      this.element.classList.toggle(this.elementOpenedClass);
    };

    this.clickHandler = e =>
      (e.target === e.currentTarget || e.target === this.closeButton)
        && this.toggle();

    this.keypressHandler = e =>
      (e.key === 'Escape' && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey)
        && this.toggle();
    ;
  }

  toggle() { this.toggle() } // necessary for `super.toggle()` to work since it's explicitly set through constructor()

  elementOpenedClass = 'popup_opened';

  setListeners() {
    this.element.addEventListener('click', this.clickHandler);

    document.addEventListener('keypress', this.keypressHandler);
  }
  removeListeners() {
    this.element.removeEventListener('click', this.clickHandler);

    document.removeEventListener('keypress', this.keypressHandler);
  }
}