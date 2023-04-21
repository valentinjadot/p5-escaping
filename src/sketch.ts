import p5 from 'p5';
import Base from './Base';
import EscaperCohort from './EscaperCohort';

export function sketch(p: p5) {
  Base.init(p);
  let cohort: EscaperCohort;

  p.setup = function () {
    Base.createFullScreenCanvas();
    cohort = new EscaperCohort(100);
  };

  p.draw = function () {
    p.background(0);
    cohort.randomWalk();
    cohort.adjustToMousePosition(p.mouseX, p.mouseY);
    cohort.show();
  };
}
