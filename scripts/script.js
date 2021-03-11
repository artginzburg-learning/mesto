let profileElement = document.querySelector('.profile');

let editButton = profileElement.querySelector('.profile__edit-button');

let nameElement = profileElement.querySelector('.profile__name');
let jobElement = profileElement.querySelector('.profile__description');

let popupElement = document.querySelector('.popup');
let popupElementOpenedString = 'popup_opened';

let formElement = popupElement.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup__input[name="name"]');
let jobInput = formElement.querySelector('.popup__input[name="job"]');

function popupOpen() {
  popupElement.classList.add(popupElementOpenedString);

  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
}

editButton.onclick = popupOpen;

function popupClose() {
  popupElement.classList.remove(popupElementOpenedString);
}

let closeButton = popupElement.querySelector('.popup__close-button');

closeButton.onclick = popupClose;

function formSubmitHandler(e) {
  e.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  popupClose();
}

formElement.addEventListener('submit', formSubmitHandler); 