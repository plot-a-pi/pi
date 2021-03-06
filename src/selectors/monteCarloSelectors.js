export const getPiApproximation = state => {
  return state.circleTotal / state.dartsTotal * 4;
};

export const getDartsTotal = state => {
  return state.dartsTotal;
};

export const getDartsArray = state => {
  return state.dartsArray;
};

export const getNumDartsVersusPiArray = state => {
  const array = state.piApproximationsArray.map((value, i) => [i + 1, value]);
  return array;
};

export const getYMax = state => {
  return state.yMax;
};

export const getYMin = state => {
  return state.yMin;
};

export const getCircleTotal = state => {
  return state.circleTotal;
};
