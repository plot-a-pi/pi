import React from 'react';
import CSVDownload from 'react-csv';
import PropTypes from 'prop-types';

const CSVButton = ({ data, header1, header2 }) => {
      
  const csvDataPreparedForHeaders = data.map(datum => {
    return ({ 'x' : datum[0], 'y' : datum[1] });
  });
      
  const headers = [
    { label: header1, key: 'x' },
    { label: header2, key: 'y' }
  ];
      
  return (
    <>
      <button onClick={() => {
        <CSVDownload data={csvDataPreparedForHeaders} target="_self" headers={headers} />;
      }}> Download Data
      </button>
    </>
  );
};

CSVButton.propTypes = {
  data : PropTypes.array.isRequired,
  header1 : PropTypes.string,
  header2 : PropTypes.string
};

export default CSVButton;
