import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Tools from './components/Tools/Tools';
import Header from './components/Header/Header';

function App() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Header/>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/tools" element={<Tools />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;