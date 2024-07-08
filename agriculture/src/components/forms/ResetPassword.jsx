import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Snackbar from 'awesome-snackbar'
import { useAuthContext, AuthProvider } from '../../context/auth_cotext.cjs'

export default function ResetPassword(props) {
  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isShow, setShow] = useState(false)
  const [isShow2, setShow2] = useState(false)
  const [isfocus, setFocus] = useState(null)
  const { account } = useAuthContext()

  const handlePassword = (e) => {
    const temp = e.target.value.replace(/\s/g, '')
    setPassword(temp)
  }
  const handlePassword2 = (e) => {
    const temp = e.target.value.replace(/\s/g, '')
    setPassword2(temp)
  }
  const handleFocusIn = (id) => {
    setFocus(id)
  }
  const handleBlur = () => {
    setFocus(null)
    checkFields()
  }
  const handleClick = () => {
    if (password != '' && password2 != '') {
      if (password === password2) {
        sendData()
      }
      else {
        new Snackbar(`<i class="bi bi-exclamation-circle-fill"></i>&nbsp;&nbsp;&nbsp;Password Does not match`, {
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
    let result = await fetch(`${api}reset-password`, {
      method: 'post',
      body: JSON.stringify({ email: props.email, password: password }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${account}`
      }
    })
    result = await result.json()
    if (result.success == true) {
      console.log(result)
      new Snackbar(`<i class="bi bi-check-circle-fill"></i>&nbsp;&nbsp;&nbsp;Password Reset Successfully`, {
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
      props.btnref.current.click()
    }
  }
  return (
    <AuthProvider>
      <div>
        <div className='form'>
          <div className='form-group reset'>
            <h1>Password Reset</h1>
            <div className="input-control">
              <label htmlFor='password' className={isfocus == 'password' || password != '' ? 'focused' : ''}>Password</label>
              <input type={isShow ? 'text' : 'password'} id='password' value={password} onChange={handlePassword} onFocus={() => handleFocusIn('password')} onBlur={handleBlur}></input>
              <div className='icon-control'>
                <i className={isShow ? 'bi bi-eye-slash' : 'bi bi-eye'} onClick={() => setShow(!isShow)}></i>
              </div>
            </div>
            <div className="input-control">
              <label htmlFor='password2' className={isfocus == 'password2' || password2 != '' ? 'focused' : ''}>Confirm password</label>
              <input type={isShow2 ? 'text' : 'password'} id='password2' value={password2} onChange={handlePassword2} onFocus={() => handleFocusIn('password2')} onBlur={handleBlur}></input>
              <div className='icon-control'>
                <i className={isShow2 ? 'bi bi-eye-slash' : 'bi bi-eye'} onClick={() => setShow2(!isShow2)}></i>
              </div>
            </div>
            <button onClick={handleClick}>Reset Password</button>
          </div>
        </div>
      </div>
    </AuthProvider>
  )
}
