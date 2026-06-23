const STARTING_POSITION_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const CHECKMATE_FEN = "2rnkbnr/4pppp/4pbpp/7q/8/3QPPPP/3RPPPP/2NBKBNR w - - 0 7";
const STALEMATE_FEN = "5Rnk/7n/7R/8/8/8/7R/6QK w - - 0 7";

const SQUARE = "square-55d63";
const PIECE = "piece-417db";

const FILES = "abcdefgh";
const RANKS = "12345678";

class BaseChess {
    constructor() {
        this.startFEN = STARTING_POSITION_FEN;

        this.boardConfig = {
            draggable: false,
            position: STARTING_POSITION_FEN,
            onMoveEnd: () => { },
            moveSpeed: 200,
            showNotation: false
        };

        this.gameConfig = {
            skipValidation: true
        }

        this.removed = [];

        this.create();
    }

    create() {
        this.board = ChessBoard('board', this.boardConfig);
        this.game = new Chess(this.startFEN, this.gameConfig);

        // Add listeners
        var squares = document.getElementsByClassName(SQUARE);

        for (let i = 0; i < squares.length; i++) {
            squares[i].addEventListener('click', (event) => {
                this.squareClicked(event)
            }, false);
        }

        this.currentMove = {
            from: undefined,
            to: undefined,
            promotion: "q"
        }
    }

    squareClicked(event) {
        if (this.currentMove.from === undefined) {
            this.currentMove.from = event.target.dataset.square;
            console.log("Setting from: ", this.currentMove.from);
        }
        else {
            this.currentMove.to = event.target.dataset.square;
            console.log("Setting to: ", this.currentMove.to);

            this.makeMove(this.currentMove);
        }
    }

    makeMove(move) {
        console.log("makeMove")
        this.game.move(move);

        this.game.load(this.game.fen());
        this.board.position(this.game.fen(), false);

        this.currentMove.from = undefined;
        this.currentMove.to = undefined;

        this.lessen();
    }

    lessen() {
        if (this.game.history().length % 2 === 0) {
            console.log("Lessen")
            let square = false;
            while (!square) {
                square = `${this.randomInString(FILES)}${this.randomInString(RANKS)}`;
                let piece = this.game.get(square);
                if (piece) {
                    if (piece.type === 'k') square = false;
                    else break;
                }
                else square = false;
            }
            this.game.remove(square);
            this.removed.push(square);

            this.board.position(this.game.fen(), false);
        }
    }

    randomInString(string) {
        return string.charAt(Math.floor(Math.random() * string.length));
    }
}

