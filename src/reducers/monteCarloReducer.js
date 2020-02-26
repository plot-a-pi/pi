import { ADD_1_DART, ADD_10_DARTS, ADD_100_DARTS, ADD_1000_DARTS, CLEAR_DARTS } from '../actions/monteCarloActions';
import { generateMonteCarloData } from '../data/monteCarlo';

// refactor to avoid redundancy

export default function reducer(state, action) {
  switch(action.type){
    case ADD_1_DART:
    {
      const data = generateMonteCarloData(1, state.circleTotal, state.dartsTotal);
      return { ...state, dartsTotal: state.dartsTotal + 1, circleTotal: data.newCircleTotal, dartsArray: state.dartsArray.concat(data.newDartsArray), piApproximationsArray: state.piApproximationsArray.concat(data.newPiApproximationsArray), yMax: data.piMax > state.yMax ? data.piMax : state.yMax };
    }
    case ADD_10_DARTS:
    {
      const data = generateMonteCarloData(10, state.circleTotal, state.dartsTotal);
      return { ...state, dartsTotal: state.dartsTotal + 10, circleTotal: data.newCircleTotal, dartsArray: state.dartsArray.concat(data.newDartsArray), piApproximationsArray: state.piApproximationsArray.concat(data.newPiApproximationsArray), yMax: data.piMax > state.yMax ? data.piMax : state.yMax  };
    }
    case ADD_100_DARTS:
    {
      const data = generateMonteCarloData(100, state.circleTotal, state.dartsTotal);
      return { ...state, dartsTotal: state.dartsTotal + 100, circleTotal: data.newCircleTotal, dartsArray: state.dartsArray.concat(data.newDartsArray), piApproximationsArray: state.piApproximationsArray.concat(data.newPiApproximationsArray), yMax: data.piMax > state.yMax ? data.piMax : state.yMax  };
    }
    case ADD_1000_DARTS:
    {
      const data = generateMonteCarloData(1000, state.circleTotal, state.dartsTotal);
      return { ...state, dartsTotal: state.dartsTotal + 1000, circleTotal: data.newCircleTotal, dartsArray: state.dartsArray.concat(data.newDartsArray), piApproximationsArray: state.piApproximationsArray.concat(data.newPiApproximationsArray), yMax: data.piMax > state.yMax ? data.piMax : state.yMax  };
    }
    case CLEAR_DARTS:
      return { piApproximation: null, dartsTotal: 0, circleTotal: 0, dartsArray: [], piApproximationsArray:[], yMax: 4 };
    default:
      // eslint-disable-next-line no-console
      console.log(`unhandled name: ${name}`);
      return state;
  }
}
