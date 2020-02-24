import React from 'react';
import styles from './Modal.css';
import PropTypes from 'prop-types';

const Modal = ({ title, instructions }) => {

  return (
    <div className={styles.Modal}>
      <h3>{title}</h3>
      <p>{instructions}</p>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired
};

export default Modal;


