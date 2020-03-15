import React, { useState, useEffect } from 'react';
import { useEmitEvent, useSocketState, useSocket } from 'react-socket-io-hooks';
import { Link } from 'react-router-dom';
import { useUser } from '../../firebase/AuthProvider';
import { signOut } from '../../firebase/firebase';
import { CSVDownload } from 'react-csv';
import styles from './TeacherSessions.css';
import getSessionData from '../../services/getSessionData';


const TeacherSessions = () => {
  const [sessionName, setSessionName] = useState('Session Name');
  const [downloadData, setDownloadData] = useState(null);
  const emitUserSessions = useEmitEvent('USER_LOGIN');
  const emitNewSession = useEmitEvent('CREATE_SESSION');
  const emitRetrieveSessions = useEmitEvent('RETRIEVE_SESSIONS');
  const socket = useSocket();
  const user = useUser();

  let userName = user.displayName.split(' ')[0];


  const { sessions } = useSocketState();
  let text;

  useEffect(() => {
    if(socket.connected !== undefined) {
      emitUserSessions(user.uid);
      emitRetrieveSessions(user.uid);
    }
    if(sessions.length > 1){
      text = 'Your Saved Sessions';
    }
  }, [socket.connected]);



  const onSubmit = (event) => {
    event.preventDefault();
    emitNewSession({
      teacherId: user.uid,
      name: sessionName
    });
  };

  const handleDownload = (id) => {
    getSessionData(id)
      .then(data => data.json())
      .then(data => setDownloadData(data));
  };

  const handleClick = () => {
    signOut();
  };

  const headers = ['diameter (in)', 'circumference (in)'];

  const sessionElements = sessions.map(session => {
    return (
      <li key={session._id}>
        <h3>{session.name}</h3>
        <div className={styles.sessionLinks}>
          <Link className={styles.sessionButton} to={`/session/${session._id}`}>Get  Link</Link>
          <Link className={styles.sessionButton} to={`/session-graph/${session._id}`}>View Graph</Link>
          <Link className={styles.sessionButton} onClick={() => handleDownload(session._id)}>Download Data</Link>
        </div>
      </li>
    );
  });

  return (
    <section className={styles.wrapper}>
      <div className={styles.TeacherSessions}>
        <form onSubmit={onSubmit} className={styles.sessionForm}>
          <input type='text' placeholder={'Enter Session Name'} onChange={({ target }) => setSessionName(target.value)}></input>
          <button>Create</button>
        </form>
        <ul className={styles.sessionListWrapper}>
          <h2>{text}</h2>
          {sessionElements}
        </ul>
      </div>
      {downloadData ? <CSVDownload data={downloadData} headers={headers} /> : null}
      <div className={styles.signout}>
        <p>Signed in as: {userName}</p>
        <Link to='/'>
          <button onClick={handleClick}>Sign Out</button>
        </Link>
      </div>
    </section>
  );
};

export default TeacherSessions;
