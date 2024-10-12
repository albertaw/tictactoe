import { Player } from '../public/modules/player.js';

describe('player module', () => {

	test('make move on a free square', () => {
		const player = new Player('x');
		const state = [
			[0,0,0],
			[0,0,0],
			[0,0,0]
		];

		const result = player.makeMove(state, 0, 1);

		expect(result).toBe(true);
	});

	test('make move on an occupied square', () => {
		const player = new Player('x');
		const state = [
			[0,'o',0],
			[0,0,0],
			[0,0,0]
		];

		const result = player.makeMove(state, 0, 1);

		expect(result).toBe(false);
	})
});