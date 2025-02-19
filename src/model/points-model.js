export default class PointModel {
  #service = null;
  #points = null;

  constructor(service) {
    this.#service = service;
    this.#points = this.#service.getPoints();
  }

  get() {
    return this.#points || [];
  }
}
