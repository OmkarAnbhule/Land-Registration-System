import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Main from './components/Main/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/forms/Register'
import Login from './components/forms/Login'
import Registryform from './components/forms/Registryform'
import SellLand from './components/forms/SellLand'
import BuyLand from './components/forms/BuyLand'


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
  useEffect(() => {
    checkLogin()
  }, [])

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
