//import React, { useEffect, useState } from 'react';
//
//const LandInspector = () => {
//    const [registerRequests, setRegisterRequests] = useState([]);
//    const [showRegisterRequests, setShowRegisterRequests] = useState(false);
//    const [dashboardStats, setDashboardStats] = useState({
//        numberOfLands: 0,
//        numberOfRegisteredUsers: 0,
//        numberOfRegisteredLand: 0,
//        numberOfBidsPlaced: 0
//    });
//
//    const toggleRegisterRequests = () => {
//        setShowRegisterRequests(!showRegisterRequests);
//    };
//
//    useEffect(() => {
//        getRegisterReq();
//        fetchDashboardStats();
//    }, []);
//
//    const getRegisterReq = async () => {
//        let result = await fetch('http://localhost:5000/register-req', {
//            method: 'post',
//            headers: {
//                "Content-Type": "application/json"
//            }
//        });
//        result = await result.json();
//        if (result.success === true) {
//            setRegisterRequests(result.data);
//        }
//    };
//
//    const fetchDashboardStats = async () => {
//        //const urls = [
//        //    'http://localhost:5000/numberOfLands',
//        //    'http://localhost:5000/numberOfRegisteredUsers',
//        //    'http://localhost:5000/numberOfRegisteredLand',
//        //    'http://localhost:5000/numberOfBidsPlaced',
//        //];
//        const stats = ['numberOfLands', 'numberOfRegisteredUsers', 'numberOfRegisteredLand', 'numberOfBidsPlaced'];
//
//        const promises = urls.map(url => fetch(url).then(res => res.json()));
//        const results = await Promise.all(promises);
//
//        const updatedStats = {};
//        results.forEach((result, index) => {
//            updatedStats[stats[index]] = result.count;
//        });
//
//        setDashboardStats(updatedStats);
//    };
//
//    // The rest of your component...
//
//    return (
//        <div className="land-inspector">
//            <h2>Land Inspector Dashboard</h2>
//            <div className="dashboard-stats">
//                <p>Number of Lands: {dashboardStats.numberOfLands}</p>
//                <p>Number of Registered Users: {dashboardStats.numberOfRegisteredUsers}</p>
//                <p>Number of Registered Land: {dashboardStats.numberOfRegisteredLand}</p>
//                <p>Number of Bids Placed: {dashboardStats.numberOfBidsPlaced}</p>
//            </div>
//            <div className="toggle-buttons">
//                <button onClick={toggleRegisterRequests} className={showRegisterRequests ? 'active' : ''}>Register</button>
//            </div>
//            {showRegisterRequests && (
//                <div className="request-section">
//                    <h3>Register Requests</h3>
//                    <ul className="request-list">
//                        {registerRequests.map((item, index) => (
//                            <li key={index} className="request-item">
//                                <div>
//                                    <p>area: {item.area}</p>
//                                    <p>address: {item.landAddress}</p>
//                                    <p>property Id: {item.propertyPID}</p>
//                                    <p>Survey: {item.surveyNum}</p>
//                                </div>
//                                <div className="button-group">
//                                    <button onClick={() => approveRequest(index)}>Approve</button>
//                                    <button onClick={() => rejectRequest(index)}>Reject</button>
//                                </div>
//                            </li>
//                        ))}
//                    </ul>
//                </div>
//            )}
//        </div>
//    );
//};
//
//export default LandInspector;

import React, { useEffect, useState } from 'react';
import CircularProgress from './CircularProgress'; // Assuming CircularProgress is in the same directory

const LandInspector = () => {
    const [registerRequests, setRegisterRequests] = useState([]);
    const [showRegisterRequests, setShowRegisterRequests] = useState(false);
    const [dashboardStats, setDashboardStats] = useState({
        numberOfLands: 0,
        numberOfRegisteredUsers: 0,
        numberOfRegisteredLand: 0,
        numberOfBidsPlaced: 0
    });

    const toggleRegisterRequests = () => {
        setShowRegisterRequests(!showRegisterRequests);
    };

    useEffect(() => {
        getRegisterReq();
        fetchDashboardStats();
    }, []);

    const getRegisterReq = async () => {
        // Your existing code...
    };

    const fetchDashboardStats = async () => {
        // Your existing code...
    };

    // The rest of your component...

    return (
        <div className="land-inspector">
            <h2>Land Inspector Dashboard</h2>
            <div className="dashboard-stats">
                <CircularProgress score={dashboardStats.numberOfLands} total={10} />
                <CircularProgress score={dashboardStats.numberOfRegisteredUsers} total={10} />
                <CircularProgress score={dashboardStats.numberOfRegisteredLand} total={10} />
                <CircularProgress score={dashboardStats.numberOfBidsPlaced} total={10} />
            </div>
            <div className="toggle-buttons">
                <button onClick={toggleRegisterRequests} className={showRegisterRequests ? 'active' : ''}>Register</button>
            </div>
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
                                    <button onClick={() => approveRequest(index)}>Approve</button>
                                    <button onClick={() => rejectRequest(index)}>Reject</button>
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
