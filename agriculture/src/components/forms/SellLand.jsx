import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from 'awesome-snackbar'

export default function SellLand() {
    const api = import.meta.env.VITE_API_URL;
    const navigate = useNavigate()
    const [land, setLand] = useState([])
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
            if (land.length > 0) {
                if (land.find(obj => obj._id !== item._id)) {
                    setLand((pre) => [...pre, ...item])
                }
            }
            else {
                setLand((pre) => [...pre, ...result.data])
            }
        }
    }
    const handleSell = async (id) => {
        let result = await fetch(`${api}sell-land`, {
            method: 'post',
            body: JSON.stringify({ objId: id }),
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
    const handleRegistry = () => {
        navigate('/Registryform')
    }
    return (
        <div className="sell-land">
            {
                land.length > 0 ?
                    land.map((item, index) => (
                        <div className="container" key={index}>
                            {!item.isVerified ?
                                (<p className='verify-wrong'><i className="bi bi-x-circle-fill"></i> Not verified</p>) :
                                (<p className='verify-right'><i className="bi bi-patch-check-fill"></i> verified</p>)}
                            {item.isSell ?
                                (<p className="sale">On Sale</p>)
                                : null
                            }<div className="location">
                                <i className="bi bi-geo-alt"></i>
                                <p>{item.state},{item.district}</p>
                            </div>
                            <div className="details">
                                <p><b>Area: </b>{item.area}</p>
                                <p><b>Estimated Price: </b>{item.price}</p>
                                <p><b>Property Number: </b>{item.propertyid}</p>
                                <p><b>Survey Number: </b>{item.survey}</p>
                                <p><b>Registered on: </b>{item.date.split('T')[0]}</p>
                            </div>
                            {
                                !item.isVerified  || item.isSell ?
                                    (<button style={{ background: 'gray' }}>Sell</button>) :
                                    (<button onClick={() => handleSell(item._id)} style={{ background: 'royalblue' }}>Sell</button>)

                            }
                        </div>
                    ))
                    :
                    <p className="center">You have not registered any Land &nbsp; <b onClick={handleRegistry}>click to register</b></p>
            }
        </div>
    )
}