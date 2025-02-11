export default class PointModel {
  constructor(service) {
    this.service = service;
    this.points = this.service.getPoints();
  }

  get() {
    return this.points;
  }
}
