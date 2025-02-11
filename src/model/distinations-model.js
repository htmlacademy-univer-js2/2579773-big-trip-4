import {destinations} from '../mock/destination.js';

export default class DisstinationModel {
  constructor() {
    this.destinations = destinations;
  }

  get() {
    return this.destinations;
  }

  getByID(id) {
    return this.destinations.find((destination) => destination.id === id);
  }
}
