class Popup {
  constructor(element) {
    this.element = element;

    this.closeButton = this.element.querySelector('.popup__close-button');

    this.toggle = () => {
      this.element.classList.contains(this.elementOpenedString)
        ? this.removeListeners()
        : this.setListeners();

      this.element.classList.toggle(this.elementOpenedString);
    };

    this.keydownHandler = e =>
      (e.key === 'Escape' && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey)
        && this.toggle();
    ;
  }

  toggle() { this.toggle() } // necessary for super.toggle() to work

  elementOpenedString = 'popup_opened';

  setListeners() {
    this.closeButton.addEventListener('click', this.toggle);

    document.addEventListener('keypress', this.keydownHandler);
  }

  removeListeners() {
    this.closeButton.removeEventListener('click', this.toggle);

    document.removeEventListener('keypress', this.keydownHandler);
  }
}

class Form extends Popup {
  constructor(element) {
    super(element);

    this.form = this.element.querySelector('.popup__form');
  }

  setSubmitHandler(handler) {
    this.form.addEventListener('submit', e => {
      e.preventDefault();

      handler();

      super.toggle();
    });
  }
}

// FEAT: Profile editing

const profileEditorPopup = document.querySelector('#profile-editor');

const profileEditor = new Form(profileEditorPopup);

const profileEditorOpenButton = document.querySelector('.profile__edit-button');

const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__description');

const nameInput = profileEditorPopup.querySelector('.popup__input[name="name"]');
const jobInput = profileEditorPopup.querySelector('.popup__input[name="job"]');

profileEditorOpenButton.addEventListener('click', () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

  profileEditor.toggle();
});

profileEditor.setSubmitHandler(() => {
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
});

// FEAT: Card adding

const elementEditorPopup = document.querySelector('#element-editor');

const elementEditor = new Form(elementEditorPopup);

const elementEditorOpenButton = document.querySelector('.profile__add-button');
elementEditorOpenButton.addEventListener('click', () => { elementEditor.toggle() });

const titleInput = elementEditorPopup.querySelector('.popup__input[name="title"]');
const linkInput = elementEditorPopup.querySelector('.popup__input[name="link"]');

const elementsContainer = document.querySelector('.elements__list');
function addCard(card, toBeginning) {
  toBeginning
    ? elementsContainer.prepend(card.created)
    : elementsContainer.append(card.created);
}

elementEditor.setSubmitHandler(() => {
  const cardInstance = new Card(
    titleInput.value,
    linkInput.value
  );

  addCard(cardInstance, 1);

  elementEditor.form.reset();
});

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
  constructor(title, imgLink) {
    this.title = title;
    this.imgLink = imgLink;

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
    element.src = this.imgLink;
    element.alt = this.title;

    element.addEventListener('click', openPreview);
  }

  buildTrashButton(element) {
    element.addEventListener('click', this.remove);
  }

  buildTitle(element) {
    element.textContent = this.title;
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
  const cardInstance = new Card(
    card.name,
    card.link
  );
  addCard(cardInstance);
});