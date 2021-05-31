export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src
    }
  }

  setUserInfo({ name, about, avatar }) {
    name && (this._nameElement.textContent = name);
    about && (this._aboutElement.textContent = about);
    avatar && (this._avatarElement.src = avatar);
  }
}