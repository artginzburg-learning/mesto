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

function createCard(name, link) {
  const card = elementTemplate.querySelector('.element').cloneNode(1);

  const img = card.querySelector('.element__image');
  img.src = link;
  img.alt = name;

  const title = card.querySelector('.element__title');
  title.textContent = name;

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

// FEAT: Like

// Variables

const likeButtons = document.querySelectorAll('.element__like-button');

// Functions

function toggleLike(e) {
  e.target.classList.toggle('element__like-button_active');
}

// Perform

likeButtons.forEach(button => button.addEventListener('click', toggleLike));

// FEAT: Profile editing

// Variables

const profileElement = document.querySelector('.profile');

const editButton = profileElement.querySelector('.profile__edit-button');

const nameElement = profileElement.querySelector('.profile__name');
const jobElement = profileElement.querySelector('.profile__description');

const popupElement = document.querySelector('.popup');
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