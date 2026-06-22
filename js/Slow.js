const SLOW_ANIMATION_DURATION = 10000;
class Slow extends BaseChess {
    constructor() {
        super();
    }

    setup() {
        this.config.moveSpeed = SLOW_ANIMATION_DURATION;
        super.setup();
    }
}