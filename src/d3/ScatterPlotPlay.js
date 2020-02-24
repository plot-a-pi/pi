import React, { useRef, useEffect } from 'react';

const SVG = () => {
  const svgRef = useRef();
  useEffect(() => {
    console.log(svgRef);
  }, []);

  return (
    <h1>SVG Play</h1>
  );
};

export default SVG;
