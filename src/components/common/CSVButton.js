import React, { useState } from 'react';
import { CSVDownload } from 'react-csv';
import PropTypes from 'prop-types';
import styles from './CSVButton.css';

const CSVButton = ({ data, header1, header2 }) => {
  const [ready, setReady] = useState(false);
  const csvDataPreparedForHeaders = data.map(datum => {
    return ({ 'x' : datum[0], 'y' : datum[1] });
  });
      
  const headers = [
    { label: header1, key: 'x' },
    { label: header2, key: 'y' }
  ];

  if(!ready){
    return (
      <div className={styles.CSVButton} onClick={() => {
        setReady(!ready);
      }}>Raw Data
      </div>);
  }
  else return (
    <>
      <div className={styles.CSVButton}>
        <div onClick={() => {
          setReady(!ready);
        }}>Raw Data
        </div>
        <CSVDownload data={csvDataPreparedForHeaders} target="_self" headers={headers} />
      </div>
    </>);
};

CSVButton.propTypes = {
  data : PropTypes.array.isRequired,
  header1 : PropTypes.string,
  header2 : PropTypes.string
};

export default CSVButton;
