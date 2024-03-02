import React from 'react'
import secure from '../../assets/home_assets/secure.jpeg'
import uf from '../../assets/home_assets/user-freind.jpeg'
import reliable from '../../assets/home_assets/reliable.jpeg'
import { motion } from 'framer-motion'

export default function About() {

    const fadeInAnimationVariants = {
        initial: {
            opacity: 0,
            y: -100,
            scale: 1,
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: [0, 1],
            transition: {
                delay: 0.1,
            }
        },
        animate1: {
            opacity: 1,
            y: 0,
            scale: [0, 1],
            transition: {
                delay: 0.2,
            }
        },
        animate2: {
            opacity: 1,
            y: 0,
            scale: [0, 1],
            transition: {
                delay: 0.3,
            }
        },
    }


    return (
        <div className='about-root' id="about">
            <div>
                <h1>About us</h1>
            </div>
            <div>
                <motion.div
                    variants={fadeInAnimationVariants}
                    initial="initial"
                    whileInView="animate"
                >
                    <div className='text' >
                        Our intuitive user interface makes it easy for you to navigate through the registration process, with step-by-step guidance and helpful resources along the way.                    </div>
                    <motion.img src={uf}
                    ></motion.img>
                    <p>User-Friendly Interface</p>
                </motion.div>
                <motion.div
                    variants={fadeInAnimationVariants}
                    initial="initial"
                    whileInView="animate1"
                >
                    <div className='text'>
                        Say goodbye to lengthy paperwork and bureaucratic delays. With LandLedger, you can complete your land registration tasks efficiently and reliably, saving you time and resources.                    </div>
                    <img src={reliable}></img>
                    <p>Efficient and Reliable</p>
                </motion.div>
                <motion.div
                    variants={fadeInAnimationVariants}
                    initial="initial"
                    whileInView="animate2"
                >
                    <div className='text' >
                        Rest assured knowing that your land registration process is conducted securely and transparently, adhering to the highest standards of data protection and privacy.
                    </div>
                    <img src={secure}></img>
                    <p>Secure and transparent</p>
                </motion.div>
            </div>
        </div>
    )
}
