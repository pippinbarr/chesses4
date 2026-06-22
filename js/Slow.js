const SLOW_ANIMATION_DURATION = 2000;
class Slow extends BaseChess {
    constructor() {
        super();
    }

    setup() {
        this.boardConfig.moveSpeed = SLOW_ANIMATION_DURATION;
        super.setup();
    }
}