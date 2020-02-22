export const generateMonteCarloData = sampleSize => {
  let dartsArray = [];
  let newPiApproximationsArray = [];
  let n = 1;
  let x;
  let y;
  let numC = 0;
  
  while(n < sampleSize + 1){
    x = Math.random();
    y = Math.random();
    if(Math.pow((x - .5), 2) + Math.pow((y - .5), 2) < .25) {
      numC++;
    }
    dartsArray.push([x, y]);
    newPiApproximationsArray.push(numC / n * 4);
    n++;
  }
  return { numC, dartsArray, newPiApproximationsArray };
};
