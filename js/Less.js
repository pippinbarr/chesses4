const popSFX = new Howl({
    src: ['assets/sounds/pop.wav',]// 'assets/sounds/attack.mp3']
});

class Less extends BaseChess {
    constructor() {
        super();

        this.moves = 0;
    }

    handleNextTurn() {
        this.moves++;

        if (this.moves % 1 === 0) {
            let square = false;
            while (!square) {
                square = `${this.randomInString("abcdefgh")}${this.randomInString("12345678")}`;
                console.log(`Trying ${square}...`)
                let piece = this.game.get(square);
                if (piece) {
                    if (piece.type === 'k') square = false;
                    else break;
                }
                else square = false;
            }

            console.log("Chose ", square);

            $(`.square-${square}`).children().first().effect({
                effect: "shake",
                direction: "left",
                distance: 3,
                times: 7,
                duration: 500,
                complete: () => {
                    console.log("Shook it up...")
                    popSFX.play();
                    this.game.remove(square);
                    this.game.load(this.game.fen());
                    this.board.position(this.game.fen());
                    super.handleNextTurn();
                }
            });

        }
    }

    randomInString(string) {
        return string.charAt(Math.floor(Math.random() * string.length));
    }
}