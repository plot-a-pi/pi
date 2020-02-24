import { sessionDataCollection } from './firebase';




export const updateSession = (id, name) => sessionDataCollection.doc(id).update({ name });
