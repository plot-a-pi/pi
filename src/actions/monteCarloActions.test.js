import { ADD_DARTS, addDarts } from './monteCarloActions.js';

describe('monteCarlo action creators', () => {
  it('creates an addDarts action', () => {
    const action = addDarts();
    expect(action).toEqual({ type: ADD_DARTS });
  });
});
