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

            const kingSquare = this.game.findPiece({ type: 'k', color: this.game.turn() });

            this.game.put({
                type: "n",
                color: currentPiece.color,
            }, square);

            const squareMoves = this.game.moves(options);

            this.game.put({
                type: "k",
                color: currentPiece.color,
            }, square);

            let legalMoves = [];

            for (let move of squareMoves) {
                const moveGame = new Chess(this.game.fen(), { skipValidation: true });
                const movePiece = moveGame.get(move.from);
                moveGame.remove(move.from);
                moveGame.put(movePiece, move.to);
                moveGame.findPiece({ type: 'k', color: this.game.turn() })
                const kingSquare = moveGame.findPiece({ type: 'k', color: this.game.turn() })[0];
                const knightGame = this.getKnightVersion(moveGame.fen());
                const attacker = this.game.turn() === 'w' ? 'b' : 'w';
                const attackers = knightGame.attackers(kingSquare, attacker);
                if (attackers.length === 0) {
                    legalMoves.push(move);
                }
            }

            moves.push(...legalMoves);
            console.log(moves);

            this.game.put(currentPiece, square);
        }
        else {
            for (let square of SQUARES) {
                moves.push(...this.getMoves(square));
            }
        }
        return moves;
    }

    getKnightVersion(fen) {
        const knightVersion = new Chess();
        knightVersion.load(fen, { skipValidation: true });
        const knightBoard = knightVersion.board();
        for (let file = 0; file < 8; file++) {
            for (let rank = 0; rank < 8; rank++) {
                const square = knightBoard[rank][file];
                if (square) {
                    knightVersion.put({
                        type: "n",
                        color: square.color
                    }, square.square);
                }
            }
        }
        return knightVersion;
    }

    move(from, to, silent = false) {
        // Make the move in the game representation
        let move = {
            from: from,
            to: to,
            promotion: 'q', // NOTE: always promote to a queen for example simplicity
        };

        // Move the piece manually to avoid all the legalities
        let currentPiece = this.game.get(from);
        this.game.remove(from);
        this.game.put(currentPiece, to);
        this.game.load(this.game.fen());

        if (!silent) {
            this.disableInput();

            // Clear all highlights from the board (a new turn is about to begin)
            this.clearHighlights();

            // Update the board based on the new position
            this.board.position(this.game.fen(), true);

            // Flip the turn (manually because we didn't make a move)
            this.flipTurn()

            // Trigger the move completed at the end of the piece animation
            setTimeout(() => {
                this.moveCompleted();
            }, this.boardConfig.moveSpeed);
        }
        return move;
    }

    inCheck(color) {
        const turnKingSquare = this.game.findPiece({ type: 'k', color: color })[0];
        const knightVersion = this.getKnightVersion(this.game.fen());
        const attackers = knightVersion.attackers(turnKingSquare, color === 'w' ? 'b' : 'w');
        return attackers.length > 0;
    }
}