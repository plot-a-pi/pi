export const updateStats = (statsObj, c, d) => {
  statsObj.count = ++statsObj.count;
  const newMean = (statsObj.mean * statsObj.count + c / d) / (statsObj.count + 1);
  statsObj.piApproximationsArray.push(newMean);
  statsObj.mean = newMean;
  c > statsObj.circumferenceMax ? statsObj.circumferenceMax = c : null;
  d > statsObj.diameterMax ? statsObj.diameterMax = d : null;
  return statsObj;
};
