import React, { useState } from 'react'
import img from '../../assets/home_assets/register_form/register.jpg'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [password, setPassowrd] = useState('');
    const [isShow, setShow] = useState(false)
    const [step, setStep] = useState(1);
    const [isfocus, setFocus] = useState(null)
    const [firstNameErr, setFirstNameErr] = useState('')
    const [LastNameErr, setLastNameErr] = useState('')
    const [EmailErr, setEmailErr] = useState('')
    const [AadharErr, setAadharErr] = useState('')
    const [PasswordErr, setPasswordErr] = useState('')
    const [isComplete, setIsComplete] = useState(false)
    const [checkbox, setCheckBox] = useState(false)
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
            setEmailErr('')
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
    const handleClick = () => {
        if (isComplete && checkbox) {
            setStep(step + 1)
            setFocus(false)
        }
    }
    const handleStep = (val) => {
        setStep(val)
        setFocus(false)
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
    return (
        <div className='register-root'>
            <div>
                <img width={400} height={380} src={img}></img>
                <h2>Get Started with Land Ledger</h2>
                <p>Welcome to Land Ledger ! Before you proceed with your registration, please take a moment to review our <b>Privacy Policy.</b> This policy outlines how we collect, use, and safeguard your personal information.
                    By clicking <b>"I Agree"</b> or similar language, you acknowledge that you have read and understood our Privacy Policy. If you do not agree with the terms outlined in the policy, please refrain from registering on our platform.</p>
            </div>
            <div>
                <h1>Create your free account</h1>
                <div className='step-symbols'>
                    <p style={{ border: step >= 1 ? '2px solid cyan' : '2px solid gray', outline: step >= 1 ? '2px solid cyan' : 'none', background: step >= 1 ? 'cyan' : 'white', color: step >= 1 ? 'white' : 'black' }} onClick={() => handleStep(1)}>1</p>
                    <p>
                        <p style={{ transform: step >= 2 ? 'scale(1)' : 'scale(0)' }}></p>
                    </p>
                    <p style={{ border: step >= 2 ? '2px solid cyan' : '2px solid gray', outline: step >= 2 ? '2px solid cyan' : 'none', background: step >= 2 ? 'cyan' : 'white', color: step >= 2 ? 'white' : 'black' }} onClick={() => handleStep(2)}>2</p>
                    <p>
                        <p style={{ transform: step >= 3 ? 'scale(1)' : 'scale(0)' }}></p>
                    </p>
                    <p style={{ border: step >= 3 ? '2px solid cyan' : '2px solid gray', outline: step >= 3 ? '2px solid cyan' : 'none', background: step >= 3 ? 'cyan' : 'white', color: step >= 3 ? 'white' : 'black' }} onClick={() => handleStep(3)}>3</p>
                </div>
                <div className='form'>
                    <div className='icon-control'>
                        <i className='bi bi-arrow-down-circle' onClick={handleBack} style={{ display: step > 1 && step < 3
                            
                            
                            ? 'block' : 'none' }}></i>
                    </div>
                    <div className='form-group'>
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
                        {step < 3 ? (
                            <button style={{ background: isComplete ? 'rgb(50, 134, 252)' : 'gray' }} onClick={handleClick}>
                                Next
                            </button>
                        ) : (
                            <button style={{ background: isComplete ? 'rgb(50, 134, 252)' : 'gray' }} onClick={handleClick}>
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
                                <span>Send</span>
                            </button>
                        )}
                        <div>
                            Already have an account <span onClick={handleLogin}>click to login</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
