import openPreview from "./index.js";

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

  _preview() {
    openPreview({
      name: this._name,
      link: this._link,
    });
  }

  _toggleLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _remove() {
    this._card.remove();
  }

  _handleClick = e => {
    switch (e.target) {
      case this._imgElement:
        this._preview();
        break;
    
      case this._trashButton:
        this._remove();
        break;
      
      case this._likeButton:
        this._toggleLike();
        break;
    }
  }

  _setListeners() {
    this._card.addEventListener('click', this._handleClick);
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