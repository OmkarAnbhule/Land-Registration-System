import { useState } from 'react'
import './App.css'
import Register from './components/forms/Register/Register'
import Home from './components/Main/Home'
import Navbar from './components/Navbar'
import Main from './components/Main/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Form from './components/forms/Form'
function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <div style={{marginTop:'100px'}}>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/register' element={<Form login = {true} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
