export default class OfferModel {
  #service = null;
  #offers = [];

  constructor(service) {
    this.#service = service;
    this.#offers = this.#service.getOffers();
  }

  get() {
    return this.#offers;
  }

  getByType(type) {
    const offers = this.#offers.find((option) => option.type === type);
    if (!offers) {
      return [];
    }
    return offers.offers;
  }
}
