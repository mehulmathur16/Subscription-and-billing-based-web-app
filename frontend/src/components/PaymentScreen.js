import React from 'react';
import '../styles/Paymentscreen.scss';

import { BsCreditCard2Back } from 'react-icons/bs';

const PaymentScreen = () => {
    return (
        <div className='payment-screen'>
            <div className='payment-screen__container'>
                <div className='payment-screen__card-section'>
                    <div className='payment-screen__card-section-heading'>
                        Complete Payment
                    </div>

                    <div className='payment-screen__card-section-subheading'>
                        Enter your credit or debit card details below
                    </div>

                    <div className='payment-screen__card-input'>
                        <div className='payment-screen__card-logo' > <BsCreditCard2Back fill='gray' /> </div>
                        <input className='payment-screen__card-number-input payment-screen__input-style' placeholder='Card number' maxLength={'16'} />
                        <input className='payment-screen__expiry-date-input payment-screen__input-style' placeholder='MM' style={{ paddingRight: '0', width: '6%' }} maxLength={'2'} />
                        <div className='payment-screen__card-logo' style={{ borderLeft: '0', borderRadius: '0', margin: '0', color: 'gray', width: '1.6%', paddingRight: '0.2rem' }} > / </div>
                        <input className='payment-screen__expiry-date-input payment-screen__input-style' placeholder='YY' style={{ paddingLeft: '0' }} maxLength={'2'} />
                        <input className='payment-screen__cvv-input payment-screen__input-style' placeholder='CVC' type={'password'} maxLength={'3'} />
                    </div>

                    <button className='payment-screen__confirm-button'>Confirm Payment</button>
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
                            Basic
                        </div>
                    </div>

                    <hr className='payment-screen__line' />

                    <div className='payment-screen__order-sections'>
                        <div className='payment-screen__metric-key'>
                            Billing Cycle
                        </div>
                        <div className='payment-screen__metric-value'>
                            Monthly
                        </div>
                    </div>

                    <hr className='payment-screen__line' />

                    <div className='payment-screen__order-sections'>
                        <div className='payment-screen__metric-key'>
                            Plan Price
                        </div>
                        <div className='payment-screen__metric-value'>
                            &#8377;200/mo
                        </div>
                    </div>

                    <hr className='payment-screen__line' />
                </div>
            </div>
        </div>
    )
}

export default PaymentScreen;