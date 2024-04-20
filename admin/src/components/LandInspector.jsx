import React, { useEffect, useState } from 'react';
import DashboardChart from './DashboardChart';

const LandInspector = () => {
    const [registerRequests, setRegisterRequests] = useState([]);
    const [showRegisterRequests, setShowRegisterRequests] = useState(false);
    const seen = new Set();
    const [dashboardStats, setDashboardStats] = useState({
        numberOfLands: 0,
        numberOfRegisteredUsers: 0,
        numberOfRegisteredLand: 0,
        numberOfLandOnSale: 0
    });
    const [showDashboardChart, setShowDashboardChart] = useState(false);

    const toggleRegisterRequests = () => {
        getRegisterReq()
        setShowRegisterRequests(!showRegisterRequests);
    };

    const toggleDashboardChart = () => {
        console.log("Toggling dashboard chart");
        setShowDashboardChart(!showDashboardChart);
    };

    //
    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const getRegisterReq = async () => {
        let result = await fetch('http://localhost:5000/register-req', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        if (result.success === true) {
            for (var item of result.data) {
                const stringifiedObj = JSON.stringify(item);
                if (!seen.has(stringifiedObj) && item.area != '') {
                    seen.add(stringifiedObj)
                    setRegisterRequests((pre) => [...pre, JSON.parse(stringifiedObj)]);
                }
            }
        }
    };

    const fetchDashboardStats = async () => {
        // Simulated data, replace with your actual API calls
        let result = await fetch('http://localhost:5000/dashboard-stats', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        if (result.success === true) {
            for (var item of result.data) {
                setDashboardStats({
                    numberOfLands: item[1],
                    numberOfRegisteredUsers: item[0],
                    numberOfRegisteredLand: item[2],
                    numberOfLandOnSale: item[1]
                });
            }
        }
    };

    const approveRequest = (id, addr) => {
        fetch('http://localhost:5000/register-accept', {
            method: 'post',
            body: JSON.stringify({ id: id, _addr: addr }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.success == true)
                registerRequests.filter((item, index) => {
                    item.id != id
                })
        })
    }
    const rejectRequest = (id) => {
        fetch('http://localhost:5000/register-reject', {
            method: 'post',
            body: JSON.stringify({ id: id }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            registerRequests.filter((item, index) => {
                item.id != id
            })
        })
    }

    return (
        <div className="land-inspector">
            <h2>Land Inspector Dashboard</h2>
            <div className="toggle-buttons">
                <button onClick={toggleRegisterRequests} className={showRegisterRequests ? 'active' : ''}>Register Requests</button>
                <button onClick={toggleDashboardChart}>Show Stats</button>
            </div>
            {showRegisterRequests && (
                <div className="request-section">
                    <h3>Register Requests</h3>
                    <ul className="request-list">
                        {registerRequests &&
                            registerRequests.map((item, index) => (
                                <li key={index} className="request-item">
                                    <div>
                                        {item.files.map((item1, index1) => (
                                            <img src={'https://ipfs.io/ipfs/' + item1} key={index1} alt="Land" width={100} height={100} style={{ margin: '20px', border: '2px solid white' }} />
                                        ))}
                                        <p>area: {item.area}</p>
                                        <p>address: {item.landAddress}</p>
                                        <p>property Id: {item.propertyPID}</p>
                                        <p>Survey: {item.surveyNum}</p>
                                    </div>
                                    <div className="button-group">
                                        <button onClick={() => approveRequest(item.id, item.ownerAddress)}>Approve</button>
                                        <button onClick={() => rejectRequest(item.id)}>Reject</button>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
            <div className="main-content">
                {showDashboardChart && <DashboardChart stats={dashboardStats} />}
            </div>
        </div>
    );
};
export default LandInspector;
