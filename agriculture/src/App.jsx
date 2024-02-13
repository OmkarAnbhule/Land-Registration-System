import { useState } from 'react'
import './App.css'
import Register from './components/forms/Register/Register'
import Home from './components/Home'
import Navbar from './components/Navbar'
function App() {
  return (
    <>
    <Navbar></Navbar>
    <div>
    <Home></Home>
    </div>
    </>
  )
}

export default App
