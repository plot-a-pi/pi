import React from 'react';
import Scatterplot from './Scatterplot';

const GlobalPiVsCountGraph = () => {
  const stats = {
    mean: 10,
    count: 4,
    circumferenceMax: 15,
    diameterMax: 5,
    piApproximationsArray: [7, 13, 10, 10]
  };

  const updateMeanAndPiApproximationsArray = (newPi) => {
    // get newPi directly from form before submitting
    const newMean = (stats.mean * stats.count + newPi) / (stats.count + 1);
    stats.piApproximationsArray.push(newMean);
    stats.mean = newMean;
  };

  const updateCount = () => stats.count = stats.count + 1;

  const updateCircumferenceMax = c => {c > stats.circumferenceMax ? stats.circumferenceMax = c : null;};

  const updateDiameterMax = d => {d > stats.diameterMax ? stats.diameterMax = d : null;};

  updateMeanAndPiApproximationsArray(20);
  updateCount();
  updateCircumferenceMax(30);
  updateDiameterMax(45);

  console.log(stats);

  return (
    <h1>GlobalPiVsCount</h1>
  );
};

export default GlobalPiVsCountGraph;
