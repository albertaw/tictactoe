/**********************************************************
* TIC-TAC-TOE
* 2 Player game where the user fights against the computer 
* in  3 rounds.  A player must mark 3 squares in a row 
* horizontally, vertically, or diagonally to win the round.  
**********************************************************/

var Tictactoe = (function () {

	/**********************************************************
	 * GUI MANAGER
	 * Handles the creation, update and destruction of game elements.
	 *********************************************************/
		
	/**		 			
	*   0   |   1   |   2     - corner
	* ------|-------|------- 
	*   3   |   4   |   5     - edge
	* ------|-------|-------
	*   6   |   7   |   8     - corner
	* 
	*/
	
	var cell = [];	//container for cell objects

	//Adds properties to cells then adds cells to cell array
	var setBoard = function () {
		var td = document.getElementsByTagName('td');
		//var td = $('td');
		var cellID = 0;		//assigns a numeric identifer to cells when initializing board
		for (var i = 0; i < td.length; i++) {		//for each table cell
			td[i].ID = cellID; 		// set the cell's ID for computing its bit value
			td[i].isSelected = false;	
			td[i].onclick = updateSquare;
			//td[i].className = ""; 		//set the cell's style
			td[i].state = Math.pow(2, i);
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
	
	//removes x's and o's from board 
	var clearBoard = function () {
		for (var i = 0; i < cell.length; i++) {
			cell[i].isSelected = false;
			cell[i].className = "";
		}
		
	};
	
	
	//puts board and game in starting state
	var enableBtnNewGame = function () {
		$('#reload').click(function () {
			clearBoard();
			cleanup();
			AIManager.cleanup();
			initGUI();
			initGame();
			AIManager.init();
		});
	};
	
	//shows the next round button
	var enableBtnNextRound = function () {
		$('#btnNextRound').show();
		//flicker
		$('#btnNextRound').click(function () {
			//handle next round
			clearBoard();
			cleanup();
			AIManager.cleanup();
			setMessage("round " + round);
			$(this).hide();
		});
	};
	
	//hides the next round button 
	var disableBtnNextRound = function () {
		$('#btnNextRound').hide();
			
	};
	
	//registers click events on board
	var enableBoard = function () {
		var td = document.getElementsByTagName('td');
		for (var i = 0; i < td.length; i++) {		//for each table cell
			td[i].onclick = updateSquare;
		}
		console.log("board enabled");
	};
	
	//removes click events from board
	var disableBoard = function () {
		var td = document.getElementsByTagName('td');
		for (var i = 0; i < td.length; i++) {		//for each table cell
			td[i].onclick = null;
		}
		console.log("board disabled");
	}
	
	//starting state of game elements
	var initGUI = function () {
		setBoard();
		setMessage("Round " + round);
		enableBtnNewGame();
		disableBtnNextRound();
		$('#x').val(0);
		$('#o').val(0);
	};
	
	/**********************************************************
	 * GAME STATE MANAGER
	 * Defines game loop and rules for gameplay, switching
	 * screnes, and othe game states.
	*********************************************************/

	var wins = [7, 56, 448, 73, 146, 292, 273, 84];
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
	
	var numMoves = 0;
	var round = 1;
	var turn = 'x';
	var currentState;
	var player = {
		x: {state: 0, score: 0},
		o: {state: 0, score: 0}
	};	
	
	//updates cell as selected, adds an x or o to location,
	//updates player's winning state score
	var updateSquare = function () {
		//setSquare
		if (!this.isSelected) {			//check if square is selected
			$(this).addClass(turn +'Mark');	
			this.isSelected = true;
			player[turn].state += Math.pow(2, this.ID);
			numMoves++;
			console.log(this.ID + "clicked");
			
		} 
		//checkWin
		if (isWin(player[turn].state)) {		//check if state is a win
			changeState("win");
		} else if (numMoves === 9) {	//if not a win check if a draw
			changeState("draw");
		} else if (turn == "x"){		//if not a win or draw, change turns
			changeState("playerO");
		} else {
			changeState("playerX");
		}
	};
	
	//interface for other modules to use in game
	var changeState = function(state) {
		switch (state) {
			case "intro":
				handleIntro();
				break;
			case "win":
				disableBoard();
				handleWin();
				break;
			case "gameOver":
				handlegameOver();
				break;
			case "draw":
				disableBoard();
				handleDraw();
				break;
			case "playerX":
				enableBoard();	//enable click events
				handlePlayerX();
				break;
			case "playerO":
				disableBoard();	//disable click events
				setTimeout(function () {handlePlayerO();}, 500);
				break;
		}
	};
	
	//screen shows round 1 intro on load
	var handleIntro = function () {
		currentState = "intro";
	};
	
	//state when x or o wins
	var handleWin = function () {
		currentState = "win";
		player[turn].score += 1;	//add one to winning player's score
		$('#'+turn).val(player[turn].score);
		round++;
		setMessage(turn + " wins!");
		enableBtnNextRound();	//show the next round button
		console.log("x:" + player.x.score + " o:" + player.o.score);
		cleanup();	//disables processing click events
	};
	
	//state when x or o has won the tournament
	var handleGameOver = function () {
		currentState = "gameOver";
		//announce overall winner	
	};
	
	//state when their are no more moves and no one wins
	var handleDraw = function () {
		currentState = "draw";
		round++;
		setMessage("Draw");
		enableBtnNextRound();
		console.log("x:" + player.x.score + " o:" + player.o.score);
	};
	
	//x is the human
	var handlePlayerX = function () {
		currentState = "playerX";
		turn = "x";
		
	};
	
	//this can be modified to be the computer
	var handlePlayerO = function () {
		currentState = "playerO";
		turn = "o";
		//AI
		AIManager.update();		//make move
		numMoves++;		//update move count
		console.log("numMoves:" + numMoves);
		//checkWin
		if (isWin(player[turn].state)) {		//check if state is a win
			changeState("win");
		} else if (numMoves === 9) {	//if not a win check if a draw
			changeState("draw");
		} else {						//if not a win or draw, change turns
			changeState("playerX");
		}
	
	};
	
	//utility function to display text on screen
	var setMessage = function (string){
		$('#message').text(string);
	};
	
	//returns true if player has 3 marks in a row
	var isWin = function (player) {
		for (var i = 0; i < wins.length; i++) {
			if ((wins[i] & player) === wins[i]) {	
				//text('feedback', player.name + ' Wins');
				return true;
			}
		}
		return false;
	};
	
	
	//tasks to run when screen first loads	
	var initGame = function () {
		//resets
		enableBoard();
		numMoves = 0;
		round = 1;
		turn = 'x';
		player.x.state = 0;
		player.x.score = 0;
		player.o.state = 0;
		player.o.score = 0;
		setMessage("Round 1");
		console.log("game initialized");
		
	};
	
	
	//tasks to rund at the end of each game round
	var cleanup = function () {
		numMoves = 0;
		console.log("numMoves:" + numMoves);
		changeState("playerX");	//ensure x always starts
		player.x.state = 0;
		player.o.state = 0;
	};

	return {
		initGUI: initGUI,
		initGame: initGame,
		changeState: changeState,
		cell: cell,
		player: player,
		isWin: isWin,
		cleanup: cleanup,
		clearBoard: clearBoard
	}
	
})();


