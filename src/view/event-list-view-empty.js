import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../const';

const NoPointTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

function createEventListEmptyTemplate(filterType) {
  const noPointTextValue = NoPointTextType[filterType];
  return `
    <section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
      <p class="trip-events__msg">${noPointTextValue}</p>
    </section>
  `;
}

export default class EventListEmptyView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEventListEmptyTemplate(this.#filterType);
  }
}
