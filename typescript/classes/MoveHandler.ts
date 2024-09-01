import Board from "./Board.js";
import Game from "./Game.js";
import Player from "./Player.js";


export default class MoveHandler {
  board: Board;
  players: Player[];
  game: Game;


  constructor(board: Board, players: Player[], game: Game) {
    this.board = board;
    this.players = players;
    this.game = game;
  }

  makeMove(column: number): boolean {
    if (this.game.gameOver) {
      return false;
    }

    const currentPlayer = this.game.currentPlayer;


    if (currentPlayer.computerMove) {
      const [row, computerColumn] = currentPlayer.makeComputerMove();
      this.board.gameBoard[row][computerColumn] = currentPlayer.symbol;
      return this.#checkGameState(currentPlayer);
    }



    if (isNaN(column) || column < 0 || column >= this.board.gameBoard[0].length) {
      console.log('Ogiltig kolumn!');
      return false;
    }

    for (let row = this.board.gameBoard.length - 1; row >= 0; row--) {
      if (this.board.gameBoard[row][column] === ' ') {
        this.board.gameBoard[row][column] = currentPlayer.symbol;
        return this.#checkGameState(currentPlayer);
      }
    }


    console.log('Kolumnen är full! Vänligen välj en annan kolumn.');
    return false;
  }

  #checkGameState(currentPlayer: Player): boolean {
    const winner = this.game.winChecker.checkForWin();
    const isDraw = this.game.winChecker.checkForDraw();

    this.board.render();

    if (winner === currentPlayer.symbol) {
      this.game.gameOver = true;
      console.log(`Grattis ${currentPlayer.name}, du vann med ${currentPlayer.symbol}!`);
    } else if (isDraw) {
      this.game.gameOver = true;
      console.log('Ingen vinnare, det blev oavgjort...');
    } else {
      this.game.currentPlayer = this.game.currentPlayer === this.game.playerX ? this.game.playerO : this.game.playerX;
      console.log(`Nästa spelare är ${this.game.currentPlayer.name} med ${this.game.currentPlayer.symbol}.`);
    }


    return true;
  }
}
