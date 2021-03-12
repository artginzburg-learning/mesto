// Variables

let profile = {
  element: document.querySelector('.profile'),
};
profile.buttons = {
  edit: profile.element.querySelector('.profile__edit-button'),
};
profile.displays = {
  name: profile.element.querySelector('.profile__name'),
  job: profile.element.querySelector('.profile__description'),
}

let popup = {
  element: document.querySelector('.popup'),
  elementOpenedClassName: 'popup_opened',
};
popup.buttons = {
  close: popup.element.querySelector('.popup__close-button'),
};

popup.form = {
  element: popup.element.querySelector('.popup__form'),
};
popup.form.inputs = {
  name: popup.form.element.querySelector('.popup__input[name="name"]'),
  job: popup.form.element.querySelector('.popup__input[name="job"]'),
};

// Functions

popup.actions = {
  toggle: function() {
    popup.element.classList.toggle(popup.elementOpenedClassName);
  },
};
popup.actions.open = function() {
  popup.actions.toggle();

  popup.form.inputs.name.value = profile.displays.name.textContent;
  popup.form.inputs.job.value = profile.displays.job.textContent;
};

popup.form.actions = {
  save: e => {
    e.preventDefault();
  
    profile.displays.name.textContent = popup.form.inputs.name.value;
    profile.displays.job.textContent = popup.form.inputs.job.value;
  
    popup.actions.toggle();
  },
};

// Listeners

profile.buttons.edit.addEventListener('click', popup.actions.open);

popup.buttons.close.addEventListener('click', popup.actions.toggle);
popup.form.element.addEventListener('submit', popup.form.actions.save); 