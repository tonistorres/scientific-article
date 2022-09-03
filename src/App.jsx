
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Favorite from './pages/Favorite/Favorite';

function App() {
  return (
    <div className='ct-main-home'>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path='/favorite' element={<Favorite/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;