import React, { FC, Fragment, Dispatch, SetStateAction } from 'react';
import { Button } from 'react-bootstrap';
import { Screens } from '../../types';
import styles from './ScreenToggler.module.scss';

export interface ScreenTogglerProps {
   screen: Screens,
   setScreen: Dispatch<SetStateAction<Screens>>,
   screenToBeToggled: Exclude<Screens, 'both'>,
   direction: 'left' | 'right'
}

const ScreenToggler: FC<ScreenTogglerProps> = ({ screen, setScreen, direction, screenToBeToggled }) => {

   const arrow = direction === 'left' ? '<' : '>';

   return (
      <Fragment>
         {screen === "both" ? (
            <Button
               className={styles[`button-${direction}`]}
               variant="outline-primary"
               onClick={() => setScreen(screenToBeToggled)}
            >
               {arrow}
            </Button>
         ) : (
            <Button
               className={styles[`button-${direction}`]}
               variant="outline-primary"
               onClick={() => setScreen("both")}
            >
               {arrow}
            </Button>
         )}
      </Fragment>
   );
};

export default ScreenToggler;
