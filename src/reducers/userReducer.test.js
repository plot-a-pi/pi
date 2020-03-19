import reducer from './userReducer';
import { changeUnit } from '../actions/userActions.js';

describe('user reducer', () => {

  it('handles the changeUnit case with a payload of cm when the current unit is cm', () => {
    const action = changeUnit('cm');
    const initialState = { unit: 'cm' };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ unit: 'cm' });
  });

  it('handles the changeUnit case with a payload of in when the current unit is cm', () => {
    const action = changeUnit('in');
    const initialState = { unit: 'cm' };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ unit: 'in' });
  });

  it('handles the changeUnit case with a payload of in when the current unit is in', () => {
    const action = changeUnit('in');
    const initialState = { unit: 'in' };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ unit: 'in' });
  });

  it('handles the changeUnit case with a payload of cm when the curent unit is in', () => {
    const action = changeUnit('cm');
    const initialState = { unit: 'in' };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({ unit: 'cm' });
  });
});
