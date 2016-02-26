var UUID = require('node-uuid');

var Room = (function () {
	var rooms = {};
	var roomCount = 0;
	var ROOM_MAX = 2;
	
	function findRoom (player) {
		//if there are games active
		if (roomCount > 0) {
			var joined = false;
			//find a room that has spots available
			for (var id in rooms) {
				var room = rooms[id];
				if (room.player_count < ROOM_MAX) {
					//make the second player o
					player.turn = "o";
					player.room = room;
					room.player[player.userid] = player;
					room.player_count++;
					joined = true;
					console.log(player.turn + ' joined room ' + id);
					//start game loop
					
				}//end if
			}//end for
			if (!joined) {
				//if there were no free rooms
				createRoom(player);
			}
		} else {
			//if there are no rooms create one
			createRoom(player);
		}

	};

	function createRoom (player) {

		var room = {
			id: UUID(),
			player: {},
			player_count: 1
		};

		//store room in the list of rooms
		rooms[room.id] = room;

		//increment room count
		roomCount++;

		//the player holds the room info
		player.room = room;
		//the first player to enter the room is x
		player.turn = "x";
		//add player to list of players
		room.player[player.userid] = player;

		//instantiate a new game

		console.log(player.turn + ' created a room with id ' + player.room.id);
		console.log('room count: ' + roomCount);
	};

	function leaveRoom (roomid, userid) {

		//stop game updates
		var room = rooms[roomid];
	
		//if there are at least 2 players in a room and one is leaving
		if (room.player_count > 1) {
			delete room.player[userid];
			//find another room for the other player
			room.player_count--;
			console.log('player count:', room.player_count);
		} else {
			//the last player leaves the room
			delete room;
			roomCount--;
			console.log('room count: ' + roomCount);

		}

	};

	return {
		findRoom: findRoom,
		leaveRoom: leaveRoom
	}

 })();

module.exports = Room;

