  
import reducer from './monteCarloReducer';
import { addDarts, clearDarts } from '../actions/monteCarloActions.js';

jest.mock('../data/monteCarlo.js');

describe('monteCarlo reducer', () => {

  it('handles the ADD_DARTS case with a payload of 10', () => {
    const action = addDarts(10);
    const initialState = { dartsTotal: 0, circleTotal: 1, dartsArray: [[1, 1]], piApproximation: 3.15, piApproximationsArray: [4] };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ dartsTotal: 10, circleTotal: 2, dartsArray: [[1, 1], [0, 0]], piApproximation: 3.15, piApproximationsArray: [4, 2] });
  });
  it('handles the CLEAR_DARTS case', () => {
    const action = clearDarts();
    const initialState = { dartsTotal: 100, circleTotal: 75, dartsArray: [[1, 1]], piApproximation: 3.15, piApproximationsArray: [4] };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ dartsTotal: 0, circleTotal: 0, dartsArray: [], piApproximation: null, piApproximationsArray: [] });
  });
});
