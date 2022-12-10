import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useNavigate } from "react-router-dom";
import '../styles/Plans.scss';

const plansData = [
    {
        plan: 'Mobile',
        price: '100',
        type: 'Monthly',
        devices: 'Phone + Tablet',
    },
    {
        plan: 'Basic',
        price: '200',
        type: 'Monthly',
        devices: 'Phone + Tablet + Computer + TV',
    },
    {
        plan: 'Standard',
        price: '500',
        type: 'Monthly',
        devices: 'Phone + Tablet + Computer + TV',
    },
    {
        plan: 'Premium',
        price: '700',
        type: 'Monthly',
        devices: 'Phone + Tablet + Computer + TV',
    },
]

const MonthlyPlans = ({ loggedInUser, setSelectedPlan }) => {
    const navigate = useNavigate();

    const [featureTable, setFeatureTable] = useState(null);
    const [devicesTable, setDevicesTable] = useState(null);

    const getTableData = () => {
        axios.get('/getTableData').then((res) => {
            setFeatureTable(res.data.tableData.splice(0, 3));
            setDevicesTable(res.data.tableData.splice(0, 4));
        })
    }

    useEffect(() => {
        getTableData();
    }, [])

    const handleClick = (e, key) => {
        var allElements = document.getElementsByTagName("td");

        setSelectedPlan(plansData[key]);

        let count = 0;

        for (let i = 0; i < allElements.length; i++) {
            if (allElements[i].classList.value.includes("plans-screen__plan-attribute"))
                continue;

            if (allElements[i].classList.value.includes("plans-screen__headers")) {
                if ((count % 4) === key) {
                    if (!allElements[i].classList.value.includes("plans-screen__headers--active"))
                        allElements[i].classList.add("plans-screen__headers--active");
                }
                else {
                    if (allElements[i].classList.value.includes("plans-screen__headers--active"))
                        allElements[i].classList.remove("plans-screen__headers--active");
                }

                count++;
                continue;
            }

            if ((count % 4) === key) {
                allElements[i].classList.add("plans-screen__active-column");
            }
            else {
                if (allElements[i].classList.value.includes("plans-screen__active-column"))
                    allElements[i].classList.remove("plans-screen__active-column");
            }

            count++;
        }
    }

    return (
        <>
            {(loggedInUser) ? null : (
                navigate('/')
            )}

            {(featureTable) ?
                <div className='plans-screen'>
                    <div className='plans-screen__heading'>
                        Choose the right plan for you
                    </div>

                    <div className='plans-screen__data-container'>
                        <table>

                            <tr style={{ borderBottom: 'none' }}>
                                <button className='plans-screen__toggle-button'>
                                    <span className='plans-screen__toggle-button--active' style={{ marginRight: '1.2rem' }}>Monthly</span>
                                    <span onClick={() => {
                                        document.getElementsByTagName("span")[0].classList.remove("plans-screen__toggle-button--active");
                                        document.getElementsByTagName("span")[1].classList.add("plans-screen__toggle-button--active");
                                        navigate('/yearly-plans');
                                    }}>Yearly</span>
                                </button>
                                <td className='plans-screen__headers plans-screen__headers--active' key={0} onClick={event => handleClick(event, 0)}>Mobile</td>
                                <td className='plans-screen__headers' key={1} onClick={event => handleClick(event, 1)}>Basic</td>
                                <td className='plans-screen__headers' key={2} onClick={event => handleClick(event, 2)}>Standard</td>
                                <td className='plans-screen__headers' key={3} onClick={event => handleClick(event, 3)}>Premium</td>
                            </tr>


                            {
                                featureTable.map((curr) => {
                                    return (
                                        <tr>
                                            <td className='plans-screen__plan-attribute'>{curr.feature}</td>
                                            <td className='plans-screen__active-column'>{curr.Mobile}</td>
                                            <td>{curr.Basic}</td>
                                            <td>{curr.Standard}</td>
                                            <td>{curr.Premium}</td>
                                        </tr>
                                    )
                                })
                            }
                            {
                                devicesTable.map((curr) => {
                                    return (
                                        <tr style={{ borderBottom: 'none' }}>
                                            <td className='plans-screen__plan-attribute'>{curr.feature}</td>
                                            <td className='plans-screen__active-column'>{curr.Mobile}</td>
                                            <td>{curr.Basic}</td>
                                            <td>{curr.Standard}</td>
                                            <td>{curr.Premium}</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>

                    <buttton className='plans-screen__next-button' onClick={() => {
                        navigate('/payment');
                    }}>Next</buttton>
                </div >

                :
                null
            }
        </>
    )
}

export default MonthlyPlans;