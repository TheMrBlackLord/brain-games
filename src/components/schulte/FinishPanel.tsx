import React, { FC, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import styles from './styles/FinishPanel.module.scss'

interface FinishPanelProps {
   show: boolean;
   time: number;
   restart: () => void;
}

const formatTime = (time: number): string => {
   let minutes: number | string = Math.floor(time / 60);
   let seconds: number | string = time % 60;
   minutes = minutes < 10 ? `0${minutes}` : minutes;
   seconds = seconds < 10 ? `0${seconds}` : seconds;
   return `${minutes}:${seconds}`;
}

const FinishPanel: FC<FinishPanelProps> = ({ show, time, restart }) => {
   return (
      <Fragment>
         {show && (
            <div className={styles.finish}>
               <span className={styles.time}>{formatTime(time)}</span>
               <Button variant="warning" onClick={restart}>
                  Restart
               </Button>
            </div>
         )}
      </Fragment>
   );
};

export default FinishPanel;
