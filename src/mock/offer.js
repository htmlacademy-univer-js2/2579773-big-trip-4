const options = [
  {
    type: 'Flight',
    offers: [
      {
        id: crypto.randomUUID(),
        title: 'Add luggage',
        price: 30
      },
      {
        id: crypto.randomUUID(),
        title: 'Switch to comfort class',
        price: 100
      },
      {
        id: crypto.randomUUID(),
        title: 'Add meal',
        price: 15
      },
      {
        id: crypto.randomUUID(),
        title: 'Choose seats',
        price: 5
      },
    ]
  },
  {
    type: 'Drive',
    offers: [
      {
        id: crypto.randomUUID(),
        title: 'Rent a car',
        price: 200
      }
    ]
  },
  {
    type: 'Taxi',
    offers: [
      {
        id: crypto.randomUUID(),
        title: 'Order Uber',
        price: 20
      }
    ]
  }
];

export {options};
