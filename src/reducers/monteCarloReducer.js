import { ADD_1_DART, ADD_10_DARTS, ADD_100_DARTS, ADD_1000_DARTS } from '../actions/montecarloActions';

export default function reducer(state, action) {
  switch(action.type){
    case ADD_1_DART:
      return { ...state, sampleSize: state.sampleSize + 1 };
    case ADD_10_DARTS:
      return { ...state, sampleSize: state.sampleSize + 10 };
    case ADD_100_DARTS:
      return { ...state, sampleSize: state.sampleSize + 100 };
    case ADD_1000_DARTS:
      return { ...state, sampleSize: state.sampleSize + 1000 };
    default:
      console.log(`unhandled name: ${name}`);
      return state;
  }
}
