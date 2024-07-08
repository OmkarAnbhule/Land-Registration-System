import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Snackbar from 'awesome-snackbar'
import Loader from '../Loader';
import { useAuthContext, AuthProvider } from '../../context/auth_cotext.cjs'

export default function Otp(props) {
  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [num3, setNum3] = useState();
  const [num4, setNum4] = useState();
  const [num5, setNum5] = useState();
  const [num6, setNum6] = useState();
  const [status, setStatus] = useState(false);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const numref1 = useRef();
  const numref2 = useRef();
  const numref3 = useRef();
  const numref4 = useRef();
  const numref5 = useRef();
  const numref6 = useRef();
  const { account } = useAuthContext()



  useEffect(() => {
    let interval = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          // Handle countdown finish event here
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);


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
    setStatus(true)
    let otp = num1 + num2 + num3 + num4 + num5 + num6
    if (props.type == 'fp') {
      let result = await fetch(`${api}verify-otp-fp`, {
        method: 'post',
        body: JSON.stringify({ otp: otp, email: props.email }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${account}`
        }
      })
      result = await result.json()
      if (result.success == true) {
        props.btnref.current;
        props.btnref.current.click()
        setStatus(false)
      }
      else {
        if (result.message == 'Invalid Otp') {
          setStatus(false)
          new Snackbar(`<i class="bi bi-exclamation-circle-fill"></i>&nbsp;&nbsp;&nbsp;Invalid Otp`, {
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
    else {
      const formdata = new FormData()
      formdata.append('image', props.img)
      formdata.append('data', JSON.stringify({
        email: props.email,
        otp: otp, name: props.name,
        aadhar: props.aadhar,
        password: props.password,
        pan: props.pan,
        dob: props.date,
        gender: props.gender
      }))
      let result = await fetch(`${api}verify-otp`, {
        method: 'post',
        body: formdata,
        headers: {
          "Authorization": `Bearer ${account}`
        }
      })
      result = await result.json()
      if (result.success == true) {
        setStatus(false)
        new Snackbar(`<i class="bi bi-check-circle-fill"></i>&nbsp;&nbsp;&nbsp;Registration Successful`, {
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
        localStorage.setItem('id', props.email)
      }
      else {
        if (result.message == 'Invalid Otp') {
          setStatus(false)
          new Snackbar(`<i class="bi bi-exclamation-circle-fill"></i>&nbsp;&nbsp;&nbsp;Invalid Otp`, {
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
  }

  const handleReset = async () => {
    let result = await fetch(`${api}send-otp`, {
      method: 'post',
      body: JSON.stringify({
        email: props.email,
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${account}`
      }
    })
    result = await result.json()
    if (result.success == true) {
      setMinutes(2)
      setSeconds(0)
    }
  }

  return (
    <AuthProvider>
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
            Sumbit Otp&nbsp;&nbsp;
            <Loader status={status} otp={true} />
          </button>
          {minutes > 0 ? (
            <button onClick={handleReset} disabled={minutes > 0 ? false : true} style={{ background: minutes > 0 ? 'gray' : '' }}>Resend Otp&nbsp;&nbsp;
              {minutes < 10 ? '0' + minutes : minutes}:
              {seconds < 10 ? '0' + seconds : seconds}
            </button>
          ) : (
            <button onClick={handleReset} disabled={minutes > 0 ? true : false} style={{ background: minutes > 0 ? 'gray' : '' }}>Resend Otp
            </button>
          )}
        </div>
      </div>
    </AuthProvider>
  )
}
