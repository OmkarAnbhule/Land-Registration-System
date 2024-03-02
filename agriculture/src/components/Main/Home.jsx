import React, { useEffect, useState } from 'react'
import HomeAnimation from './HomeAnimation'
import { animate, motion } from 'framer-motion'


export default function Home() {
  const api = import.meta.env.VITE_API_URL;
  const [text, setText] = useState('');
  useEffect(() => {
    getdata()
  },[])
  const getdata = async () => {

    if (localStorage.getItem('isloggedin') != undefined || localStorage.getItem('isloggedin') != false) {


      let result = await fetch(`${api}get-image`, {
        method: 'post',
        body: JSON.stringify({ email: localStorage.getItem("id") }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      result = await result.json()
      let name = result.name.split(' ')
      setText("Welcome Back "+name[0])
    }
  }
  const fadeInAnimationVariants = {
    initial: {
      opactiy: 0,
      x: -100,
    },
    animate: {
      opactiy: 1,
      x: 0,
      transition: {
        delay: 0.2,
      }
    },
    animate1: {
      opactiy: 1,
      x: 0,
      transition: {
        delay: 0.3,
      }
    },
  }
  return (
    <div className='home-root' id='home'>
      <div className='background'></div>
      <div className='text'>
        <motion.p
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView="animate"
        >
          {text}
        </motion.p>
        <motion.p
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView="animate"
        >
          Land Registration System
        </motion.p>
        <motion.p
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView="animate1"
        >
          Empowering Ownership, Ensuring Transparency & Revolutionizing Land Registration through the Power of Blockchain.
        </motion.p>
      </div>
      <div className='image'>
        <HomeAnimation />
      </div>
    </div>
  )
}

