export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this.data = data;

    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this.created = this._create();

    if (this.data.liked) {
      this.liked = 1;
    }
  }

  set liked(value) {
    this._likeButton.classList[(value ? 'add' : 'remove')]('element__like-button_active');
    this.data.liked = value;
  }

  get liked() {
    return this.data.liked;
  }

  // toggleLike = () =>
  //   this._likeButton.classList.toggle('element__like-button_active');

  remove = () =>
    this._card.remove();

  updateLikes(quantity) {
    this._likeCounter.textContent = quantity;
  }

  get _template() {
    return document.querySelector(this._templateSelector).content.firstElementChild;
  }

  _setListeners() {
    this._imgElement.addEventListener('click', this._handleCardClick);
    this.data.removable
      && this._trashButton.addEventListener('click', this._handleDeleteClick);
    this._likeButton.addEventListener('click', this._handleLikeClick);
  }

  _buildImage(element) {
    element.src = this.data.link;
    element.alt = this.data.name;
  }

  _buildTitle(element) {
    element.textContent = this.data.name;
  }

  _create() {
    this._card = this._template.cloneNode(1);

    this._imgElement = this._card.querySelector('.element__image');
    this._buildImage(this._imgElement);

    const trashButtonClass = 'element__trash-button';
    const trashButtonSelector = `.${trashButtonClass}`;
    const trashButtonVisibleClass = `${trashButtonClass}_visible`;

    this._trashButton = this._card.querySelector(trashButtonSelector);

    this.data.removable
      && this._trashButton.classList.add(trashButtonVisibleClass);

    this._titleElement = this._card.querySelector('.element__title');
    this._buildTitle(this._titleElement);

    this._likeButton = this._card.querySelector('.element__like-button');

    this._likeCounter = this._card.querySelector('.element__like-counter');

    this.updateLikes(this.data.likes.length);

    this._setListeners();

    return this._card;
  }
}