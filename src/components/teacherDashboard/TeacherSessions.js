import React, { useState, useEffect } from 'react';
import { signOut } from '../../firebase/firebase';
import { Link, useHistory } from 'react-router-dom';
import { useUser } from '../../firebase/AuthProvider';
import Header from '../common/Header';
import Nav from '../common/Nav';
import { useEmitEvent, useSocketState, useSocket } from 'react-socket-io-hooks';

const TeacherSessions = () => {
  const [sessionName, setSessionName] = useState('Session Name');
  const emitUserSessions = useEmitEvent('USER_LOGIN');
  const emitNewSession = useEmitEvent('CREATE_SESSION');
  const emitRetrieveSessions = useEmitEvent('RETRIEVE_SESSIONS');
  const history = useHistory();
  const socket = useSocket();
  const user = useUser();
  
  const { sessions } = useSocketState();
  
  useEffect(() => {
    if(socket.connected !== undefined) {
      emitUserSessions(user.uid);
      emitRetrieveSessions(user.uid);
    }
  }, [socket.connected]);

  const onSubmit = (event) => {
    event.preventDefault();
    emitNewSession({
      teacherId: user.uid,
      name: sessionName
    });
  };

  const handleClick = () => {
    signOut();
    history.push('/');
  };
  
  const elements = sessions.map(session => {
    return (
      <li key={session._id}>
        <h2>{session.name}</h2>
        <Link target='_blank' to={`/session/${session._id}`}>Get Submission Link</Link>
        <Link target='_blank' to={`/session/${session._id}`}>Download Session Data</Link>
        <Link target='_blank' to={`/session-graph/${session._id}`}>View Session Graph</Link>
      </li>
    );
  });
  

  return (
    <>
      <Header/>
      <Nav/>
      <button onClick={handleClick}>Sign Out</button>
      <form onSubmit={onSubmit}>
        <input type='text' value={sessionName} onChange={({ target }) => setSessionName(target.value)}></input>
        <button>Create Session</button>
      </form>
      <ul>
        {elements}
      </ul>
    </>
  );
};

export default TeacherSessions;
