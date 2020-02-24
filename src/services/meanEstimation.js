
const data = useFirestore(global-data-points)
//this returns array of objects

export const calculateGlobalApproximation = (data) => {
  const estimationArray = [];
  data.forEach(item => {
    estimationArray.push(item.circumference / item.diameter);
  });
  return estimationArray;
};


export const calculateMean = (estimationArray) => {
  let meanData = estimationArray.reduce((acc, curr) => {
    return acc = acc + curr;
  }, 0);

  return (meanData / estimationArray.length);
};


