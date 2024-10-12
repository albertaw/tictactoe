import { Match } from '../public/modules/match.js';

describe('match module', () => {
  
  test('isWin horizontal configuration', () => {
  	const match = new Match();
  	match.board.state = [
  		['o',0,0],
  		['x','x','x'],
  		['o',0,0]
  	];

  	const result = match.isWin('x');
  	expect(result).toEqual(true);

  	const result2 = match.isWin('o');
  	expect(result2).toEqual(false);
  });

  test('isWin vertical configuration', () => {
  	const match = new Match();
  	match.board.state = [
  		['o','x',0],
  		['o','x','x'],
  		['o',0,0]
  	];

  	const result = match.isWin('o');
  	expect(result).toEqual(true);

  	const result2 = match.isWin('x');
  	expect(result2).toEqual(false);
  });
 
 	test('isWin diagonal configuration', () => {
 		const match = new Match();
  	match.board.state = [
  		['o','x',0],
  		[0,'o','x'],
  		['x',0,'o']
  	];

  	const result = match.isWin('o');
  	expect(result).toEqual(true);

  	const result2 = match.isWin('x');
  	expect(result2).toEqual(false);
 	});

  test('update game when there is a win', () => {
  	const match = new Match();
  	match.numMoves = 4;
  	match.board.state = [
  		['o',0,0],
  		['x','x','x'],
  		['o',0,0]
  	];
  	document.body.innerHTML = '<p id="message"></p>';

  	match.update();

  	expect(match.playing).toEqual(false);
    expect(match.numMoves).toEqual(5);
  	expect(match.numRounds).toEqual(2);
  	expect(match.currentPlayer.score).toEqual(1);
  	expect(document.getElementById('message').textContent).toEqual('x wins');
  });

  test('update game when there is a tie', () => {
  	const match = new Match();
  	match.numMoves = 8;
  	match.board.state = [
  		['o','x','o'],
  		['x','x','o'],
  		['x','o','x']
  	];
  	document.body.innerHTML = '<p id="message"></p>';

  	match.update();

  	expect(match.playing).toEqual(false);
    expect(match.numMoves).toEqual(9);
  	expect(match.numRounds).toEqual(2);
  	expect(match.currentPlayer.score).toEqual(0);
  	expect(document.getElementById('message').textContent).toEqual('tie');
  })

  test('update game for a neutral move by player x', () => {
  	const match = new Match();
  	match.numMoves = 4;
  	match.board.state = [
			[0, 'o', 'x'],
			['x',0, 0],
			['x','o',0]
		];

		match.update();

		expect(match.playing).toEqual(true);
    expect(match.numMoves).toEqual(5);
  	expect(match.numRounds).toEqual(1);
  	expect(match.currentPlayer.mark).toEqual('o');
  });

  it('handleBoardClick for x', async () => {
    const match = new Match();
    match.numMoves = 4;
    match.board.state = [
      [0,'o','x'],
      [0, 0, 'x'],
      [0, 0, 'o']
    ];
    const newState = [
      [0,'o','x'],
      [0,'o','x'],
      ['x',0,'o']
    ];
    document.body.innerHTML = '<div id="board"></div>';
    
    match.board.render(match.handleBoardClick, 'board');
    const square = document.getElementById('cell01');

    return match.handleBoardClick(square, 2, 0)
      .then(() => {
        expect(match.board.state).toEqual(newState);
        expect(match.numMoves).toEqual(6);
      });
  });

  it('handleBoardClick x wins', async () => {
    const match = new Match();
    match.numMoves = 4;
    match.board.state = [
      ['o',0,0],
      ['x','x',0],
      ['o',0,0]
    ];
    const newState = [
      ['o',0,0],
      ['x','x','x'],
      ['o',0,0]
    ];
    document.body.innerHTML = 
    '<div id="message"></div>' +
    '<div id="board"></div>';

    match.board.render(match.handleBoardClick, 'board');
    const square = document.getElementById('cell12');

    return match.handleBoardClick(square, 1, 2)
      .then(() => {
        expect(match.board.state).toEqual(newState);
        expect(match.numMoves).toEqual(5);
        expect(match.playing).toEqual(false);
      }); 
  });

  it('handleBoardClick when there is a tie', async () => {
    const match = new Match();
    match.numMoves = 8;
    match.board.state = [
      ['o','x','o'],
      ['x','x','o'],
      ['x','o', 0]
    ];
    const newState = [
      ['o','x','o'],
      ['x','x','o'],
      ['x','o', 'x']
    ];
    document.body.innerHTML = 
    '<div id="message"></div>' +
    '<div id="board"></div>';

    match.board.render(match.handleBoardClick, 'board');
    const square = document.getElementById('cell22');

    return match.handleBoardClick(square, 2, 2)
      .then(() => {
        expect(match.board.state).toEqual(newState);
        expect(match.numMoves).toEqual(9);
        expect(match.playing).toEqual(false);
      }); 
  });
});