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
  #handleDataChange = null;

  constructor({pointListContainer, destinationModel, offerModel, onDataChange}) {
    this.#pointListContainer = pointListContainer;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      pointDestination: this.#destinationModel.getByID(point.destination.id),
      pointOffers: point.offers || [],
      onEditClick: this.#pointEditClickHandler,
      onFavoriteClick: this.#favoriteClickHandler,
    });

    this.#pointEditComponent = new PointEditView ({
      point,
      offers: this.#offerModel.getByType(point.type) || [],
      onResetClick: this.#resetClickHandler,
      onSubmitClick: this.#submitClickHandler,
      onDeleteClick: this.#deleteClickHandler,
      onFavoriteClick: this.#favoriteClickHandler,
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

  #pointEditClickHandler = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyHandler);
  };

  #resetClickHandler = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyHandler);
  };

  #submitClickHandler = (point) => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyHandler);
    this.#handleDataChange(point);
  };

  #deleteClickHandler = () => {
    this.#pointComponent.element.remove();
    this.#pointEditComponent.element.remove();
    document.removeEventListener('keydown', this.#escKeyHandler);
  };

  #favoriteClickHandler = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}

