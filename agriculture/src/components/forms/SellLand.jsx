import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SellLand(){
    const navigate = useNavigate()
    const [land,setLand] = useState([])
    useEffect(()=>{
        let res = getLand()
        if(res.success == true){
            setLand(res.data)
        }
    })
    const getLand = async() =>{
        let result = fetch('http://localhost:5000/get-land',{
            method:'post',
            body:JSON.stringify({email:localStorage.getItem('id')}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        result = await result.json()
        return result
    }
    const handleRegistry = () => {
        navigate('/Registryform')   
    }
    return(
        <div className="sell-land">
            {
                land.length > 0 ?
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
                    </div>
                ))
                :
                <p className="center">You have not registered any Land &nbsp; <b onClick={handleRegistry}>click to register</b></p>
            }
        </div>
    )
}