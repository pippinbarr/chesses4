class TickTock extends BaseChess {
    constructor() {
        super();
    }

    setup() {
        this.currentTurn = 'w';

        super.setup();

        this.clock = setInterval(() => {
            this.tickTock();
        }, 5000)

    }

    tickTock() {
        this.currentTurn = this.currentTurn === 'w' ? 'b' : 'w'
        this.game.setTurn(this.currentTurn);
        console.log("Clearing highlights. Resetting turn.");
        this.clearHighlights();
        super.changeTurn();
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
}