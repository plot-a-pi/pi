<<<<<<< HEAD
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
=======
import React, { useState } from 'react';
import { useFirestore } from '../../firebase/hooks';
import { sessionDataCollection } from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import { createSession } from '../../firebase/actions';
import { useUser } from '../../firebase/AuthProvider';
import styles from './TeacherSessions.css';

const TeacherSessions = () => {
  const [sessionName, setSessionName] = useState('New Session');
>>>>>>> 16e375a876970f57b9263e8e65f3eea0ae51714e
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

<<<<<<< HEAD
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
=======
  const sessionElements = data.map(session => (
    <li key={session.id}>
      <h3>{session.name}</h3>
      <div className={styles.sessionLinks}>
        <button className={styles.sessionButton}><Link target='_blank' to={`/session/${session.id}`}>Get  Link</Link></button>
        <button className={styles.sessionButton}><Link target='_blank' to={`/session/${session.id}`}>Download Data</Link></button>
        <button className={styles.sessionButton}><Link target='_blank' to={`/session-graph/${session.id}`}>View Graph</Link></button>
      </div>
    </li>
  ));
  
  return (
    <>
      <div className={styles.TeacherSessions}>
        <form onSubmit={onSubmit} className={styles.sessionForm}>
          <input type='text' value={sessionName} onChange={({ target }) => setSessionName(target.value)}></input>
          <button>Create</button>
        </form>
        <ul className={styles.sessionListWrapper}>
          <h2>Your Saved Sessions</h2>
          {sessionElements}
        </ul>
      </div>
>>>>>>> 16e375a876970f57b9263e8e65f3eea0ae51714e
    </>
  );
};

export default TeacherSessions;
