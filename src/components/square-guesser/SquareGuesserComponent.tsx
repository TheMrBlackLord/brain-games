import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { SquareGuesser } from '../../models/square-guesser/SquareGuesser';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { AppDispatch, RootState } from '../../store';
import { setIsGameStarted } from '../../store/slices/SquareGuesserSlice';
import { Square } from '../../models/square-guesser/Square';
import DefeatPanel from './DefeatPanel';
import SquareComponent from './SquareComponent';
import SquareGuesserControls from './SquareGuesserControls';
import styles from './styles/SquareGuesserComponent.module.scss'

const squareGuesser = new SquareGuesser();
const animationDuration = 500;
const delayUntilNext = 100;
const defaultAnimation: { [key: number]: boolean } = {
   0: false,
   1: false,
   2: false,
   3: false,
   4: false,
   5: false,
   6: false,
   7: false,
   8: false,
};

const SquareGuesserComponent = () => {
   const dispatch = useDispatch<AppDispatch>();
   const isGameStarted = useSelector((state: RootState) => state.squareGuesser.isGameStarted);
   const [level, setLevel] = useState<number>(squareGuesser.level);
   const [sequence, setSequence] = useState<Square[]>(squareGuesser.sequence);
   const [isAnimating, setIsAnimating] = useState<boolean>(false);
   const [defeatPanelVisible, setDefeatPanelVisible] = useState<boolean>(false);
   const [animationIsOn, setAnimationIsOn] = useState<typeof defaultAnimation>(defaultAnimation);

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
      if (isGameStarted && !isAnimating) {
         const { isCorrect, isLast } = squareGuesser.check(id);
         if (isCorrect && isLast) {
            newSequence();
         }
         if (!isCorrect) {
            stopGame();
         }
      }
   };

   const animateSequence = () => {
      setIsAnimating(true);
      setTimeout(() => {
         setIsAnimating(false);
      }, (animationDuration + delayUntilNext) * sequence.length);
      
      sequence.forEach((square, i) => {
         setTimeout(() => {
            setAnimationIsOn((prev) => ({ ...prev, [square.id]: true }));
            setTimeout(() => {
               setAnimationIsOn((prev) => ({ ...prev, [square.id]: false }));
            }, animationDuration);
         }, (animationDuration + delayUntilNext) * i);
      });
   };
   const newSequence = () => {
      squareGuesser.buildNewSequence();
      setSequence(squareGuesser.sequence);
      setLevel(squareGuesser.level);
   };

   useEffect(animateSequence, [sequence]);

   return (
      <div>
         <SquareGuesserControls start={startGame} stop={stopGame} />
         <div className={styles.info}>
            <p>
               Level:&nbsp;
               <strong>{isGameStarted ? level : "-"}</strong>
            </p>
         </div>
         <TransitionGroup className={styles.field}>
            <DefeatPanel
               show={defeatPanelVisible}
               level={level}
               start={startGame}
            />
            {squareGuesser.field.map((row, y) => (
               <Fragment key={row[y].id}>
                  {row.map((square) => (
                     <CSSTransition
                        node
                        key={square.id}
                        in={animationIsOn[square.id]}
                        timeout={animationDuration}
                        classNames={{
                           enterActive: styles.enterActive,
                           exitActive: styles.exitActive,
                        }}
                     >
                        <SquareComponent
                           click={() => clickHandler(square.id)}
                           value={square.id}
                        />
                     </CSSTransition>
                  ))}
               </Fragment>
            ))}
         </TransitionGroup>
      </div>
   );
};

export default SquareGuesserComponent;
