// import PointCreateView from '../view/point-create-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventListViewEmpty from '../view/event-list-view-empty.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';

import {render, replace} from '../framework/render.js';

export default class BoardPresenter {
  #container = null;
  #pointModel = null;
  #destinationModel = null;
  #offerModel = null;
  #points = [];

  #sortComponent = new SortView();
  #eventListComponent = new EventListView();

  constructor({container, pointModel, destinationModel, offerModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;

    this.#points = [...this.#pointModel.get()];
  }

  init() {
    if (this.#points.length === 0) {
      render(new EventListViewEmpty(), this.#container);
      return;
    }

    this.#eventListComponent = new EventListView();

    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent, this.#container);

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint = (point) => {
    const pointComponent = new PointView(
      point,
      this.#destinationModel.getByID(point.destination.id),
      point.offers || [] ,
      pointEditClickHandle
    );

    const pointEditComponent = new PointEditView ({
      point,
      offers: this.#offerModel.getByType(point.type) || [],
      onResetClick: resetClickHandler,
      onSubmitClick: submitClickHandler,
      onDeleteClick: deleteClickHandler
    });

    render(pointComponent, this.#eventListComponent.element);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const escKeyHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc'){
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyHandler);
      }
    };

    function pointEditClickHandle () {
      replacePointToForm();
      document.addEventListener('keydown', escKeyHandler);
    }

    function resetClickHandler() {
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyHandler);
    }

    function submitClickHandler() {
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyHandler);
    }

    function deleteClickHandler() {
      pointComponent.element.remove();
      pointEditComponent.element.remove();
      document.removeEventListener('keydown', escKeyHandler);
    }
  };
}
