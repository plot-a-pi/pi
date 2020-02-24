import * as d3 from 'd3';

export const updateD3Scatterplot = (ref, data, xMax, yMax, containerWidth, containerHeight) => {
  // margins may need to be responsive
  const margin = { top: 40, right: 5, bottom: 40, left: 40 };
  const width = containerWidth - margin.left - margin.right;
  const height = containerHeight - margin.top - margin.bottom;

  const svg = d3.select(ref.current);

  const xAxis = d3.scaleLinear()
    .domain([0, xMax + xMax / 20])
    .range([0, width]);

  const yAxis = d3.scaleLinear()
    .domain([0, yMax + yMax / 20])
    .range([height, 0]);

  svg.select('.xaxis')
    .call(d3.axisBottom(xAxis));
  
  svg
    .append('g')
    .selectAll('dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function(d) { return xAxis(d[0]); })
    .attr('cy', function(d) { return yAxis(d[1]); })
    .attr('r', 1.5)
    .style('fill', '#000000');

  svg.exit()
    .remove();
};
