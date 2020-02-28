import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.css';

const ButtonNav = () => {
  if(/teacher-sessions/.test(window.location.href))
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
          <button>Home Page</button>
        </Link>
        <Link to='/teachers'>
          <button>For Groups</button>
        </Link>
        <Link to='/montecarlo'>
          <button>Monte Carlo</button>
        </Link>
        <Link to='/submit-to-global'>
          <button>Plot A Pi</button>
        </Link>
      </div>
    </>
  );
};

export default ButtonNav;
