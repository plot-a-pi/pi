import React from 'react';
import { PropTypes } from 'prop-types';
import { CSVDownload } from 'react-csv';
import useCSV from '../../hooks/useCSV';

const CSV = ({ firestoreRef }) => {
  const { csvStatus, handleClick } = useCSV(firestoreRef);

  const csvDataPreparedForHeaders = csvStatus.data.map(datum => {
    return ({ 'x' : datum[0], 'y' : datum[1] });
  });

  const headers = [
    { label: 'diameter', key: 'x' },
    { label: 'circumference', key: 'y' }
  ];
  
  if(!csvStatus.ready) return <button onClick={() => handleClick()}>Download</button>;

  return (
    <>
      <CSVDownload data={csvDataPreparedForHeaders}  target="_self" headers={headers} />
      <button onClick={() => handleClick()}>Download</button>
    </>
  );
};

CSV.propTypes = {
  firestoreRef: PropTypes.func.isRequired
};

export default CSV;
