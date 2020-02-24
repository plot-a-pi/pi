import { useState } from 'react';
import { useFirestore } from '../firebase/hooks';

const useCSV = (ref) => {
  const [csvStatus, setCsvStatus] = useState({ 
    ready: false,
    data: [] 
  });
  const fireStoreData = useFirestore(ref, []);

  const handleClick = () => {
    return setCsvStatus({
      ready: true,
      data: fireStoreData.map(entry => (
        [entry.diameter, entry.circumference]
      ))
    });
  };

  return { csvStatus, handleClick }; 
};

export default useCSV;
