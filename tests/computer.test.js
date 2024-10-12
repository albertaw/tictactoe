import { Computer } from '../public/modules/computer.js';

describe('computer module', () => {
	test('state is a win for player x', () => {
		const state = [
			[0, 'o', 0],
			['x',0, 0],
			['x','o',0]
		];
		const computer = new Computer();

		const result = computer.isWin(state, 'x', 0, 0);

		expect(result).toEqual(true);
	});

	test('state is a win for player o', () => {
		const state = [
			['x', 0, 'x'],
			[0,   0, 'x'],
			['o', 'o',  0]
		];
		const computer = new Computer();

		const result = computer.isWin(state, 'o', 2, 2);

		expect(result).toEqual(true);
	});

	test('make move to win', () => {
		const state = [
			[0, 'o', 0],
			['x',0, 'x'],
			['x','o',0]
		];
		const computer = new Computer();

		const result = computer.getMove(state);

		expect(result).toEqual([1,1]);
	});

	test('make move to block opponent', () => {
		const state = [
			[0,'o','x'],
			[0, 0, 'x'],
			['x',0,'o']
		];
		const computer = new Computer();

		const result = computer.getMove(state);

		expect(result).toEqual([1,1]);
	});
	
});