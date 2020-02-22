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
      <NavLink to='/map' activeStyle={{
        fontWeight: 'bold',
        color: 'red'
      }}>
        <input id='map' type="radio" name='nav' value='map'  onChange={handleChange} />
        <label htmlFor='map'>Data Map</label>
      </NavLink>
      <NavLink to='/montecarlo' activeStyle={{
        fontWeight: 'bold',
        color: 'red'
      }}>
        <input id='montecarlo' type="radio" name='nav' value='montecarlo'  onChange={handleChange} />
        <label htmlFor='montecarlo'>Monte Carlo</label>
      </NavLink>
    </>
  );
};

export default Nav;