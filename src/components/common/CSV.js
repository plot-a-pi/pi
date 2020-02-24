import React from 'react';
import { PropTypes } from 'prop-types';
import { CSVLink } from 'react-csv';

const CSV = ({ csvData, header1, header2, children }) => {
  //csvData takes form array of couplets
  //header1 & header2 sit at the top of the file eg circumfrence diameter

  const csvDataPreparedForHeaders = csvData.map(datum => {
    return ({ 'x' : datum[0], 'y' : datum[1] });
  });

  const headers = [
    { label: header1, key: 'x' },
    { label: header2, key: 'y' }
  ];
  return (
    <CSVLink data={csvDataPreparedForHeaders} headers={headers} target='_blank'>
      {children}
    </CSVLink>
    
  );
};

CSV.propTypes = {
  csvData : PropTypes.array.isRequired,
  header1 : PropTypes.string,
  header2 : PropTypes.string,
  children : PropTypes.nodes
};

export default CSV;
