import React, { useEffect } from 'react';
import pi from '../../../MOCK_DATA.json';
import { useEmitEvent, useSocket } from 'react-socket-io-hooks';

const Seed = () => {
  const emitCreateDataPoint = useEmitEvent('NEW_GLOBAL_DATA');
  const socket = useSocket();
  const seedData = () => {
    pi.forEach(({ pi }, i) => {
      
      const randomNumber = Math.ceil(Math.random() * 100);
      setTimeout(() => {
        emitCreateDataPoint({
          payload: {
            diameter: randomNumber,
            diameterUnit: 'in',
            circumference: randomNumber * pi,
            circumferenceUnit: 'in'
          }
        });
      }, i * 100);
      
    });
  };

  useEffect(() => {
    if(socket.connected !== undefined && !socket.connected){
      setTimeout(() => {
        seedData();
      }, 2000);
    }
    
  }, [socket.connected]);
  
  return (
    <p>seeding..</p>
  );

};

export default Seed;
