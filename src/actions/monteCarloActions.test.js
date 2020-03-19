import { ADD_DARTS, addDarts, CLEAR_DARTS, clearDarts } from './monteCarloActions.js';

describe('monteCarlo action creators', () => {
  it('creates an addDarts action', () => {
    const action = addDarts();
    expect(action).toEqual({ type: ADD_DARTS });
  });
  it('creates an clearDarts action', () => {
    const action = clearDarts();
    expect(action).toEqual({ type: CLEAR_DARTS });
  });
});
