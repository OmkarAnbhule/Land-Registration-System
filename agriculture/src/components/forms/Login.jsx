import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import img from '../../assets/home_assets/register_form/register.jpg'

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassowrd] = useState('');
    const [isShow, setShow] = useState(false)
    const [isfocus, setFocus] = useState(null)

    const handleEmail = (e) => {
        const temp = e.target.value.replace(/\s/g, '').toLowerCase()
        setEmail(temp)
    }
    const handlePassword = (e) => {
        const temp = e.target.value.replace(/\s/g, '')
        setPassowrd(temp)
    }

    const handleClick = () => {
        if(email!='' && password != '')
        {
            sendData()
        }
    }

    const sendData = async() => {
        let result = fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        result = result.json()
        if(result.success == true){
            navigate('/')
            localStorage.setItem('isloggedin',true)
            localStorage.setItem('id',email)
        }
    }

    const handleFocusIn = (id) => {
        setFocus(id)
    }
    const handleBlur = () => {
        setFocus(null)
        checkFields()
    }
    const handleRegister = () => {
        navigate('/register')
        
    }
    return (
        <div className='login-root'>
            <div>
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
                        </div>

                        <button onClick={handleClick}>Log in</button>
                        <div>
                            Don't have an account <b onClick={handleRegister}>click to signup</b>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <img width={400} height={380} src={img}></img>
                <h2>Welcome Back to Land Ledger</h2>
            </div>
        </div>
    )
}