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
      return false;
    }

  }
}