import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { SquareGuesser } from '../../models/square-guesser/SquareGuesser';
import { AppDispatch, RootState } from '../../store';
import { setIsGameStarted } from '../../store/slices/SquareGuesserSlice';
import DefeatPanel from './DefeatPanel';
import SquareComponent from './SquareComponent';
import SquareGuesserControls from './SquareGuesserControls';
import styles from './styles/SquareGuesserComponent.module.scss'

const squareGuesser = new SquareGuesser();
// const animationDuration = 500;
// const defaultAnimation: { [key: number]: boolean } = {
//    0: false,
//    1: false,
//    2: false,
//    3: false,
//    4: false,
//    5: false,
//    6: false,
//    7: false,
//    8: false,
// };

const SquareGuesserComponent = () => {
   const dispatch = useDispatch<AppDispatch>();
   const isGameStarted = useSelector((state: RootState) => state.squareGuesser.isGameStarted);
   const [level, setLevel] = useState<number>(squareGuesser.level);
   const [defeatPanelVisible, setDefeatPanelVisible] = useState<boolean>(false);
   // const [animationIsOn, setAnimationIsOn] = useState<typeof defaultAnimation>(defaultAnimation);

   const startGame = () => {
      dispatch(setIsGameStarted(true));
      newSequence();
      setDefeatPanelVisible(false);
      setLevel(squareGuesser.level);
   };
   const stopGame = () => {
      dispatch(setIsGameStarted(false));
      squareGuesser.reset();
      setDefeatPanelVisible(true);
   };
   const clickHandler = (id: number) => {
      if (isGameStarted) {
         const { isCorrect, isLast } = squareGuesser.check(id);
         if (isCorrect && isLast) {
            newSequence();
         }
         if (!isCorrect) {
            stopGame();
         }
      }
   };
   const newSequence = () => {
      squareGuesser.buildNewSequence();
      const sequence = squareGuesser.sequence;
      console.log(sequence);
      // sequence.forEach((square, i) => {
      //    const duration = animationDuration * i;
      // })
      setLevel(squareGuesser.level);
   }; 

   return (
      <div>
         <SquareGuesserControls start={startGame} stop={stopGame} />
         <div className={styles.info}>
            <p>
               Level:&nbsp;
               <strong>{isGameStarted ? level : "-"}</strong>
            </p>
         </div>
         <div className={styles.field}>
            <DefeatPanel show={defeatPanelVisible} level={level} start={startGame}/>
            {squareGuesser.field.map((row, y) => (
               <Fragment key={row[y].id}>
                  {row.map((square) => (
                     <SquareComponent
                        key={square.id}
                        click={() => clickHandler(square.id)}
                        value={square.id}
                     />
                  ))}
               </Fragment>
            ))}
         </div>
      </div>
   );
};

export default SquareGuesserComponent;
