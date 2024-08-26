import Board from "./Board.js";
import MoveHandler from "./MoveHandler.js";
import Player from "./Player.js";
import WinChecker from "./WinChecker.js";


export default class Game {
  private board: Board;
  private player1!: Player;
  private player2!: Player;
  private moveHandler: MoveHandler;
  private winChecker: WinChecker;
  private currentPlayer!: Player;
  private gameOver: boolean;

  constructor() {
    this.gameOver = false;
    this.createPlayer();
    this.board = new Board();
    this.winChecker = new WinChecker(this.board);
    this.moveHandler = new MoveHandler(this.board, [this.player1, this.player2], this);


  }

  createPlayer() {
    console.clear();
    console.log('Fyra-I-Rad\n');
    const player1Name = prompt('Skriv in namn för spelare 1: ');
    const player2Name = prompt('Skriv in namn för spelare 2: ');

    this.player1 = new Player(player1Name, 'X');

  }
}