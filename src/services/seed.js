import pi from '../../MOCK_DATA.json';
import { createDataPoint } from '../firebase/actions.js';

const seedData = () => {
  pi.forEach(({ pi }, i) => {
    const randomNumber = Math.ceil(Math.random() * 100);

    createDataPoint({
      pointId: i + 1,
      diameter: randomNumber,
      circumference: randomNumber * pi
    });

    if(i === pi.length - 1) console.log('done');
  });
};

export default seedData;
