var express = require("express");
var path = require('path');
var app = express();
var port = 3700;

app.use(express.static(path.join(__dirname, 'public')));

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function(socket) {
	console.log('adfs');
    socket.emit('message', { text: 'Start wearing purple' });

    socket.on('gameReady', function() {
        //io.sockets.emit('message', data);
        io.sockets.emit('startGame');
        setTimeout(function() {
        	io.sockets.emit('movePiece', {'direction' : 'clockwise'});
        	setTimeout(function() {
        		io.sockets.emit('movePiece', {'direction' : 'left'});
        		setTimeout(function() {
        			io.sockets.emit('movePiece', {'direction' : 'left'});
        		}, 1000);
        	}, 1000);
        }, 2000);
    });

});

app.get("/test", function(req, res){
    res.send("It works!");
// 	res.sendfile('views/login.html');
});

 
//app.listen(port);
console.log("Listening on port " + port);
