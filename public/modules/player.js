export class Player {
	constructor(mark){
		this.mark = mark;
		this.score = 0;
	}

	makeMove(state, row, col) {
		if (state[row][col] === 0) {
			state[row][col] = this.mark;
			return true;
		}
		return false;
	}
}