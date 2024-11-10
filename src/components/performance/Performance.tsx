import React, { useCallback, useMemo, useState } from 'react';
import Title from './Title';
import ShowCount from './ShowCount';
import Button from './Button';

const Performance = () => {
  const [count1, setCount1] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);

  const incrementByOne = useCallback(() => {
    setCount1((prev) => prev + 1);
  }, [])
  const incrementByFive = useCallback(() => {
    setCount2((prev) => prev + 5);
  }, [])

  const isEvenOdd = useMemo(
    () => {
      let i = 0
      // while (i < 1000000000) {
      while (i < 10000) {
        console.log("first")
        i++
      }
      return count1 % 2 === 0;
    }, []);

  return (
    <div>
      <Title />
      <h2>{isEvenOdd ? "Even" : "Odd"}</h2>
      <ShowCount count={count1} title="counter1" />
      <Button handleClick={incrementByOne}>
        Increment By one
      </Button>
      <hr />
      <ShowCount count={count2} title="counter2" />
      <Button handleClick={incrementByFive}>
        Increment By Five
      </Button>
    </div>
  );
};

export default Performance;