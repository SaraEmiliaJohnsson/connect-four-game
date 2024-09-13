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
    this.board = new Board();
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

    this.currentPlayer = this.playerX;
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
    console.log('Välkommen till Fyra-I-Rad!');

    const playerXType = this.askYesOrNo('Ska spelare X vara en dator? (ja/nej): ');
    let playerXName: string;
    let playerXDifficulty: 'easy' | 'hard' = 'easy';

    if (playerXType === 'ja') {
      playerXName = 'Dator X';
      playerXDifficulty = prompt('Välj svårighetsgrad för datorn X (easy/hard): ') as 'easy' | 'hard';
    } else {
      playerXName = prompt('Skriv in namn för spelare X: ') || 'Spelare X';
    }

    // Fråga om Spelare O ska vara en dator och välj svårighetsgrad om ja
    const playerOType = this.askYesOrNo('Ska spelare O vara en dator? (ja/nej): ');
    let playerOName: string;
    let playerODifficulty: 'easy' | 'hard' = 'easy';

    if (playerOType === 'ja') {
      playerOName = 'Dator O';
      playerODifficulty = prompt('Välj svårighetsgrad för datorn O (easy/hard): ') as 'easy' | 'hard';
    } else {
      playerOName = prompt('Skriv in namn för spelare O: ') || 'Spelare O';
    }

    // Skapa spelare X och O baserat på val
    this.playerX = new Player(playerXName, 'X', this.board, playerXType === 'ja', playerXDifficulty);
    this.playerO = new Player(playerOName, 'O', this.board, playerOType === 'ja', playerODifficulty);





    this.currentPlayer = this.playerX;

    console.log(`${this.currentPlayer.name} börjar spelet som ${this.currentPlayer.symbol}.`);

    prompt('Tryck Enter för att fortsätta...');
  }


  startGameLoop() {
    while (!this.gameOver) {
      console.clear();
      this.board.render();

      if (this.currentPlayer.computerMove) {
        this.moveHandler.makeMove(-1);


      } else {
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
      }


      if (!this.gameOver) {
        continue;
      }
      prompt('Tryck Enter för att avsluta...');
    }
  }
}



