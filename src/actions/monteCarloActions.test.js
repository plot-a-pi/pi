import { ADD_1_DART, add1Dart, ADD_10_DARTS, add10Darts, ADD_100_DARTS, add100Darts, ADD_1000_DARTS, add1000Darts } from './monteCarloActions';

describe('monteCarlo action creators', () => {
  it('creates an add1Dart action', () => {
    const action = add1Dart();
    expect(action).toEqual({ type: ADD_1_DART });
  });
  it('creates an add10Darts action', () => {
    const action = add10Darts();
    expect(action).toEqual({ type: ADD_10_DARTS });
  });
  it('creates an add10Darts action', () => {
    const action = add100Darts();
    expect(action).toEqual({ type: ADD_100_DARTS });
  });
  it('creates an add1000Darts action', () => {
    const action = add1000Darts();
    expect(action).toEqual({ type: ADD_1000_DARTS });
  });
});
