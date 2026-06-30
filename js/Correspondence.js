class Correspondence extends BaseChess {
    constructor() {
        super();
    }

    setup() {
        this.startFEN = "rnbqkbnr/ppp1pppp/8/3P4/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 2";
        this.boardConfig.position = this.startFEN;

        super.setup();

        this.moveNumber = 2; // Need to update per move
        this.changeTurnTo('b');
        this.highlightTurn('b');
    }

    moveCompleted() {
        this.moveSAN = this.currentMove.san;
        super.moveCompleted();
    }

    highlightTurn(turn) {
        super.highlightTurn(turn, () => {
            if (this.game.turn() === 'w') {
                this.disableInput();

                setTimeout(() => {
                    // Show message
                    $("#correspond-message").html(`<p>Email <a href="mailto:pippin.barr@proton.me">pippin.barr@proton.me</a> with the following message:</p>
                        
                    <p>
                    Subject: Correspondence Chess<br />
                    <br />
                    Body: <br/>
                    ${this.moveNumber}. ... ${this.moveSAN}.</p>
                    <p>
                    </p>
                    <p>I'll respond to the first move sent and update this game on my website.</p>`);
                    $("#correspond-box").slideDown();
                }, 1000);
            }
        });
    }
}