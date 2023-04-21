import Base from './Base';
import p5 from 'p5';

class Escaper extends Base {
  pos = this.p.createVector();
  acc = this.p.createVector();
  vel = this.p.createVector();
  velocityLimit = 2;
  stepSize = 0.4;

  constructor() {
    super();
    this.positionRandomly();
  }

  positionRandomly() {
    this.pos.add(this.p.random(this.p.width), this.p.random(this.p.height));
    this.vel.add(this.p.random(this.velocityLimit), this.p.random(this.velocityLimit));
  }

  randomWalk() {
    this.acc.add(
      this.p.random(-this.stepSize, this.stepSize),
      this.p.random(-this.stepSize, this.stepSize),
    );
    this.acc.setMag(0.1);
  }

  adjustToMousePosition(mouseX: number, mouseY: number) {
    const mouse = this.p.createVector(mouseX, mouseY);
    const dir = mouse.sub(this.pos);
    const distance = dir.mag();
    if (distance < 100) {
      this.enterPanicMode();
      dir.setMag(5);
      dir.mult(-1);
      this.acc.add(dir);
    } else if (distance < 250) {
      dir.setMag(0.1);
      dir.mult(-1);
      this.acc.add(dir);
    }
  }

  updatePhysics() {
    this.vel.add(this.acc);
    this.vel.limit(this.velocityLimit);
    this.pos.add(this.vel);
    if (this.pos.x < 0 || this.pos.x > this.p.width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > this.p.height) {
      this.vel.y *= -1;
    }
    this.acc.mult(0);
    this.exitPanicMode();
  }

  show() {
    this.updatePhysics();

    this.p.stroke(255);
    this.p.fill(255, 100);
    this.p.push();

    this.p.translate(this.pos.x, this.pos.y);
    this.p.rotate(this.vel.heading());
    this.p.triangle(-5, -5, -5, 5, 5, 0);
    this.p.pop();
  }

  enterPanicMode() {
    this.velocityLimit = 4;
    this.stepSize = 1;
  }

  exitPanicMode() {
    this.velocityLimit = 2;
    this.stepSize = 0.4;
  }
}

export default Escaper;
