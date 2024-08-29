export default class Board {

	gameBoard: string[][]; // The game board, a 2D array.


	constructor() {
		// Initializes the game board with 7 coulmns and 6 rows
		this.gameBoard = Array.from({ length: 6 }, () =>
			Array.from({ length: 7 }, () => ' ')
		);

	}

	// Renders the game board in the console
	render() {
		let line = '\n' + '-'.repeat(29) + '\n';
		console.log(
			line +
			this.gameBoard.map(row =>
				row.map(column => `| ${column} `).join('') + '|').join(line) + line
		);

	}
}