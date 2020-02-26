import reducer, { UPDATE_GLOBAL, RETRIEVE_DATA_POINTS } from './reducer';

describe('socket reducer', () => {
  it('return state with an unknown action', () => {
    const state = { word: 'hi' };
    const action = UPDATE_GLOBAL;

    const newState = reducer(state, action);

    expect(newState).toEqual(state);
  });

  it('can handle a RETRIEVE_DATA_POINTS action', () => {
    const state = { word: 'hi' };
    const action = {
      type: RETRIEVE_DATA_POINTS,
      payload: 'im a payload'
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      word: 'hi',
      points: action.payload
    });
  });
});
