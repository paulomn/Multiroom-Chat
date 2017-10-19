/* import server configurations */
var app = require('./config/server');

/* port listening */
var server = app.listen(80, function() {
	console.log('Server is online');
})

/* inform the socket io */
/* create global variable to IO using express */
var io = require('socket.io').listen(server);
app.set('io', io);

/* listen connections */
/* connections call this method */
io.on('connection', function(socket){
	console.log('New user connected...');

	/* On: Listen execution methods from Emit*/
	socket.on('disconnect', function(){
		console.log('User disconnected');
	});

	socket.on('msgToServer', function(data){

		/*update messages to sender and broadcast *
		/* Send just to the sender client */
		socket.emit(
				'msgToClient',
				{nickName: data.nickName, message: data.message}
		);

		/* Send just to the sender client */
		socket.broadcast.emit(
				'msgToClient',
				{nickName: data.nickName, message: data.message}
		);

		/*update people to sender and broadcast *
		/* Send just to the sender client */
		if (parseInt(data.updatedNickName) == 0){
			socket.emit(
					'peopleToClient',
					{nickName: data.nickName}
			);

			/* Send just to the sender client */
			socket.broadcast.emit(
					'peopleToClient',
					{nickName: data.nickName}
			);
		}

	});

});
