import { ADD_1_DART, ADD_10_DARTS, ADD_100_DARTS, ADD_1000_DARTS, CLEAR_DARTS } from '../actions/montecarloActions';
import { generateMonteCarloData } from '../data/monteCarlo';

export default function reducer(state, action) {
  switch(action.type){
    case ADD_1_DART:
    {
      const data = generateMonteCarloData(1, state.circleTotal, state.dartsTotal);
      return { ...state, dartsTotal: state.dartsTotal + 1, circleTotal: data.newCircleTotal, dartsArray: state.dartsArray.concat(data.newDartsArray), piApproximationsArray: state.piApproximationsArray.concat(data.newPiApproximationsArray) };
    }
    case ADD_10_DARTS:
    {
      const data = generateMonteCarloData(10, state.circleTotal, state.dartsTotal);
      return { ...state, dartsTotal: state.dartsTotal + 10, circleTotal: data.newCircleTotal, dartsArray: state.dartsArray.concat(data.newDartsArray), piApproximationsArray: state.piApproximationsArray.concat(data.newPiApproximationsArray) };
    }
    case ADD_100_DARTS:
    {
      const data = generateMonteCarloData(100, state.circleTotal, state.dartsTotal);
      return { ...state, dartsTotal: state.dartsTotal + 100, circleTotal: data.newCircleTotal, dartsArray: state.dartsArray.concat(data.newDartsArray), piApproximationsArray: state.piApproximationsArray.concat(data.newPiApproximationsArray) };
    }
    case ADD_1000_DARTS:
    {
      const data = generateMonteCarloData(1000, state.circleTotal, state.dartsTotal);
      return { ...state, dartsTotal: state.dartsTotal + 1000, circleTotal: data.newCircleTotal, dartsArray: state.dartsArray.concat(data.newDartsArray), piApproximationsArray: state.piApproximationsArray.concat(data.newPiApproximationsArray) };
    }
    case CLEAR_DARTS:
      return { piApproximation: null, dartsTotal: 1, circleTotal: 1, dartsArray: [], piApproximationsArray:[] };
    default:
      console.log(`unhandled name: ${name}`);
      return state;
  }
}
