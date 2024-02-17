import React, { useState } from 'react'

export default function Navbar() {
    const [style, setStyle] = useState(false)
    const handleSideBar = () => {
        setStyle(!style)
    }
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
            <div className='sidebar' style={{display: style ? 'block' :'none'}}>
                <div className='logo'>
                    <img width={50} height={50}></img>
                    <p>Some Name</p>
                </div>
                <p>Home</p>
                <p>About</p>
                <p>Contact</p>
            </div>
            <div className='links'>
                <p>Home</p>
                <p>About</p>
                <p>Contact</p>
            </div>
            <div className='profile'>
                <img></img>
                <button>Log in</button>
                <button>Sign Up</button>
            </div>
        </div>
    )
}

