import React, { useState } from 'react';
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

const Routing = ({ activePlanName, setactivePlanName, activePlanPrice, setactivePlanPrice, typeOfPlan, settypeOfPlan }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/monthly-plans" element={<MonthlyPlans setactivePlanName={setactivePlanName} setactivePlanPrice={setactivePlanPrice} settypeOfPlan={settypeOfPlan} />} />
        <Route path="/yearly-plans" element={<YearlyPlans setactivePlanName={setactivePlanName} setactivePlanPrice={setactivePlanPrice} settypeOfPlan={settypeOfPlan} />} />
        <Route path="/payment" element={<PaymentScreen activePlanName={activePlanName} activePlanPrice={activePlanPrice} typeOfPlan={typeOfPlan} />} />
        <Route path="/current-plan" element={<CurrentPlan />} />
        <Route path="/cancel-plan" element={<CancelPlan />} />
      </Routes>
    </Router>
  )
}

function App() {
  const [activePlanName, setactivePlanName] = useState('Mobile');
  const [activePlanPrice, setactivePlanPrice] = useState(100);
  const [typeOfPlan, settypeOfPlan] = useState('Monthly');

  return (
    <Routing activePlanName={activePlanName}
      setactivePlanName={setactivePlanName}
      activePlanPrice={activePlanPrice}
      setactivePlanPrice={setactivePlanPrice}
      typeOfPlan={typeOfPlan}
      settypeOfPlan={settypeOfPlan}
    />
  );
}

export default App;
