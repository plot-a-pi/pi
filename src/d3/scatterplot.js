import * as d3 from 'd3';



export const createD3Scatterplot = (ref, data, xMax, yMax, xLabel, yLabel, title, containerWidth, containerHeight) => {
  // margins may need to be responsive
  const margin = { top: 40, right: 5, bottom: 40, left: 40 };
  const width = containerWidth - margin.left - margin.right;
  const height = containerHeight - margin.top - margin.bottom;
  
  // define x-axis scale
  const xAxis = d3.scaleLinear()
    .domain([0, xMax + xMax / 20])
    .range([0, width]);
    
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

  // add x-axis and translate down
  svg
    .append('g')
    .attr('className', 'x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(xAxis));

  // add x-axis label
  svg.append('text')
    .attr('transform', 'translate(' + (width / 2) + ' ,' + (height + margin.bottom) + ')')
    .style('text-anchor', 'middle')
    .text(xLabel);

  // define y-axis scale
  const yAxis = d3.scaleLinear()
    .domain([0, yMax + yMax / 20])
    .range([height, 0]);

  // add y-axis
  svg.append('g') 
    .call(d3.axisLeft(yAxis));

  // add y-axis label (rotated)
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text(yLabel);

  // add data points to scatterplot
  // svg
  //   .append('g')
  //   .selectAll('dot')
  //   .data(data)
  //   .enter()
  //   .append('circle')
  //   .attr('cx', function(d) { return xAxis(d[0]); })
  //   .attr('cy', function(d) { return yAxis(d[1]); })
  //   .attr('r', 1.5)
  //   .style('fill', '#000000');

  // play
  svg
    .append('g')
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', function(d) { return xAxis(d[0]); })
    .attr('cy', function(d) { return yAxis(d[1]); })
    .attr('r', 1.5)
    .style('fill', '#000000');

  svg.exit()
    .remove();
};
