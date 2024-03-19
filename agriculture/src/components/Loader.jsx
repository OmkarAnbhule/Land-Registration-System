import React from 'react';
import { Bars } from 'react-loader-spinner';

export default class Loader {
    constructor(status) {
        if (status == 'open') {
            console.log(status)
            return (
                <div className='loader'>
                    <Bars
                        height="80"
                        width="80"
                        color="white"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            )
        }
        else {
            return null;
        }
    }
}

