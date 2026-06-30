const candyPopSFX = new Howl({
    src: ['assets/sounds/candy-pop.wav', 'assets/sounds/candy-pop.mp3']
});
const candySweetSFX = new Howl({
    src: ['assets/sounds/sweet.wav', 'assets/sounds/sweet.mp3']
});
const candyDivineSFX = new Howl({
    src: ['assets/sounds/divine.wav', 'assets/sounds/divine.mp3']
});
const candySugarCrushSFX = new Howl({
    src: ['assets/sounds/sugar-crush.wav', 'assets/sounds/sugar-crush.mp3']
});

const candyEmphases = [candySweetSFX, candyDivineSFX, candySugarCrushSFX];

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
                const match3ed = this.match3ify(moveGame).game;

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
        // Play the move sound
        if (this.currentMove && (this.currentMove.flags.indexOf('c') !== -1 || this.currentMove.flags.indexOf('e') !== -1)) {
            captureSFX.play();
        }
        else {
            placeSFX.play();
        }

        // Wait then enact the match
        setTimeout(() => {
            const result = this.match3ify(this.game);

            const match3ed = result.game;

            this.popPieces(result.removals, () => {
                this.game.load(match3ed.fen(), { skipValidation: true });
                this.board.position(this.game.fen());
                super.moveCompleted(true);
            });

        }, 500);
    }

    popPieces(removals, complete) {
        for (let square of removals) {
            console.log(removals)
            const $piece = $(`.square-${square} img`);
            $piece.effect({
                effect: "shake",
                direction: "left",
                distance: 3,
                times: 7,
                duration: 500,
                complete: () => {
                    this.game.remove(square);
                }
            });
        }
        setTimeout(() => {
            if (removals.length > 0) {
                candyPopSFX.play();

                if (Math.random() < 0.25) {
                    setTimeout(() => {
                        const sfx = candyEmphases[Math.floor(Math.random() * candyEmphases.length)];
                        sfx.play();
                    }, 500);
                }
            }
            complete();
        }, 500);
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
                        if (removals.indexOf(square) === -1) {
                            removals.push(square);
                        }
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
                    if (removals.indexOf(square) === -1) {
                        removals.push(square);
                    }
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
                        if (removals.indexOf(square) === -1) {
                            removals.push(square);
                        }
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
                    if (removals.indexOf(square) === -1) {
                        removals.push(square);
                    }
                }
            }
        }

        for (let square of removals) {
            match3ed.remove(square);
        }
        match3ed.load(match3ed.fen(), { skipValidation: true })

        return {
            game: match3ed,
            removals: removals
        }
    }

    checkResult() {
        const result = super.checkResult();

        // Override standard results for a matched king
        if (this.game.findPiece({ type: 'k', color: this.game.turn() }).length === 0) {
            result.defined = true;
            result.win = true;
            result.color = this.getTurn(false);
            result.description = "No king for current player"
        }

        return result;
    }

}