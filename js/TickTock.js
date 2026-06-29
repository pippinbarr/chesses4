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

        this.ticks = 0;
        this.ticksPerTock = 4;
        this.clock = setInterval(() => {
            this.tickTock();
        }, 1000);

    }

    tickTock() {
        this.ticks++;

        if (this.ticks === 4) {
            tickSFX.play();
            this.ticks = 0;
            this.currentTurn = this.currentTurn === 'w' ? 'b' : 'w'
            this.game.setTurn(this.currentTurn);
            this.clearHighlights();
            super.changeTurn();
        }
        else {
            tockSFX.play();
        }
    }

    highlightTurn() {
        super.highlightTurn(this.game.turn(), () => {
        }, 0)
    }

    squareClicked(event) {
        super.squareClicked(event);
    }

    move(from, to, silent = false) {
        super.move(from, to, silent, true);
    }

    moveCompleted() {
        super.moveCompleted();
        console.log(this.game.turn(), this.currentTurn)
        if (this.game.turn() !== this.currentTurn) {
            console.log("Fake move")
            this.game.move(`--`, { legal: false });
        }
        this.enableInput();
    }

    getMoves(square) {
        let options = {
            verbose: true,
        }
        if (square !== undefined) options.square = square;
        options.legal = false;
        let moves = this.game.moves(options);
        const legalMoves = [];
        for (let move of moves) {
            const attackers = this.game.attackers(move.to, this.game.turn() === 'w' ? 'b' : 'w');
            if (move.piece !== 'k' || attackers.length === 0) {
                legalMoves.push(move);
            }
        }
        return legalMoves;
    }

    changeTurn() {

    }

    quit() {
        clearInterval(this.clock);
    }
}