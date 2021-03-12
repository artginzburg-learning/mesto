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
  popupToggle();

  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
}

let formSubmitHandler = e => {
  e.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  popupToggle();
}

// Listeners

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupToggle);

formElement.addEventListener('submit', formSubmitHandler); 