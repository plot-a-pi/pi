import React, { useState } from 'react';
import styles from './DataEntryForm.css';
import { dataPointsCollection } from '../../firebase/firebase'; 

const DataEntryForm = () => {
  const [circumference, setCircumference] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [circumferenceUnit, setCircumferenceUnit] = useState('');
  const [diameterUnit, setDiameterUnit] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dataPointsCollection.add({
      circumference: Number(circumference),
      diameter: Number(diameter),
      circumferenceUnit: circumferenceUnit,
      diameterUnit: diameterUnit
    })
      .then(() => {
        console.log('created data point in firestore');
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
            <option>--</option>
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
            <option>--</option>
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
