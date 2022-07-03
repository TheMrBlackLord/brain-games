import React, { Dispatch, SetStateAction, FC } from 'react';
import { Button } from 'react-bootstrap';
import styles from './styles/SchulteControls.module.scss'

interface SchulteControlsProps {
   isGameStarted: boolean;
   size: number;
   setSize: Dispatch<SetStateAction<number>>;
   start: () => void;
   reset?: () => void;
}

const SchulteControls: FC<SchulteControlsProps> = ({ isGameStarted, size, setSize, start }) => {
   return (
      <div className={styles.controls}>
         {isGameStarted ? (
            <Button variant="danger">Reset</Button>
         ) : (
            <Button variant="success" onClick={start}>Start</Button>
         )}
      </div>
   );
};

export default SchulteControls;
