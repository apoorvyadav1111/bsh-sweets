import React from 'react';
import Home from './pages/Home';
import Items from './pages/Items';

import {Routes, Route, useLocation, Link } from 'react-router-dom';
import logo from './data/logo.png';
import { AnimatePresence } from 'framer-motion';
const App = () => {
  const location = useLocation();
  return (
    <div>
      <div className='header'>
        <Link to='/'>
          <img height="250" src={logo} alt="Brijwasi Sweet House" className='logo'/>
        </Link>
      </div>
      <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/items/:category" element={<Items />} />
        <Route path="*" element={<Home />}/>
      </Routes>
      <div className='footer'>
        <p>&copy; 2024 Brijwasi Sweet House</p>
        <div className='cite'>
        Image by <a href="https://www.freepik.com/free-vector/hand-drawn-flowers-background_6600389.htm">Freepik</a>
        </div>
      </div>

      </AnimatePresence>
    </div>
  );
}

export default App;

