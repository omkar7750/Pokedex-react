import React from 'react';
import './style.css';

import Pokedex from './components/Pokedex';
import PokDetails from './components/pokdetails';
import PokHome from './components/pokhome';
import AboutUs from './components/aboutus';
import Gallary from './components/gallary';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="pok-app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<PokHome />}></Route>
          <Route path="/pokdex" exact element={<Pokedex />}></Route>
          <Route path="/details/:pokId" exact element={<PokDetails />}></Route>
          <Route path="/aboutus" exact element={<AboutUs />}></Route>
          <Route path="/gallary" exact element={<Gallary />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
