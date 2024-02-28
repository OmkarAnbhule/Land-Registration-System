import React, { useState } from 'react'
import img from '../../assets/home_assets/register_form/register.jpg'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassowrd] = useState('');
    const [isShow, setShow] = useState(false)
    const [isfocus, setFocus] = useState(null)

    const handleEmail = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const temp = e.target.value.replace(/\s/g, '').toLowerCase()
        setEmail(temp)
    }
    const handlePassword = (e) => {
        const temp = e.target.value.replace(/\s/g, '')
        setPassowrd(temp)
    }

    const handleClick = () => {
        if (isComplete && checkbox) {
            setStep(step + 1)
            setFocus(false)
        }
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
                        </div>

                        <button onClick={handleClick}>Submit</button>
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