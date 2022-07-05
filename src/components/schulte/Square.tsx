import React, { FC, CSSProperties, useMemo, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from '../../store';
import styles from './styles/Square.module.scss';
import { sample } from 'lodash'

interface SquareProps {
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

const Square: FC<SquareProps> = ({ value, style, click }) => {
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
         className={styles.square}
         style={{ ...style, color }}
         onClick={onClick}
      >
         {hidden || !isGameStarted ? "" : value}
      </div>
   );
};

export default Square;
