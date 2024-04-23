import React, { useEffect, useState } from 'react';
import DashboardChart from './DashboardChart';
import Web3 from 'web3';
import Snackbar from 'awesome-snackbar'


const LandInspector = () => {
    const [registerRequests, setRegisterRequests] = useState([]);
    const [show, isShow] = useState(true);
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
        sendAddress()
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
            setDashboardStats({
                numberOfLands: result.data[1],
                numberOfRegisteredUsers: result.data[0],
                numberOfRegisteredLand: result.data[2],
                numberOfLandOnSale: result.data[3]
            });
        }
    };

    const sendAddress = async () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            let result = await fetch('http://localhost:5000/assignAddress', {
                method: 'post',
                body: JSON.stringify({ addr: accounts[0] }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            result = await result.json();
            if (result.status === 400) {
                isShow(true)
                new Snackbar(`<i class="bi bi-exclamation-circle-fill"></i>&nbsp;&nbsp;&nbsp;Only Admin Has Access To this Section`, {
                    position: 'bottom-center',
                    style: {
                        container: [
                            ['background', 'rgb(246, 58, 93)'],
                            ['border-radius', '5px'],
                            ['height', '50px'],
                            ['padding', '10px'],
                            ['border-radius', '20px']
                        ],
                        message: [
                            ['color', '#eee'],
                            ['font-size', '18px']
                        ],
                        bold: [
                            ['font-weight', 'bold'],
                        ],
                        actionButton: [
                            ['color', 'white'],
                        ],
                    }
                });
            }
            else {
                isShow(false)
            }
        }
    }

    const approveRequest = (id, addr) => {
        sendAddress()
        fetch('http://localhost:5000/register-accept', {
            method: 'post',
            body: JSON.stringify({ id: id, _addr: addr }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.success == true)
                setRegisterRequests(registerRequests.filter((item, index) => {
                    item.id != id
                }))
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
            setRegisterRequests(registerRequests.filter((item, index) => {
                item.id != id
            }))
        })
    }

    if (show) {
        return (
            <div className='land-inspector'>
                <h1>Only Admin Has access to this section</h1>
            </div>
        )
    }
    else {
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
    }
};
export default LandInspector;
