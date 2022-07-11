import { Square } from "./Square";
import _ from 'lodash';

const fieldSize = 3;

export class SquareGuesser {
   field: Square[][];
   level: number = 0;
   sequence: Square[] = [];
   index: number = 0;

   constructor() {
      const numbers = _.range(fieldSize ** 2);
      const squares = _.map(numbers, (_, i) => {
         return new Square(i);
      });
      this.field = _.chunk(squares, fieldSize);
   }

   private get sequenceLength(): number {
      return this.level + 1;
   }
   reset(): void {
      this.level = 0;
      this.sequence = [];
      this.index = 0;
   }
   buildNewSequence(): void {
      const sequence = [];
      this.level++;
      for (let i = 0; i < this.sequenceLength; i++) {
         sequence.push(this.getRandomSquare());
      }
      this.index = 0;
      this.sequence = _.shuffle(sequence);
   }
   check(id: number): { isCorrect: boolean, isLast: boolean } {
      const isCorrect = this.sequence[this.index]?.id === id;
      if (isCorrect) {
         this.index++;
      }
      return {isCorrect, isLast: this.index === this.sequenceLength};
   }
   private getRandomSquare(): Square {
      const row = _.random(fieldSize - 1);
      const col = _.random(fieldSize - 1);
      return this.field[row][col];
   }
}
