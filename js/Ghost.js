class Ghost extends BaseChess {
    constructor() {
        super();
    }

    setup() {
        super.setup();

        this.game2 = new Chess(this.startFEN, this.gameConfig);
        this.board2 = ChessBoard('board2', this.boardConfig);

        const board = document.getElementById("board");
        const board2 = document.getElementById("board2");

        const game = document.getElementById("game");

        // game.style = "position: absolute;";
        // board.style = "position: relative; opacity: 0.25;";
        // board2.style = "position: relative; opacity: 0.25;";
    }
}