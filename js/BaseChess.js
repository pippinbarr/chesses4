"use strict";

const SQUARE = ".square-55d63";
const PIECE = ".piece-417db";
const FILES = "abcdefgh";
const RANKS = "12345678";

const STARTING_POSITION_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const CHECKMATE_FEN = "2rnkbnr/4pppp/4pbpp/7q/8/3QPPPP/3RPPPP/2NBKBNR w - - 0 7";
const STALEMATE_FEN = "5Rnk/7n/7R/8/8/8/7R/6QK w - - 0 7";

// The sound effects
const placeSFX = new Howl({
  src: ['assets/sounds/place.wav', 'assets/sounds/place.mp3']
});
const captureSFX = new Howl({
  src: ['assets/sounds/capture.wav', 'assets/sounds/capture.mp3']
});
const attackSFX = new Howl({
  src: ['assets/sounds/attack.wav', 'assets/sounds/attack.mp3']
});


class BaseChess {

  constructor() {
    this.startFEN = STARTING_POSITION_FEN;

    this.boardConfig = {
      draggable: false,
      position: this.startFEN,
      onMoveEnd: () => { },
      moveSpeed: 200,
      showNotation: false
    };

    this.gameConfig = {
      skipValidation: true
    }

    this.setup();
  }

  setup() {
    this.board = ChessBoard('board', this.boardConfig);
    this.game = new Chess(this.startFEN, this.gameConfig);

    this.from = null;
    this.currentMove = null;
    this.lastMove = null;

    $('#board').css({
      transform: 'rotate(0deg)'
    });

    $(SQUARE).css({
      transform: 'rotate(0deg)'
    });

    this.highlightTurn('w');
    this.enableInput();
  }

  squareClicked(event) {
    // Find out the notation of the square and also the element representing the piece
    let square = $(event.currentTarget).attr('data-square');
    let piece = $(event.currentTarget).find(PIECE);
    let validPiece = (piece.length !== 0 && piece.attr('data-piece').indexOf(this.game.turn()) !== -1);

    if (this.from === null && validPiece) {
      // We haven't selected a move yet + a piece of the correct colour was selected
      this.from = square;
      let moves = this.getMoves(square);
      if (moves.length === 0) {
        $(`.square-${square} ${PIECE}`).effect('shake', {
          times: 1,
          distance: 2
        }, 50, () => { });
        this.from = null;
        this.clearHighlights();
        return;
      }
      this.highlightMoves(moves);
    }
    else if (this.from !== null) {
      // We have already selected a square to move from (and thus a piece)
      if (validPiece) {
        // But now we're selecting another valid piece to move, so we should rehilight
        let moves = this.getMoves(square);
        if (moves.length === 0) {
          $(`.square-${square} ${PIECE}`).effect('shake', {
            times: 1,
            distance: 2
          }, 50, () => { });
          this.from = null;
          this.clearHighlights();
          return;
        }
        else {
          this.from = square;
        }
        this.highlightMoves(moves);
      }
      else if ($(event.currentTarget).hasClass('highlight1-32417')) {
        let to = $(event.currentTarget).attr('data-square');
        // console.log(this.from, to)
        this.move(this.from, to);
      };
    }
  }

  getMoves(square) {
    let options = {
      verbose: true,
    }
    if (square !== undefined) options.square = square;
    let moves = this.game.moves(options);
    return moves;
  }

  // Highlights the moves available to the piece on the given square
  // and sets it up as the current 'from'
  highlightMoves(moves) {
    this.clearHighlights();

    // exit if there are no moves available for this square
    if (moves.length === 0) return 0;

    for (let move of moves) {
      this.highlight(move.to);
    };

    return moves.length;
  }

  move(from, to, silent = false, skipValidation = false) {

    // Make the move in the game representation
    let move = {
      from: from,
      to: to,
      promotion: 'q', // NOTE: always promote to a queen for example simplicity
    };

    this.currentMove = this.game.move(move, { legal: false });
    this.game.load(this.game.fen(), { skipValidation: skipValidation });


    if (!silent) {
      this.disableInput();

      // Clear all highlights from the board (a new turn is about to begin)
      this.clearHighlights();

      // Update the board based on the new position
      this.board.position(this.game.fen(), true);

      setTimeout(() => {
        this.moveCompleted();
      }, this.boardConfig.moveSpeed);
    }

    return move;
  }

  // Remove highlights from every square on the board
  clearHighlights() {
    $(SQUARE).removeClass(`highlight1-32417`);
  }

  clearHighlight(element) {
    $(element).removeClass(`highlight1-32417`);
  }

  // Highlight the specified square
  highlight(square) {
    $('.square-' + square).addClass(`highlight1-32417`);
  }

  moveCompleted() {
    if (this.currentMove && (this.currentMove.flags.indexOf('c') !== -1 || this.currentMove.flags.indexOf('e') !== -1)) {
      captureSFX.play();
    }
    else {
      placeSFX.play();
    }

    this.from = null;
    this.currentMove = null;

    let moves = this.getMoves();

    if (this.game.findPiece({ type: 'k', color: this.game.turn() }).length === 0) {
      this.showResult(true, this.getTurn(false));
    }
    else if (moves.length === 0) {
      if (this.inCheck(this.game.turn())) {
        // CHECKMATE
        this.showResult(true, this.getTurn(false));
      }
      else {
        // STALEMATE
        this.showResult(false);
      }
    }
    else {
      this.handleNextTurn();
    }
  }

  inCheck() {
    return this.game.inCheck();
  }

  handleNextTurn() {
    if (this.gameOver) return;
    this.changeTurn();
    this.hideMessage();
  }

  enableInput() {
    if (this.inputEnabled === true) return;
    this.inputEnabled = true;
    $(SQUARE).on('click', (event) => {
      this.squareClicked(event);
    });
  }

  disableInput() {
    if (this.inputEnabled === false) return;
    this.inputEnabled = false;
    $(SQUARE).off('click');

    console.log("disabled input");
  }

  changeTurn() {
    if (this.gameOver) return;

    this.highlightTurn(this.game.turn());
  }

  highlightTurn(turn, complete = () => { }, speed = 250) {
    let to = 'blackTurn';
    let from = 'whiteTurn';

    if (turn === 'w') {
      to = 'whiteTurn';
      from = 'blackTurn';
    }

    $('.board-b72b1').removeClass(from, speed);
    $('.board-b72b1').addClass(to, speed, () => {
      this.enableInput();
      this.clearHighlights();
      this.from = null;
      this.to = null;
      if (complete) {
        complete();
      }
    });
  }

  changeTurnTo(color) {
    let fen = this.game.fen();
    let fenArray = fen.split(' ');
    fenArray[1] = color;
    fenArray[3] = '-'; // Really don't get how this goes wonky and needs this 'fix'
    fen = fenArray.join(' ');
    this.game.load(fen);
  }

  flipTurn() {
    this.changeTurnTo(this.game.turn() === 'w' ? 'b' : 'w');
  }

  showResult(win, color) {
    if (win) {
      if (color === 'w') {
        $('#message').text('WHITE WINS');
      }
      else {
        $('#message').text('BLACK WINS');
      }
    }
    else {
      $('#message').text('STALEMATE');
    }
    $('#message').slideDown();
    this.disableInput();
  }

  showMessage(message) {
    $('#message').text(message);
    $('#message').slideDown();
  }

  hideMessage() {
    $('#message').slideUp();
  }

  getTurn(current) {
    if (current) {
      this.game.turn()
    }
    else {
      return this.game.turn() === 'w' ? 'b' : 'w';
    }
  }

  // Called by main script on quitting a game
  quit() {

  }
}