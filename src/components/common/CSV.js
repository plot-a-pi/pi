import React from 'react';
import { PropTypes } from 'prop-types';
import { CSVDownload } from 'react-csv';

const CSV = ({ csvData, header1, header2 }) => {
  //csvData takes form array of couplets
  //header1 & header2 sit at the top of the file eg circumfrence diameter

  const csvDataPreparedForHeaders = csvData.data.map(datum => {
    return ({ 'x' : datum[0], 'y' : datum[1] });
  });

  const headers = [
    { label: header1, key: 'x' },
    { label: header2, key: 'y' }
  ];
  
  if(!csvData.ready) return null;

  return (
    <CSVDownload data={csvDataPreparedForHeaders} target="_self" headers={headers} />
  );
};

CSV.propTypes = {
  csvData : PropTypes.array.isRequired,
  header1 : PropTypes.string,
  header2 : PropTypes.string,
  children : PropTypes.node
};

export default CSV;
