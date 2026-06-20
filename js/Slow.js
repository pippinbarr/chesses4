"use strict";

/**
 * Slow Chess
 * 
 * Pieces move very slowly.
 * 
 */


class Slow extends BaseChess {

  constructor() {
    super();
  }

  setup() {
    this.config.moveSpeed = 10000;
    this.config.onMoveEnd = () => {
      console.log("BIM!")
    }

    super.setup();
  }

  squareClicked(event) {
    super.squareClicked(event);
  }

  moveCompleted() {
    super.moveCompleted();
  }
}