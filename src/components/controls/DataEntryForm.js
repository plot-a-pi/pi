import React from 'react';
import uuid from 'react-uuid';
import styles from './DataEntryForm.css';
import { useFormInput } from '../../hooks/useFormInput';
import Modal from '../common/Modal';
import { useModal } from '../../hooks/useModal';
import { useHistory } from 'react-router-dom';
import { useEmitEvent } from 'react-socket-io-hooks';
import Icon from '../../assets/192566_256x256.png';

const DataEntryForm = () => {

  const [showCircumferenceModal, toggleCircumferenceModal] = useModal();
  const [showDiameterModal, toggleDiameterModal] = useModal();

  const emitCreateDataPoint = useEmitEvent('NEW_GLOBAL_DATA');
  const pointId = uuid();
  const { value: circumference, bind: bindCircumference, reset: resetCircumference } = useFormInput('');
  const { value: circumferenceUnit, bind: bindCircumferenceUnit, reset: resetCircumferenceUnit } = useFormInput('');
  const { value: diameter, bind: bindDiameter, reset: resetDiameter } = useFormInput('');
  const { value: diameterUnit, bind: bindDiameterUnit, reset: resetDiameterUnit } = useFormInput('');
  const history = useHistory();


  const handleClick = () => {
    const circumferenceAsNumber = Number(circumference);
    const diameterAsNumber = Number(diameter);

    if(Number.isNaN(circumferenceAsNumber) || Number.isNaN(diameterAsNumber)) return alert('Please enter a number.');
    if(circumferenceAsNumber <= 0 || diameterAsNumber <= 0) return alert('Please enter a positive number.');
    if(circumferenceUnit !== diameterUnit) return alert('Are you sure your units are correct?');
    if(circumferenceAsNumber < diameterAsNumber) return alert('Are you sure your measurements are correct?');
    if(Math.abs((circumferenceAsNumber / diameterAsNumber - Math.PI) / Math.PI) > 0.15) return alert('Are you sure you measured accurately?');
    if(circumferenceAsNumber > 150 || diameterAsNumber > 50) return alert('Please measure a smaller circle');

    emitCreateDataPoint({
      payload: {
        circumference: Number(circumference),
        diameter: Number(diameter),
        circumferenceUnit,
        diameterUnit,
        pointId
      }
    });

    if(localStorage.getItem('my-point-ids')){
      const pointIds = JSON.parse(localStorage.getItem('my-point-ids'));
      const updatedPointIds = pointIds.concat([pointId]);
      localStorage.setItem('my-point-ids', JSON.stringify(updatedPointIds));
    } else {
      localStorage.setItem('my-point-ids', JSON.stringify([pointId]));
    }

    resetCircumference();
    resetCircumferenceUnit();
    resetDiameter();
    resetDiameterUnit();

    alert('Success! Your pi has been saved!');
    history.replace('/');
  };

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
export default DataEntryForm;
