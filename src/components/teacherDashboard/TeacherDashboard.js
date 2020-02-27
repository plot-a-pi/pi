import React, { useEffect } from 'react';
import { useUser } from '../../firebase/AuthProvider';
import { useHistory } from 'react-router-dom';
import { loginWithProvider } from '../../firebase/firebase';
import styles from './TeacherDashboard.css';

const TeacherDashboard = () => {
  const user = useUser();
  const history = useHistory();

  useEffect(() => {
    if(user) history.replace('/teacher-sessions');
  }, [user]);

  const handleClick = () => {
    loginWithProvider();
  };

  return (
    <>
      <div className={styles.TeacherDashboard}>
        <div className={styles.instructions}>
          <h2>Instructions</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div className={styles.loginButton}>
          <button onClick={handleClick}>SignUp/Login</button>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
