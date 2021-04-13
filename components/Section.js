export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this.renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  setItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._initialArray.forEach(this.renderer);
  }
}