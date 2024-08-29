import Board from "./Board.js";
import MoveHandler from "./MoveHandler.js";
import Player from "./Player.js";
import WinChecker from "./WinChecker.js";
import prompt from "../helpers/prompt.js";


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
    this.createPlayer();

    while (true) {

      this.board = new Board();
      this.winChecker = new WinChecker(this.board);
      this.moveHandler = new MoveHandler(this.board, [this.playerX, this.playerO], this);

      this.startGameLoop();

      let playAgain = this.askYesOrNo('Vill ni spela igen med samma namn? (ja/nej): ');
      if (playAgain?.toLowerCase() === 'ja') {
        this.resetGame();
      } else {
        let changeNames = this.askYesOrNo('Vill ni starta spelet med nya namn? (ja/nej): ');
        if (changeNames?.toLowerCase() === 'ja') {
          this.createPlayer();
          this.resetGame();
          continue;
        } else {
          console.log('Tack för att ni spelade!');
          break;

        }
      }
    }
  }

  resetGame() {
    this.board = new Board();
    this.winChecker = new WinChecker(this.board);
    this.moveHandler = new MoveHandler(this.board, [this.playerX, this.playerO], this);
    this.gameOver = false;

    console.log(`${this.currentPlayer.name} börjar spelet som ${this.currentPlayer.symbol}.`);
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
    const player1Name: string = prompt('Skriv in namn för spelare 1: ') || 'Spelare 1';
    const player2Name: string = prompt('Skriv in namn för spelare 2: ') || 'Spelare 2';



    if (Math.random() < 0.5) {
      this.playerX = new Player(player1Name, 'X');
      this.playerO = new Player(player2Name, 'O');
      this.currentPlayer = this.playerX;
      console.log(`${this.currentPlayer.name} börjar spelet som 'X'.`);

    } else {
      this.playerO = new Player(player2Name, 'X');
      this.playerX = new Player(player1Name, 'O');
      this.currentPlayer = this.playerO;
      console.log(`${this.currentPlayer.name} börjar spelet med 'O'.`);
    }
    prompt('Tryck Enter för att fortsätta...');
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

      if (!this.moveHandler.makeMove(column)) {
        console.log('Ogiltigt drag. Försök igen.');
        prompt('Tryck Enter för att fortsätta...');
        continue;
      }

      if (!this.gameOver) {
        this.currentPlayer = this.currentPlayer === this.playerX ? this.playerO : this.playerX;
      } else {
        prompt('Tryck Enter för att avsluta...');
      }
    }
  }
}