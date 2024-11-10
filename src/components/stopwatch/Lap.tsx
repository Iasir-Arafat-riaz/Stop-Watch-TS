import React from 'react';
import { lapLineProps } from './LapLine';

type TypePros = {
    item: lapLineProps;
    children?: JSX.Element[] | JSX.Element
}

const Lap = ({ item }: TypePros) => {

    const { lapTime, time, count } = item;
    const lapMiliSeconds = Math.floor((lapTime % 100));
    const lapSeconds = Math.floor((lapTime / 1000) % 60);
    const lapMinutes = Math.floor((lapTime / (1000 * 60)) % 60);

    const milliseconds = Math.floor((time % 100));
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    return (
        <>
            <th>{count + 1}</th>
            <th>
                {lapMinutes.toString().padStart(2, "0")}:
                {lapSeconds.toString().padStart(2, "0")}.
                {lapMiliSeconds.toString().padStart(2, "0")}
            </th>
            <th>
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}.
                {milliseconds.toString().padStart(2, "0")}
            </th>
        </>
    );
};

export default Lap;