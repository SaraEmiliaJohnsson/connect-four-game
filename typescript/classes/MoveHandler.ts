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

  makeMove(symbol: 'X' | 'O', column: number): boolean {


    const currentPlayer = this.players[this.currentPlayerIndex];

    if (symbol !== 'X' && symbol !== 'O') {
      console.log('Invalid symbol! Only X or O are allowed.');
      return false;
    }

    if (isNaN(column) || column < 0 || column >= this.board.gameBoard[0].length) {
      console.log('Invalid column!');
      return false;
    }

    for (let row = this.board.gameBoard.length - 1; row >= 0; row--) {
      if (this.board.gameBoard[row][column] === ' ') {
        this.board.gameBoard[row][column] = currentPlayer.symbol;

        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        // this.board.currentPlayerSymbol = this.players[this.currentPlayerIndex].symbol;
        return true;
      }
    }



    console.log("Column is full! Please choose another column.");
    return false;
  }
}