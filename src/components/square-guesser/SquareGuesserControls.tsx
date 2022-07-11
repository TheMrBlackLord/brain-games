import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { useAppSelector } from '../../hooks';

interface SquareGuesserControlsProps { 
   start: () => void;
   stop: () => void;
}

const SquareGuesserControls: FC<SquareGuesserControlsProps> = ({ start, stop }) => {
   const isGameStarted = useAppSelector((state) => state.squareGuesser.isGameStarted);

   return (
      <div>
         {isGameStarted ? (
            <Button variant="danger" onClick={stop}>Stop</Button>
            ) : (
            <Button variant="success" onClick={start}>Start</Button>
         )}
      </div>
   );
};

export default SquareGuesserControls;
