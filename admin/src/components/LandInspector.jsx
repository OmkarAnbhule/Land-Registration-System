import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const LandInspector = () => {
    const [buyerRequests, setBuyerRequests] = useState([]);
    const [registerRequests, setRegisterRequests] = useState([]);
    const [showBuyerRequests, setShowBuyerRequests] = useState(false);
    const [showRegisterRequests, setShowRegisterRequests] = useState(false);

    const toggleBuyerRequests = () => {
        setShowBuyerRequests(!showBuyerRequests);
    };

    const toggleRegisterRequests = () => {
        setShowRegisterRequests(!showRegisterRequests);
    };

    useEffect(() => {
        getBuyerReq()
        getRegisterReq()
    }, [])
    const getBuyerReq = async () => {
        let result = await fetch('http://localhost:5000/buy-req', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
        if (result.success == true) {
            if (buyerRequests.length > 0) {
                for (var item of result.data) {
                    if (sellerRequests.find(obj => obj._id !== item._id)) {
                        setBuyerRequests((pre) => [...pre, item])
                    }
                }
            }
            else {
                setBuyerRequests((pre) => [...pre, ...result.data])
            }
        }
    }

    const getRegisterReq = async () => {
        let result = await fetch('http://localhost:5000/register-req', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
        if (result.success == true) {
            if (RegisterRequests.length > 0) {
                for (var item of result.data) {
                    console.log(item)
                    if (RegisterRequests.find(obj => obj._id !== item._id)) {
                        setRegisterRequests((pre) => [...pre, ...result.data])
                    }
                }
            }
            else {
                setRegisterRequests((pre) => [...pre, ...result.data])
            }
        }
    }

    const approveRequest = async (type, index , buyer) => {
        if (type === 'buyer') {
            let result = await fetch('http://localhost:5000/buyer-accept', {
                method: 'post',
                body: JSON.stringify({ objId: index , owner:buyer}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            result = await result.json()
            if (result.success == true) {
                const updatedRequests = [...buyerRequests];
                updatedRequests.splice(index, 1);
                setBuyerRequests(updatedRequests);
            }
        }
        else if (type === 'register') {
            let result = await fetch('http://localhost:5000/register-accept', {
                method: 'post',
                body: JSON.stringify({ id: index }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            result = await result.json()
            if (result.success == true) {
                const updatedRequests = [...RegisterRequests];
                updatedRequests.splice(index, 1);
                setRegisterRequests(updatedRequests);
            }
        }
    };

    const rejectRequest = async (type, index) => {
        if (type === 'buyer') {
            let result = await fetch('http://localhost:5000/buyer-reject', {
                method: 'post',
                body: JSON.stringify({ id: index }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            result = await result.json()
            if (result.success == true) {
                const updatedRequests = [...buyerRequests];
                updatedRequests.splice(index, 1);
                setBuyerRequests(updatedRequests);
            }
        }
        else if (type === 'register') {
            let result = await fetch('http://localhost:5000/register-reject', {
                method: 'post',
                body: JSON.stringify({ id: index }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            result = await result.json()
            if (result.success == true) {
                const updatedRequests = [...RegisterRequests];
                updatedRequests.splice(index, 1);
                setRegisterRequests(updatedRequests);
            }
        }
    };


    // Calculate statistics for dashboard
    const totalBuyerRequests = buyerRequests.length;
    const totalRegisterRequests = registerRequests.length;

    // Chart data for dashboard
    const chartData = {
        labels: ['Buyer Requests', 'Register Requests'],
        datasets: [
            {
                label: 'Total Requests',
                data: [totalBuyerRequests, totalRegisterRequests],
                backgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    return (
        <div className="land-inspector">
            <h2>Land Inspector</h2>
            <div className="dashboard">
                <h3>Dashboard</h3>
                <div className="chart">
                    <Bar data={chartData} />
                </div>
            </div>
            <div className="toggle-buttons">
                <button onClick={toggleBuyerRequests} className={showBuyerRequests ? 'active' : ''}>Buyer</button>
                <button onClick={toggleRegisterRequests} className={showRegisterRequests ? 'active' : ''}>Register</button>
            </div>

            {showBuyerRequests && (
                <div className="request-section">
                    <h3>Buyer Requests</h3>
                    <ul className="request-list">
                        {buyerRequests.map((item, index) => (
                            <li key={index} className="request-item">
                                <div>
                                    <p>area:{item.area}</p>
                                    <p>state:{item.state}</p>
                                    <p>district:{item.district}</p>
                                    <p>property Id:{item.propertyid}</p>
                                    <p>Survey:{item.survey}</p>
                                </div>
                                <div className="button-group">
                                    <button onClick={() => approveRequest('buyer', item.id , item.buyer)}>Approve</button>
                                    <button onClick={() => rejectRequest('buyer', item.id)}>Reject</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {showRegisterRequests && (
                <div className="request-section">
                    <h3>Register Requests</h3>
                    <ul className="request-list">
                        {registerRequests.map((item, index) => (
                            <li key={index} className="request-item">
                                <div>
                                    <p>area: {item.area}</p>
                                    <p>address: {item.landAddress}</p>
                                    <p>property Id: {item.propertyPID}</p>
                                    <p>Survey: {item.surveyNum}</p>
                                </div>
                                <div className="button-group">
                                    <button onClick={() => approveRequest('register', item.id)}>Approve</button>
                                    <button onClick={() => rejectRequest('register', item.id)}>Reject</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LandInspector;
