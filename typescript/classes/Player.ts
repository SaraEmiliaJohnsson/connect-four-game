export default class Player {

	name: string;
	symbol: 'X' | 'O';

	constructor(name: string, symbol: 'X' | 'O') {
		this.name = name;
		this.symbol = symbol;
	}
}