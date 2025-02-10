import { destinations } from '..mock/destination.js';
import { offers } from '..mock/offer.js';

const points = [
  {
    id: crypto.randomUUID(),
    basePrice: 1100,
    dateFrom: '2024-03-01T08:00:00.000Z',
    dateTo: '2024-03-01T10:30:00.000Z',
    destination: destinations[0].id,
    isFavorite: false,
    offers: [offers[0].id, offers[2].id],
    type: 'taxi'
  },
  {
    id: crypto.randomUUID(),
    basePrice: 100,
    dateFrom: '2024-03-01T12:30:00.000Z',
    dateTo: '2024-03-01T14:50:40.000Z',
    destination: destinations[0].id,
    isFavorite: true,
    offers: [],
    type: 'sightseeing'
  },
  {
    id: crypto.randomUUID(),
    basePrice: 1400,
    dateFrom: '2024-03-10T12:45:30.123Z',
    dateTo: '2024-03-10T14:30:45.456Z',
    destination: destinations[1].id,
    isFavorite: true,
    offers: [offers[3].id],
    type: 'flight'
  },
  {
    id: crypto.randomUUID(),
    basePrice: 800,
    dateFrom: '2024-04-01T09:00:10.789Z',
    dateTo: '2024-04-01T15:45:22.567Z',
    destination: destinations[2].id,
    isFavorite: false,
    offers: [offers[4].id],
    type: 'train'
  },
  {
    id: crypto.randomUUID(),
    basePrice: 500,
    dateFrom: '2024-04-01T16:00:10.789Z',
    dateTo: '2024-04-01T16:45:22.567Z',
    destination: destinations[2].id,
    isFavorite: false,
    offers: [],
    type: 'restaurant'
  },
  {
    id: crypto.randomUUID(),
    basePrice: 1000,
    dateFrom: '2024-04-15T18:10:45.123Z',
    dateTo: '2024-04-15T20:00:30.456Z',
    destination: destinations[3].id,
    isFavorite: true,
    offers: [offers[0].id],
    type: 'ship'
  },
  {
    id: crypto.randomUUID(),
    basePrice: 1100,
    dateFrom: '2024-04-02T09:00:10.789Z',
    dateTo: '2024-04-02T10:00:22.567Z',
    destination: destinations[3].id,
    isFavorite: false,
    offers: [],
    type: 'check-in'
  },

];

export {points};
