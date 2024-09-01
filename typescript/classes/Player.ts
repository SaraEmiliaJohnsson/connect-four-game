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

	makeComputerMove(): number {
		if (!this.board || !this.board.gameBoard) {
			throw new Error("Brädet är inte initierat.");
		}

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
}
// 	if(this.difficulty === 'easy') {
// 	return this.makeEasyMove();
// } else {
// 	return this.makeHardMove();
// }

// 	makeEasyMove(): Array<number> {

// 		if (!this.board || !this.board.gameBoard) {
// 			throw new Error("Board is not initialized.");
// 		}

// 		const availableColumns = this.board.gameBoard[0]
// 			.map((_, colIndex) => colIndex)
// 			.filter(colIndex => this.board.gameBoard[0][colIndex] === ' ');

// 		if (availableColumns.length === 0) {
// 			throw new Error('Ingen ledig kolumn.');
// 		}

// 		const randomColumn = availableColumns[Math.floor(Math.random() * availableColumns.length)];

// 		// Kontrollera att symbolen placeras på rätt rad, inte bara längst ner
// 		for (let row = this.board.gameBoard.length - 1; row >= 0; row--) {
// 			if (this.board.gameBoard[row][randomColumn] === ' ') {
// 				console.log(`Lägger i kolumn ${randomColumn} på rad ${row}`);
// 				return [row, randomColumn];
// 			}
// 		}

// 		throw new Error('Misslyckades med att hitta en tillgänglig plats i kolumnen.');
// 	}

// 	private makeHardMove(): Array<number> {
// 		// Placeholder: gör ett slumpmässigt drag just nu
// 		// Här kan du implementera mer avancerad logik
// 		return this.makeEasyMove();
// 	}
