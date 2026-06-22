
const AMAZON_FEN = "rnbqkbnr/pppppppp/8/8/8/8/QQQQQQQQ/QQQQQQQQ w kq - 0 1";

class Amazon extends BaseChess {
    constructor() {
        super();
    }

    setup() {

        this.boardConfig.position = AMAZON_FEN;
        this.startFEN = AMAZON_FEN;

        super.setup();

        this.game.load(AMAZON_FEN);
        // this.board.position(amazonFEN);
    }

    getMoves(square) {

        let options = {
            verbose: true,
            legal: (this.getTurn() == "w")
        }
        if (square !== undefined) options.square = square;
        let moves = this.game.moves(options);
        return moves;
    }
}