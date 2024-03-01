import { useEffect, useState } from 'react'
import Web3 from "web3";
import fs from 'fs';
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

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      console.log(accounts)
      let result = await fetch(`${api}send-address`,{
        method:'post',
        body:JSON.stringify({addr:accounts[0]})
      })
    } else {
      console.log("MetaMask is not installed");
    }
  };
  useEffect(()=>{
    connectToMetaMask()
  })
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <div style={{marginTop:'100px'}}>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/Registryform' element={<Registryform/>}></Route>
          <Route path='/buyLand' element={<BuyLand/>}></Route>
          <Route path='/sellLand' element={<SellLand/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
