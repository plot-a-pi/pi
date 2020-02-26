export const initialState = {
  points: [],
  stats: null
};

export const UPDATE_GLOBAL = 'UPDATE_GLOBAL';
export const RETRIEVE_DATA_POINTS = 'RETRIEVE_DATA_POINTS';
export const RETRIEVE_GLOBAL_STATS = 'RETRIEVE_GLOBAL_STATS';
export default function reducer(state, action) {
  switch(action.type){
    case UPDATE_GLOBAL:
      return { ...state, points: [...state.points, action.payload] };
    case RETRIEVE_DATA_POINTS:
      return { ...state, points: action.payload };
    case RETRIEVE_GLOBAL_STATS:
      return { ...state, stats: action.payload };
    default: 
      return state;
  }
  
}
