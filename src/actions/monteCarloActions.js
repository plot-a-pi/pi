export const ADD_DARTS = 'ADD_DARTS';
export const addDarts = number => { 
  const payload = number;
  return {
    type: 'ADD_DARTS',
    payload
  };
};
export const CLEAR_DARTS = 'CLEAR_DARTS';
export const clearDarts = () => ({ 
  type: CLEAR_DARTS
});
