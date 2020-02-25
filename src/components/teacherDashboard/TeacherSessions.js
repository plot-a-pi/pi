import React, { useState } from 'react';
import { useFirestore } from '../../firebase/hooks';
import { sessionDataCollection } from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import { createSession } from '../../firebase/actions';
import CSV from '../common/CSV';

const TeacherSessions = () => {
  const [sessionName, setSessionName] = useState('Session Name');
  const data = useFirestore(sessionDataCollection.where('teacherId', '==', null));

  const onSubmit = (event) => {
    event.preventDefault();
    createSession(null, sessionName);
  };

  const sessionElements = data.map(session => (
    <li key={session.id}>
      <h2>{session.name}</h2>
      <Link target='_blank' to={`/session/${session.id}`}>Get Submission Link</Link>
      <CSV firestoreRef={sessionDataCollection.doc(session.id).collection(session.id)} />
      <Link target='_blank' to={`/session-graph/${session.id}`}>View Session Graph</Link>
    </li>
  ));

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type='text' value={sessionName} onChange={({ target }) => setSessionName(target.value)}></input>
        <button>Create Session</button>
      </form>
      <ul>
        {sessionElements}
      </ul>
    </>
  );
};

export default TeacherSessions;
