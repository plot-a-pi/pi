import React, { useState } from 'react';
import { CSVDownload } from 'react-csv';
import PropTypes from 'prop-types';

const CSVButton = ({ data, header1, header2 }) => {
  const [ready, setReady] = useState(false);
  const csvDataPreparedForHeaders = data.map(datum => {
    return ({ 'x' : datum[0], 'y' : datum[1] });
  });
      
  const headers = [
    { label: header1, key: 'x' },
    { label: header2, key: 'y' }
  ];
  // const csvDownloadComponent = (data, target, headers) => (<CSVDownload data={csvDataPreparedForHeaders} target="_self" headers={headers} />
  if(!ready){
    return (
      <button onClick={() => {
        setReady(!ready);
      }}> Download Icon
      </button>);
  }
  else return (
    <>
      <button onClick={() => {
        setReady(!ready);
      }}> Download Raw Data
      </button>
      <CSVDownload data={csvDataPreparedForHeaders} target="_self" headers={headers} />
    </>);
};

CSVButton.propTypes = {
  data : PropTypes.array.isRequired,
  header1 : PropTypes.string,
  header2 : PropTypes.string
};

export default CSVButton;
