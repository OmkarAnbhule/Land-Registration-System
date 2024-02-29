import React from "react";
import secure from '../../assets/home_assets/sell.jpg'
import uf from '../../assets/home_assets/register_land.jpg'
import reliable from '../../assets/home_assets/Buy.jpg'
import { useNavigate } from "react-router-dom";

export default function Features() {
    const navigate = useNavigate()
    const handleRegister = () => {
        navigate('/Registryform')
    }
    const handleBuy = () => {
        navigate('/buyLand')
    

    }
    const handleSell = () => {
        navigate('/sellLand')
    

    }
    return (
        <>
        {
            localStorage.getItem('isloggedin') ? (
        <div className='about-root' id="about">
            <div>
                <h1>Features</h1>
            </div>
            <div>
                <div>
                    <img src={uf}></img>
                    <p onClick={handleRegister}>Register Land</p>
                </div>
                <div>
                    <img src={reliable}></img>
                    <p onClick={handleBuy}>Buy Land</p>
                </div>
                <div>
                    <img src={secure} style={{objectFit:'cover'}}></img>
                    <p onClick={handleSell}>Sell Land</p>
                </div>
            </div>
        </div>):null
}
        </>
    )
}