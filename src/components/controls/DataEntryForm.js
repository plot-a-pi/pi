import React from 'react';
import styles from './DataEntryForm.css';
import { createDataPoint, updateGlobalStats } from '../../firebase/actions';
import { useFormInput } from '../../hooks/useFormInput';
import { useFirestore } from '../../firebase/hooks'
import { globalStatsCollection } from '../../firebase/firebase'
import { updateStats } from '../../services/stats'

const DataEntryForm = () => {
  const { value: circumference, bind: bindCircumference, reset: resetCircumference } = useFormInput('');
  const { value: circumferenceUnit, bind: bindCircumferenceUnit, reset: resetCircumferenceUnit } = useFormInput('');
  const { value: diameter, bind: bindDiameter, reset: resetDiameter } = useFormInput('');
  const { value: diameterUnit, bind: bindDiameterUnit, reset: resetDiameterUnit } = useFormInput('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const circumferenceAsNumber = Number(circumference);
    const diameterAsNumber = Number(diameter);

    if(Number.isNaN(circumferenceAsNumber) || Number.isNaN(diameterAsNumber)) return alert('Please enter a number.');
    if(circumferenceAsNumber <= 0 || diameterAsNumber <= 0) return alert('Please enter a positive number.');
    if(circumferenceUnit !== diameterUnit) return alert('Are you sure your units are correct?');
    if(circumference < diameter) return alert('Are you sure your measurements are correct?');

    createDataPoint({
      circumference: Number(circumference),
      diameter: Number(diameter),
      circumferenceUnit,
      diameterUnit
    });

    const stats = useFirestore(globalStatsCollection);
    const updatedStats = updateStats(stats, circumferenceAsNumber, diameterAsNumber)

    updateGlobalStats(updatedStats)

    resetCircumference();
    resetCircumferenceUnit();
    resetDiameter();
    resetDiameterUnit();

    alert('Success! Your pi has been saved!');
  };


  return (
    <div className={styles.DataEntryForm}>
      <h1>Plot-a-π</h1>
      <form onSubmit={handleSubmit} >
        <div>
          <h3>Circumference:</h3>
          <input type='text' required value={circumference} {...bindCircumference} />
          <select id="circumferenceUnits" required value={circumferenceUnit} {...bindCircumferenceUnit} >
            <option value=''></option>
            <option value="cm">cm</option>
            <option value="in">in</option>
            <option value="m">m</option>
            <option value="ft">ft</option>
          </select>
        </div>
        <div>
          <h3>Diameter:</h3>
          <input type='text' required value={diameter} {...bindDiameter} />
          <select id="diameterUnits" required value={diameterUnit} {...bindDiameterUnit}>
            <option value=''></option>
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


