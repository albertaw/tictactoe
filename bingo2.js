
/**
* 17039425							1114384
*  	\								  /
*    1   |   2   |   4   |   8   |   16		= 31
* -------|-------|-------|-------|--------			
*   32   |   64  |  128  |  256  |  512		= 992
* -------|-------|-------|-------|--------
*  1024  |  2048 | free  |  8192 | 16384	= 27648
* -------|-------|-------|-------|--------
* 32768  | 65536 | 131072| 262144| 524288	= 1015808
* -------|-------|-------|-------|--------
* 1048576|2097152|4194304|8388608|16777216	= 32505856
* ========================================
* 1082401 2164802 4325508 8659208 17318416
*/

	/*****************************************************************************
									GAME BOARD
	******************************************************************************/
(function () {
	/*
	* Creates an HTML table for the board and assigns indicators to 
	* each cell and starts a new game?  See about making 9int
	*/
	var squares = [];	//table cells stored in an array so we don't have to use getElementById
	var makeBoard = function (numRows, numColumns, set) {
		var board = document.getElementById('table'), //make a table element
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
		//show the table once all of its elements have been created
		document.getElementById('bingo').style.display = "inline";
		/*
		var btnStart = document.getElementsByClassName('start');
		for (var i = 0; i < btnStart.length; i++) {
			btnStart[i].style.display = "none";
		}
		*/
	};
	

	/*****************************************************************************
									GAME LOGIC
	******************************************************************************/
	var score = 0;	//the bit value of the set square
	
	var text = function (element, string){
		document.getElementById(element).innerHTML = string;
	};
	
	//The sums of bit values for different winning states
	var wins = [31,992,27648,1015808,32505856,1082401,2164802,4325508,8659208,17318416,17039425,1114384];

	//Resets the game board with new values, zeros the score and move count 
	var isUsedNum = new Array(76);	//initialized to 76 so we can use numbers 1-75, 0-75 = 76 elements, must be global to access
	
	var setSquare = function (square) {
		var newNum,
		//the numbers 0-4 correspond to each row.  0: B column 1-15, 1: I 16-30, 2: N 31-45, 3: G 46-60, 4: O 61-75.
		colPlace = [0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4], 
		colBasis = colPlace[square] * 15;
			
		do {
			newNum = colBasis + (Math.floor(Math.random()*15 + 1));
		} while (isUsedNum[newNum]);	//if there is a value at index newNum we will keep looking until the value is false (no number)
		isUsedNum[newNum] = true;	//when a unique number is found we mark it's index true
		//add properties to squares
		squares[square].innerHTML = newNum;
		squares[square].className = "";
		squares[square].number = newNum;
		squares[square].letter = getLetter(newNum);
		squares[square].isUsedPick = false;//put newNum into an array so we can draw from it randomly to display on screen
	};
	
	//initializes the board with values
	var startNewGame = function () {
		//initialize these values so the game recalculates properly
		score = 0;

		for(var i = 0; i < isUsedNum.length; i++){
			isUsedNum[i] = false;	//so we can reuse the numbers again for setting the board
		}
		
		for (var i = 0; i < squares.length; i++) {
			if (i === 12) {
				squares[12].number = 0;
				squares[12].innerHTML = "Free";
				squares[12].id = "free";
				squares[12].isSelected = true;
				
			} else {
				setSquare(i);
			}
		}
		drawNumber();
		repeatDraw();
	};
	
	var getLetter =  function (i) {
		var letter;
		if (i > 60) {
			letter = "O";
		} else if (i > 45) {
			letter = "G";
		} else if (i > 30) {
			letter = "N";
		} else if (i > 15) {
			letter = "I";
		} else {
			letter = "B";
		}
		return letter;
	};
	
	//this goes into an infinite loop if all the numbers have been drawn but the player hasn't won the game
	var getNumber = function () {
		var randomNum,
			numberOfDraws = squares.length;	//to pick a number from 0 - 24 in the case of our 25 picks
		do {
			randomNum = Math.floor(Math.random()*numberOfDraws);	
		} while (squares[randomNum].isSelected);	//look in the "basket" of available numbers (marked unpicked)  
		//return squares[randomNum].number;
		squares[randomNum].isSelected = true;	//when a unique number is found we mark it's index true
		return randomNum;
		
	};
	
	var displayNumber = function (num) {
		text('letters', squares[num].letter);
		text('numbers', squares[num].number);
	};
	
	var getScore = function () {
		for (var i = 0; i < squares.length; i++) {
			if ((squares[i].className === "pickedBG") && (squares[i].isSelected === true)){
			console.log(Math.pow(2, squares[i].indicator));
			score += Math.pow(2, squares[i].indicator);
			}
		} 
	};
	
	//Check if the player's score is equal to a score 
	var isWin = function () {
		for (var i = 0; i < wins.length; i++) {
			//must have single '&' to perform binary arithmetic, not sure how this works
			if ((wins[i] & score) === wins[i]) {	
				return true
			}
		}
		return false;
	};
	
	var draw;
	
	var repeatDraw = function () {
		draw = setInterval(function(){drawNumber();},8000);
	};
	
	var numPicks = 1;
	var drawNumber = function () {
		if (numPicks === squares.length) {	
			clearInterval(draw);
			text('numbers', "No More Numbers");
			text('letters', "");
		}
		else {
			start = 5;	//reset clock start
			displayNumber(getNumber());
			startClock();
			numPicks++;
		}
	};
	
	// marks the square as selected 
	var set = function () {
		//check if unclicked, correctness will be validated on checkWin
		if ((this.className !== "pickedBG") && (this.isSelected)){
			console.log(Math.pow(2, this.indicator));
			this.className = "pickedBG";
		} else if (this.className !== "pickedBG") {
			this.className = "pickedBG";
		} 
	};
	
	//checks if the selected numbers have been drawn and add up to a winning score
	var checkWin = function () {
		getScore();
		if (isWin()) {
			clearInterval(draw);
			clearInterval(clock);
			text('numbers', "You win!");
			text('letters', "");
		} else {
			clearInterval(draw);
			clearInterval(clock);
			text('numbers', "Not a winner.");
			text('letters', "");
			repeatDraw();
		}
	};
	
	/*****************************************************************************
									COUTNDOWN CLOCK
	******************************************************************************/
	var start = 7;
	var clock;
	var startClock = function (){
		clock = setInterval(function(){showCountDown();}, 1000);
	};
	
	var showCountDown = function () {
		if (start === 0){	//check if atthe end of the count 
			text('timer', "");
			clearInterval(clock);
		} else {
			text('timer', start);
			start--;
		}
	};
	
	/*****************************************************************************
						Interactions, Animations, and Effects
	******************************************************************************/
	
	var highlight = function () {	
		var cell = document.getElementsByTagName('td');
		for (var i = 0; i < cell.length; i++) {
			cell[i].onmouseover = function () {
				if (this.className == "") {
					this.className = 'highlight';
				}
			}
			cell[i].onmouseout = function () {
				if (this.className == 'highlight') {
					this.className = "";
				}
			}
		} //end for
	};
	
	
		
	//initializing a new game
	document.getElementById('btnStartBingo').onclick = function () {
		makeBoard(5, 5, set);
		startNewGame();
	};
	document.getElementById('checkBingo').onclick = checkWin;
	
	//starting a new game after initialization
	document.getElementById('reload').onclick = function () {
		clearInterval(draw);
		//clearInterval(clock);
		startNewGame();
		
	};
})();