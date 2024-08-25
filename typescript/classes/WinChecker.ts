import Board from "./Board.js"


export default class WinChecker {
  private board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  public checkForWin(): string | boolean {
    const b = this.board.gameBoard;
    const offsets = [
      [[0, 0], [0, 1], [0, 2], [0, 3]], // check horisontal win
      [[0, 0], [1, 0], [2, 0], [3, 0]], // check vertical win
      [[0, 0], [1, 1], [2, 2], [3, 3]], // check digonal down win
      [[0, 0], [1, -1], [2, -2], [3, -3]] // check diagonal up win
    ]
  }
}