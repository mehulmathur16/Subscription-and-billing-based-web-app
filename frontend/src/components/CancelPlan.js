import React from 'react';
import '../styles/Currentplan.scss';

const CancelPlan = () => {
    return (
        <div className='current-plan'>
            <div className='current-plan__container'>
                <div className='current-plan__header'>
                    <div className='current-plan__heading'>
                        Current Plan Details
                    </div>
                    <div className='current-plan__status current-plan__status--cancelled'>
                        Cancelled
                    </div>
                </div>

                <div className='current-plan__name'>
                    Basic
                </div>

                <div className='current-plan__devices'>
                    Phone+Tablet
                </div>

                <div className='current-plan__price'>
                    &#8377;&nbsp;2,000/yr
                </div>

                <button className='current-plan__change-plan-button'>Choose Plan</button>

                <div className='current-plan__footer'>
                    Your subscription was cancelled and you will lose access to services
                    on Jul 11th, 2023.
                </div>
            </div>
        </div>
    )
}

export default CancelPlan;