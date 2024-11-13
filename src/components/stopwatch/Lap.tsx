import { TypeLapItem } from './LapLine';
import { FormattedTime } from './FormattedTime';

type TypePros = {
  item: TypeLapItem;
};

const Lap = ({ item }: TypePros) => {
  // const { lapTime, time, count } = item;

  return (
    <>
      <th>{item.count + 1}</th>
      <th>
        <FormattedTime time={item.lapTime} />
      </th>
      <th>
        <FormattedTime time={item.time} />
      </th>
    </>
  );
};

export default Lap;
