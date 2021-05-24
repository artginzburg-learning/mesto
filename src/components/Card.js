export default class Card {
  constructor(cardData, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._removable = cardData.removable;
    this.cardData = cardData;

    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this.created = this._create();
  }

  get _template() {
    return document.querySelector(this._templateSelector).content.firstElementChild;
  }

  toggleLike = () =>
    this._likeButton.classList.toggle('element__like-button_active');

  remove = () =>
    this._card.remove();

  _setListeners() {
    this._imgElement.addEventListener('click', this._handleCardClick);
    this._removable
      && this._trashButton.addEventListener('click', this._handleDeleteClick);
    this._likeButton.addEventListener('click', this._handleLikeClick);
  }

  _buildImage(element) {
    element.src = this._link;
    element.alt = this._name;
  }

  _buildTitle(element) {
    element.textContent = this._name;
  }

  _create() {
    this._card = this._template.cloneNode(1);

    this._imgElement = this._card.querySelector('.element__image');
    this._buildImage(this._imgElement);

    const trashButtonClass = 'element__trash-button';
    const trashButtonSelector = `.${trashButtonClass}`;
    const trashButtonVisibleClass = `${trashButtonClass}_visible`

    this._trashButton = this._card.querySelector(trashButtonSelector);

    this._removable
      && this._trashButton.classList.add(trashButtonVisibleClass);

    this._titleElement = this._card.querySelector('.element__title');
    this._buildTitle(this._titleElement);

    this._likeButton = this._card.querySelector('.element__like-button');

    if (this.cardData.liked) {
      this.toggleLike();
    }

    this._setListeners();

    return this._card;
  }
}