import React, { FC, CSSProperties } from 'react';
import styles from './styles/Square.module.scss';

interface SquareProps {
   value: number;
   style: CSSProperties;
}

const Square: FC<SquareProps> = ({ value, style }) => {
   return (
      <div className={styles.square} style={style}>
         {value}
      </div>
   );
};

export default Square;
