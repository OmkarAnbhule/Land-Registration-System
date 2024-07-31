import React, { useState } from "react";
import img from '../../assets/terrains/maharashtra.jpg'
import { redirect } from "react-router-dom";

export default function HomeAnimation2() {
    const [clickedAreas, setClickedAreas] = useState([]);

    // Event handler for area click
    const handleAreaClick = (areaId) => {
        setClickedAreas((prevClickedAreas) => [...prevClickedAreas, areaId]);
    };
    return (
        <div className="container2">
            <img src={img} usemap="#image-map" />

            <map name="image-map">
                <area
                    coords="97,217,70,211,56,220,62,232,68,245,79,247,84,237,98,236,106,229,101,224"
                    shape="poly"
                    alt="Area 1"
                    onClick={() => handleAreaClick(1)}
                    className="highlighted"
                />
            </map>
            <div>
                <p>Clicked Areas: {clickedAreas.join(', ')}</p>
            </div>
        </div>
    )
}