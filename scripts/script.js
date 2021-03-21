class Popup {
  constructor(element, openButton, additionalFormHandler, additionalOpenHandler) {
    this.element = element;
    this.openButton = openButton;
    this.additionalFormHandler = additionalFormHandler;
    this.additionalOpenHandler = additionalOpenHandler;

    this.closeButton = element.querySelector('.popup__close-button');

    this.form = element.querySelector('.popup__form');

    this.addListeners();
  }

  elementOpenedString = 'popup_opened';

  toggle() {
    this.element.classList.toggle(this.elementOpenedString);
  }

  open(e) {
    this.additionalOpenHandler
      && this.additionalOpenHandler(e);

    this.toggle();
  }

  addListeners() {
    this.openButton
      && this.openButton.addEventListener('click', e => this.open(e));

    this.closeButton.addEventListener('click', () => this.toggle());

    this.form
      && this.form.addEventListener('submit', e =>
        this.formSubmitHandler(e)
      );
  }

  formSubmitHandler(e) {
    e.preventDefault();

    this.additionalFormHandler
      && this.additionalFormHandler();
  
    this.toggle();
  }
}

// FEAT: Profile editing

const profileEditorPopup = document.querySelector('#profile-editor');
const profileEditorOpenButton = document.querySelector('.profile__edit-button');

const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__description');

const nameInput = profileEditorPopup.querySelector('.popup__input[name="name"]');
const jobInput = profileEditorPopup.querySelector('.popup__input[name="job"]');

new Popup(
  profileEditorPopup,
  profileEditorOpenButton,
  function() {
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
  },
  function() {
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
  }
);

// FEAT: Card adding

const elementEditorPopup = document.querySelector('#element-editor');
const elementEditorOpenButton = document.querySelector('.profile__add-button');

const titleInput = elementEditorPopup.querySelector('.popup__input[name="title"]');
const linkInput = elementEditorPopup.querySelector('.popup__input[name="link"]');

new Popup(
  elementEditorPopup,
  elementEditorOpenButton,
  function() {
    const cardInstance = new Card(
      titleInput.value,
      linkInput.value
    );

    titleInput.value = '';
    linkInput.value = '';

    cardInstance.add(1);
  }
);

//  FEAT: Image preview

const imageViewerPopup = document.querySelector('#image-viewer');

const popupImage = imageViewerPopup.querySelector('.popup__image');
const popupCaption = imageViewerPopup.querySelector('.popup__caption')

const imageViewer = new Popup(
  imageViewerPopup,
  null,
  null,
  function(e) {
    popupImage.src = e.target.src;
    popupImage.alt = e.target.alt;

    popupCaption.textContent = e.target.alt;
  }
);


class Card {
  constructor(title, imgLink) {
    this.title = title;
    this.imgLink = imgLink;

    this.cardCreated = this.create();
  }

  elementTemplate = document.querySelector('#element-template').content;elementsContainer = document.querySelector('.elements__list');

  toggleLike(e) {
    e.target.classList.toggle('element__like-button_active');
  }

  remove(e) {
    e.target.parentNode.remove();
  }

  create() {
    const card = this.elementTemplate.querySelector('.element').cloneNode(1);

    const imgElement = card.querySelector('.element__image');
    const trashButton = card.querySelector('.element__trash-button');

    const titleElement = card.querySelector('.element__title');
  
    const likeButton = card.querySelector('.element__like-button');
  
    imgElement.src = this.imgLink;
    imgElement.alt = this.title;
  
    titleElement.textContent = this.title;

    imgElement.addEventListener('click', e => imageViewer.open(e));

    trashButton.addEventListener('click', this.remove);
    likeButton.addEventListener('click', this.toggleLike);
  
    return card;
  }

  add(toBeginning) {
    this.elementsContainer[
      (
        toBeginning
          ? 'pre'
          : 'ap'
      )
      + 'pend'
    ](this.cardCreated);
  }
}

// FEAT: Initial card loading

const initialCards = [
  {
    name: 'Замогилье (деревня)',
    link: './images/element-zamogilye.jpg',
  },
  {
    name: 'Путино',
    link: './images/element-putino.jpg',
  },
  {
    name: 'Гора Синай',
    link: './images/element-sinai.jpg',
  },
  {
    name: 'Куршская коса',
    link: './images/element-kosa.jpg',
  },
  {
    name: 'Кольский',
    link: './images/element-kolsky.jpg',
  },
  {
    name: 'Алтай',
    link: './images/element-altai.jpg',
  },
];

initialCards.forEach(card => {
  const cardInstance = new Card(card.name, card.link);
  cardInstance.add();
});