import React, { useState } from 'react'
import img1 from '../assets/terrains/terrain3.jpg'
import img2 from '../assets/terrains/terrain.jpg'

export default function HomeAnimation() {
    const [img,setImg] = useState(null);
    const getImage = () => {
        if(img == null){
            setImg(img1)   
        }
        else{
            if(img == img1){
                setImg(img2)
            }
            
        }
        return img
    }
    return (
        <div className='container'>
            <div className="map">
                <img width={250} height={250} src={getImage()}></img>
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
