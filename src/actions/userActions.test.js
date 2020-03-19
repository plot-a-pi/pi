import { CHANGE_UNIT, changeUnit } from './userActions';

describe('userActions action creators', () => {
  it('creates a changeUnit action', () => {
    const action = changeUnit();
    expect(action).toEqual({ type: CHANGE_UNIT });
  });
});
