import React from 'react';
import { lapLineProps } from './LapLine';

type TypePros = {
    item: lapLineProps;
    formatTime: (time: number, isRunning?: boolean) => React.ReactNode | string;
    children?: JSX.Element[] | JSX.Element
}

const Lap = ({ item, formatTime }: TypePros) => {

    const { lapTime, time, count } = item;
    return (
        <>
            <th>{count + 1}</th>
            <th>
                {formatTime(lapTime)}
            </th>
            <th>
                {formatTime(time)}
            </th>
        </>
    );
};

export default Lap;