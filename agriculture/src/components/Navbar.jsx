import React from 'react'

export default function Navbar() {
    return (
        <div className='navbar-root'>
            <div className='logo'>
                <img width={50} height={50}></img>
                <p>Some Name</p>
            </div>
            <div className='icon-control'>
                <div className='menu'>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </div>
            <div className='sidebar'>
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

