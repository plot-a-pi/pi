import React, { useState, useEffect } from 'react';
import { useEmitEvent, useSocketState, useSocket } from 'react-socket-io-hooks';
import { signOut } from '../../firebase/firebase';
import { Link, useHistory } from 'react-router-dom';
import { useUser } from '../../firebase/AuthProvider';
import { CSVLink } from 'react-csv';
import styles from './TeacherSessions.css';
import getSessionData from '../../services/getSessionData';


const TeacherSessions = () => {
  const [sessionName, setSessionName] = useState('Session Name');
  const [downloadData, setDownloadData] = useState();
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
  
  const sessionElements = sessions.map(session => {
    return (
      <li key={session._id}>
        <h3>{session.name}</h3>
        <div className={styles.sessionLinks}>
          <button className={styles.sessionButton}><Link target='_blank' to={`/session/${session._id}`}>Get  Link</Link></button>
          <CSVLink
            data={downloadData}
            asyncOnClick={true}
            onClick={(event, done) => {
              getSessionData(session._id)
                .then(csvData => setDownloadData(csvData))
                .then(() => done());
            }}
          ><button>Download Data</button></CSVLink>
          <button className={styles.sessionButton}><Link target='_blank' to={`/session-graph/${session._id}`}>View Graph</Link></button>
        </div>
      </li>
    );
  });
  
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
