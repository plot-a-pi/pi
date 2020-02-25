import { sessionDataCollection } from './firebase';
import { globalDataCollection } from './firebase';

//global
export const createDataPoint = dataPoint => globalDataCollection.add(dataPoint);

//session
export const createSession = (teacherId, sessionName) => sessionDataCollection.add({ teacherId, name: sessionName });
export const deleteSession = id => sessionDataCollection.doc(id).delete();
