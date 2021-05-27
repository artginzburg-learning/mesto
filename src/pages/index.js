import './index.css';

import Card from '../components/Card';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';

import api from '../components/Api';

import { defaultFormConfig } from '../utils/constants';

// FEAT: Profile editing

const profileSelectors = {
  nameSelector: '.profile__name',
  aboutSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
};

const profileUserInfo = new UserInfo(profileSelectors);

const profileEditor = new PopupWithForm('#profile-editor', data =>
  api.editProfile(data)
    .then(({ name, about }) =>
      profileUserInfo.setUserInfo({
        name,
        about
      })
    )
);
profileEditor.setEventListeners();

const profileEditorValidator = new FormValidator(defaultFormConfig, profileEditor.form);
profileEditorValidator.enableValidation();

const {
  name: nameInput,
  about: aboutInput
} = profileEditor.form.elements;

const profileEditorOpenButton = document.querySelector('.profile__edit-button');
profileEditorOpenButton.addEventListener('click', () => {
  const currentUserData = profileUserInfo.getUserInfo();

  nameInput.value = currentUserData.name;
  aboutInput.value = currentUserData.about;

  profileEditor.open();
});

// FEAT: Avatar updating

const avatarEditor = new PopupWithForm('#avatar-editor', data =>
  api.updateAvatar(data)
    .then(({ avatar }) =>
      profileUserInfo.setUserInfo({
        avatar
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

// FEAT: Initial user data and cards loading

let cardsList;

Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
])
  .then(([userData, initialCards]) => {
    const {
      name,
      about,
      avatar
    } = userData;
    profileUserInfo.setUserInfo({
      name,
      about,
      avatar
    });

    cardsList = new Section({
      items: initialCards.reverse(),
      renderer: data => {
        if (data.owner._id === userData._id) {
          data.removable = 1;
        }
        if (data.likes.filter(user =>
          user._id === userData._id
        ).length) {
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
              ? api.unLikeCard
              : api.likeCard)(data._id)
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