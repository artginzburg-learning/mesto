// # Project 5

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

function addCard(name, link) {
  const card = elementTemplate.querySelector('.element').cloneNode(1);

  const img = card.querySelector('.element__image');
  img.src = link;
  img.alt = name;

  const title = card.querySelector('.element__title');
  title.textContent = name;

  elementsContainer.append(card);
}

initialCards.forEach(card => addCard(card.name, card.link));


const likeButton = document.querySelectorAll('.element__like-button');

function toggleLike(e) {
  e.target.classList.toggle('element__like-button_active');
}

likeButton.forEach(button => button.addEventListener('click', toggleLike));

// # Project 4

// Variables

let profileElement = document.querySelector('.profile');

let editButton = profileElement.querySelector('.profile__edit-button');

let nameElement = profileElement.querySelector('.profile__name');
let jobElement = profileElement.querySelector('.profile__description');

let popupElement = document.querySelector('.popup');
const popupElementOpenedString = 'popup_opened';

let closeButton = popupElement.querySelector('.popup__close-button');

let formElement = popupElement.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup__input[name="name"]');
let jobInput = formElement.querySelector('.popup__input[name="job"]');

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

// Listeners

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupToggle);

formElement.addEventListener('submit', formSubmitHandler); 