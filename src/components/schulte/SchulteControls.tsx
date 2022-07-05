import React, { FC } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setTableSize } from '../../store/slices/SchulteSlice';
import { RootState, AppDispatch } from '../../store';
import { Button } from 'react-bootstrap';
import styles from './styles/SchulteControls.module.scss'

interface SchulteControlsProps {
   start: () => void;
   stop: () => void;
}

const SchulteControls: FC<SchulteControlsProps> = ({ start, stop }) => {
   const dispatch = useDispatch<AppDispatch>();
   const isGameStarted = useSelector((state: RootState) => state.schulte.isGameStarted);

   return (
      <div className={styles.controls}>
         {isGameStarted ? (
            <Button variant="danger" onClick={stop}>Stop</Button>
         ) : (
            <Button variant="success" onClick={start}>Start</Button>
         )}
      </div>
   );
};

export default SchulteControls;
