export type TypeLapItem = {
  lapTime: number;
  time: number;
  count: number;
};

type TypePros = {
  item: TypeLapItem;
};

const LapLine = ({ item }: TypePros) => {
  // const { lapTime, time, count } = item;
  const lapTimeMinutes = Math.floor((item.lapTime % 360000) / 6000);
  const lapTimeSeconds = Math.floor((item.lapTime % 6000) / 100);
  const lapTimeMilliseconds = item.lapTime % 100;
  const minutes = Math.floor((item.time % 360000) / 6000);
  const seconds = Math.floor((item.time % 6000) / 100);
  const milliseconds = item.time % 100;

  // console.log({ item });
  return (
    <>
      <th>{item.count + 1}</th>
      <th>{lapTimeMinutes.toString().padStart(2, "0")}:{lapTimeSeconds.toString().padStart(2, "0")}.{lapTimeMilliseconds.toString().padStart(2, "0")}</th>
      <th>{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}.{milliseconds.toString().padStart(2, "0")}</th>
    </>
  );
};

export default LapLine;
