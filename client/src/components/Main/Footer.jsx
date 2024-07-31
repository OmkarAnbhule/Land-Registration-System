import React from "react";
import { Link as Scroll } from "react-scroll"
import { Link as Router } from "react-router-dom"
import { motion } from "framer-motion"

export default function Footer() {

    const footervariants = {
        initial: {
            opactiy: 0,
            y: 50,
        },
        animate: {
            opactiy: 1,
            y: 0,
            transition: {
                delay: 0.1,
            },
        },
        animate1: {
            opactiy: 1,
            y: 0,
            transition: {
                delay: 0.2,
            },
        },
        animate2: {
            opactiy: 1,
            y: 0,
            transition: {
                delay: 0.3,
            },
        },
        animate3: {
            opactiy: 1,
            y: 0,
            transition: {
                delay: 0.4,
            },
        },
        animate4: {
            opactiy: 1,
            y: 0,
            transition: {
                delay: 0.5,
            },
        },
    }

    return (
        <div className="footer-root" id='contact'>
            <div className="links">
                <div>
                    <motion.h2
                        variants={footervariants}
                        initial="initial"
                        whileInView="animate"
                    >Website links</motion.h2>
                    <Scroll to="home" smooth={true} spy={true} offset={-100} duration={500}><motion.p
                        variants={footervariants}
                        initial="initial"
                        whileInView="animate1">Home</motion.p></Scroll>
                    <Scroll to="about" smooth={true} spy={true} offset={-100} duration={500}><motion.p
                        variants={footervariants}
                        initial="initial"
                        whileInView="animate2"
                    >About</motion.p></Scroll>
                    <Scroll to="contact" smooth={true} spy={true} offset={-100} duration={500}><motion.p
                        variants={footervariants}
                        initial="initial"
                        whileInView="animate3"
                    >Contact</motion.p></Scroll>
                    <Scroll to="home" smooth={true} spy={true} offset={-100} duration={500}><motion.p
                        variants={footervariants}
                        initial="initial"
                        whileInView="animate4"
                    >Back to top</motion.p></Scroll>
                </div>
                <div>
                    <motion.h2
                        variants={footervariants}
                        initial="initial"
                        whileInView="animate1"
                    >Connect Us</motion.h2>
                    <motion.p
                        variants={footervariants}
                        initial="initial"
                        whileInView="animate1"
                    >Facebook</motion.p>
                    <motion.p
                        variants={footervariants}
                        initial="initial"
                        whileInView="animate2"
                    >Github</motion.p>
                    <motion.p
                        variants={footervariants}
                        initial="initial"
                        whileInView="animate3"
                    >
                        <a href="https://www.instagram.com/land.ledger/">
                            Instagram
                        </a>
                    </motion.p>
                </div>
                <div>
                    <motion.h2
                        variants={footervariants}
                        initial="initial"
                        whileInView="animate"
                    >Access Links</motion.h2>
                    <Router to="/register" style={{ textDecoration: 'none', color: 'black' }}>
                        <motion.p
                            variants={footervariants}
                            initial="initial"
                            whileInView="animate1"
                        >SignIn</motion.p>
                    </Router>
                    <Router to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                        <motion.p
                            variants={footervariants}
                            initial="initial"
                            whileInView="animate2"
                        >Login</motion.p>
                    </Router>
                </div>
            </div>
            <div className="divider"></div>
            <div className="icons">
                <i className="bi bi-facebook"></i>
                <i className="bi bi-github"></i>
                <i className="bi bi-twitter-x"></i>
                <i className="bi bi-linkedin"></i>
                <a href="https://www.instagram.com/land.ledger/"><i className="bi bi-instagram"></i></a>
            </div>
            <div className="text">
                <p>© Copyright Since 2003. All Rights Reserved</p>
                <div className="bottom-links">
                    <p>Privacy Policy</p>
                    <p>Terms & Services</p>
                    <p>Website Accessbility</p>
                    <p>Manage Cookies</p>
                </div>
            </div>
        </div>
    )
}