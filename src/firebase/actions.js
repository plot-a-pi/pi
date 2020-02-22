import { dataPointsCollection, piDataCollection } from './firebase';

export const createDataPoint = dataPoint => dataPointsCollection.add(dataPoint);
export const createPiData = piData => piDataCollection.add(piData);
export const updatePiData = (id, piData) => piDataCollection.doc(id).update(piData);
