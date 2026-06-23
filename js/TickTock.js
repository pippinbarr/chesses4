class TickTock extends BaseChess {
    constructor() {
        super();
    }

    setup() {
        super.setup();

        console.log(this.game.turn())

        this.clock = setInterval(() => {
            this.tickTock();
        }, 5000)

        this.currentTurn = 'w';
    }

    tickTock() {
        this.currentTurn = this.currentTurn === 'w' ? 'b' : 'w'
        console.log("tickTock new currentTurn is: ", this.currentTurn);
        this.game.setTurn(this.currentTurn);
        super.changeTurn();
    }

    squareClicked(event) {
        console.log("squareClicked current turn is: ", this.currentTurn)
        super.squareClicked(event);
    }

    move(from, to, silent = false) {
        console.log("move() currentTurn is: ", this.currentTurn);

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