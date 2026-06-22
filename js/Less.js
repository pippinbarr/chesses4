class Less extends BaseChess {
    constructor() {
        super();

        this.moveCounter = 0;
        this.whitePieces = "pppppppprnbqbnr".split('').sort(() => 0.5 - Math.random());

        this.blackPieces = "pppppppprnbqbnr".split('').sort(() => 0.5 - Math.random());
    }

    moveCompleted() {
        super.moveCompleted();

        if (this.game.history().length % 1 === 0) {
            let square = false;
            while (!square) {
                square = `${this.randomInString("abcdefgh")}${this.randomInString("12345678")}`;
                let piece = this.game.get(square);
                if (piece) {
                    if (piece.type === 'k') square = false;
                    else break;
                }
                else square = false;
            }
            this.game.remove(square);
            this.board.position(this.game.fen());
        }
    }

    randomInString(string) {
        return string.charAt(Math.floor(Math.random() * string.length));
    }
}