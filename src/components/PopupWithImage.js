import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(elementSelector) {
    super(elementSelector);

    this._popupImage = this._element.querySelector('.popup__image');
    this._popupCaption = this._element.querySelector('.popup__caption');
  }

  open(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupCaption.textContent = data.name;

    super.open();
  }
}