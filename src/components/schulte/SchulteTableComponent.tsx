import React, { useState, useMemo, Fragment } from 'react';
import { SchulteTable } from '../../models/schulte/SchulteTable';
import SchulteControls from './SchulteControls';
import Square from './Square';
import Stopwatch from './Stopwatch';
import styles from './styles/SchulteTableComponent.module.scss';

const squareStyleSize = 50;

const SchulteTableComponent = () => {
   const [isGameStarted, setIsGameStarted] = useState(false);
   const [tableSize, setTableSize] = useState(4);
   const [table] = useState(new SchulteTable(tableSize));

   const tableStyleSize = useMemo(() => {
      const borders = 2;
      const margins = 2;
      return (squareStyleSize + margins) * tableSize + borders;
   }, [tableSize]);

   return (
      <div>
         <SchulteControls
            isGameStarted={isGameStarted}
            size={tableSize}
            setSize={setTableSize}
            start={() => setIsGameStarted(true)}
         />
         <div className={styles.info}>
            <p>Time: <strong><Stopwatch isRunning={isGameStarted}/></strong></p>
            <p>Number: <strong>{table.necessaryNumber}</strong></p>
         </div>
         <div
            className={styles.table}
            style={{ width: tableStyleSize, height: tableStyleSize }}
         >
            {table.squares.map((row) => (
               <Fragment key={row.join("")}>
                  {row.map((square) => (
                     <Square
                        style={{
                           width: squareStyleSize,
                           height: squareStyleSize,
                        }}
                        key={square}
                        value={square}
                     />
                  ))}
               </Fragment>
            ))}
         </div>
      </div>
   );
};

export default SchulteTableComponent;
