import React from 'react';
import styles from './Header.css';
import ButtonNav from './ButtonNav';
import Icon from '../../assets/192566_256x256.png';

const Header = () => {

  return (
    <header className={styles.wrapper}>
      <div className={styles.Header}>
        <img className={styles.logo} src={Icon} alt='Pi logo' />
        <div className={styles.title}>
          <h2>Plot a Pi</h2>
          <p>Where the World Plots Pi</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <ButtonNav />
      </div>
    </header>
  );
};

export default Header;

