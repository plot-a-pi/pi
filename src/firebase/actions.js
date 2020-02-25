import { sessionDataCollection, globalStatsCollection } from './firebase';
import { globalDataCollection } from './firebase';

//global
export const createDataPoint = dataPoint => globalDataCollection.add(dataPoint);
export const updateGlobalStats = statsObj => globalStatsCollection.doc('current-stats').update(statsObj);
//session
export const createSession = (teacherId, sessionName) => sessionDataCollection.add({ teacherId, name: sessionName });
export const deleteSession = id => sessionDataCollection.doc(id).delete();
export const updateSession = (id, name) => sessionDataCollection.doc(id).update({ name });
export const createSessionData = (sessionId, data) => {
  sessionDataCollection.doc(sessionId).collection(sessionId).add(data);
  globalDataCollection.add(data);
};
