import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentScreen from './PaymentScreen';

const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = ({ selectedPlan, email, changePlanActive, setChangePlanActive }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!email)
            navigate('/')
    }, [])

    return (
        <>
            <Elements stripe={stripeTestPromise}>
                <PaymentScreen selectedPlan={selectedPlan} email={email} changePlanActive={changePlanActive} setChangePlanActive={setChangePlanActive} />
            </Elements>
        </>
    )
}

export default StripeContainer;
