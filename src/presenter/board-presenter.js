// import PointCreateView from '../view/point-create-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventListViewEmpty from '../view/event-list-view-empty.js';
import PointPresenter from './point-presenter.js';

import {render} from '../framework/render.js';

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
    this.#renderBoard();

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderBoard() {
    if (this.#points.length === 0) {
      render(new EventListViewEmpty(), this.#container);
      return;
    }

    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent, this.#container);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      destinationModel: this.#destinationModel,
      offerModel: this.#offerModel
    });

    pointPresenter.init(point);
  };
}
