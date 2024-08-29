import Board from "./Board.js"

// The WinChecker class checks the game board to see
// if a player has won or if the game has ended in a draw.
export default class WinChecker {
  board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  // Checks if there is a winning combination of 4 symbols in a row.
  // It searches horizontally, vertically, and diagonally.
  public checkForWin(): string | boolean {
    // b - a shorthand alias for this.board.gameBoard
    const b = this.board.gameBoard;
    const offsets = [
      [[0, 0], [0, 1], [0, 2], [0, 3]], // Check horizontal win.
      [[0, 0], [1, 0], [2, 0], [3, 0]], // Check vertical win.
      [[0, 0], [1, 1], [2, 2], [3, 3]], // Check diagonal down-right win.
      [[0, 0], [1, -1], [2, -2], [3, -3]] // Check diagonal up-right win.
    ];

    // Loop through each player ('X' and 'O') to check if either has won. 
    for (let symbol of ['X', 'O']) {
      // r = row, c = column.
      for (let r = 0; r < b.length; r++) {
        for (let c = 0; c < b[0].length; c++) {
          for (let winType of offsets) {
            let symbolsInCombo = '';
            // ro = row offset, co = column offset.
            for (let [ro, co] of winType) {
              const newRow = r + ro;
              const newCol = c + co;
              // Ensure the WinChecker does not attempt to read data
              // outside the bounds of the board.
              if (newRow >= 0 && newRow < b.length && newCol >= 0 && newCol < b[0].length) {
                symbolsInCombo += b[newRow][newCol];
              }
            }
            // If a line of 4 symbols is found, return the winning symbol.
            if (symbolsInCombo === symbol.repeat(4)) {
              return symbol;
            }
          }
        }
      }
    }
    return false;
  }
  // Checks if the board is full and if there is no winner
  // then it's a draw.
  public checkForDraw(): boolean {
    return !this.checkForWin() && !this.board.gameBoard.flat().includes(' ');
  }
}