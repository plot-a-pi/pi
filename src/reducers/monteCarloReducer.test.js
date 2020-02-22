  
import reducer from './monteCarloReducer';
import { add1Dart, add10Darts, add100Darts, add1000Darts, clearDarts } from '../actions/monteCarloActions';

describe('monteCarlo reducer', () => {
  it('handles the ADD_1_DART case', () => {
    const action = add1Dart();
    const initialState = { dartsTotal: 0 };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ dartsTotal: 1 });
  });
  it('handles the ADD_10_DARTS case', () => {
    const action = add10Darts();
    const initialState = { dartsTotal: 0 };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ dartsTotal: 10 });
  });
  it('handles the ADD_100_DARTS case', () => {
    const action = add100Darts();
    const initialState = { dartsTotal: 0 };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ dartsTotal: 100 });
  });
  it('handles the ADD_1000_DARTS case', () => {
    const action = add1000Darts();
    const initialState = { dartsTotal: 0 };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ dartsTotal: 1000 });
  });
  it('handles the CLEAR_DARTS case', () => {
    const action = clearDarts();
    const initialState = { dartsTotal: 100 };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ dartsTotal: 0 });
  });
});
