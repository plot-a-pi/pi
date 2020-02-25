import { sessionDataCollection, globalStatsCollection, globalDataCollection } from './firebase';

export const createSession = (teacherId, sessionName) => sessionDataCollection.add({ teacherId, name: sessionName });
export const createDataPoint = dataPoint => globalDataCollection.add(dataPoint);
export const updateStats = stats => updateStats(stats)
