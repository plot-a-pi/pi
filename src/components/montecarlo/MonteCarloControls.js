import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../containers/MonteCarlo.css';

const MonteCarloControls = ({ actions }) => (
  <section className={styles.controls}>
    <h3>Add Darts</h3>
    {actions.map(({ name, text, actionCreator }) => (
      <button key={name} onClick={actionCreator}>
        {text || name}
      </button>
    ))}
  </section>
);

MonteCarloControls.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string
  })).isRequired
};

export default MonteCarloControls;
