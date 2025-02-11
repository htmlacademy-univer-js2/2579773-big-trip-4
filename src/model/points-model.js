import {points} from '../mock/point.js';

export default class PointModel {
  constructor() {
    this.points = points;
  }

  get() {
    return this.points;
  }
}
