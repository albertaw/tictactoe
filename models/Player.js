
var Player = function (socket) {
	this.socket = socket;
	this.username = "";
	this.userid;
	this.room = {};
	this.turn = "";
	this.score = 0;
	this.wins = 0;
}

module.exports = Player;