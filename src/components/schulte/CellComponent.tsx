import React, { FC, useMemo, useState, useEffect } from 'react';
import { sample } from 'lodash'
import { useSelector } from "react-redux";
import { RootState } from '../../store';
import styles from './styles/Cell.module.scss';

interface CellComponentProps {
   value: number;
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

const CellComponent: FC<CellComponentProps> = ({ value, click }) => {
   const isGameStarted = useSelector((state: RootState) => state.schulte.isGameStarted);
   const cellStyleSize = useSelector((state: RootState) => state.schulte.cellStyleSize);
   const cellFontSize = useSelector((state: RootState) => state.schulte.cellFontSize);
   const [hidden, setHidden] = useState<boolean>(!isGameStarted);

   const backgroundColor = useMemo(() => {
      return sample(colors);
   }, []);

   useEffect(() => {
      if (isGameStarted) {
         setHidden(false);
      }
   }, [isGameStarted]);

   const onClick = () => {
      if (isGameStarted) {
         setHidden(click());
      }
   };

   return (
      <div
         className={styles.cell}
         style={{
            width: cellStyleSize,
            height: cellStyleSize,
            fontSize: cellFontSize,
            backgroundColor:
               hidden ? "transparent" : backgroundColor,
         }}
         onClick={onClick}
      >
         {hidden ? "" : value}
      </div>
   );
};

export default CellComponent;
