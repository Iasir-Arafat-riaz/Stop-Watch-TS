import {
  Button,
  Typography
} from '@mui/material';
import {
  useCallback,
  useEffect,
  useState
} from 'react';
import Lap from './Lap';
import { TypeLapItem } from './LapLine';
import { FormattedTime } from './FormattedTime';


export const StopwatchTwo = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [laps, setLaps] = useState<TypeLapItem[]>([]);
  // const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = setInterval(() => setElapsedTime(new Date().getTime() - startTime), 20);
    }

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const startStopwatch = useCallback(() => {
    if (!isRunning) {
      console.log({ "StartButton": elapsedTime });
      setStartTime(new Date().getTime() - elapsedTime);
      setIsRunning(true);
    }
  }, [isRunning, elapsedTime]);

  const stopStopwatch = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetStopwatch = useCallback(() => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
    // setCount(0);
  }, []);

  const handleLaps = useCallback(() => {
    // setCount(count + 1);
    // console.log({ laps, count });

    setLaps(laps => [...laps, {
      lapTime: (laps.length === 0) ? elapsedTime : (elapsedTime - laps[laps.length - 1].time),
      time: elapsedTime,
      count: laps.length
    }]);
  }, [elapsedTime]);

  // console.log({ elapsedTime, startTime, allLaps: laps, lapTime });

  return (
    <>
      <Typography
        align='center'
        className="stop-watch-header"
      >
        Simple Stop Watch
      </Typography>
      <div className="stopwatch-container">
        <div className="stopwatch-time">
          {/* {FormattedTime(elapsedTime, true)} */}
          <FormattedTime
            time={elapsedTime}
            isRunningTime={true}
          />
        </div>

        <div className="stopwatch-buttons">
          {
            isRunning
              ? <>
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
              : <>
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
        </div>
      </div>

      {
        laps.length > 0 &&
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
                    <FormattedTime time={elapsedTime - laps[laps.length - 1].time} />
                  </th>
                  <th>
                    <FormattedTime time={elapsedTime} />
                  </th>
                </tr>

                {
                  [...laps].reverse().map((item, i) => {
                    return <tr key={i}>
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
