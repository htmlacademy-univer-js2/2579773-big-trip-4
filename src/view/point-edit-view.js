import AbstractView from '../framework/view/abstract-view.js';
import {formatStringToDateTimeWithLine} from '../util.js';
import {destinations} from '../mock/destination.js';

function createPointEditTemplate({point, offers}) {
  const { basePrice, dateFrom, dateTo, destination, isFavorite, type } = point;

  const eventTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
  const eventTypeOptions = eventTypes.map((eventType) => {
    const isChecked = type === eventType ? 'checked' : '';
    return `
      <div class="event__type-item">
        <input id="event-type-${eventType}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${eventType}" ${isChecked}>
        <label class="event__type-label event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType.charAt(0).toUpperCase() + eventType.slice(1)}</label>
      </div>
    `;
  }).join('');

  const offerSelectors = offers.map((offer) => {
    const isChecked = point.offers.some((offerItem) => offerItem.id === offer.id) ? 'checked' : '';
    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden" id="event-offer-${offer.type}-${offer.id}" type="checkbox" name="event-offer-${offer.type}" ${isChecked}>
        <label class="event__offer-label" for="event-offer-${offer.type}-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `;
  }).join('');

  const destinationOptions = destinations.map((dest) =>
    `<option value="${dest.name}"></option>`
  ).join('');

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${eventTypeOptions}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group event__field-group--destination">
            <label class="event__label event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationOptions}
            </datalist>
          </div>
          <div class="event__field-group event__field-group--time">
            <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom ? formatStringToDateTimeWithLine(dateFrom) : ''}">
            &mdash;
            <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo ? formatStringToDateTimeWithLine(dateTo) : ''}">
          </div>
          <div class="event__field-group event__field-group--price">
            <label class="event__label" for="event-price-1">
              &euro;
            </label>
            <input class="event__input event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice || ''}">
          </div>
          <button class="event__save-btn btn btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.2 4.3 1.6-9.2L.7 9.7l9.2-1.3L14 0l4.1 8.3 9.2 1.3-6.7 6.5 1.6 9.2L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section event__section--offers">
            <h3 class="event__section-title event__section-title--offers">Offers</h3>
            <ul class="event__available-offers">
              ${offerSelectors}
            </ul>
          </section>
          <section class="event__section event__section--destination">
            <h3 class="event__section-title event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>
          </section>
        </section>
      </form>
    </li>
  `;
}

export default class PointEditView extends AbstractView {
  #point = null;
  #onResetClick = null;
  #onSubmitClick = null;
  #onDeleteClick = null;
  #offers = null;

  constructor({point, offers, onResetClick, onSubmitClick, onDeleteClick}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#onResetClick = onResetClick;
    this.#onSubmitClick = onSubmitClick;
    this.#onDeleteClick = onDeleteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#resetHandler);
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteHandler);
  }

  get template() {
    return createPointEditTemplate({
      point: this.#point,
      offers: this.#offers,
    });
  }

  #resetHandler = (evt) => {
    evt.preventDefault();
    this.#onResetClick();
  };

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmitClick(this.#point);
  };

  #deleteHandler = (evt) => {
    evt.preventDefault();
    this.#onDeleteClick();
  };
}
