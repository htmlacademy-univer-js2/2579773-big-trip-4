import PointCreateView from '../view/point-create-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import PointView from '../view/point-view.js';

import {render} from '../render.js';
import {POINTS_COUNT} from '../const.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  eventListComponent = new EventListView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);

    render(new PointCreateView(), this.eventListComponent.getElement());

    for (let i = 0; i < POINTS_COUNT; i++) {
      render(new PointView(), this.eventListComponent.getElement());
    }
  }
}
