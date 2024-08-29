import Board from "./Board.js";
import Game from "./Game.js";
import Player from "./Player.js";


export default class MoveHandler {
  board: Board;
  players: Player[];
  currentPlayerIndex: number;
  game: Game;


  constructor(board: Board, players: Player[], game: Game) {
    this.board = board;
    this.players = players;
    this.game = game;
    this.currentPlayerIndex = 0;
  }

  makeMove(column: number): boolean {
    if (this.game.gameOver) {
      return false;
    }

    const currentPlayer = this.game.currentPlayer;


    if (isNaN(column) || column < 0 || column >= this.board.gameBoard[0].length) {
      console.log('Ogiltig kolumn!');
      return false;
    }

    for (let row = this.board.gameBoard.length - 1; row >= 0; row--) {
      if (this.board.gameBoard[row][column] === ' ') {
        this.board.gameBoard[row][column] = currentPlayer.symbol;

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
          this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        }


        return true;
      }
    }



    console.log('Kolumnen är full! Vänligen välj en annan kolumn.');
    return false;
  }
}