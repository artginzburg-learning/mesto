import './index.css';

import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import {
  defaultFormConfig,
  initialCards
} from '../utils/constants.js';

// FEAT: Profile editing

const profileEditorSelector = '#profile-editor';

const profileEditorForm = document.querySelector(profileEditorSelector).querySelector('.popup__form');

const nameInput = profileEditorForm.elements.name;
const jobInput = profileEditorForm.elements.job;

const profileUserInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__description'
});

const profileEditor = new PopupWithForm(profileEditorSelector, () =>
  profileUserInfo.setUserInfo({
    name: nameInput.value,
    job: jobInput.value
  })
);

const profileEditorValidator = new FormValidator(defaultFormConfig, profileEditor.form);
profileEditorValidator.enableValidation();

const profileEditorOpenButton = document.querySelector('.profile__edit-button');
profileEditorOpenButton.addEventListener('click', () => {
  const currentUserData = profileUserInfo.getUserInfo();

  nameInput.value = currentUserData.name;
  jobInput.value = currentUserData.job;

  profileEditor.open();
});

//  FEAT: Image preview

const imageViewer = new PopupWithImage('#image-viewer');

// FEAT: Initial card loading

const cardsList = new Section({
  items: initialCards,
  renderer: data => {
    const cardInstance = new Card(
      data,
      '#element-template', 
      () => imageViewer.open(data)
    );

    cardsList.setItem(cardInstance.created);
  }
}, '.elements__list');

cardsList.renderItems();

// FEAT: Card adding

const elementEditorSelector = '#element-editor';

const elementEditorForm = document.querySelector(elementEditorSelector).querySelector('.popup__form');

const titleInput = elementEditorForm.elements.title;
const linkInput = elementEditorForm.elements.link;

const elementEditor = new PopupWithForm(elementEditorSelector, () => {
  const data = {
    name: titleInput.value,
    link: linkInput.value,
  };
  cardsList.renderer(data);
});

const elementEditorValidator = new FormValidator(defaultFormConfig, elementEditor.form);
elementEditorValidator.enableValidation();

const elementEditorOpenButton = document.querySelector('.profile__add-button');
elementEditorOpenButton.addEventListener('click', () => elementEditor.open());