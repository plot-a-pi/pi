// refactor to use object for conversions

export const convert = (point) => {
  // const conversionObject = {
  //   cmToIn : x => x / 2.54,
  //   inToCm: x => x * 2.54 
  // };
  if(point.circumferenceUnit === 'in')
    return { ...point, circumference: point.circumference * 2.54, diameter: point.diameter * 2.54 };
  else if(point.circumferenceUnit === 'cm')
    return { ...point, circumference: point.circumference / 2.54, diameter: point.diameter / 2.54 };
  else return point;
};
