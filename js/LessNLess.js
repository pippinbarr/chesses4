const popSFX = new Howl({
    src: ['assets/sounds/pop.wav',]// 'assets/sounds/attack.mp3']
});

class LessNLess extends BaseChess {
    constructor() {
        super();

        this.moves = 0;
    }

    setup() {
        // this.startFEN = "4k3/8/8/4r3/8/8/4Q3/K7 w - - 0 1";
        // this.boardConfig.position = this.startFEN;

        super.setup();
    }

    moveCompleted() {
        this.handlePopping();
    }

    handlePopping() {
        this.moves++;

        // Every three moves pop a piece
        if (this.moves % 3 === 0) {
            let square = undefined;
            let piece = undefined;
            while (!piece || piece.type === 'k') {
                square = `${this.randomInString("abcdefgh")}${this.randomInString("12345678")}`;
                piece = this.game.get(square);
            }
            this.disableInput();
            setTimeout(() => {
                this.popPiece(square);
            }, 250);
        }
        else {
            super.moveCompleted();
        }
    }

    randomInString(string) {
        return string.charAt(Math.floor(Math.random() * string.length));
    }

    popPiece(square) {
        const $piece = $(`.square-${square} img`);
        $piece.effect({
            effect: "shake",
            direction: "left",
            distance: 3,
            times: 7,
            duration: 500,
            complete: () => {
                popSFX.play();
                this.game.remove(square);
                this.game.load(this.game.fen());
                this.board.position(this.game.fen());
                super.moveCompleted()
            }
        });
    }
}