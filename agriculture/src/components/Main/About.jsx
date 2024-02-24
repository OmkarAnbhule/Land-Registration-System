import React from 'react'
import secure from '../../assets/home_assets/secure.jpeg'
import uf from '../../assets/home_assets/user-freind.jpeg'
import reliable from '../../assets/home_assets/reliable.jpeg'

export default function About() {
    return (
        <div className='about-root' id="about">
            <div>
                <h1>About Us</h1>
            </div>
            <div>
                <div>
                    <div className='text' >
                        Our intuitive user interface makes it easy for you to navigate through the registration process, with step-by-step guidance and helpful resources along the way.                    </div>
                    <img src={uf}></img>
                    <p>User-Friendly Interface</p>
                </div>
                <div>
                    <div className='text'>
                        Say goodbye to lengthy paperwork and bureaucratic delays. With LandLedger, you can complete your land registration tasks efficiently and reliably, saving you time and resources.                    </div>
                    <img src={reliable}></img>
                    <p>Efficient and Reliable</p>
                </div>
                <div>
                    <div className='text' >
                        Rest assured knowing that your land registration process is conducted securely and transparently, adhering to the highest standards of data protection and privacy.
                    </div>
                    <img src={secure}></img>
                    <p>Secure and transparent</p>
                </div>
            </div>
        </div>
    )
}
