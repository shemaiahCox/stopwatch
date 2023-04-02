import { useState, useRef } from "react"

export default function Stopwatch() {
    const [startTime, setStartTime] = useState(null);
    const [now, setNow] = useState(null)
    const [status, setStatus] = useState('stop')

    const intervalIdRef = useRef(null)

    function handleStart() {
        setStartTime(Date.now());
        setNow(Date.now())

        clearInterval(intervalIdRef.current)
        intervalIdRef.current = setInterval(() => {
            setNow(Date.now())
        }, 100) 

        setStatus('stop')
             
    }

    function handleStop() {
        if (status === 'stop') {
            clearInterval(intervalIdRef.current);
            setStatus('reset')
        } else if (status === 'reset') {
            setStartTime(null);
            setNow(null)
            clearInterval(intervalIdRef.current);
            setStatus('stop')
        }
    }
    
    let time = 0
    let timePlaceholder = '00:00'

    let millis = Math.abs(now - startTime)
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);

    let millisString = Math.abs(now - startTime).toString()

    if (startTime != null && now != null) {
        time = (minutes < 10 ? '0' : '') + Math.abs(minutes) + ":" + (seconds < 10 ? '0' : '') + Math.abs(seconds) + ':' + millisString.substring(millisString.length - 2)
    }

    return (
        <div className="stopwatch-container">
            <div className="logo"></div>
            <div className="screen">
                <h1>{startTime ? time : timePlaceholder}</h1>
            </div>
            <div className="controls">
                <button 
                    className="start-stop"
                    onClick={() => {
                        handleStart()
                    }}
                >
                        Start
                </button>
                <button 
                    className="reset"
                    onClick={handleStop}
                >
                    {status === 'stop' ? 'Stop' : 'Reset'}
                </button>
            </div>
        </div>
    )
}