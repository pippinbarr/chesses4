class Knights extends BaseChess {
    constructor() {
        super();
    }

    setup() {
        const KNIGHTS_FEN = "nnnnnnnn/nnnnnnnn/8/8/8/8/NNNNNNNN/NNNNNNNN w - - 0 1";
        this.knightsGame = new Chess(KNIGHTS_FEN);

        super.setup();
    }

    getMoves(square) {
        let options = {
            verbose: true,
            legal: false,
        }

        let currentPiece;
        if (square !== undefined) {
            options.square = square;

            currentPiece = this.game.get(square);
            this.game.put({
                type: "n",
                color: currentPiece.color,
            }, square);
        }

        let moves = this.game.moves(options);

        if (square !== undefined) {
            this.game.put(currentPiece, square);
        }

        return moves;
    }

    move(from, to, silent = false) {

        // Make the move in the game representation
        let move = {
            from: from,
            to: to,
            promotion: 'q', // NOTE: always promote to a queen for example simplicity
        };

        let currentPiece = this.game.get(from);
        this.game.put({
            type: "n",
            color: currentPiece.color
        }, from);

        this.currentMove = this.game.move(move, { legal: false });


        this.game.put({
            type: currentPiece.type,
            color: currentPiece.color
        }, to)

        if (!silent) {
            this.disableInput();

            // Clear all highlights from the board (a new turn is about to begin)
            this.clearHighlights();

            // Update the board based on the new position
            this.board.position(this.game.fen(), true);

            setTimeout(() => {
                this.moveCompleted();
            }, this.boardConfig.moveSpeed);
        }

        return move;
    }
}