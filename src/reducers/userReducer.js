import { CHANGE_UNIT } from '../actions/userActions';

export default function reducer(state = { unit: 'cm' }, action) {
  switch(action.type) {
    case CHANGE_UNIT:
      return { ...state, unit: action.payload };
    default: 
      return state;
  }
}
