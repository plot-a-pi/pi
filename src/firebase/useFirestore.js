import { useState, useEffect } from 'react';
import { app } from './firebase';

export const useFirestore = (ref, initalState = null) => {
  const [data, setData] = useState(initalState);

  useEffect(() => {
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
