#!/usr/bin/node

var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRomm = {};

exports.listen = function(server) {
	io = socket.io.listen(server);
	io.set('log level', 1);

	io.sockets.on('connection', function(socket) {
		guestNumber = assignGuestName(socket, guestNumber, 
			nickNames, namesUsed);
		joinRoom(socket, 'Lobby');

		handleMessageBroadcasting(socket, nickNames);
		handleNameChangeAttempts(socket, nickNames, namesUsed);
		handleRoomJoining(socket);

		socket.on('rooms', function() {
			socket.emit('rooms', io.sockets.manager.rooms);

		});

		handleClientDisconnection(socket, nickNames , namesUsed);
	});
};


// ASSIGNING GUEST NAMES
function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
	var name = 'Guest' + guestNumber;
	nicknames[socket.id] = name;
	socket.emit('nameResult', {
		success: true,
		name:name
	});
	namesUsed.push(name);
	return guestNumber + 1;
}


// JOINING ROOMS

function joinRoom(socket, room) {
	socket.join(room);
	currentRoom[socket.id] = room;
	socket.emit('joinResult', {room: room});
	socket.broadcast.to(room).emit('message', {
		text: nickNames[socket.id] + 'has joined' + room + '.'});
	var usersInRoom = io.sockets.clients(room);
	if(usersInRoom.length > 1) {
		var usersInRoomSummary = 'Users currently in' + room +':';
		for (var index in usersInRoom) {
			var userSocketId = usersInRoom[index].id;
			if(userSocketId != socket.id) {
				if(index > 0) {
					usersInRoomSummary += ', ';
				}
				usersInRoomSummary += nickNames[userSocketId];
			}
		}
		usersInRoomSummary += '.';
		socket.emit('message', {text: usersInRoomSummary});
		}
	}

// HANDLING NAME-CHANGE REQUESTS
function handleNameChangeAttempts(socket, nickNames, namesUsed){
	socket.on('nameAttempt', function(name){
		if (name.indexOf('Guest') == 0 ) {
			socket.emit('nameResult', {
				success: false,
				message: 'Names cannot beging with "Guest"'
			});
		} else {
			if(namesUsed.indexOf(name) == -1) {
				var previousName = nickNames[socket.id];
				var previousNameIndex = namesUsed.indexOf(previousName);
				namesUsed.push(name);
				nickNames[socket.id] = name;
				delete namesUsed[previousNameIndex];

				socket.emit('nameResult', {
					success: true,
					name: name
				});
				socket.broadcast.to(currentRomm[socket.id]).emit('message', {
					text: previousName + 'is now known as ' + name + '.'
				});
			} else {
				socket.emit('nameResult', {
					success: false,
					message: 'That name is alreadt in use'
				})
			}
		}
	})
}


// SENDING CHAT MESSAGES

function handleMessageBroadcasting(socket) {
	socket.on('message', function(message){
		socket.broadcast.to(message.room).emit('message', {
			text: nickNames[socket.id] + ':' + message.text
		});
	});
};

// CREATING ROOMS
function handleRoomJoining(socket) {
	socket.on('join', function(room){
		socket.leave(currentRomm[socket.id]);
		joinRoom(socket, room.newRoom);
	})
}

// HANDLE USER DISCONNECTIONS

function handleClientDisconnection(socket){
	socket.on('disconnect', function(){
		var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
		delete namesUsed[nameIndex];
		delete nicknames[socket.id];
	});
}