import React from 'react';
import styles from './DataEntryForm.css';
import { createDataPoint, updateGlobalStats } from '../../firebase/actions';
import { useFormInput } from '../../hooks/useFormInput';
<<<<<<< HEAD
import { globalStatsCollection } from '../../firebase/firebase'
import { updateStats } from '../../services/stats'

=======
import { globalStatsCollection } from '../../firebase/firebase';
import { updateStats } from '../../services/stats';
import Modal from '../common/Modal';
import { useModal } from '../../hooks/useModal';
import { useHistory } from 'react-router-dom';
 
>>>>>>> 8ca51cc9eef52bedcefe2c044383ad551ef1fa85
const DataEntryForm = () => {
  const { value: circumference, bind: bindCircumference, reset: resetCircumference } = useFormInput('');
  const { value: circumferenceUnit, bind: bindCircumferenceUnit, reset: resetCircumferenceUnit } = useFormInput('');
  const { value: diameter, bind: bindDiameter, reset: resetDiameter } = useFormInput('');
  const { value: diameterUnit, bind: bindDiameterUnit, reset: resetDiameterUnit } = useFormInput('');
<<<<<<< HEAD


=======
  const history = useHistory();
 
>>>>>>> 8ca51cc9eef52bedcefe2c044383ad551ef1fa85
  const handleSubmit = (event) => {
    event.preventDefault();
    const circumferenceAsNumber = Number(circumference);
    const diameterAsNumber = Number(diameter);

    if(Number.isNaN(circumferenceAsNumber) || Number.isNaN(diameterAsNumber)) return alert('Please enter a number.');
    if(circumferenceAsNumber <= 0 || diameterAsNumber <= 0) return alert('Please enter a positive number.');
    if(circumferenceUnit !== diameterUnit) return alert('Are you sure your units are correct?');
    if(circumferenceAsNumber < diameterAsNumber) return alert('Are you sure your measurements are correct?');

    createDataPoint({
      circumference: Number(circumference),
      diameter: Number(diameter),
      circumferenceUnit,
      diameterUnit
    });

<<<<<<< HEAD
      globalStatsCollection.doc('current-stats').get().then((stats) => {
      console.log(stats.data(), "stats")
      updateGlobalStats(updateStats(stats.data(), circumferenceAsNumber, diameterAsNumber))})
=======
    globalStatsCollection.doc('current-stats').get().then((stats) => {
      updateGlobalStats(updateStats(stats.data(), circumferenceAsNumber, diameterAsNumber));});
>>>>>>> 8ca51cc9eef52bedcefe2c044383ad551ef1fa85


    resetCircumference();
    resetCircumferenceUnit();
    resetDiameter();
    resetDiameterUnit();

    alert('Success! Your pi has been saved!');
    history.replace('/');
  };
<<<<<<< HEAD
=======
 
  const [showCircumferenceModal, toggleCircumferenceModal] = useModal();
  const [showDiameterModal, toggleDiameterModal] = useModal();
>>>>>>> 8ca51cc9eef52bedcefe2c044383ad551ef1fa85


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


