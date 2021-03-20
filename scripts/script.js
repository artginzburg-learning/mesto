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

// FEAT: Profile editing

// Variables

const profileElement = document.querySelector('.profile');

const editButton = profileElement.querySelector('.profile__edit-button');

const nameElement = profileElement.querySelector('.profile__name');
const jobElement = profileElement.querySelector('.profile__description');

const popupElement = document.querySelector('#profile-editor');
const popupElementOpenedString = 'popup_opened';

const closeButton = popupElement.querySelector('.popup__close-button');

const formElement = popupElement.querySelector('.popup__form');

const nameInput = formElement.querySelector('.popup__input[name="name"]');
const jobInput = formElement.querySelector('.popup__input[name="job"]');

// Functions

function popupToggle() {
  popupElement.classList.toggle(popupElementOpenedString);
}

function popupOpen() {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

  popupToggle();
}

function formSubmitHandler(e) {
  e.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  popupToggle();
}

// Perform

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupToggle);

formElement.addEventListener('submit', formSubmitHandler); 

// FEAT: Card adding

class Popup {
  constructor(element, openButton, additionalFormHandler) {
    this.element = element;
    this.openButton = openButton;
    this.additionalFormHandler = additionalFormHandler;

    this.elementOpenedString = 'popup_opened';

    this.closeButton = element.querySelector('.popup__close-button');

    this.form = element.querySelector('.popup__form');

    this.addListeners();
  }

  toggle() {
    this.element.classList.toggle(this.elementOpenedString);
  }

  addListeners() {
    this.openButton.addEventListener('click', () => this.toggle());
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

const elementEditorPopup = document.querySelector('#element-editor');
const elementEditorOpenButton = document.querySelector('.profile__add-button');

const elementEditor = new Popup(
  elementEditorPopup,
  elementEditorOpenButton,
  function() {
    const titleInput = this.form.querySelector('.popup__input[name="title"]');
    const linkInput = this.form.querySelector('.popup__input[name="link"]');

    const cardCreated = createCard(
      titleInput.value,
      linkInput.value
    );

    titleInput.value = '';
    linkInput.value = '';

    addCard(cardCreated, 1);
  }
);