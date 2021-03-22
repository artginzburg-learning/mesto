class Popup {
  constructor(element) {
    this.element = element;

    this.closeButton = element.querySelector('.popup__close-button');

    this.addListeners();
  }

  elementOpenedString = 'popup_opened';

  toggle() {
    this.element.classList.toggle(this.elementOpenedString);
  }

  addListeners() {
    this.closeButton.addEventListener('click', () => this.toggle());
  }
}

// FEAT: Profile editing

const profileEditorPopup = document.querySelector('#profile-editor');

const profileEditor = new Popup(profileEditorPopup);

const profileEditorOpenButton = document.querySelector('.profile__edit-button');

const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__description');

const nameInput = profileEditorPopup.querySelector('.popup__input[name="name"]');
const jobInput = profileEditorPopup.querySelector('.popup__input[name="job"]');

profileEditorOpenButton.addEventListener('click', () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

  profileEditor.toggle();
});

const profileEditorForm = profileEditorPopup.querySelector('.popup__form');

profileEditorForm.addEventListener('submit', e => {
  e.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  profileEditor.toggle();
})

// FEAT: Card adding

const elementEditorPopup = document.querySelector('#element-editor');

const elementEditor = new Popup(elementEditorPopup);

const elementEditorOpenButton = document.querySelector('.profile__add-button');
elementEditorOpenButton.addEventListener('click', () => { elementEditor.toggle() });

const titleInput = elementEditorPopup.querySelector('.popup__input[name="title"]');
const linkInput = elementEditorPopup.querySelector('.popup__input[name="link"]');

const elementsContainer = document.querySelector('.elements__list');

function addCard(card, toBeginning) {
  toBeginning
    ? elementsContainer.prepend(card.created)
    : elementsContainer.append(card.created);
}

const elementEditorForm = elementEditorPopup.querySelector('.popup__form');

elementEditorForm.addEventListener('submit', e => {
  e.preventDefault();

  const cardInstance = new Card(
    titleInput.value,
    linkInput.value
  );

  titleInput.value = '';
  linkInput.value = '';

  addCard(cardInstance, 1);

  elementEditor.toggle();
});

//  FEAT: Image preview

const imageViewerPopup = document.querySelector('#image-viewer');
const imageViewer = new Popup(imageViewerPopup);

const popupImage = imageViewerPopup.querySelector('.popup__image');
const popupCaption = imageViewerPopup.querySelector('.popup__caption');

function openPreview(e) {
  popupImage.src = e.target.src;
  popupImage.alt = e.target.alt;

  popupCaption.textContent = e.target.alt;

  imageViewer.toggle();
}

class Card {
  constructor(title, imgLink) {
    this.title = title;
    this.imgLink = imgLink;

    this.created = this.create();
  }

  elementTemplate = document.querySelector('#element-template').content;

  toggleLike(e) {
    e.target.classList.toggle('element__like-button_active');
  }

  remove(e) {
    e.target.parentNode.remove();
  }

  create() {
    const card = this.elementTemplate.firstElementChild.cloneNode(1);

    const imgElement = card.querySelector('.element__image');
    const trashButton = card.querySelector('.element__trash-button');

    const titleElement = card.querySelector('.element__title');
  
    const likeButton = card.querySelector('.element__like-button');
  
    imgElement.src = this.imgLink;
    imgElement.alt = this.title;
  
    titleElement.textContent = this.title;

    imgElement.addEventListener('click', openPreview);

    trashButton.addEventListener('click', this.remove);
    likeButton.addEventListener('click', this.toggleLike);
  
    return card;
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
  addCard(cardInstance);
});