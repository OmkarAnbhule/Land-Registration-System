import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Otp(props) {
  const navigate = useNavigate()
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [num3, setNum3] = useState();
  const [num4, setNum4] = useState();
  const [num5, setNum5] = useState();
  const [num6, setNum6] = useState();
  const numref1 = useRef();
  const numref2 = useRef();
  const numref3 = useRef();
  const numref4 = useRef();
  const numref5 = useRef();
  const numref6 = useRef();


  const handleValue1 = (e) => {
    let val = e.target.value;
    val = parseInt(val % 10).toString();
    setNum1(val)
    numref2.current.focus()
  }
  const handleValue2 = (e) => {
    let val = e.target.value;
    val = parseInt(val % 10).toString();
    setNum2(val)
    numref3.current.focus()
  }
  const handleValue3 = (e) => {
    let val = e.target.value;
    val = parseInt(val % 10).toString();
    setNum3(val)
    numref4.current.focus()
  }
  const handleValue4 = (e) => {
    let val = e.target.value;
    val = parseInt(val % 10).toString();
    setNum4(val)
    numref5.current.focus()
  }
  const handleValue5 = (e) => {
    let val = e.target.value;
    val = parseInt(val % 10).toString();
    setNum5(val)
    numref6.current.focus()
  }
  const handleValue6 = (e) => {
    let val = e.target.value;
    val = parseInt(val % 10).toString();
    setNum6(val)
  }

  const handleClick = async () => {
    let otp = num1 + num2 + num3 + num4 + num5 + num6
    const formdata = new FormData()
    formdata.append('image',props.img)
    formdata.append('data',JSON.stringify({email: props.email,
      otp: otp, name: props.name,
      aadhar: props.aadhar,
      password: props.password,
      pan: props.pan,
      dob: props.date,
      gender: props.gender}))
    let result = await fetch('http://localhost:5000/verify-otp', {
      method: 'post',
      body:formdata
    })
    result =  await result.json()
    console.log(result)
    if(result.success == true){
      navigate('/')
      localStorage.setItem('isloggedin',true)
      localStorage.setItem('id',props.email)
    }
  }

  const handleReset = async () => {
    let result = await fetch('http://localhost:5000/send-otp', {
      method: 'post',
      body: JSON.stringify({
        email: props.email,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    result = result.json()
    console.log(result)
  }

  return (
    <div className='otp-root'>
      <p>Otp Sent Successfully to <b>{props.email}</b></p>
      <div className='input-group'>
        <input type='text' value={num1} onChange={handleValue1} ref={numref1}></input>
        <input type='text' value={num2} onChange={handleValue2} ref={numref2}></input>
        <input type='text' value={num3} onChange={handleValue3} ref={numref3}></input>
        <input type='text' value={num4} onChange={handleValue4} ref={numref4}></input>
        <input type='text' value={num5} onChange={handleValue5} ref={numref5}></input>
        <input type='text' value={num6} onChange={handleValue6} ref={numref6}></input>
      </div>
      <div>
        <button onClick={handleClick}>
          Sumbit Otp
        </button>
        <button onClick={handleReset}>Resend Otp</button>
      </div>
    </div>
  )
}
