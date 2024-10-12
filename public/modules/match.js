import { Board } from './board.js';
import { Computer } from './computer.js';
import { Player } from './player.js';
 
export class Match {
	constructor() {
		this.playing = true;
		this.numMoves = 0;
		this.numRounds = 1;
		this.board = new Board();
		this.players = {'x': new Player('x'), 'o': new Computer('o')};
		this.currentPlayer = this.players['x'];

		this.handleBoardClick = this.handleBoardClick.bind(this);
		//this.update = this.update.bind(this);
	}

	async handleBoardClick(cell, row, col) {
		if (this.playing) {
			//human player
			let canMove = this.players['x'].makeMove(this.board.state, row, col);
			if(canMove) {
				cell.classList.add('xMark');
				this.update();
				//computer player
				if(this.playing) {
					await this.players['o'].makeMove(this.board.state);
					this.update();
				}
			}
		}
	}

	update() {
		const mark = this.currentPlayer.mark;
		this.numMoves += 1;
		if (this.isWin(mark)) {
			this.display('message', `${mark} wins`);
			this.playing = false
			this.numRounds += 1;
			this.currentPlayer.score += 1;
		} else if (this.numMoves == 9) {
			this.display('message', 'tie');
			this.playing = false;
			this.numRounds += 1;
		} else {
			this.currentPlayer = mark == 'x' ? this.players['o'] : this.players['x'];
		}
	}

	handleResetClick() {
		this.numMoves = 0;
		this.playing = true;
		this.currentPlayer = this.players['x'];
		this.board.state = [
			[0,0,0],
			[0,0,0],
			[0,0,0]
		];

		const squares = document.getElementsByClassName('square');

		for (let i = 0; i < squares.length; i++) {
			squares[i].classList.remove('xMark');
			squares[i].classList.remove('oMark');
		}

		this.display('message', `Round ${this.numRounds}`);
		this.display('o-score', this.players['o'].score);
	}

	isWin(mark) {
		const state = this.board.state;
		
		for (let i = 0; i < 3; i++) {
			//check rows
			if (state[i][0] == state[i][1] && state[i][1] == state[i][2] && state[i][0] == mark) {
				return true;
			}
			//check columns
			if (state[0][i] == state[1][i] && state[1][i] == state[2][i] && state[0][i] == mark) {
				return true;
			}
		}
		//check diagonals
		if (state[0][0] == state[1][1] && state[1][1] == state[2][2] && state[0][0] == mark) {
			return true;
		}
		if (state[0][2] == state[1][1] && state[1][1] == state[2][0] && state[0][2] == mark) {
			return true;
		}
		return false;
	}

	display(id, text) {
		const el = document.getElementById(id);
		el.textContent = text;
	}

	start() {
		this.board.render(this.handleBoardClick, 'board');
		this.display('x-score', this.players['x'].score);
		this.display('o-score', this.players['o'].score);
		this.display('message', `Round ${this.numRounds}`);
		document.getElementById('resetButton').addEventListener('click', () => this.handleResetClick());
	}
}