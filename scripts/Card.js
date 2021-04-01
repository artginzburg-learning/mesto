import openPreview from "./index.js";

export default class Card {
  constructor(cardData, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._templateSelector = templateSelector;

    this._elementTemplate = document.querySelector(this._templateSelector).content;
    this._handleImageClick = () => openPreview({
      name: this._name,
      link: this._link,
    });

    this.created = this._create();
  }

  _toggleLike(e) {
    e.target.classList.toggle('element__like-button_active');
  }

  _remove(e) {
    e.target.parentNode.remove();
  }

  _buildImage(element) {
    element.src = this._link;

    element.addEventListener('click', this._handleImageClick);
  }

  _buildTrashButton(element) {
    element.addEventListener('click', this._remove);
  }

  _buildTitle(element) {
    element.textContent = this._name;
  }

  _buildLikeButton(element) {
    element.addEventListener('click', this._toggleLike);
  }

  _create() {
    const card = this._elementTemplate.firstElementChild.cloneNode(1);

    const imgElement = card.querySelector('.element__image');
    this._buildImage(imgElement);

    const trashButton = card.querySelector('.element__trash-button');
    this._buildTrashButton(trashButton);

    const titleElement = card.querySelector('.element__title');
    this._buildTitle(titleElement);
  
    const likeButton = card.querySelector('.element__like-button');
    this._buildLikeButton(likeButton);

    return card;
  }
}