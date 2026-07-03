class Correspondence extends BaseChess {
    constructor() {
        super();
    }

    setup() {
        this.startFEN = "rnb1kbnr/ppp1pppp/8/8/8/2N5/PPPB1PPP/R2QKBNR b KQkq - 0 4";
        this.boardConfig.position = this.startFEN;

        super.setup();

        this.moveNumber = 4; // Need to update per move
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
                    ${this.moveNumber}. ... ${this.moveSAN}</p>
                    <p>
                    Include a name for me to include next to your move if you'd like, otherwise I'll just note it as "Anonymous."
                    </p>
                    <p>I'll respond to the first move sent and update this game here.</p>`);
                    $("#correspond-box").slideDown();
                }, 1000);
            }
        });
    }
}