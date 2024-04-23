import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Snackbar from 'awesome-snackbar'
import { Link } from 'react-scroll'
import { Link as Router } from 'react-router-dom'
import logo from '../assets/Navbar/logo.png'

export default function Navbar() {
    const api = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [isNotify, setIsNotify] = useState(false);
    const [style, setStyle] = useState(false)
    const [style2, setStyle2] = useState(false)
    const [img, setImg] = useState('')
    const [notification, setNotification] = useState([])
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
        let result = await fetch(`${api}get-image`, {
            method: 'post',
            body: JSON.stringify({ email: localStorage.getItem("id") }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
        setImg(result.image)
    }

    const handleLogout = async () => {
        let result = await fetch(`${api}logout`, {
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

    const handleAllNotify = async () => {
        let result = await fetch(`${api}read-all-notification`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
    }

    const handleNotify = async (id) => {
        let result = await fetch(`${api}read-notification`, {
            method: 'put',
            body: JSON.stringify({ _id: id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
    }

    const getNotifications = async () => {
        let result = await fetch(`${api}get-notification`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
        setNotification(result.data);
    }

    useEffect(() => {
        if (localStorage.getItem('isloggedin') === 'true') {
            const timer = setTimeout(() => {
                getdata()
            }, 3000)
            const timer2 = setInterval(async () => {
                await getNotifications()
            }, 5000)
        }
        return()=>{
            clearTimeout(timer)
            clearInterval(timer2)
            setNotification([])
        }
    }, [])
    return (
        <div className='navbar-root'>
            <div className='logo'>
                <img width={50} height={50} src={logo}></img>
                <p>Land Ledger</p>
                <p>Simplify with land ledger,no more forms!</p>
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
                    <img width={50} height={50} src={logo}></img>
                    <p>Land Ledger</p>
                    <p>Simplify with land ledger,no more forms!</p>
                </div>
                <Router to='/' style={{ textDecoration: 'none', color: 'black' }}>
                    <p>Home</p>
                </Router>
                <Link to='about' spy={true} smooth={true} offset={-100} duration={500}>
                    <p>About</p>
                </Link>
                <Link to='contact' spy={true} smooth={true} offset={-100} duration={500}>
                    <p>Contact</p>
                </Link>
                <p onClick={handleLogout}>LogOut</p>
            </div>
            <div className='links'>
                <Router to='/' style={{ textDecoration: 'none', color: 'black' }}>
                    <p>Home</p>
                </Router>
                <Link to='about' spy={true} smooth={true} offset={-100} duration={500}>
                    <p>About</p>
                </Link>
                <Link to='contact' spy={true} smooth={true} offset={-100} duration={500}>
                    <p>Contact</p>
                </Link>
            </div>
            <div className='profile'>
                {localStorage.getItem('isloggedin') ? (
                    <>
                        <div className='notification'>
                            <div>
                                <i className={isNotify ? 'bi bi-bell-slash' : 'bi bi-bell'} onClick={() => setIsNotify(!isNotify)}></i>
                            </div>
                            <div className='notification-display' style={{ transform: isNotify ? 'scaleY(1)' : 'scaleY(0)' }}>
                                {
                                    notification.map((item, index) => (
                                        <p key={index} onClick={() => handleNotify(item._id)}>{item.message}</p>
                                    ))
                                }
                                <p onClick={handleAllNotify}>Mark all as read</p>
                            </div>
                        </div>
                        <div>
                            <img width={50} height={50} src={`https://ipfs.io/ipfs/${img}`} onClick={handleSideBar2}></img>
                            <div className='sidebar2' onMouseLeave={handleSideBar2} style={{ display: style2 ? 'block' : 'none' }}>
                                <p onClick={handleLogout}>Logout</p>
                            </div>
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

