import React from 'react';
import seedData from '../../services/seed';

const FakeSeed = () => {
  seedData();

  return (
    <p>Seeding</p>
  );
};

export default FakeSeed;
