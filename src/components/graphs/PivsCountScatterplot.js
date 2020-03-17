/* eslint-disable babel/no-invalid-this */
import React, { useRef, useEffect, useState } from 'react';
import { select } from 'd3';
import { PropTypes } from 'prop-types';
import Styles from './PivsCountScatterplot.css';
// enables functionality in additional browsers
import ResizeObserver from 'resize-observer-polyfill';
import CSVButton from '../common/CSVButton';
import { makePivsCountScatterplot } from '../../d3/helpers';

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

const PivsCountScatterplot = ({ data, title, xLabel, yLabel }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);
  
  useEffect(() => {
    const svg = select(svgRef.current);
    const wrapper = select(wrapperRef.current);

    const { width } = dimensions || wrapperRef.current.getBoundingClientRect();
    if(!dimensions) return;
    
    wrapper.style('height', `${0.55 * width}px`);
    
    makePivsCountScatterplot(svg, data, width);

  }, [data, dimensions]);

  return (
    <div className={Styles.container} ref={wrapperRef}>
      <svg className={Styles.svg} ref={svgRef}>
        <text className={'title'} fill='whitesmoke'>{title}</text>
        <g className={'x-axis'}></g>
        <text className={'x-label'} fill='whitesmoke'>{xLabel}</text>
        <g className={'y-axis'}></g>
        <text className={'y-label'} fill='whitesmoke'>{yLabel}</text>  
        <line className={'line'}></line>
      </svg>
      <div className={'csvButton'}>
        <CSVButton header1={xLabel} header2={yLabel} data={data} />
      </div>
    </div>
  );
};

PivsCountScatterplot.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  xLabel: PropTypes.string.isRequired,
  yLabel: PropTypes.string.isRequired
};

export default PivsCountScatterplot;
