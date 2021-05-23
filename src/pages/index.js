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

import api from '../components/Api.js';

// FEAT: Profile editing

const profileEditorSelector = '#profile-editor';

const profileUserInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

api.getUserInfo()
  .then(result => {
    profileUserInfo.setUserInfo({
      name: result.name,
      job: result.about,
      avatar: result.avatar
    });
  })
  .catch(err => {
    console.error(err);
  });

const profileEditor = new PopupWithForm(profileEditorSelector, (data) => {
  api.editProfile(data.name, data.job)
    .then(result => {
      profileUserInfo.setUserInfo({
        name: result.name,
        job: result.about
      });
    })
    .catch(err => {
      console.error(err);
    });
});
profileEditor.setEventListeners();

const profileEditorValidator = new FormValidator(defaultFormConfig, profileEditor.form);
profileEditorValidator.enableValidation();

const {
  name: nameInput,
  job: jobInput
} = profileEditor.form.elements;

const profileEditorOpenButton = document.querySelector('.profile__edit-button');
profileEditorOpenButton.addEventListener('click', () => {
  const currentUserData = profileUserInfo.getUserInfo();

  nameInput.value = currentUserData.name;
  jobInput.value = currentUserData.job;

  profileEditor.open();
});

//  FEAT: Image preview

const imageViewer = new PopupWithImage('#image-viewer');
imageViewer.setEventListeners();

// FEAT: Initial card loading

let cardsList;

api.getInitialCards()
  .then(result => {
    cardsList = new Section({
      items: result.reverse(),
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
  })
  .catch(err => {
    console.error(err);
  });

// FEAT: Card adding

const elementEditorSelector = '#element-editor';

const elementEditor = new PopupWithForm(elementEditorSelector, data => {
  data.name = data.title;
  delete data.title;

  api.addCard(data.name, data.link)
    .then(result => {
      cardsList.renderer(result);
    })
    .catch(err => {
      console.error(err);
    });
});
elementEditor.setEventListeners();

const elementEditorValidator = new FormValidator(defaultFormConfig, elementEditor.form);
elementEditorValidator.enableValidation();

const elementEditorOpenButton = document.querySelector('.profile__add-button');
elementEditorOpenButton.addEventListener('click', () => elementEditor.open());