import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Login from './components/Login';
import Register from './components/Register';
import MonthlyPlans from './components/MonthlyPlans';
import YearlyPlans from './components/YearlyPlans';
import PaymentScreen from './components/PaymentScreen';
import CurrentPlan from './components/CurrentPlan';
import CancelPlan from './components/CancelPlan';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/monthly-plans" element={<MonthlyPlans />} />
        <Route path="/yearly-plans" element={<YearlyPlans />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/current-plan" element={<CurrentPlan />} />
        <Route path="/cancel-plan" element={<CancelPlan />} />
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