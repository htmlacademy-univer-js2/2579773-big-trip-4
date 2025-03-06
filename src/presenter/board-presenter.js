import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventListViewEmpty from '../view/event-list-view-empty.js';
import PointPresenter from './point-presenter.js';

import {render} from '../framework/render.js';
import {UpdateType, UserAction} from '../const.js';
import {filter} from '../const.js';

export default class BoardPresenter {
  #container = null;
  #pointModel = null;
  #destinationModel = null;
  #offerModel = null;
  #filterModel = null;

  #sortComponent = new SortView();
  #eventListComponent = new EventListView();

  #pointPresenters = new Map();

  constructor({container, pointModel, destinationModel, offerModel, filterModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#filterModel = filterModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[filterType](points);

    return filteredPoints;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    if (this.points.length === 0) {
      render(new EventListViewEmpty(), this.#container);
      return;
    }

    this.#renderSort();
    this.#renderointsContainer();
    this.#renderPoints();
  }

  #renderSort = () => {
    render(this.#sortComponent, this.#container);
  };

  #renderointsContainer = () => {
    render(this.#eventListComponent, this.#container);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      destinationModel: this.#destinationModel,
      offerModel: this.#offerModel,
      onDataChange: this.#handelViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  };

  #clearPoints = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };

  #handelViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.MINOR:
        this.#clearPoints();
        this.#renderBoard();
        break;
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
