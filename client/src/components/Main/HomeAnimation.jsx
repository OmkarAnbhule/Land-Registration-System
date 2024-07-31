import React, { useEffect, useState } from 'react'
import img1 from '../../assets/terrains/terrain4.jpg'
import img2 from '../../assets/terrains/terrain2.jpg'
import img3 from '../../assets/terrains/terrain3.jpg'


const images = [img1,img3];
export default function HomeAnimation() {
    const [currentIndex,setCurrentIndex] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            if(currentIndex === images.length - 1) {
                setCurrentIndex(0);
            }
            else {
                 setCurrentIndex(currentIndex + 1);
            }
           
        }, 8000)
        return () => clearInterval(intervalId);
    }, [currentIndex])

    return (
        <div className='container'>
            <div className="map">
                <img width={250} height={250} src={images[currentIndex]}></img>
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
