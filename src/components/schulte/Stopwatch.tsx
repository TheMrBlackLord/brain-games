import React, { FC, useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setElapsedTime } from '../../store/slices/SchulteSlice';

interface StopwatchProps {
   isRunning: boolean;
}

const Stopwatch: FC<StopwatchProps> = ({ isRunning }) => {
   const dispatch = useAppDispatch();
   const elapsedTime = useAppSelector((state) => state.schulte.elapsedTime);

   useEffect(() => {
      let interval!: NodeJS.Timer;
      if (isRunning) {
         interval = setInterval(() => {
            dispatch(setElapsedTime(elapsedTime + 1));
         }, 1000);
      } else {
         clearInterval(interval);
      }

      return () => clearInterval(interval);
   }, [isRunning, elapsedTime, dispatch]);

   const minutes = useMemo(() => {
      const mins = Math.floor(elapsedTime / 60);
      return mins < 10 ? `0${mins}` : mins;
   }, [elapsedTime]);
   const seconds = useMemo(() => {
      const secs = elapsedTime % 60;
      return secs < 10 ? `0${secs}` : secs;
   }, [elapsedTime]);

   return (
      <span>
         {isRunning ? `${minutes}:${seconds}` : '--:--'}
      </span>
   );
};

export default Stopwatch;
