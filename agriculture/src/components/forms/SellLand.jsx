import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from 'awesome-snackbar'
import styled from 'styled-components';
import Timer from "../Timer";

const AnimatedButton = styled.button`
  width: 150px;
  height: 60px;
  font-weight: bold;
  background: ${(props) => (!props.isActive ? 'royalblue' : 'gray')};
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 50px;
  position: relative;
  z-index: 1;
  pointer-events: ${(props) => (props.isActive ? 'none' : 'auto')};

  &:hover {
    background: rgba(0, 0, 0, 0.83);
    transition: all 0.5s;
    cursor: pointer;
  }

  &::before {
    content: '';
    z-index: -1;
    background: limegreen;
    width: ${(props) => (props.isActive ? '150px' : '0px')};
    transform: translateX(-1px);
    height: 60px;
    border-radius: 50px;
    position: absolute;
    top: 0px;
    left: 0px;
    transition: all 1s;
    transform-origin: 0% 100%;
  }
`;

const SellLand = () => {
    const obj = {
        id: 0,
        isLandVerified: true,
        isforSell: false,
        landAddress: 'something big big very very big land and property right here',
        area: 200,
        landPrice: 10000,
        propertyPID: 'pid123',
        surveyNum: 'num34',
        timestamp: 19239202829
    }
    const ob1 = {
        id: 1,
        isLandVerified: true,
        isforSell: true,
        landAddress: 'something big big very very big land and property right here',
        area: 200,
        landPrice: 10000,
        propertyPID: 'pid123',
        surveyNum: 'num34',
        timestamp: 9040404090,
        maxTime: 1712800000
    }
    const api = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [land, setLand] = useState([]);

    useEffect(() => {
        getLand();
        const intervalId = setInterval(() => {
            getLand(); // Fetch data at regular intervals
        }, 5000);
        return () => {
            clearInterval(intervalId);
        }
    }, []);

    const getLand = async () => {
        try {
            const response = await fetch(`${api}get-land`, {
                method: 'post',
                body: JSON.stringify({ email: localStorage.getItem('id') }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const result = await response.json();
            setLand(result.data.filter(item => item.area !== ''));
        } catch (error) {
            console.error('Error fetching land:', error);
        }
    };

    const handleSell = async (id, val, addr, duration) => {
        handleButtonToggle(id);
        try {
            const response = await fetch(`${api}sell-land`, {
                method: 'post',
                body: JSON.stringify({ objId: id, amt: val, addr: addr, closingTime: duration }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const result = await response.json();
            if (result.success) {
                // Show success message using Snackbar or similar notification
                new Snackbar(`<i class="bi bi-check-circle-fill"></i>&nbsp;&nbsp;&nbsp;Land Selling Request Sent`, {
                    position: 'bottom-center',
                    style: {
                        container: [
                            ['background', 'rgb(130, 249, 103)'],
                            ['border-radius', '5px'],
                            ['height', '50px'],
                            ['padding', '10px'],
                            ['border-radius', '20px']
                        ],
                        message: [
                            ['color', 'black'],
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
        } catch (error) {
            console.error('Error selling land:', error);
        }
    };

    const handleRegistry = () => {
        navigate('/Registryform');
    };


    const handleButtonToggle = (index) => {
        setLand(prevLand => {
            const updatedLand = [...prevLand];
            updatedLand[index] = {
                ...updatedLand[index],
                btnClass: !updatedLand[index].btnClass
            };
            return updatedLand;
        });
    };

    const handleDurationChange = (index, value) => {
        setLand(prevLand => {
            const updatedLand = [...prevLand];
            updatedLand[index] = {
                ...updatedLand[index],
                selectedDuration: value
            };
            return updatedLand;
        });
    };

    return (
        <div className="sell-land">
            {land.length > 0 ? (
                land.map((item, index) => (
                    <div className="container" key={item.id}>
                        {!item.isLandVerified ?
                            (<p className='verify-wrong'><i className="bi bi-x-circle-fill"></i> Not verified</p>) :
                            (<p className='verify-right'><i className="bi bi-patch-check-fill"></i> verified</p>)}
                        {item.isforSell && <p className="sale">On Sale</p>}
                        <div className="location">
                            <i className="bi bi-geo-alt"></i>
                            <p>{item.landAddress}</p>
                        </div>
                        <div className="details">
                            <p><b>Area: </b>{item.area}</p>
                            <p><b>Land Price: </b>{item.landPrice}</p>
                            <p><b>Property Number: </b>{item.propertyPID}</p>
                            <p><b>Survey Number: </b>{item.surveyNum}</p>
                            <p><b>Registered on: </b>{new Date(item.timestamp * 1000).toISOString().split('T')[0]}</p>
                        </div>
                        {item.isLandVerified && !item.isforSell ? (
                            <>
                                <AnimatedButton
                                    isActive={item.btnClass}
                                    onClick={() => handleSell(item.id, item.landPrice, item.ownerAddress, item.selectedDuration || 5)}
                                >
                                    Sell
                                </AnimatedButton>
                                <select value={item.selectedDuration || 5} onChange={(e) => handleDurationChange(index, e.target.value)}>
                                    <option value="5">5 minutes</option>
                                    <option value="15">15 minutes</option>
                                    <option value="30">30 minutes</option>
                                    <option value="60">1 hour</option>
                                    <option value="120">2 hours</option>
                                    <option value="1440">1 day</option>
                                    <option value="2880">2 days</option>
                                </select>
                            </>
                        ) : (
                            <AnimatedButton isActive={item.btnClass} style={{ pointerEvents: 'none', background: 'gray' }}>{item.isforSell ? (<Timer date={item.maxTime} key={item.id} />) : "Sell"}</AnimatedButton>
                        )}
                    </div>
                ))
            ) : (
                <p className="center">
                    You have not registered any Land &nbsp;
                    <b onClick={handleRegistry}>click to register</b>
                </p>
            )}
        </div>
    );
};

export default SellLand;