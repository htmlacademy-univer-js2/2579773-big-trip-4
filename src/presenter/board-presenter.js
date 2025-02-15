import PointCreateView from '../view/point-create-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import PointView from '../view/point-view.js';

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

    this.#points = [...pointModel.get()];
  }

  init() {
    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent, this.#container);

    render(
      new PointCreateView({
        point: this.#points[0],
      }),
      this.#eventListComponent.element
    );

    this.#points.forEach((point) => {
      render(new PointView(
        point,
        this.#destinationModel.getByID(point.destination.id),
        this.#offerModel.getByType(point.type) || []
      ),
      this.#eventListComponent.element);
    });
  }
}
