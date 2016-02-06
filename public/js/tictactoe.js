/**********************************************************
* TIC-TAC-TOE
* 2 Player game where the user fights against the computer 
* in  3 rounds.  A player must mark 3 squares in a row 
* horizontally, vertically, or diagonally to win the round.  
**********************************************************/

var Tictactoe = (function () {	
	
	//container for cell objects
	var boardArray = [];
	//can be x-turn, o-turn, x-win, o-win, tie
	var gameState = "X_TURN";
	//to set text to board
	var MARK_NONE = 0;
	var MARK_X = 1;
	var MARK_O = 2;

	//keeps track till we get to end of game
	var numMoves = 0;
	
	var player = {
		x: {state: 0, score: 0},
		o: {state: 0, score: 0}
	};	
	
	var wins = [7, 56, 448, 73, 146, 292, 273, 84];
	/**
	* 273				 					84
	*   \				 					/
	*   1   |   2   |   4   | = 7
	* ------|-------|-------| 
	*   8   |  16   |  32   | = 56
	* ------|-------|-------|
	*  64   |  128  |  256  | = 448
	* =======================
	*  73	   	 146	   292
	*/
	
	//Creates dom elements to append board to dom 
	var createBoard = function () {
		var tr;
		var td;
		var cellID = 0;
		var table = document.createElement('TABLE');
		//create table rows
		for (var i = 0; i < 3; i++) {
			tr = document.createElement('TR'); 
			//create table data
			for (var j = 0; j < 3; j++) {
				td = document.createElement('TD');
				td.id = cellID;
				td.className = "boardCell"; 		
				cellID++;
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		table.className = 'tBoard';
		//return table;
		document.getElementById("game").appendChild(table);
	};
	
	/**		Board layout by id			
	*   0   |   1   |   2     - corner
	* ------|-------|------- 
	*   3   |   4   |   5     - edge
	* ------|-------|-------
	*   6   |   7   |   8     - corner
	*/
	//adds id, state and position to each cell
	var setBoardArray = function () {
		for (var i = 0; i < 9; i++) {		//for each table cell
			boardArray[i] = {};
			boardArray[i].mark = MARK_NONE;
			boardArray[i].state = Math.pow(2, i);
			//for AI strategy
			if (i == 4) {		
				boardArray[i].position = "center";
			} else if (i % 2 === 0) {		
				boardArray[i].position = "corner";
			} else {
				boardArray[i].position = "edge";
			}
		
		}
	};

	var getBoardArray = function () {
		return boardArray;
	};

	//remove marked state 
	var clearBoardArray = function () {
		for (var i = 0; i < boardArray.length; i++) {
			boardArray[i].mark = MARK_NONE;
		}
		
	};

	//remove x's and o's from board
	var clearBoard = function () {
		$('.boardCell').removeClass('xMark');
		$('.boardCell').removeClass('oMark');

	}; 

	/***********************
	 * GAME STATE MANAGER
	************************/
	
	//updates cell as selected, adds an x or o to location,
	//updates player's winning state score
	var updateSquare = function (i) {
		//don't process if square is marked
		if (boardArray[i].mark != MARK_NONE) {			
			return;
		} 

		//if player x's turn
		if (gameState ==	"X_TURN") {
			//mark square
			boardArray[i].mark	= MARK_X;
			//add points to player x
			player.x.state += boardArray[i].state;
			//switch gamesate
			gameState = "O_TURN";

		}

		//if player o's turn
		else if (gameState ==	"O_TURN") {
			//mark square
			boardArray[i].mark = MARK_O;
			//add points to player x
			player.o.state += boardArray[i].state;
			//switch gamesate
			gameState = "X_TURN";
		}
		numMoves++;
		checkForWin();
		
	};

	var checkForWin = function () {
		if (isWin(player.x.state)) {		//check if state is a win
			gameState = "X_WIN";
		} else if (isWin(player.o.state)) {
			gameState = "O_WIN";
		}else if (numMoves == 9) {	//if not a win check if a draw
			gameState = "TIE";
		} 
	};

	//returns true if player has 3 marks in a row
	var isWin = function (player) {
		for (var i = 0; i < wins.length; i++) {
			if ((wins[i] & player) === wins[i]) {	
				return true;
			}
		}
		return false;
	};
	
	//returns an x or o to mark the square
	var stringForSquare = function (i) {
		if (boardArray[i].mark == MARK_X) {
			return "xMark";
		} else if (boardArray[i].mark == MARK_O) {
			return "oMark";
		}
	};

	//returns a string for the current game state
	var stringForGameState = function () {
		var gameStateLabel = "";
		switch (gameState) {
			case "X_TURN":
				gameStateLabel = "X turn";
				break;
			case "O_TURN":
				gameStateLabel = "O turn";
				break;
			case "X_WIN":
				gameStateLabel = "X wins!";
				break;
			case "O_WIN":
				gameStateLabel = "O wins!";
				break;
			default:
				gameStateLabel = "Tie";
				break;
		}
		return gameStateLabel;
	};
	
	/*
	var changeState = function(state) {
		switch (state) {
			case "intro":
				handleIntro();
				break;
			case "win":
				Tictactoe.UI.disableBoard();
				handleWin();
				break;
			case "gameOver":
				handlegameOver();
				break;
			case "draw":
				Tictactoe.UI.disableBoard();
				handleDraw();
				break;
			case "playerX":
				handlePlayerX();
				break;
			case "playerO":
				setTimeout(function () {handlePlayerO();}, 500);
				break;
		}
	};
	*/
	

	//tasks to rund at the end of each game round
	var resetGame = function () {
		numMoves = 0;
		gameState = "X_TURN";
		player.x.state = 0;
		player.o.state = 0;
	};
	
	//tasks to run when screen first loads	
	var init = function () {
		setBoardArray();
		createBoard();
		$("#message").text(stringForGameState());

		//click listener for board
		$('.boardCell').click(function () {
			var id = $(this).attr("id").valueOf();
			updateSquare(id);
			console.log(boardArray[id]);
			$(this).addClass(stringForSquare(id));
			$("#message").text(stringForGameState());
		});

		//click listener for new game
		$('#btnNewGame').click(function () {
			resetGame();
			clearBoardArray();
			clearBoard();
			$("#message").text(stringForGameState());
		})
		/*
		if (players === 1) {
			handlePlayerO = computer;
		} else if (players === 2) {
			handlePlayerO = player2;
		}
		*/
		console.log("game initialized");
		
	};
	
	

/*****************************
 GAME CONTROLLER
 ***************************/	
	

/*
	 //utility function to display text on screen
	var setMessage = function (string){
		$('#message').text(string);
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
		$('.boardCell').on('click',function () {
			Tictactoe.game.update($(this));
			console.log('board clicked');
		});
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
		getBoard();
		setCells();
		setMessage("Round " + round);
		enableBtnNewGame();
		disableBtnNextRound();
		$('#x').val(0);
		$('#o').val(0);
	};
	*/
return {
		init: init,
		cleanup: function () {
			resetGame();
			clearBoardArray();
			clearBoard();
		},
	};

})();
