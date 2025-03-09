import {render} from '../framework/render.js';
import NewPointButtonView from '../view/new-point-button-view.js';

export default class NewPointButtonPresenter {
  #container = null;
  #button = null;
  #handleButtonClick = null;

  constructor({container}) {
    this.#container = container;
  }

  init({onButtonClick}) {
    this.#handleButtonClick = onButtonClick;
    this.#button = new NewPointButtonView({onClick: this.#buttonClickHandler});
    render(this.#button, this.#container);
  }

  disableButton() {
    this.#button.setDisabled(true);
  }

  enableButton() {
    this.#button.setDisabled(false);
  }

  #buttonClickHandler = () => {
    if (this.#handleButtonClick) {
      this.#handleButtonClick();
    }
  };
}
