import _ from 'lodash';
import { Cell } from './Cell';

export class SchulteTable {
   cells: Cell[][] = [];

   constructor (size: number) {
      this.createTable(size);
   }

   private createTable(size: number): void {
      const numbers = _.shuffle(_.range(1, size * size + 1));
      const cells = _.map(numbers, number => new Cell(number));
      this.cells = _.chunk(cells, size);
   }
   getCellValue(y: number, x: number): number {
      return this.cells[y][x].cell;
   }
   reset(size: number): void {
      this.createTable(size);
   }
}
