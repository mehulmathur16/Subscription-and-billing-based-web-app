import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Login from './components/Login';
import Register from './components/Register';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login buttonName="Login" footer="New to MyApp?" />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);