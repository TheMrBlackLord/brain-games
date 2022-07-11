import React, { FC } from 'react';
import { Button } from 'react-bootstrap'
import styles from './styles/DefeatPanel.module.scss';

interface DefeatPanelProps {
   show: boolean;
   level: number;
   start: () => void;
}

const DefeatPanel: FC<DefeatPanelProps> = ({ show, level, start }) => {
   return (
      <>
         {show && (
            <div className={styles.defeat}>
               <p className={styles.level}><small>Level: </small>{level}</p>
               <Button variant="warning" onClick={start}>Restart</Button>
            </div>
         )}
      </>
   );
};

export default DefeatPanel;
