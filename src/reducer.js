export const initialState = {
  points: [],
  stats: {
    piApproximationArray: [],
    circumferenceMax: 50,
    diameterMax: 50
  },
  sessions: [],
  sessionData: [],
  sessionStats: {
    circumferenceMax: null,
    diameterMax: null
  }
};

export const UPDATE_GLOBAL = 'UPDATE_GLOBAL';
export const RETRIEVE_DATA_POINTS = 'RETRIEVE_DATA_POINTS';
export const RETRIEVE_GLOBAL_STATS = 'RETRIEVE_GLOBAL_STATS';
export const RETRIEVE_SESSION_DATA = 'RETRIEVE_SESSION_DATA';
export const RETRIEVE_SESSION_STATS = 'RETRIEVE_SESSION_STATS';
export const RETRIEVE_NEW_SESSION = 'RETRIEVE_NEW_SESSION';
export const USER_SESSIONS = 'USER_SESSIONS';
export const RETRIEVE_SESSIONS = 'RETRIEVE_SESSIONS';
export const GET_SESSION_DATA = 'GET_SESSION_DATA';
export const GET_SESSION_STATS = 'GET_SESSION_STATS';
export default function reducer(state, action) {
  switch(action.type){
    case UPDATE_GLOBAL:
      return { ...state, points: [...state.points, action.payload] };
    case RETRIEVE_DATA_POINTS:
      return { ...state, points: action.payload };
    case RETRIEVE_GLOBAL_STATS:
      return { ...state, stats: action.payload };
    case RETRIEVE_SESSION_DATA: 
      return { ...state, sessionData: [...state.sessionData, action.payload] };
    case RETRIEVE_SESSION_STATS: 
      return { ...state, sessionStats: action.payload };
    case RETRIEVE_NEW_SESSION:
      return { ...state, sessions: [...state.sessions, action.payload] };
    case RETRIEVE_SESSIONS:
      return { ...state, sessions: action.payload };
    case USER_SESSIONS:
      return { ...state, sessions: action.payload };
    case GET_SESSION_DATA:
      return { ...state, sessionData: action.payload };
    case GET_SESSION_STATS:
      return { ...state, sessionStats: action.payload };
    default: 
      return state;
  }
  
}
