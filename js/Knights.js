class Knights extends BaseChess {
    constructor() {
        super();
    }

    setup() {
        const KNIGHTS_FEN = "nnnnnnnn/nnnnnnnn/8/8/8/8/NNNNNNNN/NNNNNNNN w - - 0 1";
        this.knightsGame = new Chess(KNIGHTS_FEN, {
            skipValidation: true
        });

        super.setup();
    }

    getMoves(square) {
        let options = {
            verbose: true,
            legal: false,
        }
        let moves = [];

        let currentPiece;
        if (square) {
            options.square = square;
            currentPiece = this.game.get(square);
            if (!currentPiece) return moves;

            this.game.put({
                type: "n",
                color: currentPiece.color,
            }, square);

            const squareMoves = this.game.moves(options);

            const testGame = new Chess();
            testGame.load(this.game.fen());
            for (let move of squareMoves) {
                console.log(move);
                testGame.move({ from: move.from, to: move.to }, { legal: false });
                if (testGame.inCheck()) {
                    console.log("A move into check!")
                }
            }

            moves.push(...squareMoves);

            this.game.put(currentPiece, square);
        }
        else {
            for (let square of SQUARES) {
                moves.push(...this.getMoves(square));
            }
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
        this.game.load(this.game.fen(), {
            skipValidation: true
        });

        this.game.put({
            type: currentPiece.type,
            color: currentPiece.color
        }, to)
        this.game.load(this.game.fen());

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