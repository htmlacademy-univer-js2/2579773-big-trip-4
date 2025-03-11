import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import PointModel from './model/points-model.js';
import DestinationModel from './model/destinations-model.js';
import OfferModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import PointApiService from './service/point-api-service.js';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';

const AUTHORIZATION = 'Basic x7pl3g5zq10234b';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.page-header');
const tripInfoElement = headerElement.querySelector('.trip-main');
const filterElement = tripInfoElement.querySelector('.trip-controls__filters');
const mainElement = bodyElement.querySelector('.page-main');
const eventListElement = mainElement.querySelector('.trip-events');

const pointApiService = new PointApiService(END_POINT, AUTHORIZATION);
const pointModel = new PointModel(pointApiService);
const destinationModel = new DestinationModel(pointApiService);
const offerModel = new OfferModel(pointApiService);
const filterModel = new FilterModel();

const newPointButtonPresenter = new NewPointButtonPresenter ({
  container: tripInfoElement,
});

const boardPresenter = new BoardPresenter ({
  container: eventListElement,
  tripInfoContainer: tripInfoElement,
  pointModel,
  destinationModel,
  offerModel,
  filterModel,
  newPointButtonPresenter: newPointButtonPresenter
});

const filterPresenter = new FilterPresenter({
  filterContainer: filterElement,
  filterModel,
  pointModel
});

newPointButtonPresenter.init({
  onButtonClick: boardPresenter.newPointButtonClickHandler
});

filterPresenter.init();

async function initApp() {
  await destinationModel.init();
  await offerModel.init();
  await pointModel.init();
  boardPresenter.init();
}

initApp();
