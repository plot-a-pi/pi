import React, { useEffect } from 'react';
import { useUser } from '../../firebase/AuthProvider';
import { useHistory } from 'react-router-dom';
import { loginWithProvider } from '../../firebase/firebase';

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
      <button onClick={handleClick}>SignUp/Login</button>
      <p>Some Intructions</p>
    </>
  );
};

export default TeacherDashboard;
