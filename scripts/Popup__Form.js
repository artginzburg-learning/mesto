class Form extends Popup {
  constructor(element) {
    super(element);

    this.form = this.element.querySelector('.popup__form');

    this.fullSubmitHandler = e => {
      e.preventDefault();
  
      this.submitHandler
        && this.submitHandler();
  
      super.toggle();

      document.activeElement.blur(); // fixes mobile keyboard being stuck on the screen after form submission (due to `event.preventDefault()`)
    }
  }

  setListeners() {
    super.setListeners();
    
    this.form.addEventListener('submit', this.fullSubmitHandler);
  }
  removeListeners() {
    super.removeListeners();

    this.form.removeEventListener('submit', this.fullSubmitHandler);
  }
}