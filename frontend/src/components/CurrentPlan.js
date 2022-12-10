import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useNavigate } from "react-router-dom";
import { getDate } from '../App';
import Loader from './Loader';

import '../styles/Currentplan.scss';

const CurrentPlan = ({ activePlan, setActivePlan, email, setChangePlanActive }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const axiosCall = () => {
        axios.post("/currentUserPlanDetails", {
            email: email,
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then((res) => {
            setActivePlan(res.data.userPlanDetails);
        })
    }

    const cancelSubscription = () => {
        setLoading(true);
        document.getElementsByClassName('current-plan')[0].style.opacity = '0.3';

        axios.post("/cancel-subscription", {
            email: email,
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then((res) => {
            if (res.data.success) {
                NotificationManager.success('You may subscribe to other plans', 'Subscription Cancelled Successfully!', 1500);

                setTimeout(() => {
                    document.getElementsByClassName('current-plan')[0].style.opacity = '1';
                    setLoading(false);
                    navigate('/cancel-plan');
                }, 1500);
            }
            else {
                NotificationManager.error('Error in cancelling subscription', 'Subscription Not Cancelled!', 1500);
                document.getElementsByClassName('current-plan')[0].style.opacity = '1';
                setLoading(false);
            }
        })
    }

    useEffect(() => {
        axiosCall();
    }, [])

    return (
        <>
            {(email) ? null : navigate('/')}
            {(loading) ? <Loader /> : null}
            {(activePlan) ?
                <div className='current-plan'>
                    <div className='current-plan__container'>
                        <div className='current-plan__header'>
                            <div className='current-plan__heading'>
                                Current Plan Details
                            </div>
                            <div className='current-plan__status'>
                                Active
                            </div>

                            <span className='current-plan__cancel-button' onClick={() => {
                                cancelSubscription();
                            }}>Cancel</span>
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

                        <button className='current-plan__change-plan-button' onClick={() => {
                            setChangePlanActive(true);
                            navigate('/monthly-plans');
                        }}>Change Plan</button>

                        <div className='current-plan__footer'>
                            Your subscription has started on {getDate(activePlan.start_date)} and will auto renew on {getDate(activePlan.end_date)}.
                        </div>
                    </div>

                    <NotificationContainer />
                </div>
                :
                null
            }
        </>
    )
}

export default CurrentPlan;