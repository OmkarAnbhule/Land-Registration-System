import React, { useEffect, useState } from 'react'

export default function Timer(props) {
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const currentDate = new Date();
        const selectedDate = new Date(props.date * 1000);

        const timeDiffMilliseconds = selectedDate - currentDate;
        if (timeDiffMilliseconds < 0) {
            return;
        }
        setHours(Math.floor(timeDiffMilliseconds / (1000 * 60 * 60)));
        setMinutes(Math.floor((timeDiffMilliseconds % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((timeDiffMilliseconds % (1000 * 60)) / 1000));
        let interval = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    if (hours === 0)
                        clearInterval(interval);
                    else {
                        setHours(hours - 1);
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                    // Handle countdown finish event here
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } else {
                setSeconds(seconds - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [minutes, seconds , hours , props]);
    return (
        <div>
            {`${hours}:${minutes}:${seconds} `}
        </div>
    )
}
