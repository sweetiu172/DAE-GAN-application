import React, { useState } from 'react';
import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Tools from './components/Tools/Tools';
import Header from './components/Header/Header';

function App() {
    return (
      <div className='App'>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/tools" element={<Tools />} />
        </Routes>
      </div>
    );
}

export default App;