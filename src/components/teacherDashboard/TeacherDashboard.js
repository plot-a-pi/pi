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
        <div className={styles.loginButton}>
          <button onClick={handleClick}>SignUp/Login</button>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
