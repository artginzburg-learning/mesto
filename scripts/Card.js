import Popup from "./Popup.js";

//  FEAT: Image preview

const imageViewerPopup = document.querySelector('#image-viewer');
const imageViewer = new Popup(imageViewerPopup);

const popupImage = imageViewerPopup.querySelector('.popup__image');
const popupCaption = imageViewerPopup.querySelector('.popup__caption');

export default class Card {
  constructor(cardData, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._templateSelector = templateSelector;

    this.created = this._create();
  }

  get _template() {
    return document.querySelector(this._templateSelector).content.firstElementChild;
  }

  _preview = () => {
    popupImage.src = this._link;

    popupCaption.textContent = this._name;

    imageViewer.toggle();
  }

  _toggleLike = () =>
    this._likeButton.classList.toggle('element__like-button_active');

  _remove = () =>
    this._card.remove();

  _setListeners() {
    this._imgElement.addEventListener('click', this._preview);
    this._trashButton.addEventListener('click', this._remove);
    this._likeButton.addEventListener('click', this._toggleLike);
  }

  _buildImage(element) {
    element.src = this._link;
    element.alt = this._name; // .alt seems useless in the context of a card which has a title
  }

  _buildTitle(element) {
    element.textContent = this._name;
  }

  _create() {
    this._card = this._template.cloneNode(1);

    this._imgElement = this._card.querySelector('.element__image');
    this._buildImage(this._imgElement);

    this._trashButton = this._card.querySelector('.element__trash-button');

    this._titleElement = this._card.querySelector('.element__title');
    this._buildTitle(this._titleElement);
  
    this._likeButton = this._card.querySelector('.element__like-button');

    this._setListeners();

    return this._card;
  }
}