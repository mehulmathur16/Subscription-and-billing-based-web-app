import React from 'react';
import '../styles/Currentplan.scss';

const CurrentPlan = () => {
    return (
        <div className='current-plan'>
            <div className='current-plan__container'>
                <div className='current-plan__header'>
                    <div className='current-plan__heading'>
                        Current Plan Details
                    </div>
                    <div className='current-plan__status'>
                        Active
                    </div>

                    <span className='current-plan__cancel-button'>Cancel</span>
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

                <button className='current-plan__change-plan-button'>Change Plan</button>

                <div className='current-plan__footer'>
                    Your subscription has started on Jul 11th, 2022 and will auto renew on
                    Jul 12th, 2023.
                </div>
            </div>
        </div>
    )
}

export default CurrentPlan;