import { getPiApproximation, getDartsTotal, getDartsArray, getNumDartsVersusPiArray } from '../selectors/monteCarloSelectors';

describe('monteCarlo selectors', () => {
  it('calculates pi approximation', () => {
    expect(getPiApproximation({ dartsTotal: 12, circleTotal: 9 })).toEqual(3);
  });
  it('gets darts total', () => {
    expect(getDartsTotal({ dartsTotal: 10 })).toEqual(10);
  });
  it('gets darts array', () => {
    expect(getDartsArray({ dartsArray: [[0.5, 0.5], [0.75, 0.25]] })).toEqual([[0.5, 0.5], [0.75, 0.25]]);
  });
  it('gets numDartsVersusPi array', () => {
    expect(getNumDartsVersusPiArray({ piApproximationsArray: [4, 4, 3, 2.5] })).toEqual([[1, 4], [2, 4], [3, 3], [4, 2.5]]);
  });
});
