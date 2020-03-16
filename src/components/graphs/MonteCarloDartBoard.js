import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { select } from 'd3';
import ResizeObserver from 'resize-observer-polyfill';
import styles from './MonteCarloDartBoard.css';
import { makeMonteCarloDartBoard } from '../../d3/helpers';

export const MonteCarloDartBoard = ({ data }) => {

  const useResizeObserver = ref => {
    const [dimensions, setDimensions] = useState(null);

    useEffect(() => {
      const observeTarget = ref.current;
      const resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => setDimensions(entry.contentRect));
      });
      resizeObserver.observe(observeTarget);
      return () => {
        resizeObserver.unobserve(observeTarget);
      };
    }, [ref]);
    return dimensions;
  };

  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width } = dimensions || wrapperRef.current.getBoundingClientRect();
    if(!dimensions) return;

    const wrapper = select(wrapperRef.current);
    wrapper.style('height', `${width}px`);

    makeMonteCarloDartBoard(svg, data, width);

  }, [data, dimensions]);


  return (
    <>
      <div className={styles.container} ref={wrapperRef}>
        <svg className={styles.svg} ref={svgRef}>
          <text className={'title'} fill='#212E59'>Randomly Generated Darts</text>
          <g className={'x-axis'}></g>
          <text className={'x-label'} fill='#212E59'>x</text>
          <g className={'y-axis'}></g>
          <text className={'y-label'} fill='#212E59'>y</text>
        </svg>
      </div>
    </>
  );
};

MonteCarloDartBoard.propTypes = {
  data: PropTypes.array.isRequired
};

