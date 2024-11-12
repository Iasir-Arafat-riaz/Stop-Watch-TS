import { Button, Typography } from '@mui/material';
import {
	useEffect,
	useState
} from 'react';
import Lap from './Lap';
import { lapLineProps } from './LapLine';

export const StopWatchTwo = () => {
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [elapsedTime, setElapsedTime] = useState<number>(0);
	const [startTime, setStartTime] = useState<number>(0);
	const [laps, setLaps] = useState<lapLineProps[]>([]);
	const [count, setCount] = useState<number>(0)

	useEffect(() => {
		let interval: number;

		if (isRunning) {
			interval = setInterval(() => {
				setElapsedTime(new Date().getTime() - startTime);
			}, 20);
		}

		return () => clearInterval(interval);
	}, [isRunning, startTime]);

	const startStopwatch = () => {
		if (!isRunning) {
			console.log({ "StartButton": elapsedTime })
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
	};
	const handleLaps = () => {
		setCount(count + 1)
		console.log({ laps, count })
		setLaps(laps => [...laps, {
			lapTime: (laps.length === 0) ? elapsedTime : (elapsedTime - laps[laps.length - 1].time),
			time: elapsedTime,
			count
		}]);
	}

	const formatTime = (time: number, isRunningTime = false) => {
		// Convert to time format
		const milliseconds = Math.floor((time % 1000) / 10);
		const seconds = Math.floor((time / 1000) % 60);
		const minutes = Math.floor((time / (1000 * 60)) % 60);
		// const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

		return isRunningTime
			? <>
				{/* <div className="displayTime">
					{
						` ${hours.toString().padStart(2, '0')}`
					}:
				</div> */}
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
						`${milliseconds.toString().padStart(2, '0')}`
					}
				</div>
			</>
			: `${minutes.toString().padStart(2, "0")}:
			${seconds.toString().padStart(2, "0")}.
			${milliseconds.toString().padStart(2, "0")}`;
	};
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
				<>
					<div className="stopwatch-time">
						<>{formatTime(elapsedTime, true)}</>
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
				</>
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
										{formatTime(elapsedTime - laps[laps.length - 1].time)}
									</th>
									<th>
										{formatTime(elapsedTime)}
									</th>
								</tr>
								{
									[...laps].reverse().map((item, i) => {
										return <tr key={i} >
											<Lap
												item={item}
												formatTime={formatTime}
											/>
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