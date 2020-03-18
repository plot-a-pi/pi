import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.css';
import Modal from './Modal';
import { useModal } from '../../hooks/useModal';

const ButtonNav = () => {
  const location = useLocation();
  const [showIntroModal, toggleIntroModal] = useModal();

  const modalInstructions = (
    <div className={styles.modal}>
      <h3>What is Plot a Pi?</h3>
      <br/>
      <p>Plot a Pi is the first database of global pi approximations.  Our database contains pi approximations people of all ages from around the world.  To contribute, measure the circumference and diamter of a circular object and click Plot Pi to submit your point.</p>
      <br/>
      <p>How does the approximation change as more data is added?</p>
    </div>);

  if(location.pathname === '/teacher-sessions')

    return (
      <div className={styles.sessionNav}>
        <NavLink exact to='/' className={styles.link} activeClassName={styles.active}>
          Home
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
      <Modal showModal={showIntroModal} toggleModal={toggleIntroModal} modalTitle={'Diameter'} modalInstructions={modalInstructions} />
    </>
  );
};

export default ButtonNav;
