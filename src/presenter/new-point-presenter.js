import PointCreateView from '../view/point-create-view';
import { remove, render, RenderPosition } from '../framework/render';
import { UpdateType, UserAction} from '../const';
import { POINT_EMPTY } from '../const';

export default class NewPointPresenter {
  #container = null;
  #destinationModel = null;
  #offerModel = null;
  #pointNewComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;

  constructor({container, destinationModel, offerModel, onDataChange, onDestroy}) {
    this.#container = container;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#pointNewComponent !== null) {
      return;
    }

    this.#pointNewComponent = new PointCreateView ({
      point: POINT_EMPTY,
      destinations: this.#destinationModel.get(),
      offers: this.#offerModel.get() || [],
      onResetClick: this.#resetClickHandle,
      onFormSubmit: this.#formSubmitHandle,
    });

    render(this.#pointNewComponent, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandle);
  }

  destroy = ({isCanceled = true} = {}) => {
    if (this.#pointNewComponent === null) {
      return;
    }

    remove(this.#pointNewComponent);
    this.#pointNewComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandle);

    this.#handleDestroy({isCanceled});
  };

  #formSubmitHandle = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
    this.destroy({isCanceled: false});
  };

  #resetClickHandle = () => {
    this.destroy();
  };

  #escKeyDownHandle = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
