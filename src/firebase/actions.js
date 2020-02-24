import { globalDataCollection } from './firebase';

export const createDataPoint = dataPoint => globalDataCollection.add(dataPoint);
