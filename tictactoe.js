
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

var Tictactoe = (function () {
	
	/*
	* Creates an HTML table for the board and assigns indicators to 
	* each cell and starts a new game?  See about making 9int
	*/
	var squares = [];	//table cells stored in an array so we don't have to use getElementById
	var makeBoard = function (numRows, numColumns, fn) {
		var board = document.createElement('table'), //make a table element
			indicator = 0,	//adds a property to the cells in order to calculate the bit value without looping?
			row,
			cell;
		for (var i = 0; i < numRows; i++) {
			row = document.createElement('tr');	//append the rows to the table
			board.appendChild(row);
			for (var j = 0; j < numColumns; j++) {
				cell = document.createElement('td');
				cell.indicator = indicator;
				cell.isSelected = false;
				cell.onclick = fn;	//Attach the click event handler to each cell  maybe the event handlers can be grouped separately
				row.appendChild(cell);	//append the cells to the rows 
				squares[indicator] = cell;	//Adds the cells to the squares array
				indicator++;
			}
		}
		//append elements to page
		$('#tBoard').append(board);
		console.log("board created");
		
	};
	
	/*
	* Game Logic
	*/
	
	var wins = [7, 56, 448, 73, 146, 292, 273, 84];
	
	var numMoves = 0;
	var turn = 'x';
	var player = {x: 0, o: 0};
	var setMessage = function (string){
		$('.message').text(string);
	};
		
	var isWin = function (player) {
		for (var i = 0; i < wins.length; i++) {
			if ((wins[i] & player) === wins[i]) {	
				//text('feedback', player.name + ' Wins');
				return true;
			}
		}
		return false;
	};
	
	// marks the square as selected 
	var set2Player = function () {
		//check if square is selected
		if (this.isSelected) {
			return;
		} else {
			$(this).addClass(turn+'Mark');	
			this.isSelected = true;
			player[turn] += Math.pow(2, this.indicator);
			console.log(turn + ':' + player[turn]);
			numMoves++;
		} 
		//check if state is a win
		if (isWin(player[turn])) {
			setMessage(turn + ' wins');
		//check if board is filled
		} else if (numMoves === 9) {
			setMessage('Draw');
		} else {
			
			turn = turn === 'x' ? 'o': 'x';
		}
	};
	
	var check = function () {
		if (this.className !== "") {
			return;
		} else if (isWin(player[turn])) {
			setMessage(turn + ' wins');
		} else if (numMoves === 9) {
			setMessage('Draw');
		} 
	};
	
	//var intro = function () {
		//$('#feedback').text("Round 1");
	//};

	
	//initializes the board
	var startNewGame = function () {
		//resets
		numMoves = 0;
		player.x = 0;
		player.o = 0;
		setMessage("Tic Tac Toe");
		var setSquare = function (square) {
			squares[square].innerHTML = "";
			squares[square].className = "";
			squares[square].isSelected = false;
		};
			
		for (var i = 0; i < squares.length; i++) {
				setSquare(i);
		}
		//intro();
	};
		
	var start = function () {
		makeBoard(3, 3, set2Player);
		startNewGame();
		console.log("game initialized");
	};
		
	var btnReloadListener = function () {
		document.getElementById('reloadTicTacToe').onclick = function () {
			startNewGame();
			console.log("new game started");
		};
	};
				
	var init = function () {
		start();
		btnReloadListener();
		}

	return { 
		init: init
	}
	
})();

Tictactoe.init();