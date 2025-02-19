import {destinations} from '../mock/destination.js';
import {options} from '../mock/offer.js';
import {points} from '../mock/point.js';

export default class MockService {
  #destinations = null;
  #offers = null;
  #points = null;

  constructor () {
    this.#destinations = destinations;
    this.#offers = options;
    this.#points = points;
  }

  getDestinations() {
    return this.#destinations;
  }

  getOffers() {
    return this.#offers;
  }

  getPoints() {
    return this.#points || [];
  }
}
