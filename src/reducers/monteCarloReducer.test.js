  
import reducer from './monteCarloReducer';
import { add1Dart, add10Darts, add100Darts, add1000Darts } from '../actions/monteCarloActions';

describe('monteCarlo reducer', () => {
  it('handles the ADD_1_DART case', () => {
    const action = add1Dart();
    const initialState = { sampleSize: 0 };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ sampleSize: 1 });
  });
  it('handles the ADD_10_DARTS case', () => {
    const action = add10Darts();
    const initialState = { sampleSize: 0 };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ sampleSize: 10 });
  });
  it('handles the ADD_100_DARTS case', () => {
    const action = add100Darts();
    const initialState = { sampleSize: 0 };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ sampleSize: 100 });
  });
  it('handles the ADD_1000_DARTS case', () => {
    const action = add1000Darts();
    const initialState = { sampleSize: 0 };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ sampleSize: 1000 });
  });
});
