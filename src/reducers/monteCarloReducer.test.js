  
import reducer from './monteCarloReducer';
import { add1Dart, add10Darts, add100Darts, add1000Darts, clearDarts } from '../actions/monteCarloActions';
import { generateMonteCarloData } from '../data/monteCarlo';

jest.mock('../data/monteCarlo.js');

describe('monteCarlo reducer', () => {

  // refactor this to avoid redundancy

  it('handles the ADD_1_DART case', () => {
    const action = add1Dart();
    const initialState = { dartsTotal: 0, circleTotal: 1, dartsArray: [[1, 1]], piApproximation: 3.15, piApproximationsArray: [4] };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ dartsTotal: 1, circleTotal: 2, dartsArray: [[1, 1], [0, 0]], piApproximation: 3.15, piApproximationsArray: [4, 2] });
  });
  it('handles the ADD_10_DARTS case', () => {
    const action = add10Darts();
    const initialState = { dartsTotal: 1, circleTotal: 1, dartsArray: [[1, 1]], piApproximation: 3.15, piApproximationsArray: [4] };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ dartsTotal: 11, circleTotal: 2, dartsArray: [[1, 1], [0, 0]], piApproximation: 3.15, piApproximationsArray: [4, 2] });
  });
  it('handles the ADD_100_DARTS case', () => {
    const action = add100Darts();
    const initialState = { dartsTotal: 1, circleTotal: 1, dartsArray: [[1, 1]], piApproximation: 3.15, piApproximationsArray: [4] };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ dartsTotal: 101, circleTotal: 2, dartsArray: [[1, 1], [0, 0]], piApproximation: 3.15, piApproximationsArray: [4, 2] });
  });
  it('handles the ADD_1000_DARTS case', () => {
    const action = add1000Darts();
    const initialState = { dartsTotal: 1, circleTotal: 1, dartsArray: [[1, 1]], piApproximation: 3.15, piApproximationsArray: [4] };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ dartsTotal: 1001, circleTotal: 2, dartsArray: [[1, 1], [0, 0]], piApproximation: 3.15, piApproximationsArray: [4, 2]  });
  });
  it('handles the CLEAR_DARTS case', () => {
    const action = clearDarts();
    const initialState = { dartsTotal: 100, circleTotal: 75, dartsArray: [[1, 1]], piApproximation: 3.15, piApproximationsArray: [4] };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ dartsTotal: 0, circleTotal: 0, dartsArray: [], piApproximation: null, piApproximationsArray: [] });
  });
});
