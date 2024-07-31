import React from 'react';
import { Bars } from 'react-loader-spinner';

export default function Loader(props) {
    if (props.status) {
        if (props.otp) {
            return (
                <div className='loader1'>
                    <Bars
                        height="40"
                        width="40"
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
    }
    else {
        return null;
    }
}

