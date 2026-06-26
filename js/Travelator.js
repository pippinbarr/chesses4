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

    moveCompleted() {
        super.moveCompleted();

        let travels = [...this.edges];
        this.edges = [];
        const edgeRemovals = [];

        for (let r = 0; r < this.travelatorRanks.length; r++) {

            const currentRank = this.travelatorRanks[r];
            const transform = this.transforms[r];

            for (let file = 0; file < 8; file++) {
                const piece = this.game.get(`${FILES.charAt(file)}${currentRank}`);
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
            this.game.remove(travel.from);
        }
        for (let travel of travels) {
            this.game.put(travel.piece, travel.to);
        }


        this.game.load(this.game.fen());
        this.board.position(this.game.fen(), false);
    }
}