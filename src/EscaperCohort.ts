import p5 from 'p5';
import Escaper from './Escaper';

class EscaperCohort {
  escapers: Escaper[];
  quantity: number;

  constructor(quantity: number) {
    this.quantity = quantity;
    this.escapers = this.generateEscapers();
    console.log(this.escapers);
  }

  generateEscapers() {
    return new Array(this.quantity).fill(undefined).map(() => new Escaper());
  }

  randomWalk() {
    this.escapers.forEach((escaper) => escaper.randomWalk());
  }

  show() {
    this.escapers.forEach((escaper) => escaper.show());
  }

  adjustToMousePosition(mouseX: number, mouseY: number) {
    this.escapers.forEach((escaper) => escaper.adjustToMousePosition(mouseX, mouseY));
  }
}

export default EscaperCohort;
