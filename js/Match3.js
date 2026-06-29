class Match3 extends BaseChess {
    constructor() {
        super();
    }

    setup() {
        this.startFEN = "1n1q1b1r/r1b1k1n1/1p1p1p1p/p1p1p1p1/P1P1P1P1/1P1P1P1P/R1B1K1N1/1N1Q1B1R w - - 0 1";
        this.boardConfig.position = this.startFEN;

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

            options.legal = false;
            const squareMoves = this.game.moves(options);

            let legalMoves = [];

            for (let move of squareMoves) {
                let moveGame = new Chess(this.game.fen(), { skipValidation: true });
                moveGame.remove(move.from);
                moveGame.put(currentPiece, move.to);
                moveGame.load(moveGame.fen(), { skipValidation: true })
                const match3ed = this.match3ify(moveGame);
                if (currentPiece.type === 'k') {
                    console.log(match3ed.ascii());
                }

                const hasKing = match3ed.findPiece({ type: 'k', color: match3ed.turn() }).length != 0;
                if (!match3ed.inCheck() && hasKing) {
                    legalMoves.push(move);
                }
            }

            moves.push(...legalMoves);
        }
        else {
            for (let square of SQUARES) {
                moves.push(...this.getMoves(square));
            }
        }
        return moves;
    }

    moveCompleted() {
        const match3ed = this.match3ify(this.game);
        this.game.load(match3ed.fen(), { skipValidation: true });
        this.board.position(this.game.fen());

        super.moveCompleted();
    }

    match3ify(game) {
        const match3ed = new Chess(game.fen(), { skipValidation: true });

        // Now we need to find any instance of three (or more?) in a row or column
        const board = match3ed.board();
        let removals = [];
        for (let rank = 0; rank < board.length; rank++) {
            let contiguous = [];
            for (let file = 0; file < board[rank].length; file++) {
                if (board[rank][file]) {
                    contiguous.push(board[rank][file].square)
                }
                else if (contiguous.length >= 3) {
                    // Finished the match: remove all the contiguous squares
                    for (let square of contiguous) {
                        removals.push(square);
                    }
                    contiguous = [];
                }
                else {
                    contiguous = [];
                }
            }
            // If we reached the end of the rank with a match then removal
            if (contiguous.length >= 3) {
                // Finished the match: remove all the contiguous squares
                for (let square of contiguous) {
                    removals.push(square);
                }
            }
        }

        for (let file = 0; file < board[0].length; file++) {
            let contiguous = [];
            for (let rank = 0; rank < board.length; rank++) {
                if (board[rank][file]) {
                    contiguous.push(board[rank][file].square)
                }
                else if (contiguous.length >= 3) {
                    // Match - remove all the contiguous squares
                    for (let square of contiguous) {
                        removals.push(square);
                    }
                    contiguous = [];
                }
                else {
                    contiguous = [];
                }
            }
            // If we reached the end of the file with a match then removal
            if (contiguous.length >= 3) {
                // Finished the match: remove all the contiguous squares
                for (let square of contiguous) {
                    removals.push(square);
                }
            }
        }

        for (let square of removals) {
            match3ed.remove(square);
        }
        match3ed.load(match3ed.fen(), { skipValidation: true })

        return match3ed;
    }
}