import React, { FC, useState, useMemo, useEffect } from 'react';

interface StopwatchProps {
   isRunning: boolean;
}

const Stopwatch: FC<StopwatchProps> = ({ isRunning }) => {
   const [time, setTime] = useState(0);

   useEffect(() => {
      let interval!: NodeJS.Timer;
      if (isRunning) {
         interval = setInterval(() => {
            setTime(time + 1);
         }, 1000);
      } else {
         clearInterval(interval);
         setTime(0);
      }

      return () => clearInterval(interval);
   }, [isRunning, time]);

   const minutes = useMemo(() => {
      const mins = Math.floor(time / 60);
      return mins < 10 ? `0${mins}` : mins;
   }, [time]);
   const seconds = useMemo(() => {
      const secs = time % 60;
      return secs < 10 ? `0${secs}` : secs;
   }, [time]);

   return (
      <span>
         {isRunning ? `${minutes}:${seconds}` : '--:--'}
      </span>
   );
};

export default Stopwatch;
