import altaiImage from '../images/element-altai.jpg';
import kolskyImage from '../images/element-kolsky.jpg';
import kosaImage from '../images/element-kosa.jpg';
import sinaiImage from '../images/element-sinai.jpg';
import putinoImage from '../images/element-putino.jpg';
import zamogilyeImage from '../images/element-zamogilye.jpg';

export const defaultFormConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export const initialCards = [
  {
    name: 'Алтай',
    link: altaiImage
  },
  {
    name: 'Кольский',
    link: kolskyImage
  },
  {
    name: 'Куршская коса',
    link: kosaImage
  },
  {
    name: 'Гора Синай',
    link: sinaiImage
  },
  {
    name: 'Путино',
    link: putinoImage
  },
  {
    name: 'Замогилье (деревня)',
    link: zamogilyeImage
  }
];