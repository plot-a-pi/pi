

const getEstimation = () => {
//need to wait for jacob's hook (Monday)


};

const getMean = (data, length) => {
  const meanData = data.reduce((acc, curr) => {
    return acc = acc + curr;
  }, 0);

  return (meanData / length);
};

export default getMean;
