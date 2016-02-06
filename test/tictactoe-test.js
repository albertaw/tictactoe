module("Tictactoe", {

});

Tictactoe.board.init();
	var cell = Tictactoe.board.getCells();

test("game board initialization", function () {
	
	//test id and position of each cell
	equal(cell[0].ID, 0, "ID should equal 0");
	
	equal(cell[0].position, "corner", "Position should be corner");
	
	equal(cell[1].ID, 1, "ID should equal 1");
	equal(cell[1].position, "edge", "Position should edge");
	
	equal(cell[2].ID, 2, "ID should equal 2");
	equal(cell[2].position, "corner", "Position should be corner");
	
	equal(cell[3].ID, 3, "ID should equal 3");
	equal(cell[3].position, "edge", "Position should edge");
	
	equal(cell[4].ID, 4, "ID should equal 4");
	equal(cell[4].position, "center", "Position should be center");
	
	equal(cell[5].ID, 5, "ID should equal 5");
	equal(cell[5].position, "edge", "Position should edge");
	
	equal(cell[6].ID, 6, "ID should equal 6");
	equal(cell[6].position, "corner", "Position should be corner");
	
	equal(cell[7].ID, 7, "ID should equal 7");
	equal(cell[7].position, "edge", "Position should edge");
	
	equal(cell[8].ID, 8, "ID should equal 8");
	equal(cell[8].position, "corner", "Position should be corner");
	
});

var player = Tictactoe.game.player;

test("initial game state", function () {

	Tictactoe.game.init(1);
	//test initial values
	equal(player["x"].state, 0, "x state = 0");
	equal(player["x"].score, 0, "x score = 0");
	equal(player["o"].state, 0, "o state = 0");
	equal(player["o"].score, 0, "o score = 0");
	
	equal(Tictactoe.game.numMoves, 0, "numMoves = 0");
	equal(Tictactoe.game.round, 1, "round = 1");
	equal(Tictactoe.game.turn, "x", "turn = x");
	
});

test("winning states", function () {
	//test diagonal iswin player x
	player["x"].state = 273;
	equal(Tictactoe.game.isWin(player["x"].state), true, "Win = true");
	
	//test horizontal iswin player x
	player["x"].state = 7;
	equal(Tictactoe.game.isWin(player["x"].state), true, "Win = true");
	
	//test vertical is win player x
	player["x"].state = 73;
	equal(Tictactoe.game.isWin(player["x"].state), true, "Win = true");
	
	//test win with 4 squares selected 56 + 4
	player["x"].state = 60;
	equal(Tictactoe.game.isWin(player["x"].state), true, "Win = true");
	
	//test win with 5 squares selected 7 + 8 + 32
	player["x"].state = 47;
	equal(Tictactoe.game.isWin(player["x"].state), true, "Win = true");
	
	//test non winning state 4 + 8 + 16
	player["x"].state = 28;
	equal(Tictactoe.game.isWin(player["x"].state), false, "Win = false");
	
	//test non winning state 1 + 2 + 8 + 16
	player["x"].state = 27;
	equal(Tictactoe.game.isWin(player["x"].state), false, "Win = false");

	Tictactoe.game.cleanup();
	
	
});

test("game moves", function () {
	
	//clicking board turn should be o
	Tictactoe.game.update(cell[0]);
	equal(player["x"].state, 1, "x state = 1");
	equal(Tictactoe.game.turn, "x", "turn = x");
	//test if turn is toggled to x after o check for win
	
	//test board is draw
	
	//test score is updated after x wins
	
	//test score is updated after o wins
	
	//test that there is no change in score in the event of a draw
	
	//test that values reset
	//Tictactoe.cleanup();
	//equal(Tictactoe.player["x"].state, 0, "x state = 0");
	//equal(Tictactoe.player["o"].state, 0, "o state = 0");
	//equal(Tictactoe.numMoves, 0, "numMoves = 0");
	//equal(Tictactoe.turn, "x", "turn = x");
})
/*
module('AI', {
	setup: function () {
		
	},
	teardown: function () {
		
	}
});

test('AIManager', function () {
	//moves has 8 cell objects on initialization
	Tictactoe.initGUI();
		Tictactoe.initGame();
		AIManager.init();
	//AIManager.updateMoves();
	AIManager.initialPosition = "corner";
	equal(AIManager.moves.length, 9, "number of elements is 9");
	equal(AIManager.turnNumber, 1, "turn = 1");
	//evalStrategy1 when x is corner o is center
	//Tictactoe.cell[0].dispatchEvent('onclick');
	equal(AIManager.initialPosition, "corner", "opp position = corner");
	AIManager.evalStrategy1();
	equal(Tictactoe.player.o.state, 16, "state = 16");
	equal(Tictactoe.cell[4].isFree, false, "cell 4 !isFree");
	equal(AIManager.moves.length, 8, "number of moves = 8");
	equal(AIManager.moves[4].position, "edge", "element at 4 = edge");
	AIManager.getMoves();
	//evalStrategy1 when x is center o is corner
	
	//evalStrategy1 when x is edge o is corner
	
	//evalStrategy2 corner, o blocks x from winning
	
	//evalStrategy2 center, o blocks x from winning
	
	//evalStrategy2 edge, o blocks x from winning
	
	//evalStrategy3 corner, o blocks x from winning
	
	//evalStrategy3 corner, o takes win 
	
	//evalStrategy3 center, o blocks x from winning
	
	//evalStrategy3 center, o takes win 
	
	//evalStrategy3 edge, o blocks x from winning
	
	//evalStrategy3 edge, o takes win 
	
	Tictactoe.clearBoard();
		Tictactoe.cleanup();
		AIManager.cleanup();

});
*/
