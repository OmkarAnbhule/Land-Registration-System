import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from 'awesome-snackbar'
import styled from 'styled-components';

const AnimatedButton = styled.button`
width: 150px;
height: 60px;
font-weight: bold;
background: royalblue;
color: white;
font-size: 20px;
border: none;
border-radius: 50px;
position: relative;
z-index: 1;

&:hover {
  background: rgba(0, 0, 0, 0.83);
  transition: all .5s;
  cursor:pointer;
}
&::before {
    content: '';
    z-index: -1;
    background: limegreen;
    width: 0px;
    transform:translateX(-1px);
    height: 60px;
    border-radius: 50px;
    position: absolute;
    top: 0px;
    left: 0px;
    transition: all 1s;
    transform-origin: 0% 100% ;
}
${(props => props.isActive ?
        `&::before {
          content: '';
          z-index: -1;
          transform:translateX(0px);
          background: limegreen;
          width: 150px;
          height: 60px;
          border-radius: 50px;
          position: absolute;
          top: 0px;
          left: 0px;
          transition: all 1s;
        
      }`
        : null
    )}
`;

export default function SellLand() {
    const api = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const seen = new Set();
    const obj = {
        isLandVerified: true,
        isforSell: false,
        landAddress: 'something big big very very big land and property right here',
        area: 200,
        landPrice: 10000,
        propertyPID: 'pid123',
        surveyNum: 'num34',
        timestamp: 19239202829
    }
    const [btnClass, setBtnClass] = useState(false);
    const [land, setLand] = useState([obj]);
    const [onSale, setOnSale] = useState([]);
    const [selectedDuration, setSelectedDuration] = useState(5);
    useEffect(() => {
        getLand()
    }, [])
    const getLand = async () => {
        let result = await fetch(`${api}get-land`, {
            method: 'post',
            body: JSON.stringify({ email: localStorage.getItem('id') }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
        for (var item of result.data) {
            const stringifiedObj = JSON.stringify(item);
            if (!seen.has(stringifiedObj) && item.area != '') {
                seen.add(stringifiedObj)
                setLand((pre) => [...pre, JSON.parse(stringifiedObj)])
            }
        }
    }
    const getTime = async (id) => {
        let result = await fetch(`${ap}get-time`, {
            method: 'get',
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
        return result.time;
    }
    const getCountDown = (val) => {
        const currentDate = new Date();
        const selectedDate = new Date(val * 1000);
        const timeDiffMilliseconds = selectedDate - currentDate;
        if (timeDiffMilliseconds < 0) {
            setBtnClass(false);
        }
        const hours = Math.floor(timeDiffMilliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiffMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiffMilliseconds % (1000 * 60)) / 1000);
        const formattedDifference = `${hours}:${minutes}:${seconds}`;
        return formattedDifference;
    }
    const handleSell = async (id, val, addr) => {
        setBtnClass(true)
        let result = await fetch(`${api}sell-land`, {
            method: 'post',
            body: JSON.stringify({ objId: id, amt: val, addr: addr }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
        if (result.success == true) {
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
    }
    function unixTimestampToDate(unixTimestamp) {
        // Create a new Date object representing the UNIX timestamp multiplied by 1000 (to convert seconds to milliseconds)
        var date = new Date(unixTimestamp * 1000);

        // Return the date as a string in the format "YYYY-MM-DD"
        return date.toISOString().split('T')[0];
    }
    const handleRegistry = () => {
        navigate('/Registryform')
    }

    const handleDurationChange = (event) => {
        setSelectedDuration(event.target.value);
    };

    const isSell = (val) => {
        return onSale.includes(val)
    }
    return (
        <div className="sell-land">
            {
                land.length > 0 ?
                    land.map((item, index) => (
                        <div className="container" key={index}>
                            {!item.isLandVerified ?
                                (<p className='verify-wrong'><i className="bi bi-x-circle-fill"></i> Not verified</p>) :
                                (<p className='verify-right'><i className="bi bi-patch-check-fill"></i> verified</p>)}
                            {item.isforSell ?
                                (<p className="sale">On Sale</p>)
                                : null
                            }<div className="location">
                                <i className="bi bi-geo-alt"></i>
                                <p>{item.landAddress}</p>
                            </div>
                            <div className="details">
                                <p><b>Area: </b>{item.area}</p>
                                <p><b>Land Price: </b>{item.landPrice}</p>
                                <p><b>Property Number: </b>{item.propertyPID}</p>
                                <p><b>Survey Number: </b>{item.surveyNum}</p>
                                <p><b>Registered on: </b>{unixTimestampToDate(item.timestamp)}</p>
                            </div>
                            {
                                !item.isLandVerified || item.isforSell ?

                                    (<AnimatedButton style={{ background: 'gray', pointerEvents: 'none' }} isActive={btnClass}>Sell</AnimatedButton>) :
                                    (<AnimatedButton onClick={() => handleSell()} isActive={btnClass}>{btnClass ? getCountDown(getTime(item.id)) : "Sell"}</AnimatedButton>)
                            }
                            <select id="durationDropdown" value={selectedDuration} onChange={handleDurationChange}>
                                <option value="5">5 minutes</option>
                                <option value="15">15 minutes</option>
                                <option value="30">30 minutes</option>
                                <option value="60">1 hour</option>
                                <option value="120">2 hours</option>
                                <option value="1440">1 day</option>
                                <option value="2880">2 days</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                    ))
                    :
                    <p className="center">You have not registered any Land &nbsp; <b onClick={handleRegistry}>click to register</b></p>
            }
        </div>
    )
}