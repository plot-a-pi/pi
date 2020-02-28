import React from 'react';
import styles from './DataEntryForm.css';
import PropTypes from 'prop-types';
import { useFormInput } from '../../hooks/useFormInput';
import { useEmitEvent } from 'react-socket-io-hooks';
import { useModal } from '../../hooks/useModal';
import Modal from '../common/Modal';
 
const SessionForm = ({ match }) => {
  const emitNewSessionData = useEmitEvent('NEW_SESSION_DATA');
  const { value: circumference, bind: bindCircumference, reset: resetCircumference } = useFormInput('');
  const { value: circumferenceUnit, bind: bindCircumferenceUnit, reset: resetCircumferenceUnit } = useFormInput('');
  const { value: diameter, bind: bindDiameter, reset: resetDiameter } = useFormInput('');
  const { value: diameterUnit, bind: bindDiameterUnit, reset: resetDiameterUnit } = useFormInput('');
  const { id } = match.params;
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const circumferenceAsNumber = Number(circumference);
    const diameterAsNumber = Number(diameter);
 
    if(Number.isNaN(circumferenceAsNumber) || Number.isNaN(diameterAsNumber)) return alert('Please enter a number.');
    if(circumferenceAsNumber <= 0 || diameterAsNumber <= 0) return alert('Please enter a positive number.');
    if(circumferenceUnit !== diameterUnit) return alert('Are you sure your units are correct?');
    if(circumferenceAsNumber < diameterAsNumber) return alert('Are you sure your measurements are correct?');
   
    emitNewSessionData({
      payload: {
        circumference: Number(circumference),
        diameter: Number(diameter),
        circumferenceUnit,
        diameterUnit
      },
      sessionId: id
    });
 
    resetCircumference();
    resetCircumferenceUnit();
    resetDiameter();
    resetDiameterUnit();
    
    alert('Success! Your pi has been saved!');
  };
 
  const [showCircumferenceModal, toggleCircumferenceModal] = useModal();
  const [showDiameterModal, toggleDiameterModal] = useModal();
 
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
              <option value="in">in</option>
            </select>
            <button className={styles.modalButton} type='button' onClick={() => toggleCircumferenceModal()}> ? </button>
            <Modal showCircumferenceModal={showCircumferenceModal} modalTitle={'Circumference'} modalInstructions={'How to measure circumference'} />
          </div>
        </div>
        <div className={styles.formInputWrapper}>
          <h3>Diameter</h3>
          <div className={styles.measurementWrapper}>
            <input type='text' required value={diameter} {...bindDiameter} />
            <select id="diameterUnits" required value={diameterUnit} {...bindDiameterUnit}>
              <option value=''></option>
              <option value="in">in</option>
            </select>
            <button className={styles.modalButton} type='button' onClick={() => toggleDiameterModal()}> ? </button>
            <Modal showDiameterModal={showDiameterModal} modalTitle={'Diameter'} modalInstructions={'How to measure diameter'} />
          </div>
        </div>
        <button className={styles.plotButton}>Plot!</button>
      </form>
    </div>
  );
};

SessionForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};
 
 
export default SessionForm;
 
 
