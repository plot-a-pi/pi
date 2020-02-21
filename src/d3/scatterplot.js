import * as d3 from 'd3';

export const createD3Scatterplot = (ref, data, xMax, yMax, xLabel, yLabel, title, containerWidth, containerHeight) => {
  // margins may need to be responsive
  const margin = { top: 40, right: 5, bottom: 40, left: 40 };
  const width = containerWidth - margin.left - margin.right;
  const height = containerHeight - margin.top - margin.bottom;

  const svg = d3.select(ref.current)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')');

  svg.append('text')
    .attr('text-anchor', 'middle')   
    .attr('x', (width / 2))
    .attr('y', 0 - margin / 2)
    .text(title);

  const xAxis = d3.scaleLinear()
    .domain([0, xMax + xMax / 10])
    .range([0, width]);
  svg.append('g') 
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(xAxis));
  svg.append('text')
    .attr('transform', 'translate(' + (width / 2) + ' ,' + (height + margin.bottom) + ')')
    .style('text-anchor', 'middle')
    .text(xLabel);

  const yAxis = d3.scaleLinear()
    .domain([0, yMax + yMax / 10])
    .range([height, 0]);
  svg.append('g') 
    .call(d3.axisLeft(yAxis));
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text(yLabel);


  svg.append('g')
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
