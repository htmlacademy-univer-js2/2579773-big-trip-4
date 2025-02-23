import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';

import {render, replace, remove} from '../framework/render.js';

export default class PointPresenter {
  #destinationModel = null;
  #offerModel = null;
  #pointListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;

  constructor({pointListContainer, destinationModel, offerModel}) {
    this.#pointListContainer = pointListContainer;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(
      point,
      this.#destinationModel.getByID(point.destination.id),
      point.offers || [] ,
      this.#pointEditClickHandle
    );

    this.#pointEditComponent = new PointEditView ({
      point,
      offers: this.#offerModel.getByType(point.type) || [],
      onResetClick: this.#resetClickHandler,
      onSubmitClick: this.#submitClickHandler,
      onDeleteClick: this.#deleteClickHandler
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#pointListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListContainer.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
  };

  #escKeyHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc'){
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyHandler);
    }
  };

  #pointEditClickHandle = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyHandler);
  };

  #resetClickHandler = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyHandler);
  };

  #submitClickHandler = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyHandler);
  };

  #deleteClickHandler = () => {
    this.#pointComponent.element.remove();
    this.#pointEditComponent.element.remove();
    document.removeEventListener('keydown', this.#escKeyHandler);
  };
}

