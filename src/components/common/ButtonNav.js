import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../firebase/firebase';
import { useUser } from '../../firebase/AuthProvider';
import styles from './Header.css';

const ButtonNav = () => {
  const handleClick = () => {
    signOut();
  };

  let buttonClass;
  let userName;

  const findUser = () => {
    let user = useUser();
    if(user){
      userName = user.displayName.split(' ')[0];
      buttonClass = styles.visible;
    } else {
      buttonClass = styles.hidden;
    }

    console.log(userName);
  };

  findUser();

  return (
    <>
      <div className={styles.signout}>
        <p className={buttonClass}>Signed in as: {userName}</p>
        <Link className={buttonClass} to='/'>
          <button onClick={handleClick}>Sign Out</button>
        </Link>
      </div>
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
