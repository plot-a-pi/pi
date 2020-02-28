import React from 'react';
import styles from './DataEntryForm.css';
import { useFormInput } from '../../hooks/useFormInput';
import Modal from '../common/Modal';
import { useModal } from '../../hooks/useModal';
import { useHistory } from 'react-router-dom';
import { useEmitEvent } from 'react-socket-io-hooks';

const DataEntryForm = () => {
  
  const [showCircumferenceModal, toggleCircumferenceModal] = useModal();
  const [showDiameterModal, toggleDiameterModal] = useModal();

  const emitCreateDataPoint = useEmitEvent('NEW_GLOBAL_DATA');
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
    // if(Math.abs(circumferenceAsNumber / diameterAsNumber) > 0.15) return alert('Are you sure you measured accurately?');

    emitCreateDataPoint({
      payload: {
        circumference: Number(circumference),
        diameter: Number(diameter),
        circumferenceUnit,
        diameterUnit
      }
    });

    resetCircumference();
    resetCircumferenceUnit();
    resetDiameter();
    resetDiameterUnit();

    alert('Success! Your pi has been saved!');
    history.replace('/');
  };

  return (
    <div className={styles.DataEntryForm}>
      <h2>Plot your <span className={styles.pI}>π</span></h2>
      <div >
        <img className={styles.svgContainer} src='/src/assets/192566_256x256.png' alt='Circumference vs Diameter Diagram'/>
      </div>
      <form onSubmit={handleSubmit} >
        <div className={styles.formInputWrapper}>
          <h3>Circumference</h3>
          <div className={styles.measurementWrapper}>
            <input type='text' required value={circumference} {...bindCircumference} />
            <select id="circumferenceUnits" required value={circumferenceUnit} {...bindCircumferenceUnit} >
              <option value=''></option>
              <option value="cm">cm</option>
              <option value="in">in</option>
              <option value="m">m</option>
              <option value="ft">ft</option>
            </select>
            <button className={styles.modalButton} type='button' onClick={() => toggleCircumferenceModal()}> ? </button>
            <Modal showModal={showCircumferenceModal} toggleModal={toggleCircumferenceModal} modalTitle={'Circumference'} modalInstructions={'The circumference is the distance around the circle.  Determine the length of string required to wrap around a circular object.'} />
          </div>
        </div>
        <div className={styles.formInputWrapper}>
          <h3>Diameter</h3>
          <div className={styles.measurementWrapper}>
            <input type='text' required value={diameter} {...bindDiameter} />
            <select id="diameterUnits" required value={diameterUnit} {...bindDiameterUnit}>
              <option value=''></option>
              <option value="cm">cm</option>
              <option value="in">in</option>
              <option value="m">m</option>
              <option value="ft">ft</option>
            </select>
            <button className={styles.modalButton} type='button' onClick={() => toggleDiameterModal()}> ? </button>
            <Modal showModal={showDiameterModal} toggleModal={toggleDiameterModal} modalTitle={'Diameter'} modalInstructions={'The diameter is the distance across the circle.  Use a ruler to measure the widest path across the circle. '} />
          </div>
        </div>
        <button className={styles.plotButton}>Plot!</button>
      </form>
    </div>
  );
};
export default DataEntryForm;
