import {offers} from '../mock/offer.js';

export default class OfferModel {
  constructor() {
    this.offers = offers;
  }

  get() {
    return this.offers;
  }
}
