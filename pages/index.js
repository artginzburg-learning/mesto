import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import {
  defaultFormConfig,
  initialCards
} from '../utils/constants.js';

// FEAT: Profile editing

const profileEditor = new PopupWithForm('#profile-editor');

const profileEditorValidator = new FormValidator(defaultFormConfig, profileEditor.form);
profileEditorValidator.enableValidation();

const nameInput = profileEditor.form.elements.name;
const jobInput = profileEditor.form.elements.job;

const profileUserInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__description'
});

profileEditor.form.addEventListener('reset', e => {
  e.preventDefault();

  const currentUserData = profileUserInfo.getUserInfo();

  nameInput.value = currentUserData.name;
  jobInput.value = currentUserData.job;
});

const profileEditorOpenButton = document.querySelector('.profile__edit-button');
profileEditorOpenButton.addEventListener('click', () => {
  profileEditor.form.reset();

  profileEditor.toggle();
});

profileEditor.submitHandler = () => {
  profileUserInfo.setUserInfo({
    name: nameInput.value,
    job: jobInput.value
  });
};

// FEAT: Initial card loading

const cardsList = new Section({
  items: initialCards,
  renderer: data => {
    const cardInstance = new Card(data, '#element-template');

    cardsList.setItem(cardInstance.created);
  }
}, '.elements__list');

cardsList.renderItems();

// FEAT: Card adding

const elementEditor = new PopupWithForm('#element-editor');

const elementEditorValidator = new FormValidator(defaultFormConfig, elementEditor.form);
elementEditorValidator.enableValidation();

const titleInput = elementEditor.form.elements.title;
const linkInput = elementEditor.form.elements.link;

const elementEditorOpenButton = document.querySelector('.profile__add-button');
elementEditorOpenButton.addEventListener('click', elementEditor.toggle);

elementEditor.submitHandler = () => {
  const data = {
    name: titleInput.value,
    link: linkInput.value,
  };
  cardsList.renderer(data);

  elementEditor.form.reset();
};