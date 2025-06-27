import React, {useState, useEffect} from 'react';

function RenderCurrentTime() {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString())
        }, 1000)
    }, [])


    return (
        <div className='Block'>
            {currentTime}
        </div>
    )
}

export default RenderCurrentTime;