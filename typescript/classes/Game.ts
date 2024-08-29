import Board from "./Board.js";
import MoveHandler from "./MoveHandler.js";
import Player from "./Player.js";
import WinChecker from "./WinChecker.js";


export default class Game {
  board: Board;
  playerX!: Player;
  playerO!: Player;
  moveHandler: MoveHandler;
  winChecker: WinChecker;
  currentPlayer!: Player;
  gameOver: boolean;

  constructor() {
    this.gameOver = false;
    while (true) {
      this.createPlayer();
      this.board = new Board();
      this.winChecker = new WinChecker(this.board);
      this.moveHandler = new MoveHandler(this.board, [this.playerX, this.playerO], this);

      this.startGameLoop();
      this.whoHasWonOnGameOver();

      let playAgain = prompt('Vill ni spela igen med samma namn? (ja/nej): ');
      if (playAgain?.toLowerCase() !== 'ja') {
        continue;
      } else {
        let changeNames = prompt('Vill ni starta spelet med nya namn? (ja/nej): ');
        if (changeNames?.toLowerCase() === 'ja') {
          continue;
        } else {
          console.log('Tack för att ni spelade!');
          break;

        }
      }
    }
  }

  askYesOrNo(question: string): string {
    let answer: string | null;

    do {
      answer = prompt(question)?.toLowerCase() ?? null;
      if (answer !== 'ja' && answer !== 'nej') {
        console.log('Ogiltigt svar, ange "ja" eller "nej".');

      }
    } while (answer !== 'ja' && answer !== 'nej');
    return answer;
  }

  createPlayer() {
    console.clear();
    console.log('Fyra-I-Rad\n');
    const playerXName: string = prompt('Skriv in namn för spelare X: ') || 'Spelare X';
    const playerOName: string = prompt('Skriv in namn för spelare O: ') || 'Spelare O';

    this.playerX = new Player(playerXName, 'X');
    this.playerO = new Player(playerOName, 'O');

    if (Math.random() < 0.5) {
      this.currentPlayer = this.playerX;
      console.log(`${this.playerX.name} börjar spelet som 'X'.`);

    } else {
      this.currentPlayer = this.playerO;
      console.log(`${this.playerO.name} börjar spelet med 'O'.`);
    }
    prompt('Tryck Enter för att fortsätta...')
  }

  startGameLoop() {
    while (!this.gameOver) {
      console.clear();
      this.board.render();
      let move = prompt(`Ange ditt drag ${this.currentPlayer.symbol} ${this.currentPlayer.name} - skriv in kolumnnummer (1-7): `);
      if (move === null) {
        console.log('Du måste ange en kolumn mellan 1-7. Försök igen.');
        return;
      }

      let column = +move.trim() - 1;

      if (!this.moveHandler.makeMove(this.currentPlayer.symbol, column)) {
        console.log('Ogiltigt drag. Försök igen.');
        prompt('Tryck Enter för att fortsätta...');
        continue;
      }

      this.currentPlayer = this.currentPlayer === this.playerX ? this.playerO : this.playerX;

      if (this.winChecker.checkForWin() || this.winChecker.checkForDraw()) {
        this.gameOver = true;
      }
    }
  }

  whoHasWonOnGameOver() {
    console.clear();
    this.board.render();

    if (this.winChecker.checkForWin()) {
      let winningPlayer = this.currentPlayer === this.playerX ? this.playerO : this.playerX;
      console.log(`Grattis ${winningPlayer.symbol}: ${winningPlayer.name}, du vann!`);
    } else {
      console.log('Ingen vinnare, det blev oavgjort...');

    }
  }
}