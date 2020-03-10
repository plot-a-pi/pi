import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNav } from '../../hooks/nav';
import { signOut } from '../../firebase/firebase';
import styles from './Nav.css';

const Nav = () => {
  const { handleChange } = useNav();
  const [publicFacingNav, setPublicFacingNav] = useState(false);

  const handleClick = () => {
    signOut();
  };

  let jsx;
  if(!publicFacingNav){
    jsx = (
      <div className={styles.Big}>
        <span style={{ color :'rgba(221, 157, 231, 1)' }} onClick={() => setPublicFacingNav(!publicFacingNav)}>|||</span>
      </div>);
  }
  if(publicFacingNav){
    jsx = (
      <div className={styles.NavBackground}>
        <div id='jsxHorizontal' className={styles.Column}>
          <span style={{ color: '#570963', textDecoration: 'none' }} onClick={() => setPublicFacingNav(!publicFacingNav)}>|||</span>
        </div>
        <button onClick={handleClick}>Sign Out</button>
        <ul className={styles.Nav}>
          <NavLink style={{ color: 'blue', textDecoration: 'none' }} exact to='/' activeStyle={{
            fontWeight: 'bold',
            backgroundColor: 'purple'
          }}>
            <input style={{ display: 'none' }} id='home' value='home' onChange={handleChange} />
            <label htmlFor='home'>Home</label>
          </NavLink>
          <br/>
          <NavLink style={{ color: 'blue', textDecoration: 'none' }}  to='/teachers' activeStyle={{
            fontWeight: 'bold',
            backgroundColor: 'purple'
          }}>
            <input style={{ display: 'none' }} id='teachers' value='teachers'  onChange={handleChange} />
            <label htmlFor='teachers'>For Groups</label>
          </NavLink>
          <br/>
          <NavLink style={{ color: 'blue', textDecoration: 'none' }}  to='/pifaqs' activeStyle={{
            fontWeight: 'bold',
            backgroundColor: 'purple'
          }}>
            <input style={{ display: 'none' }} id='pifaqs' value='pifaqs'  onChange={handleChange} />
            <label htmlFor='pifaqs'>Pi FAQs</label>
          </NavLink>
          <br/>
          <NavLink style={{ color: 'blue', textDecoration: 'none' }}  to='/map' activeStyle={{
            fontWeight: 'bold',
            backgroundColor: 'purple'
          }}>
            <input style={{ display: 'none' }} id='map' value='map'  onChange={handleChange} />
            <label htmlFor='map'>Data Map</label>
          </NavLink>
          <br/>
          <NavLink style={{ color: 'blue', textDecoration: 'none' }}  to='/montecarlo' activeStyle={{
            fontWeight: 'bold',
            backgroundColor: 'purple'
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

