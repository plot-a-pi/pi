import React from 'react';
import styles from './Header.css';
import ButtonNav from './ButtonNav';
import Icon from '../../assets/192566_256x256.png';

const Header = () => {

  return (
    <div className={styles.container}>
      <header className={styles.Header}>
        <div className={styles.left}>
          <img className={styles.logo} src={Icon} alt='Pi logo' />
          <div className={styles.title}>
            <h2 className={styles.plotapi}>Plot a Pi</h2>
            <p className={styles.subheading}>Where the World Plots Pi</p>
          </div>
        </div>
      </header>
      <div className={styles.navigationBar}>
        <ButtonNav />
      </div>
    </div>
  );
};

export default Header;

