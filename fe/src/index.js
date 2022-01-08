import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import Tools from './components/Tools/Tools'
import Header from './components/Header/Header'

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Header/>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tools" element={<Tools />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);


reportWebVitals();