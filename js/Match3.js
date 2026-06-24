class Match3 extends BaseChess {
    constructor() {
        super();
    }

    setup() {
        this.startFEN = "1n1q1b1r/r1b1k1n1/1p1p1p1p/p1p1p1p1/P1P1P1P1/1P1P1P1P/R1B1K1N1/1N1Q1B1R w - - 0 1";
        this.boardConfig.position = this.startFEN;

        super.setup();
    }

    moveCompleted() {
        super.moveCompleted();

        // Now we need to find any instance of three (or more?) in a row or column
        const board = this.game.board();
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
            this.game.remove(square);
        }
        this.game.load(this.game.fen());
        this.board.position(this.game.fen())
    }
}