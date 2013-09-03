
	/*****************************************************************************
						Interactions, Animations, and Effects
	******************************************************************************/

Bingo.event = (function () {	
	
	return {
		
		highlight: function () {	
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
		},
	
	//initializing a new game
		btnStartListener: function () {
			document.getElementById('btnStartBingo').onclick = function () {
				Bingo.game.makeBoard(5, 5, Bingo.game.set);
				Bingo.game.startNewGame();
			};
		},
		
		btnCheckListener: function () {
			document.getElementById('checkBingo').onclick = Bingo.game.checkWin;
		},
		
	//starting a new game after initialization
		btnReloadListener: function () {
			document.getElementById('reload').onclick = function () {
				clearInterval(Bingo.game.draw);
				//clearInterval(clock);
				Bingo.game.startNewGame();
			};
		},
		
		addLoadEvent: function (func) {
			var oldonload = window.onload;
			if (typeof window.onload === 'function') {
				window.onload = function () {
					oldonload();
					func();
				}
			} else {
				window.onload = func;
			}
		}
	}	//end return
})();

var init = Bingo.event;

init.addLoadEvent(init.highlight);
init.addLoadEvent(init.btnStartListener);
init.addLoadEvent(init.btnCheckListener);
init.addLoadEvent(init.btnReloadListener);
	