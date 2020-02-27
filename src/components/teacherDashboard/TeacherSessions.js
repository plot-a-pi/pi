import React, { useState } from 'react';
import { useFirestore } from '../../firebase/hooks';
import { sessionDataCollection } from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import { createSession } from '../../firebase/actions';
import { CSVLink } from 'react-csv';
import getSessionData from '../../services/getSessionData';

const TeacherSessions = () => {
  const [sessionName, setSessionName] = useState('Session Name');
  const [downloadData, setDownloadData] = useState();
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
      <CSVLink
        data={downloadData}
        asyncOnClick={true}
        onClick={(event, done) => {
          getSessionData(session._id)
            .then(csvData => setDownloadData(csvData))
            .then(() => done());
        }}
      >
      Download Session Data
      </CSVLink>
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
