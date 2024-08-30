import Board from "./Board.js";

export default class Player {

	name: string;
	symbol: 'X' | 'O';
	board: Board;
	computerMove: boolean;
	difficulty: 'easy' | 'hard';

	constructor(name: string, symbol: 'X' | 'O', board: Board, computerMove: boolean = false, difficulty: 'easy' | 'hard' = 'easy') {
		this.name = name;
		this.symbol = symbol;
		this.board = board;
		this.computerMove = computerMove;
		this.difficulty = difficulty;
	}

	makeComputerMove(): Array<number> {
		if (this.difficulty === 'easy') {
			return this.makeEasyMove();
		} else {
			return this.makeHardMove();
		}
	}


	makeEasyMove(): Array<number> {
		const emptyColumns = this.board.gameBoard[0].map((_, colIndex) => colIndex).filter(colIndex => this.board.gameBoard[0][colIndex] === ' ');

		const randomColumn = emptyColumns[Math.floor(Math.random() * emptyColumns.length)];

		for (let row = this.board.gameBoard.length - 1; row >= 0; row--) {
			if (this.board.gameBoard[row][randomColumn] === ' ') {
				return [row, randomColumn];
			}
		}
		return [0, randomColumn];
	}

	private makeHardMove(): Array<number> {
		// Placeholder: gör ett slumpmässigt drag just nu
		// Här kan du implementera mer avancerad logik
		return this.makeEasyMove();
	}
}