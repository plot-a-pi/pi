import { sessionDataCollection } from './firebase';

export const createSession = (teacherId, sessionName) => sessionDataCollection.add({ teacherId, name: sessionName });
