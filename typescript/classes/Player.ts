import Board from "./Board.js";
import WinChecker from "./WinChecker.js";

export default class Player {

	name: string;
	symbol: 'X' | 'O';
	board: Board;
	computerMove: boolean;
	difficulty: 'lätt' | 'svår';
	winChecker: WinChecker;

	constructor(name: string, symbol: 'X' | 'O', board: Board, computerMove: boolean = false, difficulty: 'lätt' | 'svår' = 'lätt') {
		this.name = name;
		this.symbol = symbol;
		this.board = board;
		this.computerMove = computerMove;
		this.difficulty = difficulty;
		this.winChecker = new WinChecker(board);
	}

	makeComputerMove(): number {
		return this.difficulty === 'lätt' ? this.makeEasyMove() : this.makeHardMove();

	}



	makeEasyMove(): number {
		const availableColumns = this.getAvailableColumns();
		const randomColumn = availableColumns[Math.floor(Math.random() * availableColumns.length)];
		console.log(`Datorn gör ett slumpmässigt drag i kolumn ${randomColumn}`);
		return randomColumn;
	}

	makeHardMove(): number {


		for (let col of this.getAvailableColumns()) {
			if (this.isWinningMove(col, this.symbol)) {
				console.log('Datorn försöker vinna');

				return col;
			}
		}

		const opponentSymbol = this.symbol === 'X' ? 'O' : 'X';
		for (let col of this.getAvailableColumns()) {
			if (this.isWinningMove(col, opponentSymbol)) {
				console.log(`Datorn blockerar motståndaren genom att placera i kolumn ${col}`);
				return col;
			}
		}
		console.log("Datorn gör ett slumpmässigt drag");
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

	getAvailableColumns(): number[] {
		return this.board.gameBoard[0]
			.map((_, colIndex) => colIndex)
			.filter(colIndex => this.board.gameBoard[0][colIndex] === ' ');
	}
}
