import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from '../axios';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Loader from './Loader';

import '../styles/Paymentscreen.scss';

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "gray",
            color: "gray",
            fontWeight: 400,
            fontFamily: "Segoe UI",
            fontSize: "13px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "gray" },
            "::placeholder": { color: "gray" }
        },
        invalid: {
            iconColor: "#f44336",
            color: "#f44336"
        }
    }
}

const PaymentScreen = ({ selectedPlan, email, changePlanActive, setChangePlanActive }) => {
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    const {
        plan: activePlanName,
        price: activePlanPrice,
        type: typeOfPlan,
        devices,
    } = selectedPlan;

    const handleSubmitSub = async (event) => {
        event.preventDefault();

        setLoading(true);
        document.getElementsByClassName('payment-screen')[0].style.opacity = '0.3';

        const chosenPlan = activePlanName + "-" + typeOfPlan;

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                email: email,
            },
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            const res = await axios.post('http://localhost:5000/sub', { 'payment_method': result.paymentMethod.id, 'email': email, 'chosen_plan': chosenPlan, 'devices': devices, 'price': activePlanPrice, 'change_plan_active': changePlanActive });
            const { client_secret, status } = res.data;

            if (status === 'requires_action') {
                stripe.confirmCardPayment(client_secret).then(function (result) {
                    if (result.error) {
                        console.log('There was an issue!');
                        console.log(result.error);

                        NotificationManager.error('Error in creating subscription', 'Subscription Not Created!', 1500);

                        document.getElementsByClassName('payment-screen')[0].style.opacity = '1';
                        setLoading(false);
                    } else {
                        console.log('Payment Received!');

                        NotificationManager.success('Subscription Added Successfully!', 'Payment is Successful!', 1500);

                        setTimeout(() => {
                            document.getElementsByClassName('payment-screen')[0].style.opacity = '1';
                            setChangePlanActive(false);
                            setLoading(false);
                            navigate('/current-plan');
                        }, 1500);
                    }
                });
            } else {
                console.log('Payment Received!');

                NotificationManager.success('Subscription Added Successfully!', 'Payment is Successful!', 1500);

                setTimeout(() => {
                    document.getElementsByClassName('payment-screen')[0].style.opacity = '1';
                    setChangePlanActive(false);
                    setLoading(false);
                    navigate('/current-plan');
                }, 1500);
            }
        }
    };

    return (
        <>
            {(loading) ? <Loader /> : null}
            <div className='payment-screen'>
                <div className='payment-screen__container'>
                    <div className='payment-screen__card-section'>
                        <div className='payment-screen__card-section-heading'>
                            Complete Payment
                        </div>

                        <div className='payment-screen__card-section-subheading'>
                            Enter your credit or debit card details below
                        </div>

                        <form onSubmit={handleSubmitSub}>
                            <fieldset className="payment-screen__FormGroup">
                                <div className="FormRow">
                                    <CardElement options={CARD_OPTIONS} />
                                </div>
                            </fieldset>
                            <button className='payment-screen__confirm-button'>Confirm Payment</button>
                        </form>
                    </div>

                    <div className='payment-screen__order-summary'>

                        <div className='payment-screen__order-heading'>
                            Order Summary
                        </div>
                        <div className='payment-screen__order-sections'>
                            <div className='payment-screen__metric-key'>
                                Plan Name
                            </div>
                            <div className='payment-screen__metric-value'>
                                {activePlanName}
                            </div>
                        </div>

                        <hr className='payment-screen__line' />

                        <div className='payment-screen__order-sections'>
                            <div className='payment-screen__metric-key'>
                                Billing Cycle
                            </div>
                            <div className='payment-screen__metric-value'>
                                {typeOfPlan}
                            </div>
                        </div>

                        <hr className='payment-screen__line' />

                        <div className='payment-screen__order-sections'>
                            <div className='payment-screen__metric-key'>
                                Plan Price
                            </div>
                            <div className='payment-screen__metric-value'>
                                &#8377;{activePlanPrice}/{(typeOfPlan === "Monthly") ? 'mo' : 'yr'}
                            </div>
                        </div>

                        <hr className='payment-screen__line' />
                    </div>
                </div>

                <NotificationContainer />
            </div>
        </>
    )
}

export default PaymentScreen;