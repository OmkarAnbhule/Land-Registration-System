import React, { useState } from 'react'
import img1 from '../assets/terrains/terrain.jpg'

export default function HomeAnimation() {
    return (
        <div className='container'>
            <div className="map">
                <img width={250} height={250} src={img1}></img>
                <div className='scanner'></div>
            </div>
            <div className='cube'>
                <div className='front'></div>
                <div className='top'></div>
                <div className='right'></div>
            </div>
        </div>
    )
}
