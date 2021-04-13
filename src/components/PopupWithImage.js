import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(elementSelector) {
    super(elementSelector);

    this._popupImage = this._element.querySelector('.popup__image');
    this._popupCaption = this._element.querySelector('.popup__caption');
  }

  _open() {
    super._open();

    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;

    this._popupCaption.textContent = this._name;
  }
}