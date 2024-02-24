import React, { useState, useTransition } from 'react'
 
export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [aadhar,setAadhar] = useState('');
    const [password, setPassowrd] = useState('');
    const [isShow,setShow] = useState(false)
    const [step, setStep] = useState(1);
    const [isfocus,setFocus] = useState(null)
    const [ispending,startTransition] = useTransition();
    const temp = 1
    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassowrd(e.target.value)
    }
    const handleAadhar = (e) => {
        setAadhar(e.target.value)
    }
    const handleClick = () => {
        setStep(step + 1)
        setFocus(false)
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
    }

    return (
        <div className='register-root'>
            <h1>Sign Up</h1>
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
                    <i className='bi bi-arrow-down-circle' onClick={handleBack} style={{display: step > 1 ? 'block' : 'none'}}></i>
                </div>
                <div className='form-group'>
                <div className="input-control">
                    <div className='icon-control'>
                        <i className='bi bi-person-fill'></i>
                    </div>
                    <label htmlFor='text' className={isfocus == 'name' || name != '' ? 'focused' : ''}>Enter Your Name</label>
                    <input type='text'  id='text' value={name} onChange={handleName} onFocus={()=>handleFocusIn('name')} onBlur={handleBlur}></input>
                </div>
                <div className="input-control" >
                    <div className='icon-control'>
                        <i className='bi bi-person-vcard-fill'></i>
                    </div>
                    <label htmlFor='aadhar'className={isfocus == 'aadhar' || aadhar != '' ? 'focused' : ''}>Enter Your Aadhar Number</label>
                    <input type='text' id='aadhar' value={aadhar} onChange={handleAadhar} onFocus={()=>handleFocusIn('aadhar')}></input>
                </div>
                <div className="input-control" >
                    <div className='icon-control'>
                        <i className='bi bi-envelope-fill'></i>
                    </div>
                    <label htmlFor='email'className={isfocus == 'email' || email != '' ? 'focused' : ''}>Enter Your Email</label>
                    <input type='email' id='email' value={email} onChange={handleEmail} onFocus={()=>handleFocusIn('email')}></input>
                </div>
                <div className="input-control">
                    <div className='icon-control'>
                        <i className='bi bi-key-fill' style={{transform:'rotate(-30deg)'}}></i>
                    </div>
                    <label htmlFor='password' className={isfocus == 'password' || password != '' ? 'focused' : ''}>Enter Your Password</label>
                    <input type={isShow ? 'text' : 'password'} id='password' value={password} onChange={handlePassword} onFocus={()=>handleFocusIn('password')}></input>
                    <div className='icon-control'>
                        <i className={isShow ? 'bi bi-eye-slash' : 'bi bi-eye'} onClick={()=>setShow(!isShow)}></i>
                    </div>
                </div>
                <button onClick={handleClick}>{step < 3 ? 'Next' : 'Submit'}</button>
            </div>
        </div>
        </div>
    )
}
