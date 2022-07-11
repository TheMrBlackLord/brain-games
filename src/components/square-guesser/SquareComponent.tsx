import React, { FC } from 'react';
import styles from './styles/SquareComponent.module.scss';

interface SquareGuesserControlsProps {
   click: () => void;
   value: number
}

const SquareComponent: FC<SquareGuesserControlsProps> = ({ click, value }) => {
   return <div className={styles.square} onClick={click}>{value}</div>;
};

export default SquareComponent;
