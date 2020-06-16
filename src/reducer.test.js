import reducer, { UPDATE_GLOBAL, RETRIEVE_DATA_POINTS, RETRIEVE_GLOBAL_STATS, RETRIEVE_SESSION_DATA, RETRIEVE_SESSION_STATS, RETRIEVE_NEW_SESSION, USER_SESSIONS } from './reducer';

describe('socket reducer', () => {
  it('return state with an unknown action', () => {
    const state = { word: 'hi' };
    const action = UPDATE_GLOBAL;

    const newState = reducer(state, action);

    expect(newState).toEqual(state);
  });

  it('can handle a RETRIEVE_DATA_POINTS action', () => {
    const state = { word: 'hi', loading: true };
    const action = {
      type: RETRIEVE_DATA_POINTS,
      payload: 'im a payload'
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      word: 'hi',
      points: action.payload,
      loading: false
    });
  });

  it('can handle a RETRIEVE_GLOBAL_STATS action', () => {
    const state = { stats: [1, 2, 3] };
    const action = {
      type: RETRIEVE_GLOBAL_STATS,
      payload: [3, 2, 1]
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      stats: action.payload
    });
  });

  it('can handle a RETRIEVE_SESSION_DATA action', () => {
    const state = { sessionData: ['beginning data'] };
    const action = { 
      type: RETRIEVE_SESSION_DATA,
      payload: 'some'
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      sessionData: [...state.sessionData, action.payload]
    });
  });

  it('can handle a RETRIEVE_SESSION_STATS action', () => {
    const state = { sessionStats: null };
    const action = {
      type: RETRIEVE_SESSION_STATS,
      payload: ['some', 'stats']
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      sessionStats: action.payload
    });
  });

  it('can handle a RETRIEVE_NEW_SESSION action', () => {
    const state = { sessions: ['session 1'] };
    const action = { 
      type: RETRIEVE_NEW_SESSION,
      payload: 'session 2'
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      sessions: ['session 1', 'session 2']
    });
  });

  it('can handle a USER_SESSIONS action', () => {
    const state = { sessions: ['im a session'] };
    const action = { 
      type: USER_SESSIONS,
      payload: 'im a new session'
    };

    const newState = reducer(state, action);

    expect(newState).toEqual({
      sessions: action.payload
    });
  });
});
