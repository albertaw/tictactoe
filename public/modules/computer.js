import { Player } from './player.js';

export class Computer extends Player {
	constructor(mark, easyMode) {
		super(mark);
		this.easyMode = easyMode;
		this.randomTries = easyMode ? 2 : 0; 
	}

	isWin(boardState, mark, row, col) {
		const state = boardState.map(row => [...row]);
		//make the move
		state[row][col] = mark;		

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

	getMove(state) {
		const rewards = [];

		for (let i = 0; i < state.length; i++) {
			for(let j = 0; j < state[0].length; j++) {
				if (state[i][j] == 0) {	// only check free squares
					const reward = {}
					if (this.isWin(state, 'o', i, j)) {	// winning move
						reward.val = 2;
					} else if (this.isWin(state, 'x', i, j)) {	// blocking move
						reward.val = 1;
					} else {	// neutral move
						reward.val = 0;
					}
					
					reward.location = [i,j];
					rewards.push(reward);
				}
			}
		}

		rewards.sort((a,b) => b.val - a.val);
		const makeRandomMove = Math.floor(Math.random() * 2);
		

		if (this.randomTries === 0) {
			console.log('no more random moves');
			return rewards[0].location;
		}

		if (makeRandomMove === 0) {	//do not make random move
			console.log(makeRandomMove);
			return rewards[0].location;
		} 

		if (makeRandomMove == 1) {	//make random move
			console.log(makeRandomMove);
			this.randomTries -= 1;
			const choice = Math.floor(Math.random() * rewards.length);
			return rewards[choice].location;
		}
	}

	async makeMove(state) {
		const [row, col] = this.getMove(state);

		await new Promise(resolve => {
			setTimeout(function(){
				state[row][col] = 'o';
				const square = document.getElementById(`cell${row}${col}`);
				square.classList.add('oMark');
				resolve('test');
			}, 1000)
		});
	}
}