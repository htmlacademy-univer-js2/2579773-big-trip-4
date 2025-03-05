const destinations = [
  {
    id: crypto.randomUUID(),
    name: 'Amsterdam',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    pictures: [
      {
        'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        description: 'Amsterdam city view'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        description: 'Amsterdam canal'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        description: 'Amsterdam at night'
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    name: 'Chamonix',
    description: 'Cras aliquet varius magna, non porta ligula feugiat eget.',
    pictures: [
      {
        'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        description: 'Chamonix parliament building'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        description: 'Chamonix mountains'
      },
    ]
  },
  {
    id: crypto.randomUUID(),
    name: 'London',
    description: 'Fusce tristique felis at fermentum pharetra.',
    pictures: [
      {
        'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        description: 'London city view'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        description: 'Big Ben'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        description: 'London Eye'
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    name: 'Paris',
    description: 'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    pictures: [
      {
        'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        description: 'Paris city view'
      }
    ]
  },
];

export {destinations};
