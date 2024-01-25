import React, { useState, useTransition } from 'react'

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassowrd] = useState('');
    const [isShow,setShow] = useState(false)
    const [step, setStep] = useState(1);
    const [isfocus,setFocus] = useState(false)
    const [ispending,startTransition] = useTransition();

    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassowrd(e.target.value)
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
    const handleFocusIn = () => {
        startTransition(setFocus(true))
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
                <div className="input-control" style={{ display: step == 1 ? 'flex' : 'none' }}>
                    <div className='icon-control'>
                        <i className='bi bi-person-fill'></i>
                    </div>
                    <label htmlFor='text' style={{display:isfocus ? 'block' : 'none'}}>Enter Your Name</label>
                    <input type='text' name='text' value={name} onChange={handleName} onFocus={handleFocusIn} placeholder={isfocus ? '' : 'Enter Your Name'}></input>
                </div>
                <div className="input-control" style={{ display: step == 2 ? 'flex' : 'none' }}>
                    <div className='icon-control'>
                        <i className='bi bi-envelope-fill'></i>
                    </div>
                    <label htmlFor='email' style={{display:isfocus ? 'block' : 'none'}}>Enter Your Email</label>
                    <input type='email' name='email' value={email} onChange={handleEmail} onFocus={handleFocusIn} placeholder={isfocus ? '' :'Enter Your Email'}></input>
                </div>
                <div className="input-control" style={{ display: step == 3 ? 'flex' : 'none' }}>
                    <div className='icon-control'>
                        <i className='bi bi-key-fill'></i>
                    </div>
                    <label htmlFor='password' style={{display:isfocus ? 'block' : 'none'}}>Enter Your Password</label>
                    <input type={isShow ? 'text' : 'password'} name='password' value={password} onChange={handlePassword} onFocus={handleFocusIn} placeholder={isfocus ? '' :'Enter Your Password'}></input>
                    <div className='icon-control'>
                        <i className={isShow ? 'bi bi-eye-slash' : 'bi bi-eye'} onClick={()=>setShow(!isShow)}></i>
                    </div>
                </div>
                <button onClick={handleClick}>{step < 3 ? 'Next' : 'Submit'}</button>
            </div>
        </div>
    )
}
