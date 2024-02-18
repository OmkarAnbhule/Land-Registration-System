import { useState } from 'react'
import './App.css'
import Register from './components/forms/Register/Register'
import Home from './components/Main/Home'
import Navbar from './components/Navbar'
import Main from './components/Main/Main'
function App() {
  return (
    <>
    <Navbar></Navbar>
    <div>
      <Main/>
    </div>
    </>
  )
}

export default App
