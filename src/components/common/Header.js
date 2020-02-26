import React from 'react';
import styles from './Header.css';

const Header = () => {

  return (
    <header className={styles.Header}>
      <div className={styles.logo}>
        <img width='70px' src='/src/assets/192566_256x256.png' alt='Pi logo' />
      </div>
      <div className={styles.title}>
        <h1>Plot-A-Pi</h1>
        <h2>It&apos;s easy as Pi!</h2>
      </div>
    </header>
  );
};

export default Header;
