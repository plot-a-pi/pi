import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.css';
import { style } from 'd3';

const ButtonNav = () => {
  const location = useLocation();
  if(location.pathname === '/teacher-sessions')

    return (
      <div className={styles.sessionNav}>
        <NavLink to='/'>
          <button>Home</button>
        </NavLink>
      </div>
    );
  return (
    <>
      <div className={styles.nav}>
        <NavLink exact to='/' className={styles.link} activeClassName={styles.active}>
          Home
        </NavLink>
        <NavLink to='/teachers' className={styles.link} activeClassName={styles.active}>
          Groups
        </NavLink>
        <NavLink to='/montecarlo' className={styles.link} activeClassName={styles.active}>
          Monte Carlo
        </NavLink>
        <NavLink to='/submit-to-global' className={styles.link} activeClassName={styles.active}>
          Plot Pi!
        </NavLink>
      </div>
    </>
  );
};

export default ButtonNav;
