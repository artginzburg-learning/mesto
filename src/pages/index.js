import './index.css';

import Card from '../components/Card';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';

import api from '../components/Api';

import {
  defaultFormConfig,
  profileSelectors,
  cardSelectors,
  popupSelectors
} from '../utils/constants';

// FEAT: Profile editing

const profileUserInfo = new UserInfo(profileSelectors);

const profileEditor = new PopupWithForm(profileSelectors.editorSelector, data =>
  api.editProfile(data)
    .then(({ name, about }) =>
      profileUserInfo.userInfo = {
        name,
        about
      }
    )
);
profileEditor.setEventListeners();

const profileEditorValidator = new FormValidator(defaultFormConfig, profileEditor.form);
profileEditorValidator.enableValidation();

const {
  name: nameInput,
  about: aboutInput
} = profileEditor.form.elements;

const profileEditorOpenButton = document.querySelector(profileSelectors.editButtonSelector);
profileEditorOpenButton.addEventListener('click', () => {
  const currentUserData = profileUserInfo.userInfo;

  nameInput.value = currentUserData.name;
  aboutInput.value = currentUserData.about;

  profileEditor.open();
});

// FEAT: Avatar updating

const avatarEditor = new PopupWithForm(popupSelectors.avatarEditor, data =>
  api.updateAvatar(data)
    .then(({ avatar }) =>
      profileUserInfo.userInfo = {
        avatar
      }
    )
);
avatarEditor.setEventListeners();

const avatarEditorValidator = new FormValidator(defaultFormConfig, avatarEditor.form);
avatarEditorValidator.enableValidation();

const avatarEditorOpenButton = document.querySelector(profileSelectors.avatarSelector).parentElement;
avatarEditorOpenButton.addEventListener('click', () => avatarEditor.open());

//  FEAT: Image preview

const imageViewer = new PopupWithImage(popupSelectors.imageViewer);
imageViewer.setEventListeners();

// FEAT: Card deleting

const deleteConfirmation = new PopupWithForm(popupSelectors.deleteConfirmation, () => {
  const card = deleteConfirmation.currentCard;
  return api.deleteCard(card.data._id)
    .then(card.remove);
});
deleteConfirmation.setEventListeners();

// FEAT: Initial user data and cards loading

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
    profileUserInfo.userInfo = {
      name,
      about,
      avatar
    };

    const cardsList = new Section({
      items: initialCards.reverse(),
      renderer: data => {
        data.removable = (data.owner._id === userData._id);

        data.liked = (data.likes.some(user =>
          user._id === userData._id
        ));

        const cardInstance = new Card(
          data,
          cardSelectors.templateSelector,
          () => {
            const {
              name,
              link
            } = data;
            imageViewer.open({ name, link });
          },
          () => {
            deleteConfirmation.currentCard = cardInstance;
            deleteConfirmation.open();
          },
          () =>
            (cardInstance.liked
              ? api.unLikeCard
              : api.likeCard)(data._id)
                .then(result => {
                  cardInstance.liked = !cardInstance.liked;
                  cardInstance.updateLikes(result.likes.length);
                })
                .catch(console.error)
        );

        cardsList.setItem(cardInstance.created);
      }
    }, cardSelectors.listSelector);

    cardsList.renderItems();

    // FEAT: Card adding

    const elementEditor = new PopupWithForm(popupSelectors.elementEditor, data =>
      api.addCard(data.title, data.link)
        .then(cardsList.renderer)
    );
    elementEditor.setEventListeners();

    const elementEditorValidator = new FormValidator(defaultFormConfig, elementEditor.form);
    elementEditorValidator.enableValidation();

    const elementEditorOpenButton = document.querySelector(profileSelectors.addButtonSelector);
    elementEditorOpenButton.addEventListener('click', () => elementEditor.open());
  })
  .catch(console.error);