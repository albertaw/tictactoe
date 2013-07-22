$(document).ready(function (){
			function initAll(){
				if (document.getElementById){	//object detection
					document.getElementById('reload').onclick = anotherCard;
					newCard();
					
				}
				else {
					alert("sorry your browser does not support this script");
				}
				
			}
			
			//startNewGame
			function newCard() {
				for (i = 0; i < 25; i++){
						if (i == 12){
							continue;
						}
						else {
							setSquare(i);
						}
					}
			}
			
			function anotherCard(){
				for(var i = 0; i < usedNums.length; i++){
					usedNums[i] = false;	//so we can reuse the number again
				}
				
				newCard();
			}
			
			function setSquare(square){
				var currentSquare = "square" + square;
				var colPlace = new Array(0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4);
				var colBasis = colPlace[square] * 15;
				var usedNums = new Array(76);	//initialized to 76 so we can use numbers 1-75, 0-75 = 76 elements
				var newNum;
				do {
					newNum = colBasis + getNewNum() + 1;
				}
				while (usedNums[newNum]);	//will keep looking for a unique number
				
				usedNums[newNum] = true;	//when a unique number is found we mark it as used or true
				document.getElementById(currentSquare).innerHTML = newNum;
				document.getElementById(currentSquare).className = "";
				document.getElementById(currentSquare).onclick = toggleColor;	//this has to be here for some reason
			}
			
			//set
			function toggleColor(){
				$(this).toggleClass("pickedBG");
				//checkWin();
				//if(document.getElementsByTagName('TD').className == ""){
					//document.getElementsByTagName('TD').className = "pickedBG";
				//}
			}
			
			
			//win
			function checkWin(){
				var winningOption = -1;	//which of the winning options hit from the array
				var setSquares = 0;	//stores which squares have been clicked to be checked against the array of options
				var winners = new Array(31,992,15360,507904,541729,557328,1083458,2162820,4329736,8519745,8659472,16252928);
				//to get the state the card is currently in
				for (var i = 0; i < 25; i++){
					var currentSquare = "square" + i;
					if (document.getElementById(currentSquare).className != ""){
						document.getElementById(currentSquare).className = "pickedBG";
						setSquares = setSquares | Math.pow(2, i);
					}
				}
				//to check if the state is a winning state
				for (var i = 0; i < winners.length; i++){
					if ((winners[i] & setSquares) == winners[i]){
						winningOption = i;
					}
				}
				if (winningOption > -1){
					for (var i = 0; i < 25; i++){
						if (winners[winningOption] & Math.pow(2, i)){
							currentSquare = "square" + i;
							document.getElementById(currentSquare).className = "winningBG";
						}
					}
				}
			}
		
			function getNewNum(){
				return Math.floor(Math.random()*15);
			}
		
			initAll();
});