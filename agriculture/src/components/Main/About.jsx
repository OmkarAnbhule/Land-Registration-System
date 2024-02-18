import React from 'react'
import img from '../../assets/terrains/terrain2.jpg'

export default function About() {
    return (
        <div className='about-root'>
            <div>
                <h1>About Us</h1>
            </div>
            <div>
                <div>
                    <img width={300} height={300} src={img}></img>
                    <p>Secure and transparent</p>
                </div>
                <div>
                    <img width={300} height={300} src={img}></img>
                    <p>Efficient and Reliable</p>
                </div>
                <div>
                    <img width={300} height={300} src={img}></img>
                    <p>User-Friendly Interface</p>
                </div>
            </div>
        </div>
    )
}
