const tickSFX = new Howl({
    src: ['assets/sounds/tick.wav',]// 'assets/sounds/attack.mp3']
});

const tockSFX = new Howl({
    src: ['assets/sounds/tock.wav',]// 'assets/sounds/attack.mp3']
});

class TickTock extends BaseChess {
    constructor() {
        super();
    }

    setup() {
        this.currentTurn = 'w';

        super.setup();

        // setTimeout(() => {
        // this.tick = true;
        // tickSFX.play();
        this.clock = setInterval(() => {
            this.tickTock();
        }, 4000);
        // }, 250);

    }

    tickTock() {
        this.currentTurn = this.currentTurn === 'w' ? 'b' : 'w'
        this.game.setTurn(this.currentTurn);
        this.clearHighlights();
        super.changeTurn();
    }

    highlightTurn() {
        super.highlightTurn(this.game.turn(), () => {
            this.tick = !this.tick;
            if (this.tick) {
                tickSFX.play();
            }
            else {
                tockSFX.play();
            }
        })
    }

    squareClicked(event) {
        super.squareClicked(event);
    }

    move(from, to, silent = false) {
        super.move(from, to, silent);
    }

    moveCompleted() {
        super.moveCompleted();
        this.game.setTurn(this.currentTurn);
        this.enableInput();
    }

    changeTurn() {

    }

    quit() {
        clearInterval(this.clock);
    }
}