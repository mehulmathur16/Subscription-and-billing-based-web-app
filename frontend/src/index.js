import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Login from './components/Login';
import Register from './components/Register';
import MonthlyPlans from './components/MonthlyPlans';
import YearlyPlans from './components/YearlyPlans';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/monthly-plans" element={<MonthlyPlans />} />
        <Route path="/yearly-plans" element={<YearlyPlans />} />
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