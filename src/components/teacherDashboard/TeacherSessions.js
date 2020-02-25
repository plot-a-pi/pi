import React, { useState } from 'react';
import { useFirestore } from '../../firebase/hooks';
import { sessionDataCollection } from '../../firebase/firebase';
import Link from 'react-csv/components/Link';
import { createSession } from '../../firebase/actions';

const TeacherSessions = () => {
  const [sessionName, setSessionName] = useState('Session Name');
  //replace null with userId once merge squashed
  const data = useFirestore(sessionDataCollection.where('teacherId', '==', null));

  const onSubmit = (event) => {
    event.preventDefault();
    createSession(null, sessionName);
  };

  const sessionElements = data.map(session => (
    <li key={session.id}>
      <h2>{session.name}</h2>
      <Link target='_blank' to={`/session/${session.id}`}>Get Submission Link</Link>
      {/* <Link target='_blank' to={`/session/${session.id}`}>Download Session Data</Link> */}
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
