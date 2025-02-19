import { destinations } from './destination.js';
import { options } from './offer.js';

const points = [
  {
    id: crypto.randomUUID(),
    basePrice: 1100,
    dateFrom: '2024-03-01T08:00:00.000Z',
    dateTo: '2024-03-01T10:30:00.000Z',
    destination: destinations[0],
    isFavorite: false,
    offers: [options[2].offers[0]],
    type: 'Taxi'
  },
  {
    id: crypto.randomUUID(),
    basePrice: 100,
    dateFrom: '2024-03-01T12:30:00.000Z',
    dateTo: '2024-03-01T14:50:40.000Z',
    destination: destinations[0],
    isFavorite: true,
    offers: [],
    type: 'Sightseeing'
  },
  {
    id: crypto.randomUUID(),
    basePrice: 1400,
    dateFrom: '2024-03-10T12:45:30.123Z',
    dateTo: '2024-03-10T14:30:45.456Z',
    destination: destinations[1],
    isFavorite: true,
    offers: [options[0].offers[3]],
    type: 'Flight'
  },
  {
    id: crypto.randomUUID(),
    basePrice: 800,
    dateFrom: '2024-04-01T09:00:10.789Z',
    dateTo: '2024-04-01T15:45:22.567Z',
    destination: destinations[2],
    isFavorite: false,
    offers: [],
    type: 'Train'
  },
  {
    id: crypto.randomUUID(),
    basePrice: 500,
    dateFrom: '2024-04-01T16:00:10.789Z',
    dateTo: '2024-04-01T16:45:22.567Z',
    destination: destinations[2],
    isFavorite: false,
    offers: [],
    type: 'Restaurant'
  },
  {
    id: crypto.randomUUID(),
    basePrice: 1000,
    dateFrom: '2025-02-19T18:10:45.123Z',
    dateTo: '2025-02-19T20:00:30.456Z',
    destination: destinations[3],
    isFavorite: true,
    offers: [],
    type: 'Ship'
  },
  {
    id: crypto.randomUUID(),
    basePrice: 1100,
    dateFrom: '2025-04-02T09:00:10.789Z',
    dateTo: '2025-04-02T10:00:22.567Z',
    destination: destinations[3],
    isFavorite: false,
    offers: [],
    type: 'Check-in'
  },
];

export {points};
