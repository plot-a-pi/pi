import React from 'react';
import { useDispatch } from 'react-redux';
import { changeUnit } from '../../actions/userActions';
import styles from './UnitSelection.css';
import { useSelector } from 'react-redux';
import { getUnit } from '../../selectors/userSelectors';

const UnitSelection = () => {

  const unit = useSelector(getUnit);
  const dispatch = useDispatch();

  return (
    <div className={styles.UnitSelection}>
      <label htmlFor='cm'><input id='cm' type='radio' name='unit' value='cm' checked={unit === 'cm'} onClick={() => dispatch(changeUnit('cm'))} />cm 
      </label>
      <label htmlFor='in'><input type='radio' name='unit' value='in' checked={unit === 'in'} onClick={() => dispatch(changeUnit('in'))} />in
      </label>
    </div>
  );
};

export default UnitSelection;
