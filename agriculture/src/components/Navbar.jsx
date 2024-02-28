import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
    const [style, setStyle] = useState(false)
    const [img, setImg] = useState('')
    const handleSideBar = () => {
        setStyle(!style)
    }
    const handleSignUp = () => {
        navigate('/register')
    }
    const handleLogIn = () => {
        navigate('/login')
    }
    useEffect(() => {

        if (localStorage.getItem('isloggedin') != undefined || false) {
            async () => {
                let result = await fetch('http://localhost:5000/get-image', {
                    method: 'post',
                    body: JSON.stringify({ email }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                result = result.json()
                setImg(result.image)
            }
        }
    }, [])
    return (
        <div className='navbar-root'>
            <div className='logo'>
                <img width={50} height={50}></img>
                <p>Land Ledger</p>
            </div>
            <div className='icon-control'>
                <button className={style ? 'hamburger hamburger--elastic is-active' : 'hamburger hamburger--elastic'} type="button" onClick={handleSideBar}>
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>
            </div>
            <div className='sidebar' style={{ display: style ? 'block' : 'none' }}>
                <div className='logo'>
                    <img width={50} height={50}></img>
                    <p>Land Ledger</p>
                </div>
                <p>Home</p>
                <p>About</p>
                <p>Contact</p>
                <p>LogOut</p>
            </div>
            <div className='links'>
                <Link to={'/'} style={{ color: 'black', textDecoration: 'none' }}>
                    <p>Home</p>
                </Link>
                <Link to={'/'} style={{ color: 'black', textDecoration: 'none' }}>
                    <p>About</p>
                </Link>
                <p>Contact</p>
            </div>
            <div className='profile'>
                {localStorage.getItem('isloggedin') ? (
                    <>
                        <img width={50} height={50} src={URL.createObjectURL(img)}></img>
                    </>
                ) : (<>
                    <button onClick={handleLogIn}>Log in</button>
                    <button onClick={handleSignUp}>Sign Up</button>
                </>)}
            </div>
        </div>
    )
}

