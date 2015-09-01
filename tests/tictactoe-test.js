module("Tictactoe", {

});

test("Board", function () {
	
	Tictactoe.initGUI();
	//test initialization
	equal($('#x').val(), 0, "x field = 0");
	equal($('#o').val(), 0, "o field = 0");
	
	//test id and position of each cell
	equal(Tictactoe.cell[0].ID, 0, "ID should equal 0");
	equal(Tictactoe.cell[0].position, "corner", "Position should be corner");
	
	equal(Tictactoe.cell[1].ID, 1, "ID should equal 1");
	equal(Tictactoe.cell[1].position, "edge", "Position should edge");
	
	equal(Tictactoe.cell[2].ID, 2, "ID should equal 2");
	equal(Tictactoe.cell[2].position, "corner", "Position should be corner");
	
	equal(Tictactoe.cell[3].ID, 3, "ID should equal 3");
	equal(Tictactoe.cell[3].position, "edge", "Position should edge");
	
	equal(Tictactoe.cell[4].ID, 4, "ID should equal 4");
	equal(Tictactoe.cell[4].position, "center", "Position should be center");
	
	equal(Tictactoe.cell[5].ID, 5, "ID should equal 5");
	equal(Tictactoe.cell[5].position, "edge", "Position should edge");
	
	equal(Tictactoe.cell[6].ID, 6, "ID should equal 6");
	equal(Tictactoe.cell[6].position, "corner", "Position should be corner");
	
	equal(Tictactoe.cell[7].ID, 7, "ID should equal 7");
	equal(Tictactoe.cell[7].position, "edge", "Position should edge");
	
	equal(Tictactoe.cell[8].ID, 8, "ID should equal 8");
	equal(Tictactoe.cell[8].position, "corner", "Position should be corner");
	
	//test start new game
	Tictactoe.clearBoard();
	
	
});

test("GameStateManager", function () {

	Tictactoe.initGame();
	//test initial values
	equal(Tictactoe.player["x"].state, 0, "x state = 0");
	equal(Tictactoe.player["x"].score, 0, "x score = 0");
	equal(Tictactoe.player["o"].state, 0, "o state = 0");
	equal(Tictactoe.player["o"].score, 0, "o score = 0");
	equal(Tictactoe.numMoves, 0, "numMoves = 0");
	equal(Tictactoe.round, 1, "round = 1");
	equal(Tictactoe.turn, "x", "turn = x");
	
	//test diagonal iswin player x
	Tictactoe.player["x"].state = 273;
	equal(Tictactoe.isWin(Tictactoe.player["x"]), true, "Win = true");
	
	//test horizontal iswin player x
	Tictactoe.player["x"].state = 7;
	equal(Tictactoe.isWin(Tictactoe.player["x"]), true, "Win = true");
	
	//test vertical is win player x
	Tictactoe.player["x"].state = 73;
	equal(Tictactoe.isWin(Tictactoe.player["x"]), true, "Win = true");
	
	//test win with 4 squares selected 56 + 4
	Tictactoe.player["x"].state = 60;
	equal(Tictactoe.isWin(Tictactoe.player["x"]), true, "Win = true");
	
	//test win with 5 squares selected 7 + 8 + 32
	Tictactoe.player["x"].state = 47;
	equal(Tictactoe.isWin(Tictactoe.player["x"]), true, "Win = true");
	
	//test non winning state 4 + 8 + 16
	Tictactoe.player["x"].state = 28;
	equal(Tictactoe.isWin(Tictactoe.player["x"]), false, "Win = false");
	
	//test non winning state 1 + 2 + 8 + 16
	Tictactoe.player["x"].state = 27;
	equal(Tictactoe.isWin(Tictactoe.player["x"]), false, "Win = false");
	
	//clicking board turn should be o
	
	
	//test if turn is toggled to x after o check for win
	
	//test board is draw
	
	//test score is updated after x wins
	
	//test score is updated after o wins
	
	//test that there is no change in score in the event of a draw
	
	//test that values reset
	Tictactoe.cleanup();
	equal(Tictactoe.player["x"].state, 0, "x state = 0");
	equal(Tictactoe.player["o"].state, 0, "o state = 0");
	equal(Tictactoe.numMoves, 0, "numMoves = 0");
	equal(Tictactoe.turn, "x", "turn = x");
	
});

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