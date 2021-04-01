import Popup from "./Popup.js";
import Form from "./Popup__Form.js";
import Card from "./Card.js";

// FEAT: Profile editing

const profileEditorPopup = document.querySelector('#profile-editor');
const profileEditor = new Form(profileEditorPopup);

const nameInput = profileEditor.form.elements.name;
const jobInput = profileEditor.form.elements.job;

const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__description');

profileEditor.form.addEventListener('reset', e => {
  e.preventDefault();

  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
});

const profileEditorOpenButton = document.querySelector('.profile__edit-button');
profileEditorOpenButton.addEventListener('click', () => {
  profileEditor.form.reset();

  profileEditor.toggle();
});

profileEditor.submitHandler = () => {
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
};

// FEAT: Card adding

const elementEditorPopup = document.querySelector('#element-editor');
const elementEditor = new Form(elementEditorPopup);

const titleInput = elementEditor.form.elements.title;
const linkInput = elementEditor.form.elements.link;

const elementEditorOpenButton = document.querySelector('.profile__add-button');
elementEditorOpenButton.addEventListener('click', elementEditor.toggle);

const elementsContainer = document.querySelector('.elements__list');
function addCard(card) {
  elementsContainer.prepend(card.created);
}
function createInsertDefaultCard(data) {
  const cardInstance = new Card(data, '#element-template');

  addCard(cardInstance);
}

elementEditor.submitHandler = () => {
  createInsertDefaultCard({
    name: titleInput.value,
    link: linkInput.value,
  });

  elementEditor.form.reset();
};

//  FEAT: Image preview

const imageViewerPopup = document.querySelector('#image-viewer');
const imageViewer = new Popup(imageViewerPopup);

const popupImage = imageViewerPopup.querySelector('.popup__image');
const popupCaption = imageViewerPopup.querySelector('.popup__caption');

export default function openPreview(data) {
  popupImage.src = data.link;

  popupCaption.textContent = data.name;

  imageViewer.toggle();
}

// FEAT: Initial card loading

const initialCards = [
  {
    name: "Алтай",
    link: "./images/element-altai.jpg"
  },
  {
    name: "Кольский",
    link: "./images/element-kolsky.jpg"
  },
  {
    name: "Куршская коса",
    link: "./images/element-kosa.jpg"
  },
  {
    name: "Гора Синай",
    link: "./images/element-sinai.jpg"
  },
  {
    name: "Путино",
    link: "./images/element-putino.jpg"
  },
  {
    name: "Замогилье (деревня)",
    link: "./images/element-zamogilye.jpg"
  }
];

initialCards.forEach(card =>
  createInsertDefaultCard(card)
);