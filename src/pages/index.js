import './index.css';

import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import api from '../components/Api.js';

import {
  defaultFormConfig
} from '../utils/constants.js';

// FEAT: Profile editing

const profileSelectors = {
  nameSelector: '.profile__name',
  jobSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
};

const profileUserInfo = new UserInfo(profileSelectors);

const profileEditor = new PopupWithForm('#profile-editor', data =>
  api.editProfile(data.name, data.job)
    .then(result =>
      profileUserInfo.setUserInfo({
        name: result.name,
        job: result.about
      })
    )
);
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

// FEAT: Avatar updating

const avatarEditor = new PopupWithForm('#avatar-editor', data =>
  api.updateAvatar(data.link)
    .then(result =>
      profileUserInfo.setUserInfo({
        avatar: result.avatar
      })
    )
);
avatarEditor.setEventListeners();

const avatarEditorValidator = new FormValidator(defaultFormConfig, avatarEditor.form);
avatarEditorValidator.enableValidation();

const avatarEditorOpenButton = document.querySelector(profileSelectors.avatarSelector);
avatarEditorOpenButton.addEventListener('click', () => avatarEditor.open());

//  FEAT: Image preview

const imageViewer = new PopupWithImage('#image-viewer');
imageViewer.setEventListeners();

// FEAT: Card deleting

const deleteConfirmation = new PopupWithForm('#delete-confirmation', () => {
  const card = deleteConfirmation.currentCard;
  return api.deleteCard(card.cardData._id)
    .then(card.remove);
});
deleteConfirmation.setEventListeners();

// FEAT: Initial card loading

let cardsList;

api.getUserInfo()
  .then(result => {
    profileUserInfo.setUserInfo({
      name: result.name,
      job: result.about,
      avatar: result.avatar
    });

    return result._id;
  })
  .then(userId => {
    api.getInitialCards()
      .then(result => {
        cardsList = new Section({
          items: result.reverse(),
          renderer: data => {
            if (data.owner._id === userId) {
              data.removable = 1;
            }
            if (data.likes.filter(user => user._id === userId).length) {
              data.liked = 1;
            }
            const cardInstance = new Card(
              data,
              '#element-template',
              () => imageViewer.open(data),
              () => {
                deleteConfirmation.currentCard = cardInstance;
                deleteConfirmation.open();
              },
              () => {
                (data.liked
                  ? api.unLikeCard(data._id)
                  : api.likeCard(data._id))
                    .then(result => {
                      cardInstance.toggleLike();
                      cardInstance.updateLikes(result.likes.length);
                      data.liked = !data.liked;
                    })
                    .catch(console.error);
              }
            );

            cardsList.setItem(cardInstance.created);
          }
        }, '.elements__list');

        cardsList.renderItems();
      })
      .catch(console.error);
  })
  .catch(console.error);

// FEAT: Card adding

const elementEditor = new PopupWithForm('#element-editor', data =>
  api.addCard(data.title, data.link)
    .then(cardsList.renderer)
);
elementEditor.setEventListeners();

const elementEditorValidator = new FormValidator(defaultFormConfig, elementEditor.form);
elementEditorValidator.enableValidation();

const elementEditorOpenButton = document.querySelector('.profile__add-button');
elementEditorOpenButton.addEventListener('click', () => elementEditor.open());