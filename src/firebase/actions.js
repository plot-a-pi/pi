import { sessionDataCollection } from './firebase';



export const deleteSession = id => sessionDataCollection.doc(id).delete();
