import { useState } from 'react';

export const useNav = () => {
  const [navSelection, setNavSelection] = useState('home');

  const handleChange = ({ target }) => {
    setNavSelection(target.value);
  };

  return { navSelection, handleChange };
};
