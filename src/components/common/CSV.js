import React from 'react';
import { PropTypes } from 'prop-types';
import { CSVDownload } from 'react-csv';
import useCSV from '../../hooks/useCSV';

const CSV = ({ ref }) => {
  const { csvStatus, handleClick } = useCSV(ref);

  const csvDataPreparedForHeaders = csvStatus.data.map(datum => {
    return ({ 'x' : datum[0], 'y' : datum[1] });
  });

  const headers = [
    { label: 'diameter', key: 'x' },
    { label: 'circumference', key: 'y' }
  ];
  
  if(!csvStatus.ready) return null;

  return (
    <CSVDownload data={csvDataPreparedForHeaders} onClick={handleClick} target="_self" headers={headers} />
  );
};

CSV.propTypes = {
  ref: PropTypes.func.isRequired
};

export default CSV;
