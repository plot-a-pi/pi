/* eslint-disable babel/no-invalid-this */
import { scaleLinear, select, axisBottom, axisLeft, extent } from 'd3';

export const makePivsCountScatterplot = (svg, data, width) => {

  const pxX = width;
  const pxY = 1 / 3 * pxX;
  const scale = width / 500 + 1; 
  data = data.map(d => [d[0], d[1].toFixed(4)]);
    
  svg
    .attr('viewBox', `${-pxX * 0.18} ${-pxY * 0.22} ${pxX * 1.25} ${pxY * 1.5}`);

  const xExtent = extent(data, d => d[0]);
  const scX = scaleLinear()
    .domain([xExtent[0], xExtent[1]])
    .range([0, pxX]);

  let yExtent = extent(data, d => d[1]);
  if(yExtent[1] - yExtent[0] === 0) yExtent = [0, 4];
  let yMin = yExtent[0] > 3.14 ? 3.0 : yExtent[0];
  const yMax = yExtent[1] < 3.14 ? 3.5 : yExtent[1];
  let scY = scaleLinear()
    .domain([yMin, yMax])
    .range([pxY, 0]);

  const y1 = scY(Math.PI) ? scY(Math.PI) : 1;
    
  svg
    .select('.line')
    .style('stroke', 'white')
    .style('stroke-width', 1)
    .attr('x1', 0)
    .attr('y1', y1)
    .attr('x2', scX(xExtent[1]))
    .attr('y2', y1)
    .transition()
    .duration(2000)
    .attr('x1', 0)
    .attr('y1', y1)
    .attr('x2', scX(xExtent[1]))
    .attr('y2', y1);

  svg
    .selectAll('circle')
    .data(data)
    .join('circle')
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
        .attr('stroke-width', '.5')
        .style('fill', 'white')
        .style('font-size', '2.7vw')
        .style('font-weight', '900')
        .transition()
        .duration(500)
        .style('font-size', '3vw')
        .attr('x', 0)
        .attr('y', pxY * 1.3);
    })
    .on('mouseleave', function() {
      select(this)
        .transition()
        .duration(500)
        .attr('r', scale)
        .style('font-size', '5vw');
      svg.select('.tooltip').remove();
    })
    .transition()
    .duration(2000)
    .attr('cx', data => scX(data[0]));

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
    globalDataArray = data.map(point => [point.diameter.toFixed(2), point.circumference.toFixed(2)]);
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
  
  const xExtent = extent(data, d => d.diameter);
  const xRange = xExtent[1] - xExtent[0];
  const scX = scaleLinear()
    .domain([xExtent[0], xExtent[1] + xRange * 0.07])
    .range([0, pxX]);
  
  const yExtent = extent(data, d => d.circumference);
  const scY = scaleLinear()
    .domain([0, yExtent[1]])
    .range([pxY, 0]);

  let lineEndpoint = [0.01, 0];
  if(stats.mean) 
  { lineEndpoint = stats.mean < yExtent[1] / xExtent[1] ? [xExtent[1], stats.mean * (xExtent[1])] : [yExtent[1] / stats.mean, yExtent[1]];}

  svg
    .selectAll('.line')
    .style('stroke', '#212E59')
    .style('stroke-width', 1.5)
    .attr('x1', 0)
    .attr('y1', pxY)
    .attr('x2', scX(pxX))
    .attr('y2', scY(0))
    .transition()
    .duration(2000)
    .attr('x2', scX(lineEndpoint[0]))
    .attr('y2', scY(lineEndpoint[1]));

  svg
    .selectAll('.global-point')
    .data(globalDataArray)
    .join('circle')
    .attr('class', 'global-point')
    .attr('cx', globalDataArray => scX(globalDataArray[0]))
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
        .attr('stroke-width', '.5')
        .style('fill', '#223493')
        .style('font-size', '2.7vw')
        .style('font-weight', '900')
        .transition()
        .duration(500)
        .style('font-size', '3vw')
        .attr('x', 0)
        .attr('y', pxY * 1.15);
    })
    .on('mouseleave', function() {
      select(this)
        .transition()
        .duration(500)
        .attr('r', scale)
        .style('font-size', '5vw');
      svg.select('.tooltip').remove();
    })
    .transition()
    .duration(2000)
    .attr('cy', globalDataArray => scY(globalDataArray[1]));
    
  svg
    .selectAll('.user-point')
    .data(userDataPointsArray)
    .join('circle')
    .attr('class', 'user-point')
    .attr('r', scale * 5)
    .attr('cx', userDataPointsArray => scX(userDataPointsArray[0]))
    .style('fill', 'rgb(197, 209, 240)')
    .attr('opacity', 0.8)
    .on('mouseenter', function(d){
      select(this)
        .attr('r', scale * 8);
      svg
        .selectAll('.tooltip')
        .data([d])
        .join('text')
        .attr('class', 'tooltip')
        .attr('r', 10)
        .text('(' + d + ')')
        .attr('stroke-width', '.5')
        .style('font-size', '2.7vw')
        .style('font-weight', '900')
        .style('fill', '#223493')
        .transition()
        .duration(500)
        .style('font-size', '3vw')
        .attr('x', 0)
        .attr('y', pxY * 1.15);
    })
    .on('mouseleave', function() {
      select(this)
        .transition()
        .duration(500)
        .attr('r', scale * 5);
      svg.select('.tooltip').remove();
    })
    .transition()
    .duration(2000)
    .attr('cy', globalDataArray => scY(globalDataArray[1]));

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

export const makeMonteCarloDartBoard = (svg, data, width) => {

  const pxX = width;
  const pxY = pxX;
  const scale = pxX / 500 + 1; 
  svg
    .attr('viewBox', `${-pxX * 0.15} ${-pxX * 0.15} ${pxX * 1.2} ${pxX * 1.3}`);

  const scX = scaleLinear()
    .domain([0, 1])
    .range([0, pxX]);

  const scY = scaleLinear()
    .domain([0, 1])
    .range([pxY, 0]);

  svg
    .selectAll('rect')
    .remove();

  svg
    .selectAll('circle')
    .remove();

  svg
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', pxX)
    .attr('height', pxY)
    .style('fill', '#7dc4b8')
    .style('opacity', 0.25)
    .attr('stroke', 'rgb(21, 27, 49)')
    .attr('stroke-width', '2');

  svg
    .append('circle')
  // eslint-disable-next-line no-unused-vars
    .attr('cx', data => scX(0.5))
  // eslint-disable-next-line no-unused-vars
    .attr('cy', data => scY(0.5))
    .attr('r', pxX / 2)
    .style('fill', '#a4a6c9')
    .style('opacity', 0.5)
    .attr('stroke', 'rgb(21, 27, 49)')
    .attr('stroke-width', '2');

  svg
    .selectAll('.points')
    .data(data)
    .join('circle')
    .attr('cx', data => scX(data[0]))
    .attr('cy', data => scY(data[1]))
    .attr('r', scale)
    .attr('class', 'points')
    .attr('stroke', '#212e59')
    .attr('stroke-width', '1')
    .style('fill', '#223493');

  svg
    .select('.x-axis')
    .attr('transform', `translate(0, ${pxX})`)
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
    .attr('transform', `translate(${pxX / 2}, ${-pxX * 0.05})`)
    .attr('font-family', 'Arial')
    .attr('font-size', '3.5vw')
    .style('text-anchor', 'middle');

  svg
    .select('.x-label')
    .attr('transform', `translate(${pxX / 2}, ${pxY * 1.09})`)
    .attr('font-family', 'Arial')
    .attr('font-size', '3vw')
    .style('text-anchor', 'middle');

  svg
    .select('.y-label')
    .attr('transform', 'rotate(-90)')
    .attr('y', -pxX * 0.11)
    .attr('x', -pxX / 2)
    .attr('font-family', 'Arial')
    .attr('font-size', '3vw')
    .style('text-anchor', 'middle');

};
