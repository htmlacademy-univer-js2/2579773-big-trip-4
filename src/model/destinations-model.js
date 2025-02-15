export default class DestinationModel {
  #service = null;
  #destinations = null;

  constructor(service) {
    this.#service = service;
    this.#destinations = this.#service.getDestinations();
  }

  get() {
    return this.#destinations;
  }

  getByID(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}
