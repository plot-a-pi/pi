import { sessionDataCollection, globalStatsCollection } from './firebase';
import { globalDataCollection } from './firebase';

//global
export const createDataPoint = dataPoint => globalDataCollection.add(dataPoint);
export const updateGlobalStats = statsObj => globalStatsCollection.doc('current-stats').update(statsObj);

//session
export const createSession = (teacherId, sessionName) =>{
  sessionDataCollection.add({ teacherId, name: sessionName })
    .then(ref => {
      sessionDataCollection.doc(ref.id).collection('stats').doc('current-stats').set({ 
        count: 0,
        mean: 0,
        piApproximationsArray: [0]
      });
    });
};
export const deleteSession = id => sessionDataCollection.doc(id).delete();
export const updateSession = (id, name) => sessionDataCollection.doc(id).update({ name });
export const createSessionData = (sessionId, data) => {
  sessionDataCollection.doc(sessionId).collection(sessionId).add(data);
  globalDataCollection.add(data);
};
export const updateSessionStats = (sessionId, statsObj) => sessionDataCollection.doc(sessionId).collection('stats').doc('current-stats').update(statsObj);


