/**********************************************************
* TIC-TAC-TOE
* 2 Player game where the user fights against the computer 
* in  3 rounds.  A player must mark 3 squares in a row 
* horizontally, vertically, or diagonally to win the round.  
**********************************************************/

//namespace
var Tictactoe = {};

/**********************************************************
 * BOARD
 * Handles the creation, update and destruction of game elements.
 *********************************************************/
Tictactoe.Board = (function () {
		
	/**		 			
	*   0   |   1   |   2     - corner
	* ------|-------|------- 
	*   3   |   4   |   5     - edge
	* ------|-------|-------
	*   6   |   7   |   8     - corner
	* 
	*/
	
	var cell = [];

	//Adds properties to cells then adds cells to cell array
	var setBoard = function () {
		var td = document.getElementsByTagName('td');
		var cellID = 0;		//assigns a numeric identifer to cells when initializing board
		//for each table cell
		for (var i = 0; i < td.length; i++) {
			
			td[i].ID = cellID; // set the cell's ID for computing its bit value
			td[i].isSelected = false;	
			//td[i].innerHTML = "";
			td[i].className = "";
			td[i].onclick = setSquare;
			//cell[i].className = "default"; //set the cell's style
			if (i == 4) {		
				td[i].position = "center";
			} else if (i % 2 == 0) {		
				td[i].position = "corner";	
			} else {
				td[i].position = "edge";
			}
			cell.push(td[i]);	//add cell to array,	
			cellID++;
		}
		console.log("board initialized");
	};
	
	var setSquare = function () {
		//check if square is selected
		
		if (!this.isSelected) {
			var turn = Tictactoe.Game.turn;
			//this.innerHTML = turn;
			$(this).addClass(turn+'Mark');				
			this.isSelected = true;
			Tictactoe.Game.player[turn].state += Math.pow(2, this.ID);
			console.log(turn + ' turn' );
			Tictactoe.Game.numMoves++;
				console.log(this.ID + "clicked");
		} 

		if (Tictactoe.Game.isWin(Tictactoe.Game.player[turn])) {		//check if state is a win
			Tictactoe.Game.changeState("win");
		} else if (Tictactoe.Game.numMoves === 9) {	//if not a win check if a draw
			Tictactoe.Game.changeState("draw");
		} else if (Tictactoe.Game.turn === "x") {		//if not a win or draw, change turns
			Tictactoe.Game.changeState("playerO");
			Tictactoe.Game.turn = "o"
		} else {
			Tictactoe.Game.changeState("playerX");
			Tictactoe.Game.turn = "x";
		}
	};
	

	var clearBoard = function () {
		for (var i = 0; i < cell.length; i++) {
			cell[i].isSelected = false;
			//cell[i].innerHTML = "";
			cell[i].className = "";
		}
		
	};
	
	var enableBtnNewGame = function () {
		$('#reload').click(function () {
			//Tictactoe.Board.init();
			setBoard();
			Tictactoe.Game.init();
		});
	};
	
	var init = function () {
		setBoard();
		enableBtnNewGame();
	};
	
	return {
		init: init,
		cleanup: clearBoard,
		cell: cell
	}
	
	
})();
	
/**********************************************************
 * GAME STATE MANAGER
 * Defines game loop and rules for gameplay, switching
 * screnes, and othe game states.
 *********************************************************/
Tictactoe.Game = (function () { 

		
	/**
	* 273				 84
	*   \				 /
	*   1   |   2   |   4   | = 7
	* ------|-------|-------| 
	*   8   |  16   |  32   | = 56
	* ------|-------|-------|
	*  64   |  128  |  256  | = 448
	* =======================
	*  73	   146	   292
	*/
	var wins = [7, 56, 448, 73, 146, 292, 273, 84];
	
	var numMoves = 0;
	var round = 1;
	var turn = 'x';
	var player = {
		x: {state: 0, score: 0},
		o: {state: 0, score: 0}
	};	
	var currentState;
	
	var changeState = function(state) {
		switch (state) {
			case "intro":
				handleIntro();
				break;
			case "win":
				handleWin();
				break;
			case "gameOver":
				handlegameOver();
				break;
			case "draw":
				handleDraw();
				break;
			case "playerX":
				handlePlayerX();
				break;
			case "playerO":
				handlePlayerO();
				break;
		}
	};
	
	//screen shows round 1 intro on load
	var handleIntro = function () {
		currentState = "intro";
	};
	
	//state when x or o wins
	var handleWin = function () {
		player[turn].score += 1;	//add one to winning player's score
		round++;
		if (player[turn].score == 2) {	//check for game over
			handleGameOver();
		} else {
			currentState = "win";
			setMessage(turn + "wins!");
		
			//setTimeout(setMessage("Round " + round), 2000);	//delay announcin next round
				Tictactoe.Board.cleanup();		//delay resetting the board
		}
		
		cleanup();	//reset points for next round
	};
	
	//state when x or o has won the tournament
	var handleGameOver = function () {
		currentState = "gameOver";
		//announce overall winner

	};
	
	//state when their are no more moves and no one wins
	var handleDraw = function () {
		currentState = "draw";
		setMessage("Draw");
	};
	
	//x is the human
	var handlePlayerX = function () {
		currentState = "playerX";
		
	};
	
	//o is the computer
	var handlePlayerO = function () {
		currentState = "playerO";
		
	};
	
	//utility function to display text on screen
	var setMessage = function (string){
		$('#message').text(string);
	};
		
	
	var isWin = function (player) {
		for (var i = 0; i < wins.length; i++) {
			if ((wins[i] & player.state) === wins[i]) {	
				//text('feedback', player.name + ' Wins');
				return true;
			}
		}
		return false;
	};
	
	//updates cell as selected, adds an x to location,
	//updates player's winning state score
	var setSquare = function () {
		//check if square is selected
		
		if (!this.isSelected) {
			this.innerHTML = turn;	
			this.isSelected = true;
			player[turn].state += Math.pow(2, this.ID);
			//console.log(turn + ':' + player[turn]);
			numMoves++;
				console.log(this.ID + "clicked");
		} 
	
	};
	
	//checks board for a winning state, or draw state
	var checkWin = function () {
		if (isWin(player[turn])) {		//check if state is a win
			changeState("win");
		} else if (numMoves === 9) {	//if not a win check if a draw
			changeState("draw");
		} else if (turn === "x") {		//if not a win or draw, change turns
			changeState("playerO");
			turn = "o";
		} else {
			changeState("playerX");
			turn = "x";
		}
	};
	
	//tasks to run when screen first loads	
	var init = function () {
		//resets
		numMoves = 0;
		round = 1;
		player.x.state = 0;
		player.x.score = 0;
		player.o.state = 0;
		player.o.score = 0;
		setMessage("Tic Tac Toe");
		console.log("game initialized");
	};
	
	//tasks to run whenever player x makes a move.
	var update = function () {
		setSquare();
		checkWin();
	};
	
	//tasks to rund at the end of each game round
	var cleanup = function () {
		numMoves = 0;
		player.x.state = 0;
		player.o.state = 0;
	};
	
	return {
		player: player,
		isWin: isWin,
		init: init,
		update: update,
		setSquare: setSquare,
		cleanup: cleanup,
		turn: turn,
		changeState: changeState
	}
	
})();


Tictactoe.AI = (function () {


})();

Tictactoe.Board.init();
Tictactoe.Game.init();
//Tictactoe.InputManager.init();
//Tictactoe.Board.cell[0].innerHTML = "x";
