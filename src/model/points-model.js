import {points} from '../mock/point.js';

export default class OfferModel {
  constructor() {
    this.points = points;
  }

  get() {
    return this.points;
  }
}
