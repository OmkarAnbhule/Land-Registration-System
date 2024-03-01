import React, { useState } from 'react'
import panelimg from '../../assets/home_assets/register_form/register.jpg'
import { useNavigate } from 'react-router-dom';
import Otp from './Otp';
import profile from '../../assets/home_assets/register_form/default.jpg'
import Snackbar from 'awesome-snackbar'

export default function Register() {
    const api = import.meta.env.VITE_API_URL;
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [password, setPassowrd] = useState('');
    const [img, setImg] = useState('');
    const [pan, setPan] = useState('');
    const [date, setDate] = useState('');
    const [gender, setGender] = useState('');
    const [isShow, setShow] = useState(false)
    const [step, setStep] = useState(1);
    const [isfocus, setFocus] = useState(null)
    const [firstNameErr, setFirstNameErr] = useState('')
    const [LastNameErr, setLastNameErr] = useState('')
    const [EmailErr, setEmailErr] = useState('')
    const [AadharErr, setAadharErr] = useState('')
    const [PasswordErr, setPasswordErr] = useState('')
    const [panErr, setPanErr] = useState('')
    const [dateErr, setDateErr] = useState('')
    const [imgErr, setImgErr] = useState('')
    const [genderErr, setGenderErr] = useState('')
    const [isComplete, setIsComplete] = useState(false)
    const [isComplete2, setIsComplete2] = useState(false)
    const [checkbox, setCheckBox] = useState(false)
    const formdata = new FormData;
    const handleFirstName = (e) => {
        const temp = e.target.value.replace(/\s/g, '')
        setFirstName(temp)

    }
    const handleLastName = (e) => {
        const temp = e.target.value.replace(/\s/g, '')
        setLastName(temp)

    }
    const handleEmail = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const temp = e.target.value.replace(/\s/g, '').toLowerCase()
        if (emailRegex.test(temp)) {
            let res = VerifyEmail()
            if (res.message == 'User Found') {
                setEmailErr('Email Already Found')
            }
            else {
                setEmailErr('')
            }
        }
        else {
            setEmailErr('Invalid Email')
        }
        setEmail(temp)

    }
    const handlePassword = (e) => {
        const temp = e.target.value.replace(/\s/g, '')
        setPassowrd(temp)
    }
    const handleAadhar = (e) => {
        const temp = e.target.value.replace(/[^\d]/g, '').replace(/(.{3})/g, '$1-').slice(0, 15);
        setAadhar(temp)
    }
    const handleCheckBox = (e) => {
        setCheckBox(!checkbox)
    }
    const handlePan = (e) => {
        const temp = e.target.value.replace(/\s/g, '').toUpperCase().slice(0, 10);
        setPan(temp)
    }
    const handleDate = (e) => {
        setDate(e.target.value);
    }
    const handleGender = (val) => {
        setGender(val)
    }
    const handleImage = (e) => {
        setImg(e.target.files[0])
    }
    const handleClick = () => {
        if (isComplete && checkbox) {
            setStep(step + 1)
            setFocus(false)
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
    const handleClick2 = async () => {
        if (isComplete2) {
            let res = await sendData()
            console.log(res, res.success)
            if (res.success == true) {
                setStep(step + 1)
                setFocus(false)
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
    const handleBack = () => {
        setStep(step - 1)
    }
    const handleFocusIn = (id) => {
        setFocus(id)
    }
    const handleBlur = () => {
        setFocus(null)
        checkFields()
        checkFields2()
    }

    const checkFields2 = () => {
        if (img != '') {
            setImgErr('')
            if (pan != '') {
                setPanErr('')
                if (date != '') {
                    setDateErr('')
                    if (gender != '') {
                        setGenderErr('')
                        setIsComplete2(true)
                    }
                    else {
                        setGenderErr('Gender not filled')
                    }
                }
                else {
                    setDateErr('Date not filled')
                }
            }
            else {
                setPanErr('Pan number not filled')
            }
        }
        else {
            setImgErr('Img Not Filled')
        }
    }
    const checkFields = () => {
        if (firstName != '') {
            setFirstNameErr('')

            if (LastName != '') {
                setLastNameErr('')
                if (aadhar != '') {
                    setAadharErr('')
                    if (email != '') {
                        setEmailErr('')
                        if (password != '') {
                            setPasswordErr('')
                        }
                        else {
                            setPasswordErr('Password not filled')
                            setIsComplete(true)
                        }
                    }
                    else {
                        setEmailErr('Email not filled')
                    }
                }
                else {
                    setAadharErr('Aadhar not filled')
                }
            }
            else {
                setLastNameErr('Last name not filled')
            }
        }
        else {
            setFirstNameErr('First name not filled')
        }
        console.log(isComplete, checkbox)
    }
    const handleLogin = () => {
        navigate('/login')
    }

    const VerifyEmail = async () => {
        let result = await fetch(`${api}verify-old-user`, {
            method: 'post',
            body: JSON.stringify({ email: email }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
        console.log(result)
        return result
    }

    const sendData = async () => {
        let result = await fetch(`${api}send-otp`, {
            method: 'post',
            body: JSON.stringify({ email: email }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
        console.log(result)
        return result
    }
    return (
        <div className='register-root'>
            <div>
                <img width={400} height={380} src={panelimg}></img>
                <h2>Get Started with Land Ledger</h2>
                <p>Welcome to Land Ledger ! Before you proceed with your registration, please take a moment to review our <b>Privacy Policy.</b> This policy outlines how we collect, use, and safeguard your personal information.
                    By clicking <b>I Agree</b> or similar language, you acknowledge that you have read and understood our Privacy Policy. If you do not agree with the terms outlined in the policy, please refrain from registering on our platform.</p>
            </div>
            <div>
                <h1>Create your free account</h1>
                <div className='step-symbols'>
                    <p style={{ border: step >= 1 ? '2px solid cyan' : '2px solid gray', outline: step >= 1 ? '2px solid cyan' : 'none', background: step >= 1 ? 'cyan' : 'white', color: step >= 1 ? 'white' : 'black' }} >1</p>
                    <p>
                        <p style={{ transform: step >= 2 ? 'scale(1)' : 'scale(0)' }}></p>
                    </p>
                    <p style={{ border: step >= 2 ? '2px solid cyan' : '2px solid gray', outline: step >= 2 ? '2px solid cyan' : 'none', background: step >= 2 ? 'cyan' : 'white', color: step >= 2 ? 'white' : 'black' }} >2</p>
                    <p>
                        <p style={{ transform: step >= 3 ? 'scale(1)' : 'scale(0)' }}></p>
                    </p>
                    <p style={{ border: step >= 3 ? '2px solid cyan' : '2px solid gray', outline: step >= 3 ? '2px solid cyan' : 'none', background: step >= 3 ? 'cyan' : 'white', color: step >= 3 ? 'white' : 'black' }} >3</p>
                </div>
                <div className='form'>
                    <div className='icon-control'>
                        <i className='bi bi-arrow-down-circle' onClick={handleBack} style={{ display: step > 1 && step < 3 ? 'block' : 'none' }}></i>
                    </div>

                    <div className='form-group'>
                        {step == 1 ? (<>
                            <div className='input-group'>
                                <div className="input-control">
                                    <label htmlFor='text' className={isfocus == 'firstname' || firstName != '' ? 'focused' : ''} style={{ color: firstNameErr == '' ? '' : 'red' }}>First name</label>
                                    <input type='text' id='text' value={firstName} style={{ border: firstNameErr == '' ? '' : '2px solid red' }
                                    } onChange={handleFirstName} onFocus={() => handleFocusIn('firstname')} onBlur={handleBlur}></input>
                                    <p>{firstNameErr}</p>
                                </div>
                                <div className="input-control">
                                    <label htmlFor='text1' className={isfocus == 'lastname' || LastName != '' ? 'focused' : ''} style={{ color: LastNameErr == '' ? '' : 'red' }}>Last name</label>
                                    <input type='text' id='text1' value={LastName} style={{ border: LastNameErr == '' ? '' : '2px solid red' }} onChange={handleLastName} onFocus={() => handleFocusIn('lastname')} onBlur={handleBlur}></input>
                                    <p>{LastNameErr}</p>
                                </div>
                            </div>
                            <div className="input-control" >
                                <label htmlFor='aadhar' className={isfocus == 'aadhar' || aadhar != '' ? 'focused' : ''} style={{ color: AadharErr == '' ? '' : 'red' }}>Aadhar Number</label>
                                <input type='text' id='aadhar' value={aadhar} style={{ border: AadharErr == '' ? '' : '2px solid red' }} onChange={handleAadhar} onFocus={() => handleFocusIn('aadhar')} onBlur={handleBlur}></input>
                                <p>{AadharErr}</p>
                            </div>
                            <div className="input-control" >
                                <label htmlFor='email' className={isfocus == 'email' || email != '' ? 'focused' : ''} style={{ color: EmailErr == '' ? '' : 'red' }}>Email</label>
                                <input type='text' id='email' value={email} style={{ border: EmailErr == '' ? '' : '2px solid red' }} onChange={handleEmail} onFocus={() => handleFocusIn('email')} onBlur={handleBlur}></input>
                                <p>{EmailErr}</p>
                            </div>
                            <div className="input-control">
                                <label htmlFor='password' className={isfocus == 'password' || password != '' ? 'focused' : ''} style={{ color: PasswordErr == '' ? '' : 'red' }}>Password</label>
                                <input type={isShow ? 'text' : 'password'} id='password' value={password} style={{ border: PasswordErr == '' ? '' : '2px solid red' }} onChange={handlePassword} onFocus={() => handleFocusIn('password')} onBlur={handleBlur}></input>
                                <p>{PasswordErr}</p>
                                <div className='icon-control'>
                                    <i className={isShow ? 'bi bi-eye-slash' : 'bi bi-eye'} onClick={() => setShow(!isShow)}></i>
                                </div>
                            </div>
                            <div>
                                <input type='checkbox' id='checkbox' checked={checkbox} onChange={handleCheckBox}></input>
                                <label style={{ color: isComplete && checkbox == false ? 'red' : '' }} htmlFor='checkbox'>I have read and agree to the Privacy Policy.</label>
                            </div>
                            <button style={{ background: isComplete && checkbox == true ? 'rgb(50, 134, 252)' : 'gray' }} onClick={handleClick}>
                                Next
                            </button>

                            <div>
                                Already have an account <span onClick={handleLogin}>click to login</span>
                            </div>
                        </>) : null}
                        {step == 3 ? (
                            <Otp email={email} name={firstName + ' ' + LastName} aadhar={aadhar} img={img} pan={pan} date={date} gender={gender} password={password} />
                        ) : null}
                        {step == 2 ? (
                            <div className='second-form'>
                                <div className='input-control'>
                                    <p>Profile Picture:</p>
                                    <label htmlFor='img'>
                                        <img width={200} height={200} src={img == '' ? profile : URL.createObjectURL(img)}></img>
                                        <i className='bi bi-camera-fill'></i>
                                    </label>
                                    <input type='file' id="img" onChange={handleImage} accept='image/*' style={{ display: 'none' }}></input>
                                    <p>{imgErr}</p>
                                </div>
                                <div className='input-control'>
                                    <label htmlFor='pan' >Pan Number:</label>
                                    <input type='text' id='pan' value={pan} onChange={handlePan} onBlur={handleBlur}></input>
                                    <p>{panErr}</p>

                                </div>
                                <div className='input-control'>
                                    <label htmlFor='dob'>Date of birth:</label>
                                    <input type='date' id='dob' value={date} onChange={handleDate} onBlur={handleBlur}></input>
                                    <p>{dateErr}</p>

                                </div>
                                <div className='input-control'>
                                    <label>Gender:</label>
                                    <p>{genderErr}</p>
                                    <div className='input-group'>
                                        <div>
                                            <input type='radio' name='radio' value={gender} onChange={() => handleGender('male')} onBlur={handleBlur} ></input>
                                            <label>Male</label>
                                        </div>
                                        <div>
                                            <input type='radio' name='radio' value={gender} onChange={() => handleGender('female')} onBlur={handleBlur}></input>
                                            <label>female</label>
                                        </div>
                                        <div>
                                            <input type='radio' name='radio' value={gender} onChange={() => handleGender('others')} onBlur={handleBlur}></input>
                                            <label>other</label>
                                        </div>
                                    </div>
                                </div>
                                <button>
                                    <button style={{ background: isComplete2 ? 'royalblue' : 'gray' }} onClick={handleClick2}>
                                        <div className="svg-wrapper-1">
                                            <div className="svg-wrapper">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    height="24"
                                                >
                                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                                    <path
                                                        fill="currentColor"
                                                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <span>Send Otp</span>
                                    </button>
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>

            </div>
        </div >
    )
}
