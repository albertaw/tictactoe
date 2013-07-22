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

(function () {

	/*
	* Creates an HTML table for the board and assigns indicators to 
	* each cell and starts a new game?  See about making 9int
	*/
	var squares = [];	//table cells stored in an array so we don't have to use getElementById
	var makeBoard = function (numRows, numColumns, set) {
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
				cell.onclick = set;	//Attach the click event handler to each cell  maybe the event handlers can be grouped separately
				row.appendChild(cell);	//append the cells to the rows 
				squares[indicator] = cell;	//Adds the cells to the squares array
				indicator++;
			}
		}
		//append elements to page
		
		var game = document.getElementById('tictactoe');
		game.appendChild(board);
		game.style.display = "inline";
		
		//hide the start buttons
		var btnStart = document.getElementsByClassName('start');
		for (var i = 0; i < btnStart.length; i++) {
			btnStart[i].style.display = "none";
		}
		
	};
	
	/*
	* Game Logic
	*/
	
	var wins = [7, 56, 448, 73, 146, 292, 273, 84];
	
	var numMoves = 0;
	var turn = 'x';
	var player = {x: 0, o: 0};
	var text = function (element, string){
		document.getElementById(element).innerHTML = string;
	};
		
	var isWin = function (player) {
		for (var i = 0; i < wins.length; i++) {
			if ((wins[i] & player) === wins[i]) {	
				//text('feedback', player.name + ' Wins');
				return true
			}
		}
		return false;
	};
	
	// marks the square as selected 
	var set = function () {
		this.innerHTML = turn;	
		player[turn] += Math.pow(2, this.indicator);
		console.log(player[turn]);
		numMoves++;
		if (this.className !== "") {
			return;
		} else if (isWin(player[turn])) {
			text('feedback', turn + ' wins');
		} else if (numMoves === 9) {
			text('feedback', 'Draw');
		} else {
			turn = turn === 'x' ? 'o' : 'x';
		}
		
	};
	
	//initializes the board
	var startNewGame = function () {
		//resets
		moves = 0;
		player.x = 0;
		player.o = 0;
		document.getElementById('feedback').innerHTML = "";
		var setSquare = function (square) {
			squares[square].innerHTML = "";
			squares[square].className = "";
			squares[square].isSelected = false;
		};
		
		for (var i = 0; i < squares.length; i++) {
				setSquare(i);
		}
		
	};
	
	//initializes a new game
	document.getElementById('btnStartTicTacToe').onclick = function () {
		makeBoard(3, 3, set);
		startNewGame();
	};

	document.getElementById('reloadTicTacToe').onclick = startNewGame;
})();