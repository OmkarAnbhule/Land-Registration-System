import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Web3 from 'web3'
import img from '../../assets/home_assets/register_form/register.jpg'
import Snackbar from 'awesome-snackbar'
import Otp from './Otp'
import ResetPassword from './ResetPassword'

export default function Login() {
    const api = import.meta.env.VITE_API_URL;
    const btnref = useRef(null)
    const btnref2 = useRef(null)
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassowrd] = useState('');
    const [isShow, setShow] = useState(false)
    const [isfocus, setFocus] = useState(null)
    const [isforgot, setIsForgot] = useState(false)
    const [isOtp, setIsOtp] = useState(false)
    const [isreset, setIsReset] = useState(false)


    const handleEmail = (e) => {
        const temp = e.target.value.replace(/\s/g, '').toLowerCase()
        setEmail(temp)
    }
    const handlePassword = (e) => {
        const temp = e.target.value.replace(/\s/g, '')
        setPassowrd(temp)
    }

    const handleClick = async () => {
        if (email != '' && password != '') {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                const accounts = await web3.eth.getAccounts();
                let result = await fetch(`${api}send-address`, {
                    method: 'post',
                    body: JSON.stringify({ addr: accounts[0] }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                result = await result.json();
                if(result){
                    sendData()
                }
            }
        }
        else {
            new Snackbar(`<i class="bi bi-exclamation-circle-fill"></i>&nbsp;&nbsp;&nbsp;Empty Fields`, {
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
    }

    const sendData = async () => {
        let result = null;
        if (isforgot) {
            result = await fetch(`${api}forgot-password`, {
                method: 'post',
                body: JSON.stringify({ email }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
        else {
            result = await fetch(`${api}login`, {
                method: 'post',
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
        result = await result.json();
        if (result.success == true) {
            if (!isforgot) {
                new Snackbar(`<i class="bi bi-check-circle-fill"></i>&nbsp;&nbsp;&nbsp;Login Successful`, {
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
                navigate('/')
                localStorage.setItem('isloggedin', true)
                localStorage.setItem('id', email)
            }
            else {
                new Snackbar(`<i class="bi bi-check-circle-fill"></i>&nbsp;&nbsp;&nbsp;Otp Sent Successfully`, {
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
                setIsOtp(true)
            }
        }
        else {
            if (result.message === "Wrong Password") {
                new Snackbar(`<i class="bi bi-exclamation-circle-fill"></i>&nbsp;&nbsp;&nbsp;Wrong Password`, {
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
            if (result.message === "User not found") {
                new Snackbar(`<i class="bi bi-exclamation-circle-fill"></i>&nbsp;&nbsp;&nbsp;Invalid Credentials`, {
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
        }
    }


    const handleFp = () => {
        if (email != '') {
            sendData()
        }
        else {
            new Snackbar(`<i class="bi bi-exclamation-circle-fill"></i>&nbsp;&nbsp;&nbsp;Email not entered`, {
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
    }


    const handleFocusIn = (id) => {
        setFocus(id)
    }
    const handleBlur = () => {
        if (isforgot) {
            setFocus(null)
        }
        else {
            setFocus(null)
            checkFields()
        }
    }
    const handleRegister = () => {
        navigate('/register')

    }
    return (
        <div className='login-root'>
            <div>
                {(isforgot == false) ?
                    (
                        <>
                            <h1>Login to your account</h1>
                            <div className='form'>
                                <div className='form-group'>
                                    <div className="input-control" >
                                        <label htmlFor='email' className={isfocus == 'email' || email != '' ? 'focused' : ''}>Email Id</label>
                                        <input type='text' id='email' value={email} onChange={handleEmail} onFocus={() => handleFocusIn('email')} onBlur={handleBlur}></input>
                                    </div>
                                    <div className="input-control">
                                        <label htmlFor='password' className={isfocus == 'password' || password != '' ? 'focused' : ''}>Password</label>
                                        <input type={isShow ? 'text' : 'password'} id='password' value={password} onChange={handlePassword} onFocus={() => handleFocusIn('password')} onBlur={handleBlur}></input>
                                        <div className='icon-control'>
                                            <i className={isShow ? 'bi bi-eye-slash' : 'bi bi-eye'} onClick={() => setShow(!isShow)}></i>
                                        </div>
                                        <p onClick={() => setIsForgot(true)}>Forgot password ? </p>
                                    </div>
                                    <button onClick={handleClick}>Log in</button>
                                    <div>
                                        Don't have an account <b onClick={handleRegister}>click to signup</b>
                                    </div>
                                </div>
                            </div>

                        </>
                    ) :
                    (
                        <>
                            {isOtp ? <Otp type={'fp'} email={email} btnref={btnref} /> :
                                isreset ? <ResetPassword email={email} btnref={btnref2} /> :
                                    (<>
                                        <h1>Forgot Password</h1>
                                        <div className='form'>
                                            <div className='form-group'>
                                                <div className="input-control" >
                                                    <label htmlFor='email2' className={isfocus == 'email2' || email != '' ? 'focused' : ''}>Email Id</label>
                                                    <input type='text' id='email2' value={email} onChange={handleEmail} onFocus={() => handleFocusIn('email2')} onBlur={handleBlur}></input>
                                                </div>
                                                <button onClick={handleFp}>Send</button>
                                            </div>
                                        </div>
                                    </>
                                    )

                            }

                        </>)
                }
                <button ref={btnref} style={{ display: 'none' }} onClick={() => { setIsReset(true); setIsOtp(false) }}></button>
                <button ref={btnref2} style={{ display: 'none' }} onClick={() => { setIsReset(false); setIsOtp(false); setIsForgot(false) }}></button>
            </div>
            <div>
                <img width={400} height={380} src={img}></img>
                <h2>Welcome Back to Land Ledger</h2>
            </div>
        </div>
    )
}