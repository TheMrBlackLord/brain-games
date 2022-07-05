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
   "#F0C02D",
   "#F5F5F5",
   "#94D24A",
   "#BD80F6",
   "#E1526E",
   "#6898CB",
];

const Cell: FC<CellProps> = ({ value, style, click }) => {
   const isGameStarted = useSelector((state: RootState) => state.schulte.isGameStarted);
   const [hidden, setHidden] = useState(!isGameStarted);

   const backgroundColor = useMemo(() => {
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
         style={{ 
            ...style,
            backgroundColor:
               hidden || !isGameStarted ? "transparent" : backgroundColor,
         }}
         onClick={onClick}
      >
         {hidden || !isGameStarted ? "" : value}
      </div>
   );
};

export default Cell;
