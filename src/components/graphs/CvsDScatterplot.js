import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import styles from './CvsDScatterplot.css';
import { select } from 'd3';
import ResizeObserver from 'resize-observer-polyfill';
import CSVButton from '../common/CSVButton';
import { makeCvsDScatterplot } from '../../d3/helpers';
import { useSelector } from 'react-redux';
import { getUnit } from '../../selectors/userSelectors';
import { convertData } from '../../data/conversions';

const CvsDScatterplot = ({ data, stats, title, line }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const unit = useSelector(getUnit);
  data = convertData(data, unit);
  const dataForCSV = data.map(d => ([d.diameter, d.circumference]));
  const xLabel = `Diameter ${unit === 'cm' ? '(cm)' : '(in)'}`;
  const yLabel = `Circumference ${unit === 'cm' ? '(cm)' : '(in)'}`;

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

    makeCvsDScatterplot(svg, data, stats, width, line);

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
      <div className={styles.csvButton}>
        <CSVButton header1={xLabel} header2={yLabel} data={dataForCSV} />  
      </div>
    </div>
  );
};

CvsDScatterplot.propTypes = {
  data: PropTypes.array.isRequired,
  stats: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  line: PropTypes.bool.isRequired
};

export default CvsDScatterplot;
