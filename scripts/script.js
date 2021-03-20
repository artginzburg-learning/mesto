// FEAT: Initial card loading

// Variables

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

const elementTemplate = document.querySelector('#element-template').content;
const elementsContainer = document.querySelector('.elements__list');

// Functions

function toggleLike(e) {
  e.target.classList.toggle('element__like-button_active');
}

function createCard(name, link) {
  const card = elementTemplate.querySelector('.element').cloneNode(1);

  const img = card.querySelector('.element__image');
  const title = card.querySelector('.element__title');

  const likeButton = card.querySelector('.element__like-button');

  img.src = link;
  img.alt = name;

  title.textContent = name;

  likeButton.addEventListener('click', toggleLike);

  return card;
}

function addCard(card, toBeginning) {
  toBeginning ? elementsContainer.prepend(card) : elementsContainer.append(card);
}

// Perform

initialCards.forEach(card => {
  const cardCreated = createCard(card.name, card.link);

  addCard(cardCreated);
});

// FEAT: Make popups interactive through a class

class Popup {
  constructor(element, openButton, additionalFormHandler, additionalOpenHandler) {
    this.element = element;
    this.openButton = openButton;
    this.additionalFormHandler = additionalFormHandler;
    this.additionalOpenHandler = additionalOpenHandler;

    this.elementOpenedString = 'popup_opened';

    this.closeButton = element.querySelector('.popup__close-button');

    this.form = element.querySelector('.popup__form');

    this.addListeners();
  }

  toggle() {
    this.element.classList.toggle(this.elementOpenedString);
  }

  open() {
    this.additionalOpenHandler
      && this.additionalOpenHandler();
    this.toggle();
  }

  addListeners() {
    this.openButton.addEventListener('click', () => this.open());
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
    const cardCreated = createCard(
      titleInput.value,
      linkInput.value
    );

    titleInput.value = '';
    linkInput.value = '';

    addCard(cardCreated, 1);
  }
);