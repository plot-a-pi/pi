import React, { useRef, useEffect, useState } from 'react';
import MonteCarlo from '../containers/MonteCarlo';
import SVG from '../d3/ScatterPlotPlay';

export default function App() {
  return (<MonteCarlo />);

  // const [data, setData] = useState([25, 30, 45, 60, 20, 3, 10]);
  // const svgRef = useRef();
  // useEffect(() => {
  //   const svg = select(svgRef.current);
  //   svg
  //     .selectAll('circle')
  //     .data(data)
  //     .join('circle')
  //     .attr('r', value => value)
  //     .attr('cx', value => value)
  //     .attr('cy', value => value);
  //   console.log(svgRef);
  // }, [data]);

  // return (
  //   <>
  //     <button onClick={() => setData(data.map(value => value * 5))}>Update</button>
  //     <button onClick={() => setData(data.filter(value => value < 35))}>Filter</button>
  //     <svg ref={svgRef}/>
  //   </>
  // );
}
