const SLOW_ANIMATION_DURATION = 15000;
class Slow extends BaseChess {
    constructor() {
        super();
    }

    setup() {
        this.boardConfig.moveSpeed = SLOW_ANIMATION_DURATION;
        super.setup();
    }

    quit() {
        $(".chessboardjs-animated-piece").remove();
    }
}