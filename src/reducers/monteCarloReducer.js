import { ADD_1_DART, ADD_10_DARTS, ADD_100_DARTS, ADD_1000_DARTS, CLEAR_DARTS } from '../actions/montecarloActions';
import { generateMonteCarloData } from '../data/monteCarlo';

export default function reducer(state, action) {
  switch(action.type){
    case ADD_1_DART:
    {
      const data = generateMonteCarloData(1, state.circleTotal, state.dartsTotal);
      console.log('data returned for reducer', data.circleTotal);
      return { ...state, dartsTotal: state.dartsTotal + 1, circleTotal: data.newCircleTotal, dartsArray: state.dartsArray.concat(data.newDartsArray), piApproximationsArray: state.piApproximationsArray.concat(data.newPiApproximationsArray) };
    }
    case ADD_10_DARTS:
      return { ...state, dartsTotal: state.dartsTotal + 10 };
    case ADD_100_DARTS:
      return { ...state, dartsTotal: state.dartsTotal + 100 };
    case ADD_1000_DARTS:
      return { ...state, dartsTotal: state.dartsTotal + 1000 };
    case CLEAR_DARTS:
      return { piApproximation: null, dartsTotal: 1, circleTotal: 1, dartsArray: [], piApproximationsArray:[] };
    default:
      console.log(`unhandled name: ${name}`);
      return state;
  }
}
