import { getUnit } from './userSelectors';

describe('user selectors', () => {
  it('gets the unit', () => {
    expect(getUnit({ unit: 'cm' })).toEqual('cm');
  });
});
