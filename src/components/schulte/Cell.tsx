import React, { FC, CSSProperties, useMemo, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from '../../store';
import styles from './styles/Cell.module.scss';
import { sample } from 'lodash'

interface CellProps {
   value: number;
   style?: CSSProperties;
   click: () => boolean;
}

const colors: string[] = [
   "green",
   "red",
   "black",
   "blue",
   "magenta",
   "orange"
];

const Cell: FC<CellProps> = ({ value, style, click }) => {
   const isGameStarted = useSelector((state: RootState) => state.schulte.isGameStarted);
   const [hidden, setHidden] = useState(!isGameStarted);

   const color = useMemo(() => {
      return sample(colors);
   }, []);

   const onClick = () => {
      if (isGameStarted) {
         const result = click();
         if (result) {
            setHidden(true);
         }
      }
   };

   return (
      <div
         className={styles.cell}
         style={{ ...style, color }}
         onClick={onClick}
      >
         {hidden || !isGameStarted ? "" : value}
      </div>
   );
};

export default Cell;
