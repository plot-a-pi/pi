import React from 'react';
import styles from './DataEntryForm.css';
import PropTypes from 'prop-types';
import { useFormInput } from '../../hooks/useFormInput';
import { useEmitEvent } from 'react-socket-io-hooks';
import { useModal } from '../../hooks/useModal';
import Modal from '../common/Modal';
import Icon from '../../assets/192566_256x256.png';


const SessionForm = ({ match }) => {
  const emitNewSessionData = useEmitEvent('NEW_SESSION_DATA');
  const { value: circumference, bind: bindCircumference, reset: resetCircumference } = useFormInput('');
  const { value: circumferenceUnit, bind: bindCircumferenceUnit, reset: resetCircumferenceUnit } = useFormInput('');
  const { value: diameter, bind: bindDiameter, reset: resetDiameter } = useFormInput('');
  const { value: diameterUnit, bind: bindDiameterUnit, reset: resetDiameterUnit } = useFormInput('');
  const { id } = match.params;

  const handleClick = (event) => {
    event.preventDefault();
    const circumferenceAsNumber = Number(circumference);
    const diameterAsNumber = Number(diameter);

    if(Number.isNaN(circumferenceAsNumber) || Number.isNaN(diameterAsNumber)) return alert('Please enter a number.');
    if(circumferenceAsNumber <= 0 || diameterAsNumber <= 0) return alert('Please enter a positive number.');
    if(circumferenceUnit !== diameterUnit) return alert('Are you sure your units are correct?');
    if(circumferenceAsNumber < diameterAsNumber) return alert('Are you sure your measurements are correct?');
    if(Math.abs((circumferenceAsNumber / diameterAsNumber - Math.PI) / Math.PI) > 0.15) return alert('Are you sure you measured accurately?');
    if(circumferenceAsNumber > 150 || diameterAsNumber > 50) return alert('Please measure a smaller circle');

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

  const circumferenceModalText = (
    <div className={styles.modal}>
      <p>The circumference is the distance around the circle.</p>
      <br/>
      <p>Measure the distance around a circular object and record it here.</p>
    </div>);
  const diameterModalText = (
    <div className={styles.modal}>
      <p>The diameter is the distance across the circle.</p>
      <br/>
      <p>Measure the widest path across the same circular object and record it here.</p>
    </div>);

  return (
    <div className={styles.DataEntryForm}>
      <h2 className={styles.title}>Plot your &pi;</h2>
      <div >
        <img className={styles.svgContainer} src={Icon} alt='Circumference vs Diameter Diagram'/>
      </div>
      <form className={styles.formWrapper}>
        <div className={styles.measurementWrapper}>
          <div className={styles.formItem}>
            <h3>Circumference</h3>
            <input type='text' required value={circumference} {...bindCircumference} />
          </div>
          <div className={styles.formItem}>
            <h3>Units</h3>
            <select id="circumferenceUnits" required value={circumferenceUnit} {...bindCircumferenceUnit} >
              <option value=''></option>
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
          </div>
          <div className={styles.formItem}>
            <button className={styles.modalButton} type='button' onClick={() => toggleCircumferenceModal()}> ? </button>
          </div>
        </div>
        <div className={styles.measurementWrapper}>
          <div className={styles.formItem}>
            <h3>Diameter</h3>
            <input type='text' required value={diameter} {...bindDiameter} />
          </div>
          <div className={styles.formItem}>
            <h3>Units</h3>
            <select id="diameterUnits" required value={diameterUnit} {...bindDiameterUnit} >
              <option value=''></option>
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
          </div>
          <div className={styles.formItem}>
            <button className={styles.modalButton} type='button' onClick={() => toggleDiameterModal()}> ? </button>
          </div>
        </div>
        <button className={styles.plotButton} onClick={handleClick}>Plot!</button>  
        <Modal showModal={showCircumferenceModal} toggleModal={toggleCircumferenceModal} modalTitle={'Circumference'} modalInstructions={circumferenceModalText} />
        <Modal showModal={showDiameterModal} toggleModal={toggleDiameterModal} modalTitle={'Diameter'} modalInstructions={diameterModalText} />
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


