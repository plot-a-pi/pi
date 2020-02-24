import { sessionDataCollection } from './firebase';
import { globalDataCollection } from './firebase';

export const createSession = (teacherId, sessionName) => sessionDataCollection.add({ teacherId, name: sessionName });
export const createDataPoint = dataPoint => globalDataCollection.add(dataPoint);
