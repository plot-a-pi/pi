import { useState, useEffect } from 'react';
import { app } from './firebase';

export const useFirestore = (ref, initialState = null) => {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    //find ref in Firebase.js
    return ref.onSnapshot(snap => {
      if(snap instanceof app.firestore.DocumentSnapshot) {
        setData({ ...snap.data(), id: snap.id });
      }
      else if(snap instanceof app.firestore.QuerySnapshot) {
        const data = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setData(data);
      }
    });
  }, []);

  return data;
};
