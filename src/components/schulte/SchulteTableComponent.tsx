import React, { useState, useMemo, Fragment } from 'react';
import { setIsGameStarted, setElapsedTime } from '../../store/slices/SchulteSlice';
import { SchulteTable } from '../../models/schulte/SchulteTable';
import SchulteControls from './SchulteControls';
import CellComponent from './CellComponent';
import Stopwatch from './Stopwatch';
import FinishPanel from './FinishPanel';
import styles from './styles/SchulteTableComponent.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';

const SchulteTableComponent = () => {
   const dispatch = useAppDispatch();
   const {
      tableSize,
      isGameStarted,
      cellStyleSize,
      elapsedTime,
   } = useAppSelector((state) => state.schulte);
   const [necessaryNumber, setNecessaryNumber] = useState<number>(1);
   const [table] = useState<SchulteTable>(new SchulteTable(tableSize));
   const [isFinish, setIsFinish] = useState<boolean>(false);

   const tableStyleSize = useMemo(() => {
      const borders = 2; // border: 1px for each side
      const margins = 2; // margin 1px 
      return (cellStyleSize + margins) * tableSize + borders;
   }, [tableSize, cellStyleSize]);

   const cells = useMemo(() => {
      table.reset(tableSize);
      return table.cells;
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [tableSize, table, isGameStarted]);

   const startGame = () => {
      setIsFinish(false);
      dispatch(setIsGameStarted(true));
      dispatch(setElapsedTime(0));
   }
   const stopGame = () => {
      dispatch(setIsGameStarted(false));
      setNecessaryNumber(1);
   }
   const victory = () => {
      stopGame();
      setIsFinish(true);
   }
   const click = (row: number, col: number) => {
      const cell = table.getCellValue(row, col);
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
         <SchulteControls start={startGame} stop={stopGame} />
         <div className={styles.info}>
            <p>
               Time:&nbsp;
               <strong>
                  <Stopwatch isRunning={isGameStarted} />
               </strong>
            </p>
            <p>
               Number:&nbsp;
               <strong>{isGameStarted ? necessaryNumber : "-"}</strong>
            </p>
         </div>
         <div
            className={styles.table}
            style={{ width: tableStyleSize, height: tableStyleSize }}
         >
            <FinishPanel
               show={isFinish}
               restart={startGame}
               time={elapsedTime}
            />
            {cells.map((row, y) => (
               <Fragment key={row[y].id}>
                  {row.map((cell, x) => (
                     <CellComponent
                        key={cell.id}
                        click={() => click(y, x)}
                        value={table.getCellValue(y, x)}
                     />
                  ))}
               </Fragment>
            ))}
         </div>
      </div>
   );
};

export default SchulteTableComponent;
