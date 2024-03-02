import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Snackbar from 'awesome-snackbar'
import { Link } from 'react-scroll'

export default function Navbar() {
    const api = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [style, setStyle] = useState(false)
    const [style2, setStyle2] = useState(false)
    const [img, setImg] = useState('')
    const handleSideBar = () => {
        setStyle(!style)
    }
    const handleSideBar2 = () => {
        setStyle2(!style2)
    }
    const handleSignUp = () => {
        navigate('/register')
    }
    const handleLogIn = () => {
        navigate('/login')
    }
    const getdata = async () => {

        if (localStorage.getItem('isloggedin') != undefined || localStorage.getItem('isloggedin') != false) {
            let result = await fetch(`${api}get-image`, {
                method: 'post',
                body: JSON.stringify({ email: localStorage.getItem("id") }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            result = await result.json()
            console.log(result);
            import(/* @vite-ignore */ `../assets/images/profile/${result.image}`).then(image => {
                setImg(image.default);
            });
        }
    }

    const handleLogout = async () => {
        let result = await fetch('http://localhost:5000/logout', {
            method: 'post',
            body: JSON.stringify({ email: localStorage.getItem('id') }),
            headers: {
                "Content-type": "Application/Json"
            }
        })
        result = await result.json()
        if (result.success == true) {
            new Snackbar(`<i class="bi bi-check-circle-fill"></i>&nbsp;&nbsp;&nbsp;Logged out Successfully`, {
                position: 'bottom-center',
                style: {
                    container: [
                        ['background', 'rgb(130, 249, 103)'],
                        ['border-radius', '5px'],
                        ['height', '50px'],
                        ['padding', '10px'],
                        ['border-radius', '20px']
                    ],
                    message: [
                        ['color', 'black'],
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
            localStorage.clear();
            navigate('/')
        }
    }


    useEffect(() => {
        if (localStorage.getItem('isloggedin') != undefined || localStorage.getItem('isloggedin') != false) {
            getdata()
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
            <div className='sidebar' onMouseLeave={handleSideBar} style={{ display: style ? 'block' : 'none' }}>
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
                <Link to='home' spy={true} smooth={true} offset={-100} duration={500} >
                    <p>Home</p>
                </Link>
                <Link to='about' spy={true} smooth={true} offset={-100} duration={500}>
                    <p>About</p>
                </Link>
                <Link to='about' spy={true} smooth={true} offset={-100} duration={500}>
                    <p>Contact</p>
                </Link>
            </div>
            <div className='profile'>
                {localStorage.getItem('isloggedin') ? (
                    <>
                        <img width={50} height={50} src={img} onClick={handleSideBar2}></img>
                        <div className='sidebar2' onMouseLeave={handleSideBar2} style={{ display: style2 ? 'block' : 'none' }}>
                            <p>Profile</p>
                            <p onClick={handleLogout}>Logout</p>
                        </div>
                    </>
                ) : (<>
                    <button onClick={handleLogIn}>Log in</button>
                    <button onClick={handleSignUp}>Sign Up</button>
                </>)}
            </div>
        </div>
    )
}

