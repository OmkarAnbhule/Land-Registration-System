import { useEffect, useState } from 'react'
import Web3 from 'web3';
import './App.css'
import Navbar from './components/Navbar'
import Main from './components/Main/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/forms/Register'
import Login from './components/forms/Login'
import Registryform from './components/forms/Registryform'
import SellLand from './components/forms/SellLand'
import BuyLand from './components/forms/BuyLand'
import Snackbar from 'awesome-snackbar';


function App() {
  const api = import.meta.env.VITE_API_URL;
  const checkLogin = async () => {
    try {
      let result = await fetch(`${api}check-login`, {
        method: 'post',
        headers: {
          "Content-Type": "application/json"
        }
      });
      result = await result.json();
      if (result.success == false) {
        localStorage.clear()
      }
    }
    catch (e) {
      console.log(e)
    }
  }
  const connectToMetaMask = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        console.log(accounts)
        if (accounts[0] == '' || accounts.length <= 0) {
          new Snackbar(`<i class="bi bi-exclamation-circle-fill"></i>&nbsp;&nbsp;&nbsp;Metamask not connected`, {
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
        else {
          let result = await fetch(`${api}send-address`, {
            method: 'post',
            body: JSON.stringify({ addr: accounts[0] }),
            headers: {
              "Content-Type": "application/json"
            }
          })
          return result;
        }
      } else {
        new Snackbar(`<i class="bi bi-exclamation-circle-fill"></i>&nbsp;&nbsp;&nbsp;Metamask not installed`, {
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
    catch (e) {
      console.log(e)
      new Snackbar(`<i class="bi bi-exclamation-circle-fill"></i>&nbsp;&nbsp;&nbsp;Internal Server Error`, {
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
  };

  useEffect(() => {
    if(localStorage.getItem('isloggedin') == 'true')
    connectToMetaMask().then(()=>{
      checkLogin()
    })
  }, [localStorage])


  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <div style={{ marginTop: '100px' }}>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login handleShow />}></Route>
          <Route path='/Registryform' element={<Registryform />}></Route>
          <Route path='/buyLand' element={<BuyLand />}></Route>
          <Route path='/MyLand' element={<SellLand />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
