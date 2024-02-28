import React from "react";
import secure from '../../assets/home_assets/secure.jpeg'
import uf from '../../assets/home_assets/user-freind.jpeg'
import reliable from '../../assets/home_assets/reliable.jpeg'
import { useNavigate } from "react-router-dom";

export default function Features() {
    const navigate = useNavigate()
    const handleRegister = () => {
        navigate('/Registryform')
    }
    const handleBuy = () => {

    }
    const handleSell = () => {

    }
    return (
        <>
        {
            localStorage.getItem('isloggedin') ? (
        <div className='about-root' id="about">
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
                    <img src={secure}></img>
                    <p onClick={handleSell}>Sell Land</p>
                </div>
            </div>
        </div>):null
}
        </>
    )
}