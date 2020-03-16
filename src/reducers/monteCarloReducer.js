import { ADD_DARTS, CLEAR_DARTS } from '../actions/monteCarloActions';
import { generateMonteCarloData } from '../data/monteCarlo';

// research more efficient solution for updating piApproximationsArray

export default function reducer(state, action) {
  switch(action.type){
    case ADD_DARTS:
    {
      const data = generateMonteCarloData(action.payload, state.circleTotal, state.dartsTotal);
      return { 
        ...state, 
        dartsTotal: state.dartsTotal + action.payload, 
        circleTotal: data.newCircleTotal, 
        dartsArray: state.dartsArray.concat(data.newDartsArray), 
        piApproximationsArray: state.piApproximationsArray.concat(data.newPiApproximationsArray)
      };
    }
    case CLEAR_DARTS:
      return { piApproximation: null, dartsTotal: 0, circleTotal: 0, dartsArray: [], piApproximationsArray:[] };
    default:
      // eslint-disable-next-line no-console
      console.log(`unhandled name: ${name}`);
      return state;
  }
}
