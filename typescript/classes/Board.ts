export default class Board {

    gameBoard: string[][];
    currentPlayerSymbol: string;
    winner: boolean;
    isDraw: boolean;
    gameOver: boolean;

    constructor() {

        this.gameBoard = Array.from({ length: 7 }, () =>
            Array.from({ length: 6 }, () => ' ')
        );

        this.currentPlayerSymbol = 'X';

        this.winner = false;
        this.isDraw = false;
        this.gameOver = false;
    }

    render() {
        let line = '\n' + '-'.repeat(25) + '\n';
        console.log(
            line +
            this.gameBoard.map(row =>
                row.map(column => `| ${column} `).join('') + '|').join(line) + line
        );

    }
}