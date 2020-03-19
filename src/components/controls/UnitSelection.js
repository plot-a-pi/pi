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
      <input id='cm' type='radio' name='unit' value='cm' checked={unit === 'cm'} onClick={() => dispatch(changeUnit('cm'))} />
      <label htmlFor='cm'>cm</label>
      <input type='radio' name='unit' value='in' checked={unit === 'in'} onClick={() => dispatch(changeUnit('in'))} />
      <label htmlFor='in'>in</label>
    </div>
  );
};

export default UnitSelection;
