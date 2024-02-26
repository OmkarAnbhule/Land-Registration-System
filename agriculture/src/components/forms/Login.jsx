import React, { useState } from 'react'
import img from '../../assets/home_assets/register_form/register.jpg'

export default function Login() {
    const [firstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [password, setPassowrd] = useState('');
    const [isShow, setShow] = useState(false)
    const [step, setStep] = useState(1);
    const [isfocus, setFocus] = useState(null)
    const [checkbox, setCheckBox] = useState(false)
    const temp = 1
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

    return (
        <div className='login-root'>
            <div>
                <h1>Create your free account</h1>
                <div className='step-symbols'>
                    <p style={{ border: step >= 1 ? '2px solid cyan' : '2px solid gray' }} onClick={() => handleStep(1)}>1</p>
                    <p>
                        <p style={{ transform: step >= 2 ? 'scale(1)' : 'scale(0)' }}></p>
                    </p>
                    <p style={{ border: step >= 2 ? '2px solid cyan' : '2px solid gray' }} onClick={() => handleStep(2)}>2</p>
                    <p>
                        <p style={{ transform: step >= 3 ? 'scale(1)' : 'scale(0)' }}></p>
                    </p>
                    <p style={{ border: step >= 3 ? '2px solid cyan' : '2px solid gray' }} onClick={() => handleStep(3)}>3</p>
                </div>
                <div className='form'>
                    <div className='icon-control'>
                        <i className='bi bi-arrow-down-circle' onClick={handleBack} style={{ display: step > 1 ? 'block' : 'none' }}></i>
                    </div>
                    <div className='form-group'>
                        <div className='input-group'>
                            <div className="input-control">
                                <label htmlFor='text' className={isfocus == 'firstname' || firstName != '' ? 'focused' : ''}>First name</label>
                                <input type='text' id='text' value={firstName} onChange={handleFirstName} onFocus={() => handleFocusIn('firstname')} onBlur={handleBlur}></input>
                            </div>
                            <div className="input-control">
                                <label htmlFor='text1' className={isfocus == 'lastname' || LastName != '' ? 'focused' : ''}>Last name</label>
                                <input type='text' id='text1' value={LastName} onChange={handleLastName} onFocus={() => handleFocusIn('lastname')} onBlur={handleBlur}></input>
                            </div>
                        </div>
                        <div className="input-control" >

                            <label htmlFor='aadhar' className={isfocus == 'aadhar' || aadhar != '' ? 'focused' : ''}>Aadhar Number</label>
                            <input type='text' id='aadhar' value={aadhar} onChange={handleAadhar} onFocus={() => handleFocusIn('aadhar')} onBlur={handleBlur}></input>
                        </div>
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
                        </div>
                        <div>
                            <input type='checkbox'></input>
                            <label>I have read and agree to the Privacy Policy.</label>
                        </div>
                        <button onClick={handleClick}>{step < 3 ? 'Next >' : 'Submit'}</button>
                        <div>
                            Already have an account click to login
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <img width={400} height={380} src={img}></img>
                <h2>Welcome Back to Land Ledger</h2>
                <p>Welcome to Land Ledger ! Before you proceed with your registration, please take a moment to review our <b>Privacy Policy.</b> This policy outlines how we collect, use, and safeguard your personal information.
                    By clicking <b>"I Agree"</b> or similar language, you acknowledge that you have read and understood our Privacy Policy. If you do not agree with the terms outlined in the policy, please refrain from registering on our platform.</p>
            </div>
        </div>
    )
}