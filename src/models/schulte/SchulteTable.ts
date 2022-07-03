import _ from 'lodash';

export class SchulteTable {
   squares: number[][] = [];
   necessaryNumber: number = 1;
   level: number = 1;

   constructor (size: number) {
      this.createTable(size);
   }

   private createTable(size: number) {
      const numbers = _.shuffle(_.range(1, size * size + 1));
      this.squares = _.chunk(numbers, size);
   }
   getSquare(x: number, y: number) {
      return this.squares[y][x];
   }
   reset(size: number) {
      this.createTable(size);
      this.necessaryNumber = 1;
      this.level = 1;
   }
}
