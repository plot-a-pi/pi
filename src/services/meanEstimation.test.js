import { calculateGlobalApproximation, calculateMean } from './meanEstimation';


describe('pi estimation mean', () => {

  it('calculates pi approximation', () => {
    expect(calculateGlobalApproximation([{ circumference: 12, diameter: 6 }])).toEqual([2]);
  });
  it('calculates mean', () => {
    expect(calculateMean([1, 2, 3, 4, 5])).toEqual(3);
  });
});
