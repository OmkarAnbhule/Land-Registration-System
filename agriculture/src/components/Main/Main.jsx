import React from 'react'
import Home from './Home'
import About from './About'
import Steps from './Steps'
import Animation from './HomeAnimation2'
import Footer from './Footer'

export default function Main() {
  return (
    <div className='main'>
        <Home/>
        <About/>
        <Steps/>
        <Footer/>
    </div>
  )
}
