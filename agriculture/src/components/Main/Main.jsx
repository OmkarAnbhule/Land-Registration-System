import React from 'react'
import Home from './Home'
import About from './About'
import Steps from './Steps'
import Footer from './Footer'
import Features from './Features'

export default function Main() {
  return (
    <div className='main'>
        <Home/>
        <Features/>
        <About/>
        <Steps/>
        <Footer/>
    </div>
  )
}
