import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "awesome-snackbar";

export default function BuyLand() {
    const api = import.meta.env.VITE_API_URL;
    const [bid, setBid] = useState(0);
    const navigate = useNavigate()
    const [style, setStyle] = useState({})
    const seen = new Set();
    const [land, setLand] = useState([]);
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        let result = await fetch(`${api}get-land-all`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
        if (result.success == true) {
            for (var item of result.data) {
                const stringifiedObj = JSON.stringify(item);
                if (!seen.has(stringifiedObj) && item.area != '') {
                    seen.add(stringifiedObj)
                    setLand((pre) => [...pre, JSON.parse(stringifiedObj)])
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
        setBid(parseInt(temp))
    }
    const handleBuy = async (id, val) => {
        if (bid < val) {
            new Snackbar(`<i class="bi bi-exclamation-circle-fill"></i>&nbsp;&nbsp;&nbsp;Bid cannot be less than land price`, {
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
            let result = await fetch(`${api}place-bid`, {
                method: 'post',
                body: JSON.stringify({ id: id, bid }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

        }
    }
    return (
        <div className="buy-land">
            {land.length > 0 ?
                land.map((item, index) => (
                    <div className="container" key={index}>
                        <div className="location">
                            <i className="bi bi-geo-alt"></i>
                            <p>{item.landAddress}</p><br />
                        </div>
                        <div className="images-div">
                            {
                                item.files.map((file, key) => (
                                    <img src={"https://ipfs.io/ipfs/" + file} key={key} width={50} height={50} className={style == 0 ? 'zoomed' : ''} onClick={() => handleImage(key)} onMouseLeave={handleBlur}></img>
                                ))
                            }
                        </div>
                        <div className="details">
                            <p><b>Area: </b>{item.area}</p>
                            <p><b>Estimated Price: </b>{item.landPrice}</p>
                            <p><b>Property Number: </b>{item.propertyPID}</p>
                            <p><b>Survey Number: </b>{item.surveyNum}</p>
                        </div>
                        <div className="highest-bid">
                            <b>Highest bid:</b>&nbsp;&nbsp;
                            <p>{item.highestBid} Rs.</p>
                        </div>
                        <div className="button-div">
                            <div className="bid">
                                <i className="bi bi-plus" key={index} onClick={() => setBid(parseInt(bid) + 1)}></i>
                                <input key={index} type="text" value={bid == 0 ? item.landPrice : bid} onChange={handleInput}></input>
                                <i className="bi bi-dash" key={index} onClick={() => setBid(parseInt(bid) - 1)}></i>
                            </div>
                            <button onClick={() => handleBuy(item.id, item.landPrice)}>Bid</button>
                        </div>
                    </div>
                ))
                :
                <p className="center">No Lands Available</p>
            }
        </div>
    )
}