import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {

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
    </>
  );
};

export default Nav;
