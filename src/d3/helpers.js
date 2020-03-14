import { scaleLinear, select, axisBottom, axisLeft, extent } from 'd3';

export const makePivsCountScatterplot = (svg, data, width) => {

  const pxX = width;
  const pxY = 1 / 3 * pxX;
  const scale = width / 500 + 1; 
  data = data.map(d => [d[0], d[1].toFixed(4)]);
    
  svg
    .attr('viewBox', `${-pxX * 0.16} ${-pxY * 0.22} ${pxX * 1.2} ${pxY * 1.5}`);

  const xExtent = extent(data, d => d[0]);
  const xRange = xExtent[1] - xExtent[0] > 0 ? xExtent[1] - xExtent[0] : 2;
  const scX = scaleLinear()
    .domain([xExtent[0], xExtent[1] + xRange * 0.07])
    .range([0, pxX]);

  const yExtent = extent(data, d => d[1]);
  const scY = scaleLinear()
    .domain([yExtent[0], yExtent[1]])
    .range([pxY, 0]);

  svg
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', data => scX(data[0]))
    .attr('cy', data => scY(data[1]))
    .attr('r', scale)
    .style('fill', '#f5f5f5')
    .attr('opacity', 0.9)
    .on('mouseenter', function(d){
      select(this)
        .attr('r', scale * 5);
      svg
        .selectAll('.tooltip')
        .data([d])
        .join('text')
        .attr('class', 'tooltip')
        .attr('r', 10)
        .text('(' + d + ')')
        .attr('stroke', '#f5f5f5')
        .attr('stroke-width', '.5')
        .style('fill', 'white')
        .style('font-size', '3vw')
        .style('font-weight', '900')
        .transition()
        .duration(500)
        .style('font-size', '3vw')
        .attr('x', '15vw')
        .attr('y', '37vw')
        .style('text-anchor', 'middle');
    })
    .on('mouseleave', function() {
      select(this)
        .transition()
        .duration(500)
        .attr('r', scale)
        .style('font-size', '5vw');
      svg.select('.tooltip').remove();
    });

  svg
    .select('.y-axis')
    .transition()
    .duration(1000)
    .call(axisLeft(scY).tickSize(scale * 3))
    .selectAll('text')
    .attr('font-size', '2vw');

  svg
    .select('.x-axis')
    .attr('transform', `translate(0, ${pxY})`)
    .transition()
    .duration(1000)
    .call(axisBottom(scX).tickSize(scale * 3))
    .selectAll('text')
    .attr('font-size', '2vw');

  svg
    .select('.title')
    .attr('transform', `translate(${pxX / 2.25}, ${-pxY * 0.15})`)
    .attr('font-family', 'Arial')
    .attr('font-size', '3.5vw')
    .style('text-anchor', 'middle');

  svg
    .select('.x-label')
    .attr('transform', `translate(${pxX / 2}, ${pxY * 1.3})`)
    .attr('font-family', 'Arial')
    .attr('font-size', '3vw')
    .style('text-anchor', 'middle');

  svg
    .select('.y-label')
    .attr('transform', 'rotate(-90)')
    .attr('y', -pxX * 0.09)
    .attr('x', -pxY / 2)
    .attr('font-family', 'Arial')
    .attr('font-size', '3vw')
    .style('text-anchor', 'middle');

  svg
    .selectAll('.tick')
    .select('line')
    .attr('stroke-width', scale * 0.5);
};

export const makeCvsDScatterplot = (svg, data, stats, width) => {
  
  const userPointIds = JSON.parse(localStorage.getItem('my-point-ids'));
  let globalDataArray = [];
  let userDataPointsArray = [];
  
  if(!userPointIds){
    globalDataArray = data.map(point => [point.diameter, point.circumference]);
  }
  else {
    globalDataArray = data.filter(point=> (!userPointIds.includes(point.pointId))).map(point => [point.diameter.toFixed(2), point.circumference.toFixed(2)]);
    userDataPointsArray = data.filter(point => userPointIds.includes(point.pointId)).map(point => [point.diameter.toFixed(2), point.circumference.toFixed(2)]);
  }
  
  const pxX = width;
  const pxY = 0.6 * pxX;
  const scale = width / 500 + 1; 
  
  svg
    .attr('viewBox', `${-pxX * 0.06} ${-pxY * 0.23} ${pxX} ${pxY + pxY * 0.5}`);
  
  const lineEndpoint = stats.mean < stats.circumferenceMax / stats.diameterMax ? [stats.diameterMax, stats.mean * stats.diameterMax] : [stats.circumferenceMax / stats.mean, stats.circumferenceMax];
  
  const xExtent = extent(data, d => d.diameter);
  const xRange = xExtent[1] - xExtent[0];
  const scX = scaleLinear()
    .domain([xExtent[0], xExtent[1] + xRange * 0.07])
    .range([0, pxX]);
  
  const yExtent = extent(data, d => d.circumference);
  const scY = scaleLinear()
    .domain([yExtent[0], yExtent[1]])
    .range([pxY, 0]);

  svg
    .selectAll('.line')
    .style('stroke', 'blue')
    .style('stroke-width', 2)
    .attr('x1', 0)
    .attr('y1', pxY)
    .attr('x2', scX(lineEndpoint[0]))
    .attr('y2', scY(lineEndpoint[1]));

  svg
    .selectAll('.global-point')
    .data(globalDataArray)
    .join('circle')
    .attr('class', 'global-point')
    .attr('cx', globalDataArray => scX(globalDataArray[0]))
    .attr('cy', globalDataArray => scY(globalDataArray[1]))
    .attr('r', scale)
    .style('fill', '#223493')
    .attr('opacity', 0.8)
    .on('mouseenter', function(d){
      select(this)
        .attr('r', scale * 5);
      svg
        .selectAll('.tooltip')
        .data([d])
        .join('text')
        .attr('class', 'tooltip')
        .attr('r', 10)
        .text('(' + d + ')')
        .attr('stroke', '#f5f5f5')
        .attr('stroke-width', '.5')
        .style('fill', 'white')
        .style('font-size', '3vw')
        .style('font-weight', '900')
        .transition()
        .duration(500)
        .style('font-size', '3vw')
        .attr('x', '15vw')
        .attr('y', '37vw')
        .style('text-anchor', 'middle');
    })
    .on('mouseleave', function() {
      select(this)
        .transition()
        .duration(500)
        .attr('r', scale)
        .style('font-size', '5vw');
      svg.select('.tooltip').remove();
    });
    
  svg
    .selectAll('.user-point')
    .data(userDataPointsArray)
    .join('circle')
    .attr('class', 'user-point')
    .attr('r', scale * 5)
    .attr('cx', userDataPointsArray => scX(userDataPointsArray[0]))
    .attr('cy', userDataPointsArray => scY(userDataPointsArray[1]))
    .style('fill', '#99CCFF')
    .attr('opacity', 0.8)
    .on('mouseenter', function(d){
      select(this)
        .attr('r', scale * 5);
      svg
        .selectAll('.tooltip')
        .data([d])
        .join('text')
        .attr('class', 'tooltip')
        .attr('r', 10)
        .text('(' + d + ')')
        .attr('stroke', '#f5f5f5')
        .attr('stroke-width', '.5')
        .style('fill', 'white')
        .style('font-size', '3vw')
        .style('font-weight', '900')
        .transition()
        .duration(500)
        .style('font-size', '5vw')
        .attr('x', '10vw')
        .attr('y', '30vw')
        .style('text-anchor', 'middle');
    })
    .on('mouseleave', function() {
      select(this)
        .transition()
        .duration(500)
        .attr('r', scale)
        .style('font-size', '5vw');
      svg.select('.tooltip').remove();
    });

  svg
    .select('.x-axis')
    .attr('transform', `translate(0, ${pxY})`)
    .transition()
    .duration(1000)
    .call(axisBottom(scX).tickSize(scale * 3))
    .selectAll('text')
    .attr('font-size', '2vw');

  svg
    .select('.y-axis')
    .transition()
    .duration(1000)
    .call(axisLeft(scY).tickSize(scale * 3))
    .selectAll('text')
    .attr('font-size', '2vw');

  svg
    .select('.title')
    .attr('transform', `translate(${pxX / 2.25}, ${-pxY * 0.09})`)
    .attr('font-family', 'Arial')
    .attr('font-size', '3.5vw')
    .style('text-anchor', 'middle');

  svg
    .select('.x-label')
    .attr('transform', `translate(${pxX / 2}, ${pxY * 1.15})`)
    .attr('font-family', 'Arial')
    .attr('font-size', '3vw')
    .style('text-anchor', 'middle');

  svg
    .select('.y-label')
    .attr('transform', 'rotate(-90)')
    .attr('y', -pxX * 0.09)
    .attr('x', -pxY / 2)
    .attr('font-family', 'Arial')
    .attr('font-size', '3vw')
    .style('text-anchor', 'middle');

  svg
    .selectAll('.tick')
    .select('line')
    .attr('stroke-width', scale * 0.5);
};
