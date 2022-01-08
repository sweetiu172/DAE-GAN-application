import React, { useState } from 'react';

import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Home from './components/Home/Home.jsx';
import Tools from './components/Tools/Tools';
import Header from './components/Header/Header';
import PlaceToVisit from './components/Header/PlaceToVisit';
import { CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/layered-waves-haikei.svg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

function App() {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/tools" element={<Tools />} />
        </Routes>
        <PlaceToVisit />
      </div>
    );
}

export default App;
