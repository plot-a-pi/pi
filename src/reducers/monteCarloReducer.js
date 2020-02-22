import { ADD_1_DART, ADD_10_DARTS, ADD_100_DARTS, ADD_1000_DARTS, CLEAR_DARTS } from '../actions/montecarloActions';
import { generateMonteCarloData } from '../data/monteCarlo';

export default function reducer(state, action) {
  switch(action.type){
    case ADD_1_DART:
    {
      const data = generateMonteCarloData(1);
      console.log(data.newPiApproximationsArray);
      console.log(state.piApproximationsArray);
      console.log(state.piApproximationsArray.concat(data.newPiApproximationsArray));
      return { ...state, dartsTotal: state.dartsTotal + 1, circleTotal: state.circleTotal + data.numC, dartsArray: state.dartsArray.concat(data.dartsArray), piApproximationsArray: state.piApproximationsArray.concat(data.newPiApproximationsArray) };
    }
    case ADD_10_DARTS:
      return { ...state, dartsTotal: state.dartsTotal + 10 };
    case ADD_100_DARTS:
      return { ...state, dartsTotal: state.dartsTotal + 100 };
    case ADD_1000_DARTS:
      return { ...state, dartsTotal: state.dartsTotal + 1000 };
    case CLEAR_DARTS:
      return { piApproximation: null, dartsTotal: null, dartsArray: [], sampleSizePiArray:[] };
    default:
      console.log(`unhandled name: ${name}`);
      return state;
  }
}
