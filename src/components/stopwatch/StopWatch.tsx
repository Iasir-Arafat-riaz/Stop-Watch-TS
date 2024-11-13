import { Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import "./style/style.css"
import LapLine, { TypeLapItem } from "./LapLine";

const StopWatch = () => {
	const [time, setTime] = useState(0);
	const [lapTime, setLapTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [allLaps, setAllLaps] = useState<TypeLapItem[]>([]);
	const [count, setCount] = useState(0)

	useEffect(() => {
		let intervalId: number;
		if (isRunning) {
			intervalId = setInterval(() => setTime(time + 1), 10);
		}
		return () => clearInterval(intervalId);
	}, [isRunning, time]);

	useEffect(() => {
		let lapsIntervalId: number;
		if (isRunning) {
			lapsIntervalId = setInterval(() => setLapTime(lapTime + 1), 10);
		}
		return () => clearInterval(lapsIntervalId)

	}, [lapTime, isRunning]);

	const handleLaps = useCallback(() => {

		if (isRunning) {
			setCount(count+1)
			setAllLaps([...allLaps, { lapTime: lapTime, time: time, count} as TypeLapItem])
			setLapTime(0);

		}
	}, [lapTime, isRunning])


	const minutes = Math.floor((time % 360000) / 6000);
	const seconds = Math.floor((time % 6000) / 100);
	const milliseconds = time % 100;

	const lapMinutes = Math.floor((lapTime % 360000) / 6000);
	const lapsSeconds = Math.floor((lapTime % 6000) / 100);
	const lapsMilliseconds = lapTime % 100;

	const startAndStop = () => {
		setIsRunning(!isRunning);
	};

	// Method to reset timer back to 0
	const reset = () => {
		setTime(0);
		setLapTime(0);
		setAllLaps([])
		setCount(0)
	};

	console.log({ time })
	console.log({ allLaps })
	// const reversedItems: lapLineProps[] = allLaps.map(item => item).reverse();

	return (
		<>
			<div className="stopwatch-container">
				<div className="stopwatch-time">
					<div className="displayTime">
						{minutes.toString().padStart(2, "0")}:
					</div>
					<div className="displayTime">
						{seconds.toString().padStart(2, "0")}.
					</div>
					<div className="displayTime-miliSec">
						{milliseconds.toString().padStart(2, "0")}
					</div>
				</div>
				<div className="stopwatch-buttons">
					{
						!isRunning && <>
							<Button
								variant="contained"
								color="warning"
								className="stopwatch-button"
								onClick={reset}
							>
								Reset
							</Button>
							<Button
								variant="contained"
								color="success"
								className="stopwatch-button"
								onClick={startAndStop}
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
								onClick={startAndStop}
							>
								Stop
							</Button>
						</>
					}
				</div>
			</div>


			{
				allLaps.length &&
				<div className='laps-container'>
					<table style={{ width: "400px" }}>
						<tr>
							<th>LAP</th>
							<th>TIME</th>
							<th>TOTAL TIME</th>
						</tr>
						{
							<>
								<tr >
									<th>{allLaps.length + 1}</th>
									<th>{lapMinutes.toString().padStart(2, "0")}:
										{lapsSeconds.toString().padStart(2, "0")}.
										{lapsMilliseconds.toString().padStart(2, "0")}
									</th>
									<th>
										{minutes.toString().padStart(2, "0")}:
										{seconds.toString().padStart(2, "0")}.
										{milliseconds.toString().padStart(2, "0")}
									</th>
								</tr>
								{
									[...allLaps].reverse().map((item, i) => {
										console.log({ item: item,})
										return <tr key={i} >
											<LapLine item={item} />
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

export default StopWatch;
