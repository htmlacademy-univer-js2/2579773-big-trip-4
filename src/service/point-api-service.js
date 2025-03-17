import ApiService from '../framework/api-service.js';
import { Method } from '../const.js';

export default class PointApiService extends ApiService{
  getDestinations() {
    return this._load({url: 'destinations'}).then(ApiService.parseResponse);
  }

  getOffers() {
    return this._load({url: 'offers'}).then(ApiService.parseResponse);
  }

  getPoints() {
    return this._load({url: 'points'}).then(ApiService.parseResponse) || [];
  }

  async updatePoint(update) {
    const response = await this._load({
      url: `points/${update.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(update)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async deletePoint(point) {
    await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });
  }

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      ['base_price']: point.basePrice,
      ['date_from']: point.dateFrom,
      ['date_to']: point.dateTo,
      ['is_favorite']: point.isFavorite,
    };

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
