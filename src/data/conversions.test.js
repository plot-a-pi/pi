import { convertData } from './conversions';

describe('convertData function', () => {
  it('converts data from cm to in', () => {
    const data = [{ circumference: 2.54, diameter: 2.54, circumferenceUnit: 'cm' }];

    const convertedData = convertData(data, 'in');
    expect(convertedData).toEqual([{ circumference: 1, diameter: 1, circumferenceUnit: 'in' }]);
  });

  it('converts data from in to cm', () => {
    const data = [{ circumference: 1, diameter: 1, circumferenceUnit: 'in' }];

    const convertedData = convertData(data, 'cm');
    expect(convertedData).toEqual([{ circumference: 2.54, diameter: 2.54, circumferenceUnit: 'cm' }]);
  });

  it('converts mixed data', () => {
    const data = [{ circumference: 2.54, diameter: 2.54, circumferenceUnit: 'cm' }, { circumference: 1, diameter: 1, circumferenceUnit: 'in' }];

    const convertedData = convertData(data, 'in');
    expect(convertedData).toEqual([{ circumference: 1, diameter: 1, circumferenceUnit: 'in' }, { circumference: 1, diameter: 1, circumferenceUnit: 'in' }]);
  });
});
