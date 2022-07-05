import _ from 'lodash';

export class SchulteTable {
   squares: number[][] = [];

   constructor (size: number) {
      this.createTable(size);
   }

   private createTable(size: number) {
      const numbers = _.shuffle(_.range(1, size * size + 1));
      this.squares = _.chunk(numbers, size);
   }
   getSquare(y: number, x: number) {
      return this.squares[y][x];
   }
   reset(size: number) {
      this.createTable(size);
   }
}
