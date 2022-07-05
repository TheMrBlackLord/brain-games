import React, { useState, useMemo, Fragment } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setIsGameStarted } from '../../store/slices/SchulteSlice';
import { RootState, AppDispatch } from '../../store';
import { SchulteTable } from '../../models/schulte/SchulteTable';
import SchulteControls from './SchulteControls';
import Cell from './Cell';
import Stopwatch from './Stopwatch';
import styles from './styles/SchulteTableComponent.module.scss';

const cellStyleSize = 50;

const SchulteTableComponent = () => {
   const dispatch = useDispatch<AppDispatch>();
   const tableSize = useSelector((state: RootState) => state.schulte.tableSize);
   const isGameStarted = useSelector((state: RootState) => state.schulte.isGameStarted);
   const [necessaryNumber, setNecessaryNumber] = useState(1);
   const [table] = useState(new SchulteTable(tableSize));

   const tableStyleSize = useMemo(() => {
      const borders = 2;
      const margins = 2;
      return (cellStyleSize + margins) * tableSize + borders;
   }, [tableSize]);

   const startGame = () => {
      table.reset(tableSize);
      dispatch(setIsGameStarted(true));
   }
   const stopGame = () => {
      dispatch(setIsGameStarted(false));
      setNecessaryNumber(1);
   }
   const victory = () => {
      stopGame();
      console.log('victory');
   }
   const click = (row: number, col: number) => {
      const cell = table.getCell(row, col);
      const isCorrect = cell === necessaryNumber;
      if (isCorrect) {
         if (necessaryNumber === tableSize ** 2) {
            victory();
         } else {
            setNecessaryNumber(necessaryNumber + 1);
         }
      }
      return isCorrect;
   }

   return (
      <div>
         <SchulteControls
            start={startGame}
            stop={stopGame}
         />
         <div className={styles.info}>
            <p>Time: <strong><Stopwatch isRunning={isGameStarted}/></strong></p>
            <p>Number: <strong>{isGameStarted ? necessaryNumber : '-'}</strong></p>
         </div>
         <div
            className={styles.table}
            style={{ width: tableStyleSize, height: tableStyleSize }}
         >
            {table.cells.map((row, y) => (
               <Fragment key={row.join("")}>
                  {row.map((cell, x) => (
                     <Cell
                        key={cell}
                        style={{
                           width: cellStyleSize,
                           height: cellStyleSize,
                        }}
                        click={() => click(y, x)}
                        value={cell}
                     />
                  ))}
               </Fragment>
            ))}
         </div>
      </div>
   );
};

export default SchulteTableComponent;
