import React, { useRef } from 'react';
import MonteCarloScatterplot from '../graphs/MonteCarloScatterplot';

const MonteCarloScatterplotWrapper = () => {

  
  svg
    .append('rect')
    .attr('width', width)
    .attr('height', width)
    .style('fill', 'rgb(109, 152, 160)')
    .style('opacity', 0.25);

  svg
    .append('circle')
    .attr('cx', data => xScale(0.5))
    .attr('cy', data => yScale(0.5))
    .attr('r', width / 2)
    .style('fill', 'rgb(109, 121, 160)')
    .style('opacity', 0.5);


  return (
    <>
      <MonteCarloScatterplot xLabel='xlabel' yLabel='ylabel' title='titledyamic from home' />
    </>
  );
};

export default MonteCarloScatterplotWrapper;
