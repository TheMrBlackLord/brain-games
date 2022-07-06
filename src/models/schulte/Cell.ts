export class Cell {
   readonly cell: number;
   readonly ids: [number, number];

   constructor(cell: number) {
      this.cell = cell;
      this.ids = [Math.random(), Math.random()];
   }
}
