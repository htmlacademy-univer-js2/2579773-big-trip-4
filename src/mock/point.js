import { destinations } from '..mock/destination.js';
import { options } from '..mock/offer.js';

const getOffersByType = (type) => {
  const offersArray = options.find((offer) => offer.type === type);
  if (!offersArray) {
    return [];
  }

  const offerIds = [];
  for (let i = 0; i < offersArray.offers.length; i++) {
    offerIds.push(offersArray.offers[i].id);
  }
  return offerIds;
};

const points = [
  {
    id: crypto.randomUUID(),
    basePrice: 1100,
    dateFrom: '2024-03-01T08:00:00.000Z',
    dateTo: '2024-03-01T10:30:00.000Z',
    destination: destinations[0].id,
    isFavorite: false,
    offers: getOffersByType('Taxi'),
    type: 'Taxi'
  },
  {
    id: crypto.randomUUID(),
    basePrice: 100,
    dateFrom: '2024-03-01T12:30:00.000Z',
    dateTo: '2024-03-01T14:50:40.000Z',
    destination: destinations[0].id,
    isFavorite: true,
    offers: getOffersByType('Sightseeing'),
    type: 'Sightseeing'
  },
  {
    id: crypto.randomUUID(),
    basePrice: 1400,
    dateFrom: '2024-03-10T12:45:30.123Z',
    dateTo: '2024-03-10T14:30:45.456Z',
    destination: destinations[1].id,
    isFavorite: true,
    offers: getOffersByType('Flight'),
    type: 'Flight'
  },
  {
    id: crypto.randomUUID(),
    basePrice: 800,
    dateFrom: '2024-04-01T09:00:10.789Z',
    dateTo: '2024-04-01T15:45:22.567Z',
    destination: destinations[2].id,
    isFavorite: false,
    offers: getOffersByType('Train'),
    type: 'Train'
  },
  {
    id: crypto.randomUUID(),
    basePrice: 500,
    dateFrom: '2024-04-01T16:00:10.789Z',
    dateTo: '2024-04-01T16:45:22.567Z',
    destination: destinations[2].id,
    isFavorite: false,
    offers: getOffersByType('Restaurant'),
    type: 'Restaurant'
  },
  {
    id: crypto.randomUUID(),
    basePrice: 1000,
    dateFrom: '2024-04-15T18:10:45.123Z',
    dateTo: '2024-04-15T20:00:30.456Z',
    destination: destinations[3].id,
    isFavorite: true,
    offers: getOffersByType('Ship'),
    type: 'Ship'
  },
  {
    id: crypto.randomUUID(),
    basePrice: 1100,
    dateFrom: '2024-04-02T09:00:10.789Z',
    dateTo: '2024-04-02T10:00:22.567Z',
    destination: destinations[3].id,
    isFavorite: false,
    offers: getOffersByType('Check-in'),
    type: 'Check-in'
  },

];

export {points};
