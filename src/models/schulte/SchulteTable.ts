import _ from 'lodash';

export class SchulteTable {
   cells: number[][] = [];

   constructor (size: number) {
      this.createTable(size);
   }

   private createTable(size: number) {
      const numbers = _.shuffle(_.range(1, size * size + 1));
      this.cells = _.chunk(numbers, size);
   }
   getCell(y: number, x: number) {
      return this.cells[y][x];
   }
   reset(size: number) {
      this.createTable(size);
   }
}
