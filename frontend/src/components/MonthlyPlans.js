import React from 'react';
import '../styles/Plans.scss';

const MonthlyPlans = () => {

    const handleClick = (e, key) => {
        var allElements = document.getElementsByTagName("td");

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
                                window.location.href = '/yearly-plans';
                            }}>Yearly</span>
                        </button>
                        <td className='plans-screen__headers plans-screen__headers--active' key={0} onClick={event => handleClick(event, 0)}>Mobile</td>
                        <td className='plans-screen__headers' key={1} onClick={event => handleClick(event, 1)}>Basic</td>
                        <td className='plans-screen__headers' key={2} onClick={event => handleClick(event, 2)}>Standard</td>
                        <td className='plans-screen__headers' key={3} onClick={event => handleClick(event, 3)}>Premium</td>
                    </tr>

                    <tr>
                        <td className='plans-screen__plan-attribute'>Monthly Price</td>
                        <td className='plans-screen__active-column'>&#8377;100</td>
                        <td>&#8377;200</td>
                        <td>&#8377;500</td>
                        <td>&#8377;700</td>
                    </tr>

                    <tr>
                        <td className='plans-screen__plan-attribute'>Video Quality</td>
                        <td className='plans-screen__active-column'>Good</td>
                        <td>Good</td>
                        <td>Better</td>
                        <td>Best</td>
                    </tr>

                    <tr>
                        <td className='plans-screen__plan-attribute'>Resolution</td>
                        <td className='plans-screen__active-column'>480p</td>
                        <td>480p</td>
                        <td>1080p</td>
                        <td>4K+HDR</td>
                    </tr>

                    <tr style={{ borderBottom: 'none' }}>
                        <td className='plans-screen__plan-attribute'>Devices you can watch</td>
                        <td className='plans-screen__active-column'>Phone</td>
                        <td>Phone</td>
                        <td>Phone</td>
                        <td>Phone</td>
                    </tr>

                    <tr style={{ borderBottom: 'none' }}>
                        <td className='plans-screen__plan-attribute'></td>
                        <td className='plans-screen__active-column'>Tablet</td>
                        <td>Tablet</td>
                        <td>Tablet</td>
                        <td>Tablet</td>
                    </tr>

                    <tr style={{ borderBottom: 'none' }}>
                        <td className='plans-screen__plan-attribute'></td>
                        <td></td>
                        <td>Computer</td>
                        <td>Computer</td>
                        <td>Computer</td>
                    </tr>

                    <tr style={{ borderBottom: 'none' }}>
                        <td className='plans-screen__plan-attribute'></td>
                        <td></td>
                        <td>TV</td>
                        <td>TV</td>
                        <td>TV</td>
                    </tr>
                </table>
            </div>

            <buttton className='plans-screen__next-button' onClick={() => {
                window.location.href = '/payment';
            }}>Next</buttton>
        </div >
    )
}

export default MonthlyPlans;