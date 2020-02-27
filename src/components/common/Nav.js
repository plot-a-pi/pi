import React, { useState } from 'react';
import { NavLink, Link, useHistory  } from 'react-router-dom';
import { useNav } from '../../hooks/nav';
import styles from './Nav.css';
import { sessionDataCollection, signOut } from '../../firebase/firebase';

const Nav = () => {
  const { handleChange } = useNav();
  const [publicFacingNav, setPublicFacingNav] = useState(false);
  const history = useHistory();
  const handleClick = () => {
    signOut();
    history.push('/');
  };
  let jsx;
  if(!publicFacingNav){
    jsx = (
      <div className={styles.Big}>
        <span style={{ color :'rgba(221, 157, 231, 1)' }} onClick={() => setPublicFacingNav(!publicFacingNav)}>|</span>
        <span style={{ color :'rgba(221, 157, 231, 1)' }} onClick={() => setPublicFacingNav(!publicFacingNav)}>|</span>
        <span style={{ color :'rgba(221, 157, 231, 1)' }} onClick={() => setPublicFacingNav(!publicFacingNav)}>|</span>
      </div>);
  }
  if(publicFacingNav){
    jsx = (
      <div className={styles.NavBackground} style={{ position: 'fixed', zIndex : 0 }}>
        <div id='jsxHorizontal' className={styles.Collumn}>
          <span style={{ color: '#570963', textDecoration: 'none', backgroundColor: 'rgba(221, 157, 231, 0.04)' }} onClick={() => setPublicFacingNav(!publicFacingNav)}>|||</span>
        </div>
        <ul className={styles.Nav}>
          <NavLink style={{ color: 'blue', textDecoration: 'none' }} exact to='/' activeStyle={{
            fontWeight: 'bold',
            color: 'purple'
          }}>
            <input style={{ display: 'none' }} id='home' value='home' onChange={handleChange} />
            <label htmlFor='home'>Home</label>
          </NavLink>
          <br/>
          <NavLink style={{ color: 'blue', textDecoration: 'none' }}  to='/teachers' activeStyle={{
            fontWeight: 'bold',
            color: 'purple'
          }}>
            <input style={{ display: 'none' }} id='teachers' value='teachers'  onChange={handleChange} />
            <label htmlFor='teachers'>For Teachers</label>
          </NavLink>
          <br/>
          <NavLink style={{ color: 'blue', textDecoration: 'none' }}  to='/pifaqs' activeStyle={{
            fontWeight: 'bold',
            color: 'purple'
          }}>
            <input style={{ display: 'none' }} id='pifaqs' value='pifaqs'  onChange={handleChange} />
            <label htmlFor='pifaqs'>Pi FAQs</label>
          </NavLink>
          <br/>
          <NavLink style={{ color: 'blue', textDecoration: 'none' }}  to='/map' activeStyle={{
            fontWeight: 'bold',
            color: 'purple'
          }}>
            <input style={{ display: 'none' }} id='map' value='map'  onChange={handleChange} />
            <label htmlFor='map'>Data Map</label>
          </NavLink>
          <br/>
          <NavLink style={{ color: 'blue', textDecoration: 'none' }}  to='/montecarlo' activeStyle={{
            fontWeight: 'bold',
            color: 'purple'
          }}>
            <input style={{ display: 'none' }} id='monteCarlo' value='monteCarlo'  onChange={handleChange} />
            <label htmlFor='monteCarlo'>Monte Carlo</label>
          </NavLink>
          <NavLink style={{ color: 'blue', textDecoration: 'none' }}  to='/submit-to-global' activeStyle={{	
            fontWeight: 'bold',	
            color: 'purple'	
          }}>	
            <input style={{ display: 'none' }} id='globalData' value='globalData'  onChange={handleChange} />	
            <label htmlFor='globalData'>Submit to Global Data</label>	
          </NavLink>
          <button onClick={handleClick}>Sign Out</button>
        </ul>
      </div>);
  }
  return (jsx);
};

export default Nav;
