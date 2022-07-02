import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import styles from "./App.module.scss";
import SchulteTableComponent from "./components/schulte/SchulteTableComponent";
import SquareGuesserComponent from './components/square-guesser/SquareGuesserComponent';
import ScreenToggler from './components/ui/ScreenToggler';
import { Screens } from './types';

function App() {

   const [screen, setScreen] = useState<Screens>('both');

   return (
      <main>
         <Container fluid>
            <Row>
               {(screen === "both" || screen === "schulte") && (
                  <Col
                     sm={screen === "both" ? 6 : 12}
                     className={styles.parent}
                  >
                     <div className={styles.center}>
                        <SchulteTableComponent />
                     </div>
                     <ScreenToggler
                        screen={screen}
                        setScreen={setScreen}
                        direction="left"
                        screenToBeToggled="square-guesser"
                     />
                  </Col>
               )}
               {(screen === "both" || screen === "square-guesser") && (
                  <Col
                     sm={screen === "both" ? 6 : 12}
                     className={styles.parent}
                  >
                     <div className={styles.center}>
                        <SquareGuesserComponent />
                     </div>
                     <ScreenToggler
                        screen={screen}
                        setScreen={setScreen}
                        direction="right"
                        screenToBeToggled="schulte"
                     />
                  </Col>
               )}
            </Row>
         </Container>
      </main>
   );
}

export default App;
