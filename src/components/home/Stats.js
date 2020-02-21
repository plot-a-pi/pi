import React, { useState, useEffect } from 'react';
const Stats = () => {

  const [sampleSize, setSampleSize] = useState(0);
  const [piApproximaion, setPiApproximaion] = useState(0);

  useEffect(() => {
    //getSampleSize,
    //setSampleSize
    //getPiApproximaion,
    //setPiApproximation
  }, []);

  return (
    <>
      <h2>Sample Size:</h2>
      <p>{sampleSize}</p>
      <h2>Pi Approximation:</h2>
      <p>{piApproximaion}</p>
    </>
  );
};

export default Stats;
