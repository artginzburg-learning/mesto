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
  img.src = link;
  img.alt = name;

  const title = card.querySelector('.element__title');
  title.textContent = name;

  const likeButton = card.querySelector('.element__like-button');

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

// Variables

const addButton = profileElement.querySelector('.profile__add-button');

const popupEl = document.querySelector('#element-editor');

const closeBut = popupEl.querySelector('.popup__close-button');

const formEl = popupEl.querySelector('.popup__form');

const titleInput = formEl.querySelector('.popup__input[name="title"]');
const linkInput = formEl.querySelector('.popup__input[name="link"]');

// Functions

function popupToggle() {
  popupEl.classList.toggle(popupElementOpenedString);
}

function popupOpen() {
  titleInput.value = '';
  linkInput.value = '';

  popupToggle();
}

function formSubmitHandler(e) {
  e.preventDefault();

  addCard(createCard(titleInput.value, linkInput.value), 1);

  popupToggle();
}

// Perform

addButton.addEventListener('click', popupOpen);
closeBut.addEventListener('click', popupToggle);

formEl.addEventListener('submit', formSubmitHandler); 