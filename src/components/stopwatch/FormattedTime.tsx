type TypeFormattedTime = {
  time: number;
  isRunningTime?: boolean;
};

export const FormattedTime = ({
  time, isRunningTime
}: TypeFormattedTime) => {
  // Convert to time format
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  // const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  return isRunningTime
    ? <>
      <span className="displayTime">
        {`${minutes.toString().padStart(2, '0')}`}:
      </span>
      <span className="displayTime">
        {`${seconds.toString().padStart(2, '0')}`}.
      </span>
      <span className="displayTime-miliSec">
        {`${milliseconds.toString().padStart(2, '0')}`}
      </span>
    </>
    : `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
};
