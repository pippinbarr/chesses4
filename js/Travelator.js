class Travelator extends BaseChess {
    constructor() {
        super();
    }

    setup() {
        super.setup();

        this.travelatorRanks = "3456".split('');
        this.transforms = [-1, 1, -1, 1];
        this.edges = [];

        const files = FILES.split('');
        for (let file of files) {
            for (let rank of this.travelatorRanks) {
                const square = `${file}${rank}`;
                let arrowChar = rank % 2 === 0 ? "→" : "←";
                let $arrow = $(`<p>${arrowChar}</p>`);
                $arrow.css({
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: "-10%",
                    textAlign: "center",
                    fontSize: "1em",
                    zIndex: "-1"
                });
                $(`.square-${square}`).append($arrow)
            }
        }
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
                const travelated = this.travelate(moveGame);
                if (!travelated.inCheck()) {
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

    travelate(game) {
        let travels = [];

        for (let r = 0; r < this.travelatorRanks.length; r++) {
            const currentRank = this.travelatorRanks[r];
            const transform = this.transforms[r];

            for (let file = 0; file < 8; file++) {
                const piece = game.get(`${FILES.charAt(file)}${currentRank}`);
                if (piece) {
                    let toFile = file + transform;
                    if (toFile < 0) {
                        toFile = 7;
                    }
                    else if (toFile > 7) {
                        toFile = 0;
                    }
                    travels.push({
                        piece: piece,
                        from: `${FILES.charAt(file)}${currentRank}`,
                        to: `${FILES.charAt(toFile)}${currentRank}`
                    });
                }
            }
        }

        // Need to do these two loops separately to avoid interference
        for (let travel of travels) {
            game.remove(travel.from);
        }
        for (let travel of travels) {
            game.put(travel.piece, travel.to);
        }

        game.load(game.fen(), { skipValidation: true });

        return game;
    }

    moveCompleted() {
        if (this.currentMove && (this.currentMove.flags.indexOf('c') !== -1 || this.currentMove.flags.indexOf('e') !== -1)) {
            captureSFX.play();
        }
        else {
            placeSFX.play();
        }

        setTimeout(() => {
            const travelated = this.travelate(this.game);
            this.game.load(travelated.fen());
            this.board.position(this.game.fen(), false);
            placeSFX.play();

            super.moveCompleted(true);
        }, 500);

    }
}