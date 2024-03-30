import React, { useEffect, useState } from 'react'
import HomeAnimation from './HomeAnimation'
import { animate, motion } from 'framer-motion'


export default function Home() {
  const api = import.meta.env.VITE_API_URL;
  const [text, setText] = useState('');
  useEffect(() => {
    if (localStorage.getItem('isloggedin') === true) {
      getdata()
    }
  }, [])
  const getdata = async () => {

    if (localStorage.getItem('isloggedin') === true) {
      let result = await fetch(`${api}get-image`, {
        method: 'post',
        body: JSON.stringify({ email: localStorage.getItem("id") }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      result = await result.json()
      let name = result.name.split(' ')
      setText("Welcome Back " + name[0])
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
          Welcome to Land Ledger,
        </motion.p>
        <motion.p
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView="animate"
        >
          Your Trusted Land Registration Platform
        </motion.p>
        <motion.p
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView="animate1"
        >
          At Land Ledger, we're committed to revolutionizing the way land transactions are handled, making them secure, transparent, and efficient through the power of blockchain technology.        </motion.p>
      </div>
      <div className='image'>
        <HomeAnimation />
      </div>
    </div>
  )
}

