import React from 'react';
import { Link } from 'react-router-dom';

const ButtonNav = () => (
  <>
    <Link to='/teachers'>
      <button>For Teachers</button>
    </Link>
    <Link to='/pifaqs'>
      <button>Pi FAQS</button>
    </Link>
    <Link to='/montecarlo'>
      <button>Monte Carlo</button>
    </Link>
    <Link to='/map'>
      <button>Map</button>
    </Link>
    <Link to='/submit'>
      <button>Submit to Global Data</button>
    </Link>
  </>
);

export default ButtonNav;
