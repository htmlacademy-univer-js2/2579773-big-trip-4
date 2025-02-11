import {destinations} from '../mock/destination.js';
import {options} from '../mock/offer.js';
import {points} from '../mock/point.js';

export default class MockService {

  constructor () {
    this.destinations = destinations;
    this.offers = options;
    this.points = points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getPoints() {
    return this.points;
  }

  getPointsFull() {
    return this.points.map((point) => {
      const destination = this.destinations.find((dest) => dest.id === point.destination);
      const offers = this.offers.find((offer) => offer.type === point.type)?.offer || [];

      return {...point, destination, offers};
    });
  }
}
