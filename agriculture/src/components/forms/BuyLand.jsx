import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BuyLand() {
    const navigate = useNavigate()
    const [land,setLand] = useState([])
    useEffect(()=>{
        let res = getData()
        if(res.success == true){
            setLand((pre)=>[...pre,...res.data])
        }
    })
    const getData = async()=>{
        let result = await fetch('http://localhost:5000/get-land-all',{
            method:'post',
            body:JSON.stringify({email:localStorage.getItem('id')}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        result = await result.json()
        return result
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
                        <button>Buy</button>
                    </div>
                ))
                :
                <p className="center">No Lands Available</p>
            }
        </div>
    )
}