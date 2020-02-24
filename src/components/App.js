import React from 'react';
import CSV from './common/CSV';

const sampleArr = [[1, 2], [1, 2], [1, 2], [1, 2], [1, 2]];
export default function App() {
  return (<CSV csvData={sampleArr} header1={'header'} header2='header2'/>);
}
