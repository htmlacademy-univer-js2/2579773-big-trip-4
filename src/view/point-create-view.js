import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {formatStringToDateTimeWithLine} from '../util.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { POINT_EMPTY } from '../const.js';

function createPointCreateTemplate({state}) {
  const {point, offers, destinations} = state;
  const { basePrice, dateFrom, dateTo, type } = point;

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

  const filteredOffers = offers.find((offer) => offer.type.toLowerCase() === type.toLowerCase())?.offers || [];
  const offerSelectors = filteredOffers.map((offer) => {
    const isChecked = point.offers.some((offerItem) => offerItem === offer.id) ? 'checked' : '';
    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden" id="event-offer-${point.type.toLowerCase()}-${offer.id}" type="checkbox" name="event-offer-${point.type.toLowerCase()}" data-offer-id="${offer.id}"  ${isChecked}>
        <label class="event__offer-label" for="event-offer-${point.type.toLowerCase()}-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `;
  }).join('');

  const destinationOptions = destinations.map((dest) =>`
    <option value="${dest?.name || ''}"></option>`).join('');

  const destinationItem = destinations.find((dest) => dest.id === point.destination);
  const photoImages = (destinationItem?.pictures || []).map((photo) =>
    `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`
  ).join('') || '';

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
            <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationItem ? destinationItem.name : ''}" list="destination-list-1">
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
            <input class="event__input event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice || ''}">
          </div>
          <button class="event__save-btn btn btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
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
            <p class="event__destination-description">${destinationItem?.description || ''}</p>
          </section>
          <div class="event__photos-container">
              <div class="event__photos-tape">
                ${photoImages}
              </div>
            </div>
        </section>
      </form>
    </li>
  `;
}

export default class PointCreateView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #onResetClick = null;
  #onFormSubmit = null;

  #datepickerStart = null;
  #datepickerEnd = null;

  constructor({point = POINT_EMPTY, destinations, offers, onResetClick, onFormSubmit}) {
    super();
    this._setState(PointCreateView.parsePointToState({point}));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onResetClick = onResetClick;
    this.#onFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  get template() {
    return createPointCreateTemplate({
      state: {
        ...this._state,
        offers: this.#offers,
        destinations: this.#destinations
      },
    });
  }

  removeElement(){
    super.removeElement();

    if(this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if(this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  reset = (point) => {
    this.updateElement({point});
    this._restoreHandlers();
  };

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#cancelHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#eventDestinationHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceHandler);
    this.#setDatepickers();
    this.#checkDestination();
  }

  #checkDestination = () => {
    const destinationValue = this.element.querySelector('.event__input--destination').value;
    const validDestination = this.#destinations.find((dest) => dest.name.toLowerCase() === destinationValue.toLowerCase());
    const saveButton = this.element.querySelector('.event__save-btn');

    if (validDestination) {
      saveButton.disabled = false;
    } else {
      saveButton.disabled = true;
    }
  };

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(PointCreateView.parseStateToPoint(this._state));
  };

  #cancelHandler = (evt) => {
    evt.preventDefault();
    this.#onResetClick(PointCreateView.parseStateToPoint(this._state));
  };

  #eventTypeHandler = (evt) => {
    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: []
      },
    });
  };

  #eventDestinationHandler = (evt) => {
    const destinationValue = evt.target.value;
    const validDestination = this.#destinations.find((dest) => dest.name.toLowerCase() === destinationValue.toLowerCase());
    const saveButton = this.element.querySelector('.event__save-btn');

    if (validDestination) {
      this.updateElement({
        point: {
          ...this._state.point,
          destination: validDestination.id
        },
      });
      saveButton.disabled = false;
    } else {
      saveButton.disabled = true;
    }
  };

  #offersHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    const selectedOfferId = checkedBoxes.map((element) => (element.dataset.offerId));

    this._setState({
      point: {
        ...this._state.point,
        offers: selectedOfferId
      }
    }, () => {
      this.updateElement();
    });
  };

  #priceHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice: parseFloat(evt.target.value)
      }
    });
  };

  #dateStartCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateFrom: userDate
      }
    });
    this.#datepickerStart.set('minDate',this._state.point.dateStart);
  };

  #dateEndCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: userDate
      }
    });
    this.#datepickerStart.set('maxDate',this._state.point.dateEnd);
  };

  #setDatepickers = () => {
    const [dateStartElement, dateEndElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {
        firstDayOfWeek: 1,
      },
      'time_24hr': true
    };

    this.#datepickerStart = flatpickr(
      dateStartElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.dateStart,
        onClose: this.#dateStartCloseHandler,
        maxDate: this._state.point.dateEnd,
      },
    );

    this.#datepickerEnd = flatpickr (
      dateEndElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.dateEnd,
        onClose: this.#dateEndCloseHandler,
        minDate: this._state.point.dateStart,
      }
    );
  };

  static parsePointToState = ({point}) => ({
    point: {...point}
  });

  static parseStateToPoint = (state) => state.point;
}
