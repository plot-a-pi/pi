import React from 'react';
import PropTypes from 'prop-types';

const MonteCarloControls = ({ actions }) => (
  <section>
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
