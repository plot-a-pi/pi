import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.css';

const ButtonNav = () => {
  const location = useLocation();
  if(location.pathname === '/teacher-sessions')

    return (
      <div className={styles.sessionNav}>
        <Link to='/'>
          <button>Back to Home</button>
        </Link>
      </div>
    );
  return (
    <>
      <div className={styles.nav}>
        <Link to='/'>
          <button>Home</button>
        </Link>
        <Link to='/teachers'>
          <button>Groups</button>
        </Link>
        <Link to='/montecarlo'>
          <button>Monte Carlo</button>
        </Link>
        <Link to='/submit-to-global'>
          <button>Plot Pi!</button>
        </Link>
      </div>
    </>
  );
};

export default ButtonNav;
