import React from 'react';

export type lapLineProps = {
    lapTime: number,
    time: number,
    count: number
}

 type TypePros = {
    item: lapLineProps;
}

const LapLine = ({ item }: TypePros) => {
    const { lapTime: lapTime, time, count } = item;
    const lapTimeMinutes = Math.floor((lapTime % 360000) / 6000);

    const lapTimeSeconds = Math.floor((lapTime % 6000) / 100);

    const lapTimeMilliseconds = lapTime % 100;

    const minutes = Math.floor((time % 360000) / 6000);

    const seconds = Math.floor((time % 6000) / 100);

    const milliseconds = time % 100;

    console.log({ item })
    return (
        <>
            <th>{count + 1}</th>
            <th>{lapTimeMinutes.toString().padStart(2, "0")}:{lapTimeSeconds.toString().padStart(2, "0")}.{lapTimeMilliseconds.toString().padStart(2, "0")}</th>
            <th>{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}.{milliseconds.toString().padStart(2, "0")}</th>
        </>
    );
};

export default LapLine;