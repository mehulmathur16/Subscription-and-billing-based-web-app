import React, { useState } from 'react';
import './index.css';

import 'react-notifications/lib/notifications.css';

import Login from './components/Login';
import Register from './components/Register';
import MonthlyPlans from './components/MonthlyPlans';
import YearlyPlans from './components/YearlyPlans';
import PaymentScreen from './components/PaymentScreen';
import CurrentPlan from './components/CurrentPlan';
import CancelPlan from './components/CancelPlan';
import StripeContainer from './components/StripeContainer';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Routing = ({
  activePlan, setActivePlan,
  selectedPlan, setSelectedPlan,
  loggedInUser, setLoggedInUser,
  changePlanActive, setChangePlanActive,
}) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setLoggedInUser={setLoggedInUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/monthly-plans" element={<MonthlyPlans setSelectedPlan={setSelectedPlan} loggedInUser={loggedInUser} />} />
        <Route path="/yearly-plans" element={<YearlyPlans setSelectedPlan={setSelectedPlan} loggedInUser={loggedInUser} />} />
        <Route path="/payment" element={<StripeContainer selectedPlan={selectedPlan} changePlanActive={changePlanActive} setChangePlanActive={setChangePlanActive} email={loggedInUser} />} />
        <Route path="/current-plan" element={<CurrentPlan activePlan={activePlan} setActivePlan={setActivePlan} email={loggedInUser} setChangePlanActive={setChangePlanActive} />} />
        <Route path="/cancel-plan" element={<CancelPlan activePlan={activePlan} setActivePlan={setActivePlan} email={loggedInUser} />} />
      </Routes>
    </Router>
  )
}

function App() {
  const initialState = {
    plan: 'Mobile',
    price: 100,
    type: 'Monthly',
    devices: 'Phone + Tablet'
  }

  const [selectedPlan, setSelectedPlan] = useState(initialState);
  const [activePlan, setActivePlan] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [changePlanActive, setChangePlanActive] = useState(false);

  return (
    <Routing
      selectedPlan={selectedPlan}
      setSelectedPlan={setSelectedPlan}
      activePlan={activePlan}
      setActivePlan={setActivePlan}
      loggedInUser={loggedInUser}
      setLoggedInUser={setLoggedInUser}
      changePlanActive={changePlanActive}
      setChangePlanActive={setChangePlanActive}
    />
  );
}

export function getDate(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month + ', ' + year;
  return time;
}

export default App;
