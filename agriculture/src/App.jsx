import { useState } from 'react'
import './App.css'
import Register from './components/forms/Register/Register'
import Home from './components/Main/Home'
import Navbar from './components/Navbar'
import Main from './components/Main/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <div>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
