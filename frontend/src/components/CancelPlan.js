import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/Currentplan.scss';

import { getDate } from '../App';

const CancelPlan = ({ activePlan, setActivePlan, email }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!email)
            navigate('/')
    }, [])


    return (
        <>
            {(email) ? null : navigate('/')}
            {(activePlan) ?
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
                            {activePlan.plan_name}
                        </div>

                        <div className='current-plan__devices'>
                            {activePlan.devices}
                        </div>

                        <div className='current-plan__price'>
                            &#8377;&nbsp;{activePlan.price}{activePlan.plan_type === "Monthly" ? '/mo' : '/yr'}
                        </div>

                        <button className='current-plan__change-plan-button' onClick={(e) => {
                            e.preventDefault();
                            setActivePlan(null);
                            navigate('/monthly-plans');
                        }}>Choose Plan</button>

                        <div className='current-plan__footer'>
                            Your subscription was cancelled and you will lose access to services on {getDate(activePlan.end_date)}.
                        </div>
                    </div>
                </div>
                :
                null}
        </>
    )
}

export default CancelPlan;