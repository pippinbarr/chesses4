
const AMAZON_FEN = "rnbqkbnr/pppppppp/8/8/8/8/QQQQQQQQ/QQQQQQQQ w kq - 0 1";
// const AMAZON_FEN = "rnbqkbnr/pppppppp/8/8/8/8/7Q/8 w kq - 0 1";

class Amazons extends BaseChess {
    constructor() {
        super();
    }

    setup() {

        this.boardConfig.position = AMAZON_FEN;
        this.startFEN = AMAZON_FEN;

        super.setup();

        // this.game.load(this.startFEN, this.gameConfig);
        // this.board.position(amazonFEN);
    }

    getMoves(square) {
        let options = {
            verbose: true,
            legal: (this.game.turn() === "w")
        }
        if (square !== undefined) options.square = square;
        let moves = this.game.moves(options);
        return moves;
    }

    move(from, to) {
        super.move(from, to, false, true);
    }

    showResult(win, color) {
        if (this.game.findPiece({ type: 'q', color: 'w' }).length === 0) {
            // No queens
            super.showResult(true, 'b');
        }
        else {
            super.showResult(win, color);
        }
    }
}