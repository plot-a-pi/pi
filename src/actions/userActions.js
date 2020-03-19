export const CHANGE_UNIT = 'CHANGE_UNIT';
export const changeUnit = unit => {
  const payload = unit;
  return {
    type: 'CHANGE_UNIT',
    payload
  };
};
