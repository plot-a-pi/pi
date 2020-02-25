import React from 'react';
import styles from './DataEntryForm.css';
import { createDataPoint, updateGlobalStats } from '../../firebase/actions';
import { useFormInput } from '../../hooks/useFormInput';
import { globalStatsCollection } from '../../firebase/firebase';
import { updateStats } from '../../services/stats';
import Modal from '../common/Modal';
import { useModal } from '../../hooks/useModal';
import { useHistory } from 'react-router-dom';
 
const DataEntryForm = () => {
  const { value: circumference, bind: bindCircumference, reset: resetCircumference } = useFormInput('');
  const { value: circumferenceUnit, bind: bindCircumferenceUnit, reset: resetCircumferenceUnit } = useFormInput('');
  const { value: diameter, bind: bindDiameter, reset: resetDiameter } = useFormInput('');
  const { value: diameterUnit, bind: bindDiameterUnit, reset: resetDiameterUnit } = useFormInput('');
  const history = useHistory();

 
  const handleSubmit = (event) => {
    event.preventDefault();
    const circumferenceAsNumber = Number(circumference);
    const diameterAsNumber = Number(diameter);

    if(Number.isNaN(circumferenceAsNumber) || Number.isNaN(diameterAsNumber)) return alert('Please enter a number.');
    if(circumferenceAsNumber <= 0 || diameterAsNumber <= 0) return alert('Please enter a positive number.');
    if(circumferenceUnit !== diameterUnit) return alert('Are you sure your units are correct?');
    if(circumferenceAsNumber < diameterAsNumber) return alert('Are you sure your measurements are correct?');


    globalStatsCollection.doc('current-stats').get().then((stats) => {
      if(localStorage.getItem('my-point-ids')){
        const pointIds = JSON.parse(localStorage.getItem('my-point-ids'));
        const updatedPointIds = pointIds.concat([stats.data().count + 1]);
        localStorage.setItem('my-point-ids', JSON.stringify(updatedPointIds));
      } else {
        localStorage.setItem('my-point-ids', JSON.stringify([stats.data().count + 1]));
      }
  
      createDataPoint({
        pointId: stats.data().count + 1,
        circumference: Number(circumference),
        diameter: Number(diameter),
        circumferenceUnit,
        diameterUnit
      });
      updateGlobalStats(updateStats(stats.data(), circumferenceAsNumber, diameterAsNumber));});


    resetCircumference();
    resetCircumferenceUnit();
    resetDiameter();
    resetDiameterUnit();

    alert('Success! Your pi has been saved!');
    // history.replace('/');
  };
 
  const [showCircumferenceModal, toggleCircumferenceModal] = useModal();
  const [showDiameterModal, toggleDiameterModal] = useModal();


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
          <button className={styles.modalButton} type='button' onClick={() => toggleCircumferenceModal()}> ? </button>
          <Modal showCircumferenceModal={showCircumferenceModal} modalTitle={'Circumference'} modalInstructions={'How to measure circumference'} />
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
          <button className={styles.modalButton} type='button' onClick={() => toggleDiameterModal()}> ? </button>
          <Modal showDiameterModal={showDiameterModal} modalTitle={'Diameter'} modalInstructions={'How to measure diameter'} />

        </div>
        <button>Plot!</button>
      </form>
    </div>
  );
};
 
 
export default DataEntryForm;


