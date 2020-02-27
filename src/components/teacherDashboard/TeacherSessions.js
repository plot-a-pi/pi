import React, { useState } from 'react';
import { useFirestore } from '../../firebase/hooks';
import { sessionDataCollection } from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import { createSession } from '../../firebase/actions';
import { useUser } from '../../firebase/AuthProvider';
import styles from './TeacherSessions.css';

const TeacherSessions = () => {
  const [sessionName, setSessionName] = useState('New Session');
  const user = useUser();
  const data = useFirestore(sessionDataCollection.where('teacherId', '==', user.uid), []);

  const onSubmit = (event) => {
    event.preventDefault();
    createSession(user.uid, sessionName);
  };

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
    </>
  );
};

export default TeacherSessions;
