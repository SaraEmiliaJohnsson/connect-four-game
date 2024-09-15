import Board from "./Board.js"


export default class WinChecker {
  board: Board;

  constructor(board: Board) {
    this.board = board;
  }


  public checkForWin(): string | boolean {
    // b - a shorthand alias for this.board.gameBoard
    const b = this.board.gameBoard;
    const offsets = [
      [[0, 0], [0, 1], [0, 2], [0, 3]], // Check horizontal win.
      [[0, 0], [1, 0], [2, 0], [3, 0]], // Check vertical win.
      [[0, 0], [1, 1], [2, 2], [3, 3]], // Check diagonal down-right win.
      [[0, 0], [1, -1], [2, -2], [3, -3]] // Check diagonal up-right win.
    ];


    for (let symbol of ['X', 'O']) {

      for (let r = 0; r < b.length; r++) {
        for (let c = 0; c < b[0].length; c++) {
          for (let winType of offsets) {
            let symbolsInCombo = '';

            for (let [ro, co] of winType) {
              const newRow = r + ro;
              const newCol = c + co;

              if (newRow >= 0 && newRow < b.length && newCol >= 0 && newCol < b[0].length) {
                symbolsInCombo += b[newRow][newCol];
              }
            }

            if (symbolsInCombo === symbol.repeat(4)) {
              return symbol;
            }
          }
        }
      }
    }
    return false;
  }

  public checkForDraw(): boolean {
    return !this.checkForWin() && !this.board.gameBoard.flat().includes(' ');
  }
}
