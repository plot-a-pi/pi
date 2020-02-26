// import Scatterplot from './Scatterplot'
import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import Styles from './Scatterplot.css';
import { scaleLinear, select, axisBottom, axisLeft} from 'd3';
import ResizeObserver from 'resize-observer-polyfill';

export const MonteCarloScatterplot = ({ data, xMax, yMax }) => {


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
      const [currentZoomState, setCurrentZoomState] = useState();

      useEffect(() => {
        const svg = select(svgRef.current);
        const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
        if(!dimensions) return;

        const xScale = scaleLinear()
          .domain([0, xMax])
          .range([0, width]);

        const yScale = scaleLinear()
          .domain([0, yMax])
          .range([width, 0]);

        svg
        .append('rect')
        .attr('width', width)
        .attr('height', width)
        .style('fill', 'green')
        .style('opacity', 0.5)
        .style('z-index', -2)

        svg
            .append('circle')
            .attr('cx', data => xScale(0.5))
            .attr('cy', data => yScale(0.5))
            .attr('r', width/2)
            .style('z-index', -1)
            .style('fill', 'red')
            .style('opacity', 0.5)

        svg
            .selectAll('.points')
            .data(data)
            .join('circle')
            .attr('cx', data => xScale(data[0]))
            .attr('cy', data => yScale(data[1]))
            .attr('r', 1.5)
            .attr('class', 'points')
            .style('fill', '#000000')
            .style('z-index', 10)

        svg
          .select('.x-axis')
          .attr('transform', `translate(0, ${width})`)
          .call(axisBottom(xScale));

        svg
          .select('.y-axis')
          .call(axisLeft(yScale));


      }, [data, dimensions]);

      return (
        <div className={Styles.container} ref={wrapperRef} style={{ marginBottom: '2em' }}>
          <svg className={Styles.svg} ref={svgRef}>
            <g className={'x-axis'}></g>
            <g className={'y-axis'}></g>
            <g className={'data'}></g>
          </svg>
        </div>
      );
    };
    // move this logic of axis labels and title to a graph container component to avoid re-render in different place

    // add title

    // // add x-axis label
    // svg.append('text')
    //   .attr('transform', 'translate(' + (width / 2) + ' ,' + (height + margin.bottom) + ')')
    //   .style('text-anchor', 'middle')
    //   .text(xLabel);

    // // add y-axis label (rotated)
    // svg.append('text')
    //   .attr('transform', 'rotate(-90)')
    //   .attr('y', 0 - margin.left)
    //   .attr('x', 0 - (height / 2))
    //   .attr('dy', '1em')
    //   .style('text-anchor', 'middle')
    //   .text(yLabel);

    MonteCarloScatterplot.propTypes = {
      data: PropTypes.array.isRequired,
      xMax: PropTypes.number.isRequired,
      yMax: PropTypes.number.isRequired
    };

