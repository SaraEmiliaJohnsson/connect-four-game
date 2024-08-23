import Board from "./Board.js";


export default class MoveHandler {
  board: Board;


  constructor(board: Board) {
    this.board = board;
  }

  makeMove(symbol: 'X' | 'O', column: number): boolean {
    if (this.board.gameOver) {
      console.log('The game is over!');
      return false;
    }

    if (symbol !== 'X' && symbol !== 'O') {
      console.log('Invalid color!');
      return false;
    }

    if (isNaN(column)) {
      console.log('Invalid column');
      return false;
    }
    if (column < 0 || column >= this.board.gameBoard[0].length) {
      console.log('Invalid column!');
      return false;
    }

    return true;

  }
}