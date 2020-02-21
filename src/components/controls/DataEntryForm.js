import React, { useState } from 'react';
import firebase from 'firebase';
import styles from './DataEntryForm.css';

const firebaseConfig = {
  apiKey: 'AIzaSyCqogSdWZ-jW3hcCe-eljYKUL2Rsr6zVZo',
  authDomain: 'plot-a-pi.firebaseapp.com',
  databaseURL: 'https://plot-a-pi.firebaseio.com',
  projectId: 'plot-a-pi',
  storageBucket: 'plot-a-pi.appspot.com',
  messagingSenderId: '470192475850',
  appId: '1:470192475850:web:27390054dc9be10153ee33'
};

firebase.initializeApp(firebaseConfig);

const DataEntryForm = () => {
  const [circumference, setCircumference] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [circumferenceUnit, setCircumferenceUnit] = useState('');
  const [diameterUnit, setDiameterUnit] = useState('');

  const db = firebase.firestore();
  const dataPointRef = db.collection('data-points').doc();

  const handleSubmit = (event) => {
    event.preventDefault();
    dataPointRef.set({
      circumference: Number(circumference),
      diameter: Number(diameter),
      circumferenceUnit: circumferenceUnit,
      diameterUnit: diameterUnit
    });
  };

  return (
    <div className={styles.DataEntryForm}>
      <h1>Plot-a-π</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Circumference:</h3>
          <input type='number' required value={circumference} onChange={({ target }) => setCircumference(target.value)}/>
          <select id="units" required value={circumferenceUnit} onChange={({ target }) => setCircumferenceUnit(target.value)}>
            <option value="cm">cm</option>
            <option value="in">in</option>
            <option value="m">m</option>
            <option value="ft">ft</option>
          </select>
        </div>
        <div>
          <h3>Diameter:</h3>
          <input type='number' required value={diameter} onChange={({ target }) => setDiameter(target.value)}/>
          <select id="units" required value={diameterUnit} onChange={({ target }) => setDiameterUnit(target.value)}>
            <option value="cm">cm</option>
            <option value="in">in</option>
            <option value="m">m</option>
            <option value="ft">ft</option>
          </select>
        </div>
        <button>Plot!</button>
      </form>
    </div>
  );
};


export default DataEntryForm;
