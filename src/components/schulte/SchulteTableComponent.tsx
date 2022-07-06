import React, { useState, useMemo, Fragment } from 'react';
import { setIsGameStarted } from '../../store/slices/SchulteSlice';
import useGameStore from './hooks/useGameStore';
import { SchulteTable } from '../../models/schulte/SchulteTable';
import SchulteControls from './SchulteControls';
import CellComponent from './CellComponent';
import Stopwatch from './Stopwatch';
import styles from './styles/SchulteTableComponent.module.scss';

const SchulteTableComponent = () => {
   const {
      dispatch,
      tableSize,
      isGameStarted,
      cellStyleSize,
      cellFontSize,
   } = useGameStore();
   const [necessaryNumber, setNecessaryNumber] = useState<number>(1);
   const [table] = useState<SchulteTable>(new SchulteTable(tableSize));

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
      // table.reset(tableSize);
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
            {cells.map((row, y) => (
               <Fragment key={row[y].ids[0]}>
                  {row.map((cell, x) => (
                     <CellComponent
                        key={cell.ids[1]}
                        style={{
                           width: cellStyleSize,
                           height: cellStyleSize,
                           fontSize: cellFontSize,
                        }}
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
