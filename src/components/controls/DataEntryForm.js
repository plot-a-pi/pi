import React, { useState } from 'react';
import styles from './DataEntryForm.css';
import { createDataPoint } from '../../firebase/actions'; 

const DataEntryForm = () => {
  const [circumference, setCircumference] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [circumferenceUnit, setCircumferenceUnit] = useState('');
  const [diameterUnit, setDiameterUnit] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if(circumferenceUnit !== diameterUnit) {
      alert('Are you sure your units are correct?');
    } else if(circumference < diameter) {
      alert('Are you sure your measurements are correct?');
    } else {
      createDataPoint({
        circumference: Number(circumference),
        diameter: Number(diameter),
        circumferenceUnit,
        diameterUnit
      })
        .then(() => {
          alert('Success! Your pi has been saved!');
        });
    }};

  return (
    <div className={styles.DataEntryForm}>
      <h1>Plot-a-π</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Circumference:</h3>
          <input type='number' required value={circumference} onChange={({ target }) => setCircumference(target.value)}/>
          <select id="units" required value={circumferenceUnit} onChange={({ target }) => setCircumferenceUnit(target.value)}>
            <option>-</option>
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
            <option>-</option>
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
