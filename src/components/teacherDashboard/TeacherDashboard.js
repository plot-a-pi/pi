import React, { useEffect } from 'react';
import { useUser } from '../../firebase/AuthProvider';
import { useHistory } from 'react-router-dom';
import { loginWithProvider } from '../../firebase/firebase';
import Header from '../common/Header';
import Nav from '../common/Nav';

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
      <Header />
      <Nav />
      <button onClick={handleClick}>SignUp/Login</button>
      <p>Some Intructions</p>
    </>
  );
};

export default TeacherDashboard;
