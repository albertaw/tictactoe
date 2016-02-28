var express = require('express'),
		http = require('http'),
		UUID = require('node-uuid'),
		Room = require('./models/Room'),
		Player = require('./models/Player');

var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app).listen(app.get('port'), function () {
	console.log('App listening on port ' + app.get('port'));
});

//setup socket to listen to server
var io = require('socket.io').listen(server);

//register event listeners
io.sockets.on('connection', function (socket) {
	//create a new player
	var player = new Player(socket);
	//handle join event for player, add to a room, 
	//emit to self and room the status of the game 
	player.socket.on('join', function() {
		player.userid = UUID();
		Room.findRoom(player);
		//if player x notify them that we are waiting for other players
		if (player.turn === 'x') {
			player.socket.emit('serverMessage', 'waiting for player O');
		} else if (player.turn === 'o'){
			//if player o, notify player x that o has joined notify both that the game has started
			player.socket.emit('serverMessage', 'Playing as O');
			//player.socket.emit('disable');
			var users = player.room.player;
			for (var i in users) {
				//don't broadcast message to self
				if (users[i].userid !== player.userid) {
					users[i].socket.emit('serverMessage', player.turn + ' joined.');
					users[i].socket.emit('enable');
				} 
			}
		}
	});

	player.socket.on('disconnect', function () {
		console.log('player ' + player.turn + ' has left');
		//remove player from room
		if (player.room && player.room.id) {
			Room.leaveRoom(player.room.id, player.userid);
			var users = player.room.player;
			//force remaining user to become x
			for (var i in users) {
				users[i].turn = 'x';
			}
			users[i].socket.emit('serverMessage', player.turn + ' has left. Playing as ' + 
				users[i].turn);
		}
	});

	player.socket.on('boardClicked', function (content) {
		console.log('board clicked by ' + player.turn);
		//disable this socket and enable the other socket's board
		player.socket.emit('disable');
		//update other player's screen
		var users = player.room.player;
		for (var i in users) {
			if (users[i].userid !== player.userid) {
				users[i].socket.emit('update', content);
			}
		}
	});

	player.socket.on('newGame', function () {
		//update other player's screen
		var users = player.room.player;
		for (var i in users) {
			users[i].socket.emit('newGame');
			users[i].socket.emit('serverMessage', 'New game started');
			if (users[i].turn === 'o') {
				users[i].socket.emit('disable');	
			}
		}

	});


});