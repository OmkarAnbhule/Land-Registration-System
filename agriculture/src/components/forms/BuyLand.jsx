import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BuyLand() {
    const api = import.meta.env.VITE_API_URL;
    const [bid, setBid] = useState('');
    const navigate = useNavigate()
    const [style, setStyle] = useState({})
    const [land, setLand] = useState([
        {
            "area": "255",
            "state": "delhi",
            "district": "new",
            "address": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
            "price": "100000",
            "propertyid": "090JKJ",
            "survey": "KJ878",
            "id": 0
        }
    ])
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
                    setLand((pre) => [...pre, ...result.data])

                }
            }
        }
    }
    const handleImage = (id) => {
        setStyle(id)
    }
    const handleBlur = () => {
        setStyle(-1)
    }
    const handleInput = (e) => {
        let temp = e.target.value;
        temp = temp.replace(/[^\d]/g, "");
        setBid(temp)
    }
    const handleBuy = async (id) => {
        let result = await fetch(`${api}buy-land`, {
            method: 'post',
            body: JSON.stringify({ objId: id }),
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
                            <p>{item.address}</p><br />
                        </div>
                        <div className="images-div">
                            <img width={50} height={50} className={style == 0 ? 'zoomed' : ''} onClick={() => handleImage(0)} onMouseLeave={handleBlur}></img>
                            <img width={50} height={50} className={style == 1 ? 'zoomed' : ''} onClick={() => handleImage(1)} onMouseLeave={handleBlur}></img>
                            <img width={50} height={50} className={style == 2 ? 'zoomed' : ''} onClick={() => handleImage(2)} onMouseLeave={handleBlur}></img>
                            <img width={50} height={50} className={style == 3 ? 'zoomed' : ''} onClick={() => handleImage(3)} onMouseLeave={handleBlur}></img>
                        </div>
                        <div className="details">
                            <p><b>Area: </b>{item.area}</p>
                            <p><b>Estimated Price: </b>{item.price}</p>
                            <p><b>Property Number: </b>{item.propertyid}</p>
                            <p><b>Survey Number: </b>{item.survey}</p>
                        </div>
                        <div className="highest-bid">
                            <b>Highest bid:</b>&nbsp;&nbsp;
                            <p>0829389 Rs.</p>
                        </div>
                        <div className="button-div">
                            <div className="bid">
                                <i className="bi bi-plus" onClick={() => setBid(parseInt(bid) + 1)}></i>
                                <input type="text" value={bid} onChange={handleInput}></input>
                                <i className="bi bi-dash" onClick={() => setBid(parseInt(bid) - 1)}></i>
                            </div>
                            <button onClick={() => handleBuy(item.id)}>Bid</button>
                        </div>
                    </div>
                ))
                :
                <p className="center">No Lands Available</p>
            }
        </div>
    )
}