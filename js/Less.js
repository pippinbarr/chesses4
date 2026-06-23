class Less extends BaseChess {
    constructor() {
        super();

        this.moveCounter = 0;
        this.whitePieces = "pppppppprnbqbnr".split('').sort(() => 0.5 - Math.random());

        this.blackPieces = "pppppppprnbqbnr".split('').sort(() => 0.5 - Math.random());

        this.removed = [];
    }

    moveCompleted() {
        super.moveCompleted();

        if (this.game.history().length % 2 === 0) {
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
            console.log("==Before remove ", square)
            console.log(this.game.ascii())
            console.log(this.game.fen())
            this.game.remove(square);
            this.removed.push(square);
            console.log("==After remove ", square)
            console.log(this.game.ascii())
            console.log(this.game.fen())
            this.board.position(this.game.fen());
            console.log("==After set board ", square)
            console.log(this.game.ascii())
            console.log(this.game.fen())

            console.log(this.game.turn())
            console.log("Removed list:");
            console.log(this.removed)
        }
    }

    randomInString(string) {
        return string.charAt(Math.floor(Math.random() * string.length));
    }
}