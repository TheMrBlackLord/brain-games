import React, { ChangeEvent, FC, Fragment } from 'react';
import {
   setTableSize,
   setCellStyleSize,
   setCellFontSize,
} from "../../store/slices/SchulteSlice";
import { Button, Form } from 'react-bootstrap';
import styles from './styles/SchulteControls.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks';

interface SchulteControlsProps {
   start: () => void;
   stop: () => void;
}

const SchulteControls: FC<SchulteControlsProps> = ({ start, stop }) => {
   const dispatch = useAppDispatch();
   const { isGameStarted, tableSize, cellStyleSize } = useAppSelector(
      (state) => state.schulte
   );

   const cellStyleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setCellStyleSize(+e.target.value));
      dispatch(setCellFontSize(+e.target.value));
   }
   const changeSize = (e: ChangeEvent<HTMLInputElement>) => {
      const value = +e.target.value;
      if (value >= 5 && value <= 10) {
         dispatch(setTableSize(value));
      }
   }

   return (
      <div className={styles.controls}>
         {isGameStarted ? (
            <Button variant="danger" onClick={stop}>
               Stop
            </Button>
         ) : (
            <Fragment>
               <div className={styles.startButtons}>
                  <Button variant="success" onClick={start}>
                     Start
                  </Button>
                  <Form.Label className="my-0">Size:</Form.Label>
                  <Form.Control
                     type="number"
                     value={tableSize}
                     onChange={changeSize}
                     min="5"
                     max="10"
                  ></Form.Control>
               </div>
            </Fragment>
         )}
         <Form.Range
            title={`${cellStyleSize}`}
            value={cellStyleSize}
            onChange={cellStyleHandler}
            min={40}
            max={100}
         />
      </div>
   );
};

export default SchulteControls;
