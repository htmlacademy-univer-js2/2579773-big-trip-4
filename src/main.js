import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import {render, RenderPosition} from './framework/render.js';

import PointModel from './model/points-model.js';
import DestinationModel from './model/distinations-model.js';
import OfferModel from './model/offers-model.js';
import MockService from './service/mock-service.js';

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.page-header');
const tripInfoElement = headerElement.querySelector('.trip-main');
const filterElement = tripInfoElement.querySelector('.trip-controls__filters');
const mainElement = bodyElement.querySelector('.page-main');
const eventListElement = mainElement.querySelector('.trip-events');

const mockService = new MockService();
const pointModel = new PointModel(mockService);
const destinationModel = new DestinationModel(mockService);
const offerModel = new OfferModel(mockService);


const boardPresenter = new BoardPresenter ({
  container: eventListElement,
  pointModel,
  destinationModel,
  offerModel
});

render(new TripInfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterElement);

boardPresenter.init();
