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
