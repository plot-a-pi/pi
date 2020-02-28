import React from 'react';
import styles from './Header.css';
import ButtonNav from './ButtonNav';

const Header = () => {

  return (
    <header className={styles.wrapper}>
      <div className={styles.Header}>
        <div className={styles.logo}>
          <img width='70px' src='/src/assets/192566_256x256.png' alt='Pi logo' />
        </div>
        <div className={styles.title}>
          <h2>Plot a Pi</h2>
          <p>It&apos;s easy as Pi!</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <ButtonNav />
      </div>
    </header>
  );
};

export default Header;

