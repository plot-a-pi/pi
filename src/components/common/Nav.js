import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNav } from '../../hooks/nav';
import styles from './Nav.css';

const Nav = () => {
  const { handleChange } = useNav();
  const [publicFacingNav, setPublicFacingNav] = useState(false);
  let jsx;
  if(!publicFacingNav){
    jsx = (
      <div className={styles.Big}>
        <span onClick={() => setPublicFacingNav(!publicFacingNav)}>|</span>
        <span onClick={() => setPublicFacingNav(!publicFacingNav)}>|</span>
        <span onClick={() => setPublicFacingNav(!publicFacingNav)}>|</span>
      </div>);
  }
  if(publicFacingNav){
    jsx = (
      <div className={styles.NavBackground}>
        <div id='jsxHorizontal' className={styles.Collumn}>
          <span style={{ color: 'white', textDecoration: 'none' }} onClick={() => setPublicFacingNav(!publicFacingNav)}>|||</span>
        </div>
        <ul className={styles.Nav}>
          <NavLink style={{ color: 'white', textDecoration: 'none' }} exact to='/' activeStyle={{
            fontWeight: 'bold',
            color: 'purple'
          }}>
            <input style={{ display: 'none' }} id='home' value='home' onChange={handleChange} />
            <label htmlFor='home'>Home</label>
          </NavLink>
          <NavLink style={{ color: 'white', textDecoration: 'none' }}  to='/teachers' activeStyle={{
            fontWeight: 'bold',
            color: 'purple'
          }}>
            <input style={{ display: 'none' }} id='teachers' value='teachers'  onChange={handleChange} />
            <label htmlFor='teachers'>For Teachers</label>
          </NavLink>
          <NavLink style={{ color: 'white', textDecoration: 'none' }}  to='/pifaqs' activeStyle={{
            fontWeight: 'bold',
            color: 'purple'
          }}>
            <input style={{ display: 'none' }} id='pifaqs' value='pifaqs'  onChange={handleChange} />
            <label htmlFor='pifaqs'>Pi FAQs</label>
          </NavLink>
          <NavLink style={{ color: 'white', textDecoration: 'none' }}  to='/map' activeStyle={{
            fontWeight: 'bold',
            color: 'purple'
          }}>
            <input style={{ display: 'none' }} id='map' value='map'  onChange={handleChange} />
            <label htmlFor='map'>Data Map</label>
          </NavLink>
          <NavLink style={{ color: 'white', textDecoration: 'none' }}  to='/montecarlo' activeStyle={{
            fontWeight: 'bold',
            color: 'purple'
          }}>
            <input style={{ display: 'none' }} id='monteCarlo' value='monteCarlo'  onChange={handleChange} />
            <label htmlFor='monteCarlo'>Monte Carlo</label>
          </NavLink>
        </ul>
      </div>);
  }
  return (jsx);
};

export default Nav;
