import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BuyLand() {
    const api = import.meta.env.VITE_API_URL;
    const navigate = useNavigate()
    const [land, setLand] = useState([])
    useEffect(() => {
        getData()

    }, [])
    const getData = async () => {
        let result = await fetch(`${api}get-land-all`, {
            method: 'post',
            body: JSON.stringify({ email: localStorage.getItem('id') }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
        if (result.success == true) {
            for (var item of result.data) {
                if (land.length > 0) {
                    if (land.find(obj => obj._id !== item._id)) {
                        if (!item.buyers.include(localStorage.getItem("id"))) {
                            console.log(item.buyers)
                            setLand((pre) => [...pre, item])
                        }
                    }
                }
                else {
                    if (!result.data[0].buyers.include(localStorage.getItem('id'))) {
                        setLand((pre) => [...pre, ...result.data])
                    }
                }
            }
        }
    }
    const handleBuy = async (id) => {
        let result = await fetch(`${api}buy-land`, {
            method: 'post',
            body: JSON.stringify({ owner: localStorage.getItem('id'), objId: id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
    return (
        <div className="buy-land">
            {land.length > 0 ?
                land.map((item, index) => (
                    <div className="container" key={index}>
                        <div className="location">
                            <i className="bi bi-geo-alt"></i>
                            <p>{item.state},{item.district}</p>
                        </div>
                        <div className="details">
                            <p><b>Area: </b>{item.area}</p>
                            <p><b>Estimated Price: </b>3498498rs</p>
                            <p><b>Property Number: </b>{item.propertyid}</p>
                            <p><b>Survey Number: </b>{item.survey}</p>
                        </div>
                        <button onClick={() => handleBuy(item._id)}>Buy</button>
                    </div>
                ))
                :
                <p className="center">No Lands Available</p>
            }
        </div>
    )
}