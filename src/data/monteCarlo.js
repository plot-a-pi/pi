export const generateMonteCarloData = (sampleSize, currentCircleTotal, currentDartsTotal) => {
  let dartsArray = [];
  let newPiApproximationsArray = [];
  let x;
  let y;
  let piMax = -1;
  let n = 1;
  
  while(n < sampleSize + 1){
    x = Math.random();
    y = Math.random();
    if(Math.pow((x - .5), 2) + Math.pow((y - .5), 2) < .25) {
      currentCircleTotal++;
    }
    dartsArray.push([x, y]);
    const newPiApproximation = currentCircleTotal / (currentDartsTotal + n) * 4;
    piMax = currentDartsTotal !== 0 && newPiApproximation > piMax ? newPiApproximation : piMax;
    currentDartsTotal + n !== 0 && newPiApproximationsArray.push(newPiApproximation);
    n++;
  }
  const newCircleTotal = currentCircleTotal;
  const newDartsArray = dartsArray;
  return { newCircleTotal, newDartsArray, newPiApproximationsArray, piMax };
};
