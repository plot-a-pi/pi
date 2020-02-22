export const generateMonteCarloData = sampleSize => {
  let dartsArray = [];
  let sampleSizeVersusPiArray = [];
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
    sampleSizeVersusPiArray.push([n, numC / n * 4]);
    n++;
  }
  return { dartsArray, sampleSizeVersusPiArray };
};
// graph pi versus n & y versus x

