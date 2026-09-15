class Correspondence extends BaseChess {
    constructor() {
        super();
    }

    setup() {
        this.startFEN = "r3k2r/pp3p2/2p5/2B2Bp1/4Q2p/5N1P/PPP2PP1/2KR3R b kq - 0 4";
        this.boardConfig.position = this.startFEN;

        super.setup();

        this.moveNumber = 16; // Need to update per move
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