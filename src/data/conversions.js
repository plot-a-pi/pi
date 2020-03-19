// refactor to use object for conversions

export const convertData = (data, unit) => {
  // const convertPoint = {
  //   cm : () => ({ ...point, cicumference: point.circumference * 2.54, 
  //     diameter: point.diameter * 2.54 }),
  //   in : () => { 
  //     point.cicumference /= 2.54;
  //     point.diameter /= 2.54;
  //   }
  // };

  if(unit === 'cm') {
    return data.map(point => {
      if(point.circumferenceUnit === 'cm') return point;
      else return ({ ...point, circumference: point.circumference * 2.54, diameter: point.diameter * 2.54, circumferenceUnit: 'cm' });
    });
  }

  else if(unit === 'in') {
    return data.map(point => {
      if(point.circumferenceUnit === 'in') return point;
      else return ({ ...point, circumference: point.circumference / 2.54, diameter: point.diameter / 2.54, circumferenceUnit: 'in' });
    });
  }
};
