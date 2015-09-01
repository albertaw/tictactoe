module("Tictactoe", {
	setup: function () {
		//code to help run tests
	}
});

test("Board", function () {
	
	Tictactoe.Board.init();
	//test id and position of each cell
	equal(Tictactoe.Board.cell[0].ID, 0, "ID should equal 0");
	equal(Tictactoe.Board.cell[0].position, "corner", "Position should be corner");
	
	equal(Tictactoe.Board.cell[1].ID, 1, "ID should equal 1");
	equal(Tictactoe.Board.cell[1].position, "edge", "Position should edge");
	
	equal(Tictactoe.Board.cell[2].ID, 2, "ID should equal 2");
	equal(Tictactoe.Board.cell[2].position, "corner", "Position should be corner");
	
	equal(Tictactoe.Board.cell[3].ID, 3, "ID should equal 3");
	equal(Tictactoe.Board.cell[3].position, "edge", "Position should edge");
	
	equal(Tictactoe.Board.cell[4].ID, 4, "ID should equal 4");
	equal(Tictactoe.Board.cell[4].position, "center", "Position should be center");
	
	equal(Tictactoe.Board.cell[5].ID, 5, "ID should equal 5");
	equal(Tictactoe.Board.cell[5].position, "edge", "Position should edge");
	
	equal(Tictactoe.Board.cell[6].ID, 6, "ID should equal 6");
	equal(Tictactoe.Board.cell[6].position, "corner", "Position should be corner");
	
	equal(Tictactoe.Board.cell[7].ID, 7, "ID should equal 7");
	equal(Tictactoe.Board.cell[7].position, "edge", "Position should edge");
	
	equal(Tictactoe.Board.cell[8].ID, 8, "ID should equal 8");
	equal(Tictactoe.Board.cell[8].position, "corner", "Position should be corner");
	
});

test("GameStateManager", function () {

	Tictactoe.Game.init();
	//test initial values
	equal(Tictactoe.Game.player["x"].state, 0, "x state = 0");
	equal(Tictactoe.Game.player["x"].score, 0, "x score = 0");
	
	equal(Tictactoe.Game.player["o"].state, 0, "o state = 0");
	equal(Tictactoe.Game.player["o"].score, 0, "o score = 0");
	//test diagonal iswin player x
	Tictactoe.Game.player["x"].state = 273;
	equal(Tictactoe.Game.isWin(Tictactoe.Game.player["x"]), true, "Win = true");
	
	//test horizontal iswin player x
	Tictactoe.Game.player["x"].state = 7;
	equal(Tictactoe.Game.isWin(Tictactoe.Game.player["x"]), true, "Win = true");
	
	//test vertical is win player x
	Tictactoe.Game.player["x"].state = 73;
	equal(Tictactoe.Game.isWin(Tictactoe.Game.player["x"]), true, "Win = true");
	
	//test win with 4 squares selected 56 + 4
	Tictactoe.Game.player["x"].state = 60;
	equal(Tictactoe.Game.isWin(Tictactoe.Game.player["x"]), true, "Win = true");
	
	//test win with 5 squares selected 7 + 8 + 32
	Tictactoe.Game.player["x"].state = 47;
	equal(Tictactoe.Game.isWin(Tictactoe.Game.player["x"]), true, "Win = true");
	
	//test non winning state 4 + 8 + 16
	Tictactoe.Game.player["x"].state = 28;
	equal(Tictactoe.Game.isWin(Tictactoe.Game.player["x"]), false, "Win = false");
	
	//test non winning state 1 + 2 + 8 + 16
	Tictactoe.Game.player["x"].state = 27;
	equal(Tictactoe.Game.isWin(Tictactoe.Game.player["x"]), false, "Win = false");
	
	
	//test if turn is toggled to o after x check for win
	
	//test if turn is toggled to x after o check for win
	
	//test board is draw
	
	//test that values reset
	Tictactoe.Game.cleanup();
	equal(Tictactoe.Game.player["x"].state, 0, "x state = 0");
	equal(Tictactoe.Game.player["x"].score, 0, "x score = 0");
	
	equal(Tictactoe.Game.player["o"].state, 0, "o state = 0");
	equal(Tictactoe.Game.player["o"].score, 0, "o score = 0");
	
});