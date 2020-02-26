import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNav } from '../../hooks/nav';

const Nav = () => {
  const { handleChange } = useNav();

  return (
    <>
      <NavLink exact to='/' activeStyle={{
        fontWeight: 'bold',
        color: 'red'
      }}>
        <input id='home' type="radio" name='nav' value='home' onChange={handleChange} />
        <label htmlFor='home'>Home</label>
      </NavLink>
      <NavLink to='/teachers' activeStyle={{
        fontWeight: 'bold',
        color: 'red'
      }}>
        <input id='teachers' type="radio" name='nav' value='teachers'  onChange={handleChange} />
        <label htmlFor='teachers'>For Teachers</label>
      </NavLink>
      <NavLink to='/pifaqs' activeStyle={{
        fontWeight: 'bold',
        color: 'red'
      }}>
        <input id='pifaqs' type="radio" name='nav' value='pifaqs'  onChange={handleChange} />
        <label htmlFor='pifaqs'>Pi FAQs</label>
      </NavLink>
      <NavLink to='/montecarlo' activeStyle={{
        fontWeight: 'bold',
        color: 'red'
      }}>
        <input id='monteCarlo' type="radio" name='nav' value='monteCarlo'  onChange={handleChange} />
        <label htmlFor='monteCarlo'>Monte Carlo</label>
      </NavLink>
    </>
  );
};

export default Nav;
