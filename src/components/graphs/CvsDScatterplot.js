import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import styles from './CvsDScatterplot.css';
import { select } from 'd3';
import ResizeObserver from 'resize-observer-polyfill';
import CSVButton from '../common/CSVButton';
import { makeCvsDScatterplot } from '../../d3/helpers';

const CvsDScatterplot = ({ data, stats, title, xLabel, yLabel }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dataForCSV = data.map(d => ([d.diameter, d.circumference]));

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

  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width } = dimensions || wrapperRef.current.getBoundingClientRect();
    if(!dimensions) return;

    const wrapper = select(wrapperRef.current);
    wrapper.style('height', `${width * 0.77}px`);

    makeCvsDScatterplot(svg, data, stats, width);

  }, [dimensions, data]);

  return (
    <div className={styles.container} ref={wrapperRef}>
      <svg className={styles.svg} ref={svgRef}>
        <text className={'title'} fill='#212E59'>{title}</text>
        <g className={'x-axis'}></g>
        <text className={'x-label'} fill='#212E59'>{xLabel}</text>
        <g className={'y-axis'}></g>
        <text className={'y-label'} fill='#212E59'>{yLabel}</text>
        <line className={'line'}></line>
      </svg>
      <CSVButton header1='Diameter (in)' header2='Circumference (in)' data={dataForCSV} />  
    </div>
  );
};

CvsDScatterplot.propTypes = {
  data: PropTypes.array.isRequired,
  stats: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  xLabel: PropTypes.string.isRequired,
  yLabel: PropTypes.string.isRequired
};

export default CvsDScatterplot;
