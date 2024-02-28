import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Main from './components/Main/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/forms/Register'
import Login from './components/forms/Login'
function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <div style={{marginTop:'100px'}}>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
