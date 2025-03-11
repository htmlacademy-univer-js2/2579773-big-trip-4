export default class DestinationModel {
  #service = null;
  #destinations = [];

  constructor(service) {
    this.#service = service;
  }

  async init() {
    this.#destinations = await this.#service.getDestinations();
    return this.#destinations;
  }

  get() {
    return this.#destinations;
  }

  getByID(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}
