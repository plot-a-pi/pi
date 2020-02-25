import React from 'react';
import styles from './DataEntryForm.css';
import { createDataPoint } from '../../firebase/actions';
import { useFormInput } from '../../hooks/useFormInput';
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
    if(circumference < diameter) return alert('Are you sure your measurements are correct?');
   
    createDataPoint({
      circumference: Number(circumference),
      diameter: Number(diameter),
      circumferenceUnit,
      diameterUnit
    });
 
    resetCircumference();
    resetCircumferenceUnit();
    resetDiameter();
    resetDiameterUnit();
    
    alert('Success! Your pi has been saved!');
    history.replace('/');
  };
 
  const [showCircumferenceModal, toggleCircumferenceModal] = useModal();
  const [showDiameterModal, toggleDiameterModal] = useModal();


  return (
    <div className={styles.DataEntryForm}>
      <h1>Plot-a-π</h1>
      <form onSubmit={handleSubmit} >
        <div>
          <h3>Circumference:</h3>
          <Modal showModal={showCircumferenceModal} toggleModal={toggleCircumferenceModal} modalTitle={'Circumference'} modalInstructions={'This is how you do circumferency things'}/>
          <input type='text' required value={circumference} {...bindCircumference} />
          <select id="circumferenceUnits" required value={circumferenceUnit} {...bindCircumferenceUnit} >
            <option value=''></option>
            <option value="cm">cm</option>
            <option value="in">in</option>
            <option value="m">m</option>
            <option value="ft">ft</option>
          </select>
          <button className={styles.modalButton} type='button' onClick={() => toggleCircumferenceModal()}> ? </button>
        </div>
        <div>
          <h3>Diameter:</h3>
          <Modal showModal={showDiameterModal} toggleModal={toggleDiameterModal} modalTitle={'Diameter'} modalInstructions={'This is how you do diametery things'}/>
          <input type='text' required value={diameter} {...bindDiameter} />
          <select id="diameterUnits" required value={diameterUnit} {...bindDiameterUnit}>
            <option value=''></option>
            <option value="cm">cm</option>
            <option value="in">in</option>
            <option value="m">m</option>
            <option value="ft">ft</option>
          </select>
          <button className={styles.modalButton} type='button' onClick={() => toggleDiameterModal()}> ? </button>
        </div>
        <button>Plot!</button>
      </form>
    </div>
  );
};
 
 
export default DataEntryForm;
 
 
