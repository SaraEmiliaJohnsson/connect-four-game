import Board from "./Board.js";
import WinChecker from "./WinChecker.js";

export default class Player {

	name: string;
	symbol: 'X' | 'O';
	board: Board;
	computerMove: boolean;
	difficulty: 'easy' | 'hard';
	winChecker: WinChecker;

	constructor(name: string, symbol: 'X' | 'O', board: Board, computerMove: boolean = false, difficulty: 'easy' | 'hard' = 'easy') {
		this.name = name;
		this.symbol = symbol;
		this.board = board;
		this.computerMove = computerMove;
		this.difficulty = difficulty;
		this.winChecker = new WinChecker(board);
	}

	makeComputerMove(): number {
		if (this.difficulty === 'easy') {
			return this.makeEasyMove();
		} else {
			return this.makeHardMove();
		}
	}



	makeEasyMove(): number {

		const availableColumns = this.board.gameBoard[0]
			.map((_, colIndex) => colIndex)
			.filter(colIndex => this.board.gameBoard[0][colIndex] === ' ');

		if (availableColumns.length === 0) {
			throw new Error('Ingen ledig kolumn.');
		}

		const randomColumn = availableColumns[Math.floor(Math.random() * availableColumns.length)];
		console.log(`Datorn väljer kolumn ${randomColumn}`);
		return randomColumn;

	}

	makeHardMove(): number {

		return this.makeEasyMove();
	}

	isWinningMove(column: number, symbol: 'X' | 'O'): boolean {
		for (let row = this.board.gameBoard.length - 1; row >= 0; row--) {
			if (this.board.gameBoard[row][column] === ' ') {
				this.board.gameBoard[row][column] = symbol;
				const win = this.winChecker.checkForWin() === symbol;
				this.board.gameBoard[row][column] = ' ';
				if (win) {
					return true;
				}
				break;
			}
		}
		return false;
	}
}
