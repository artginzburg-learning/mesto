class Card {
  constructor(cardData) {
    this.name = cardData.name;
    this.link = cardData.link;

    this.created = this.create();
  }

  elementTemplate = document.querySelector('#element-template').content;

  toggleLike(e) {
    e.target.classList.toggle('element__like-button_active');
  }

  remove(e) {
    e.target.parentNode.remove();
  }

  buildImage(element) {
    element.src = this.link;

    element.addEventListener('click', openPreview);
  }

  buildTrashButton(element) {
    element.addEventListener('click', this.remove);
  }

  buildTitle(element) {
    element.textContent = this.name;
  }

  buildLikeButton(element) {
    element.addEventListener('click', this.toggleLike);
  }

  create() {
    const card = this.elementTemplate.firstElementChild.cloneNode(1);

    const imgElement = card.querySelector('.element__image');
    this.buildImage(imgElement);

    const trashButton = card.querySelector('.element__trash-button');
    this.buildTrashButton(trashButton);

    const titleElement = card.querySelector('.element__title');
    this.buildTitle(titleElement);
  
    const likeButton = card.querySelector('.element__like-button');
    this.buildLikeButton(likeButton);

    return card;
  }
}