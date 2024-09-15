

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
		console.log(`Datorn spelar på svårighetsgrad: ${this.difficulty}`);

		if (this.difficulty === 'easy') {
			return this.makeEasyMove();
		} else if (this.difficulty === 'hard') {
			return this.makeHardMove();
		}

		return this.makeEasyMove();
	}

	makeEasyMove(): number {
		const availableColumns = this.getAvailableColumns();
		const randomColumn = availableColumns[Math.floor(Math.random() * availableColumns.length)];
		console.log(`Datorn gör ett slumpmässigt drag i kolumn ${randomColumn}`);
		return randomColumn;
	}

	makeHardMove(): number {

		const winningMove = this.makeWinningMove(this.symbol);
		if (winningMove !== -1) {
			console.log(`Datorn försöker vinna genom att placera i kolumn ${winningMove}`);
			return winningMove;
		}


		const opponentSymbol = this.symbol === 'X' ? 'O' : 'X';
		const defensiveMove = this.makeWinningMove(opponentSymbol);
		if (defensiveMove !== -1) {
			console.log(`Datorn blockerar motståndaren genom att placera i kolumn ${defensiveMove}`);
			return defensiveMove;
		}


		return this.makeEasyMove();
	}

	makeWinningMove(symbol: 'X' | 'O'): number {
		for (let col = 0; col < this.board.gameBoard[0].length; col++) {

			const row = this.getAvailableRow(col);
			if (row !== -1) {

				this.board.gameBoard[row][col] = symbol;


				const winChecker = new WinChecker(this.board);
				if (winChecker.checkForWin() === symbol) {

					this.board.gameBoard[row][col] = ' ';
					return col;
				}


				this.board.gameBoard[row][col] = ' ';
			}
		}
		return -1;
	}

	getAvailableRow(column: number): number {

		for (let row = this.board.gameBoard.length - 1; row >= 0; row--) {
			if (this.board.gameBoard[row][column] === ' ') {
				return row;
			}
		}
		return -1;
	}

	getAvailableColumns(): number[] {
		return this.board.gameBoard[0]
			.map((_, colIndex) => colIndex)
			.filter(colIndex => this.board.gameBoard[0][colIndex] === ' ');
	}
}
