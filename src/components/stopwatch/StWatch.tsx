import { Button } from '@mui/material';
import {
    useEffect,
    useState
} from 'react';
import Lap from './Lap';
import { lapLineProps } from './LapLine';

const StWatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [lapTime, setLapTime] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [laps, setLaps] = useState<lapLineProps[]>([]);
    const [count, setCount] = useState(0)

    useEffect(() => {
        let interval: number;

        if (isRunning) {
            interval = setInterval(() => {
                setElapsedTime(new Date().getTime() - startTime);
            }, 70);
        }

        return () => clearInterval(interval);
    }, [isRunning, startTime]);


    const startStopwatch = () => {
        if (!isRunning) {
            setStartTime(new Date().getTime() - elapsedTime);
            setIsRunning(true);
        }
    };

    const stopStopwatch = () => {
        setIsRunning(false);
    };

    const resetStopwatch = () => {
        setIsRunning(false);
        setElapsedTime(0);
        setLaps([]);
        setCount(0);
        setLapTime(0);
    };

    const handleLaps = () => {
        setCount(count + 1)
        setLaps([...laps, { lapTime: lapTime, time: elapsedTime, count }]);
        setLapTime(0);
    }

    const miliSeconds = Math.floor((elapsedTime % 1000) / 10);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    // const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    let lapMiliSeconds, lapSeconds, lapMinutes;
    if (laps.length) {
        lapMiliSeconds = Math.floor((laps[laps.length - 1]?.lapTime % 100));
        lapSeconds = Math.floor((laps[laps.length - 1].lapTime / 1000) % 60);
        lapMinutes = Math.floor((laps[laps.length - 1].lapTime / (1000 * 60)) % 60);
    }


    console.log({ elapsedTime, startTime, allLaps: laps, lapTime })
    return (
        <>
            <div className="stopwatch-container">
                <div className="stopwatch-time">
                    <div className="displayTime">
                        {
                            ` ${minutes.toString().padStart(2, '0')}`
                        }:
                    </div>
                    <div className="displayTime">
                        {
                            `${seconds.toString().padStart(2, '0')}`
                        }.
                    </div>
                    <div className="displayTime-miliSec">
                        {
                            `${String(miliSeconds).padStart(2, '0')}`
                        }
                    </div>
                </div>
                <div className="stopwatch-buttons">
                    {
                        !isRunning && <>
                            <Button
                                variant="contained"
                                color="warning"
                                className="stopwatch-button"
                                onClick={resetStopwatch}
                            >
                                Reset
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                className="stopwatch-button"
                                onClick={startStopwatch}
                            >
                                Start
                            </Button>
                        </>
                    }
                    {
                        isRunning && <>
                            <Button
                                variant="contained"
                                color="info"
                                className="stopwatch-button"
                                onClick={handleLaps}
                            >
                                LAPS
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                className="stopwatch-button"
                                onClick={stopStopwatch}
                            >
                                Stop
                            </Button>
                        </>
                    }
                </div>
            </div>

            {
                laps.length &&
                <div className='laps-container'>
                    <table style={{ width: "400px" }}>
                        <tr>
                            <th>LAP</th>
                            <th>TIME</th>
                            <th>TOTAL TIME</th>
                        </tr>
                        {
                            <>
                                <tr>
                                    <th>{laps.length + 1}</th>
                                    <th>
                                        {lapMinutes?.toString().padStart(2, "0")}:
                                        {lapSeconds?.toString().padStart(2, "0")}.
                                        {lapMiliSeconds?.toString().padStart(2, "0")}
                                    </th>
                                    <th>
                                        {minutes.toString().padStart(2, "0")}:
                                        {seconds.toString().padStart(2, "0")}.
                                        {miliSeconds.toString().padStart(2, "0")}
                                    </th>
                                </tr>
                                {
                                    [...laps].reverse().map((item, i) => {
                                        console.log({ item: item })
                                        return <tr key={i} >
                                            <Lap item={item} />
                                        </tr>
                                    })
                                }
                            </>
                        }
                    </table>
                </div>
            }
        </>
    );
};

export default StWatch;