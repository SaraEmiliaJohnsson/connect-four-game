export default class Board {

	gameBoard: string[][];


	constructor() {

		this.gameBoard = Array.from({ length: 6 }, () =>
			Array.from({ length: 7 }, () => ' ')
		);

	}


	render() {
		let line = '\n' + '-'.repeat(29) + '\n';
		console.log(
			line +
			this.gameBoard.map(row =>
				row.map(column => `| ${column} `).join('') + '|').join(line) + line
		);

	}
}
