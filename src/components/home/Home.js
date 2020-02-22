import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styles from './Home.css';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Nav from '../common/Nav';
import ScatterGraph from '../graphs/ScatterGraph';
import ButtonNav from './ButtonNav';
import Stats from './Stats';

const Home = () => {

  return (
    <>
      <Router>
        <Header />
        <Nav />
        <ScatterGraph data={[[1, 2], [6, 10]]} xMax={6} xLabel={'I love you guys'} yMax={10} yLabel={'2nd to last friday mofos'} title={'generic title'} />
        <Stats />
        <ButtonNav />
        <Footer />
      </Router>
    </>
  );
};

export default Home;
