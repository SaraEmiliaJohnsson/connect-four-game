import Board from "./Board.js";
import MoveHandler from "./MoveHandler.js";
import Player from "./Player.js";
import WinChecker from "./WinChecker.js";


export default class Game {
  private board: Board;
  private playerX!: Player;
  private playerO!: Player;
  private moveHandler: MoveHandler;
  private winChecker: WinChecker;
  private currentPlayer!: Player;
  private gameOver: boolean;

  constructor() {
    this.gameOver = false;
    while (true) {
      this.createPlayer();
      this.board = new Board();
      this.winChecker = new WinChecker(this.board);
      this.moveHandler = new MoveHandler(this.board, [this.playerX, this.playerO], this);

    }

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
}