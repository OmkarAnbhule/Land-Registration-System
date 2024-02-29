import React from "react";

export default function Steps() {


    return (
        <div className="steps-root">
            <h1>Steps</h1>
            <div className="step-container">
                <div className="step " style={{ left: '0px' }}>
                    <h2>step 1</h2>
                    <p>Property Registration Request</p>
                </div>
                <div className="step " style={{ left: '250px' }}>
                    <h2>step 2</h2>
                    <p>Verify ownership documents and property details</p>
                </div>
                <div className="step " style={{ left: '250px' }}>
                    <h2>step 3</h2>
                    <p>Confirm compliance with regulatory requirements</p>
                </div>
                <div className="step " style={{ left: '500px' }}>
                    <h2>step 4</h2>
                    <p>Smart Contract Execution</p>
                </div>
                <div className="step " style={{ left: '500px' }}>
                    <h2>step 5</h2>
                    <p>Decentralized Ledger Update</p>
                </div>
                <div className="step " style={{ left: '750px' }}>
                    <h2>step 6</h2>
                    <p>Transaction Confirmation</p>
                </div>
                <div className="step " style={{ left: '750px' }}>
                    <h2>step 7</h2>
                    <p>Ownership Confirmation</p>
                </div>
            </div>
        </div>
    )

}