class Popup {
  constructor(element) {
    this.element = element;

    this.closeButton = this.element.querySelector('.popup__close-button');

    // the methods below are set through constructor() because otherwise `this` called inside of a callback function points to `event.target`, and `.bind(this)` is bad for memory 'cause it creates a new function on every call
    this.toggle = () => {
      this.element.classList.contains(this.elementOpenedClass)
        ? this.removeListeners()
        : this.setListeners();

      this.element.classList.toggle(this.elementOpenedClass);
    };

    this.clickHandler = e =>
      (e.target === e.currentTarget || e.target === this.closeButton)
        && this.toggle();

    this.keypressHandler = e =>
      (e.key === 'Escape' && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey)
        && this.toggle();
    ;
  }

  toggle() { this.toggle() } // necessary for `super.toggle()` to work since it's explicitly set through constructor()

  elementOpenedClass = 'popup_opened';

  setListeners() {
    this.element.addEventListener('click', this.clickHandler);

    document.addEventListener('keypress', this.keypressHandler);
  }
  removeListeners() {
    this.element.removeEventListener('click', this.clickHandler);

    document.removeEventListener('keypress', this.keypressHandler);
  }
}

class Form extends Popup {
  constructor(element) {
    super(element);

    this.form = this.element.querySelector('.popup__form');

    this.fullSubmitHandler = e => {
      e.preventDefault();
  
      this.submitHandler
        && this.submitHandler();
  
      super.toggle();

      document.activeElement.blur(); // fixes mobile keyboard being stuck on the screen after form submission (due to `event.preventDefault()`)
    }
  }

  setListeners() {
    super.setListeners();
    
    this.form.addEventListener('submit', this.fullSubmitHandler);
  }
  removeListeners() {
    super.removeListeners();

    this.form.removeEventListener('submit', this.fullSubmitHandler);
  }
}

// FEAT: Profile editing

const profileEditorPopup = document.querySelector('#profile-editor');
const profileEditor = new Form(profileEditorPopup);

const nameInput = profileEditor.form.elements.name;
const jobInput = profileEditor.form.elements.job;

const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__description');

const profileEditorOpenButton = document.querySelector('.profile__edit-button');
profileEditorOpenButton.addEventListener('click', () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

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
function addCard(card, toBeginning) {
  toBeginning
    ? elementsContainer.prepend(card.created)
    : elementsContainer.append(card.created);
}

elementEditor.submitHandler = () => {
  const cardInstance = new Card({
    name: titleInput.value,
    link: linkInput.value,
  });

  addCard(cardInstance, 1);

  elementEditor.form.reset();
};

//  FEAT: Image preview

const imageViewerPopup = document.querySelector('#image-viewer');
const imageViewer = new Popup(imageViewerPopup);

const popupImage = imageViewerPopup.querySelector('.popup__image');
const popupCaption = imageViewerPopup.querySelector('.popup__caption');

function openPreview(e) {
  popupImage.src = e.target.src;
  popupImage.alt = e.target.alt;

  popupCaption.textContent = e.target.alt;

  imageViewer.toggle();
}

class Card {
  constructor(cardData) {
    this.name = cardData.name;
    this.link = cardData.link;

    this.created = this.create();
  }

  elementTemplate = document.querySelector('#element-template').content;

  toggleLike(e) {
    e.target.classList.toggle('element__like-button_active');
  }

  remove(e) {
    e.target.parentNode.remove();
  }

  buildImage(element) {
    element.src = this.link;
    element.alt = this.name;

    element.addEventListener('click', openPreview);
  }

  buildTrashButton(element) {
    element.addEventListener('click', this.remove);
  }

  buildTitle(element) {
    element.textContent = this.name;
  }

  buildLikeButton(element) {
    element.addEventListener('click', this.toggleLike);
  }

  create() {
    const card = this.elementTemplate.firstElementChild.cloneNode(1);

    const imgElement = card.querySelector('.element__image');
    this.buildImage(imgElement);

    const trashButton = card.querySelector('.element__trash-button');
    this.buildTrashButton(trashButton);

    const titleElement = card.querySelector('.element__title');
    this.buildTitle(titleElement);
  
    const likeButton = card.querySelector('.element__like-button');
    this.buildLikeButton(likeButton);

    return card;
  }
}

// FEAT: Initial card loading

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

initialCards.forEach(card => {
  const cardInstance = new Card({
    name: card.name,
    link: card.link,
  });
  addCard(cardInstance);
});