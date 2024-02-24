import React from "react";

export default function Steps(){


    return(
        <div className="steps-root">
            <h1>Steps</h1>
            <div className="step-container">
                <div className="step " style={{left:'0px'}}>
                    <p>Property Registration Request</p>
                </div>
                <div className="step " style={{left:'250px'}}>
                    <p>Verify ownership documents and property details</p>
                </div>
                <div className="step " style={{left:'250px'}}>
                    <p>Confirm compliance with regulatory requirements</p>
                </div>
                <div className="step " style={{left:'500px'}}>
                    <p>Smart Contract Execution</p>
                </div>
                <div className="step " style={{left:'500px'}}>
                    <p>Decentralized Ledger Update</p>
                </div>
                <div className="step " style={{left:'750px'}}>
                    <p>Transaction Confirmation</p>
                </div>
                <div className="step " style={{left:'750px'}}>
                    <p>Ownership Confirmation</p>
                </div>
                <div className="step " style={{left:'1000px'}}></div>
                <div className="step " style={{left:'1000px'}}></div>
            </div>
        </div>
    )

}