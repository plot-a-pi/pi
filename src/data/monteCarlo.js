export const generateMonteCarloData = (sampleSize, currentCircleTotal, currentDartsTotal) => {
  let dartsArray = [];
  let newPiApproximationsArray = [];
  let x;
  let y;
  let n = 0;
  
  while(n < sampleSize){
    x = Math.random();
    y = Math.random();
    if(Math.pow((x - .5), 2) + Math.pow((y - .5), 2) < .25) {
      currentCircleTotal++;
    }
    dartsArray.push([x, y]);
    currentDartsTotal !== 0 && newPiApproximationsArray.push(currentCircleTotal / (currentDartsTotal + n) * 4);
    n++;
  }
  const newCircleTotal = currentCircleTotal;
  const newDartsArray = dartsArray;
  return { newCircleTotal, newDartsArray, newPiApproximationsArray };
};
