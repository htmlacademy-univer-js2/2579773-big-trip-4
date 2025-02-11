export default class DistinationModel {
  constructor(service) {
    this.service = service;
    this.destinations = this.service.getDestinations();
  }

  get() {
    return this.destinations;
  }

  getByID(id) {
    return this.destinations.find((destination) => destination.id === id);
  }
}
