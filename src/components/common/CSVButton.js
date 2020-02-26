import React from 'react';
import CSV from './CSV';
import { globalDataCollection } from '../../firebase/firebase';

const CSVButton = () => {

  return (
    <>
      <button> Download Data
        <CSV ref={globalDataCollection } />
      </button>

    </>
  );
};

export default CSVButton;
